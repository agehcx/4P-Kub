from __future__ import annotations
"""
Knowledge Graph (KG) relatedness for Recruiting MVP
- Build a lightweight KG over Candidates, Skills, Teams, and Roles
- Compute relatedness using:
  (1) Meta-path counts (Role -> Skill <- Candidate)
  (2) Personalized PageRank (PPR) starting from Role node
  (3) Adamic/Adar & Jaccard on skill neighborhoods
Requires: networkx
"""
from dataclasses import dataclass
from typing import Dict, List, Tuple, Iterable
import json
import pandas as pd
import networkx as nx

# ------------------------------
# Graph schema
# ------------------------------
# Node types: "role", "skill", "candidate", "team"
# Edges:
#   (role)-[REQUIRES]->(skill)
#   (team)-[HAS_SKILL]->(skill)
#   (candidate)-[HAS_SKILL]->(skill)
#   (candidate)-[CANDIDATE_OF]->(team)   [optional if available]
#
# All nodes keep a "type" attribute. Other attributes are allowed.

@dataclass
class KGConfig:
    role_id: str = "role:Supply Chain Data Analyst"
    weight_requires: float = 1.0
    weight_has_skill: float = 1.0
    weight_candidate_of: float = 0.8

def _node_id(prefix: str, key: str) -> str:
    return f"{prefix}:{key}"

def build_kg(resumes_csv: str, teams_csv: str, role_requirements_json: str, cfg: KGConfig | None = None) -> nx.Graph:
    cfg = cfg or KGConfig()
    G = nx.Graph()

    # Load data
    resumes = pd.read_csv(resumes_csv)
    teams = pd.read_csv(teams_csv)
    role = json.load(open(role_requirements_json))

    # --- Role node ---
    role_node = _node_id("role", role["role"])
    G.add_node(role_node, type="role", name=role["role"])

    # --- Skills from role ---
    for s in role.get("required_skills", []):
        sk = _node_id("skill", s)
        G.add_node(sk, type="skill", name=s)
        G.add_edge(role_node, sk, type="REQUIRES", weight=cfg.weight_requires, required=True)

    for s in role.get("nice_to_have", []):
        sk = _node_id("skill", s)
        if not G.has_node(sk):
            G.add_node(sk, type="skill", name=s)
        G.add_edge(role_node, sk, type="REQUIRES", weight=cfg.weight_requires * 0.6, required=False)

    # --- Teams ---
    for _, t in teams.iterrows():
        tnode = _node_id("team", t["team_id"])
        G.add_node(tnode, type="team", name=t["team_name"], O=t["O"], C=t["C"], E=t["E"], A=t["A"], N=t["N"])
        team_skills = (t["team_skills"] or "").split("|") if isinstance(t["team_skills"], str) else (t["team_skills"] or [])
        for s in team_skills:
            s = s.strip()
            if not s:
                continue
            sk = _node_id("skill", s)
            if not G.has_node(sk):
                G.add_node(sk, type="skill", name=s)
            G.add_edge(tnode, sk, type="HAS_SKILL", weight=cfg.weight_has_skill)

    # --- Candidates ---
    # Expect a column "canonical_skills" but if not present, try to parse "skills" (semicolon sep)
    def _skills_from_row(row) -> list[str]:
        if "canonical_skills" in row and isinstance(row["canonical_skills"], (list, set)):
            return list(row["canonical_skills"])
        raw = (row.get("skills") or "")
        if isinstance(raw, str):
            return [s.strip() for s in raw.replace(",", ";").split(";") if s.strip()]
        return []

    if "canonical_skills" in resumes.columns and resumes["canonical_skills"].dtype == object:
        # canonical_skills may be serialized strings if saved earlier; try to eval safely
        import ast
        def _safe_parse(v):
            if isinstance(v, (list, set)): return list(v)
            try:
                x = ast.literal_eval(v)
                if isinstance(x, (list, set)): return list(x)
            except Exception:
                pass
            # fallback: try to split by separators
            if isinstance(v, str):
                return [s.strip() for s in v.replace(",", ";").split(";") if s.strip()]
            return []
        resumes["__skills"] = resumes["canonical_skills"].map(_safe_parse)
    else:
        resumes["__skills"] = resumes.apply(_skills_from_row, axis=1)

    for _, r in resumes.iterrows():
        cnode = _node_id("candidate", r["id"])
        G.add_node(cnode, type="candidate", name=r["name"], years=float(r.get("years_experience", 0)))
        for s in r["__skills"]:
            sk = _node_id("skill", s)
            if not G.has_node(sk):
                G.add_node(sk, type="skill", name=s)
            G.add_edge(cnode, sk, type="HAS_SKILL", weight=cfg.weight_has_skill)

        # Optional link to team if column exists (not in sample)
        if "team_id" in r and isinstance(r["team_id"], str) and r["team_id"]:
            tnode = _node_id("team", r["team_id"])
            if G.has_node(tnode):
                G.add_edge(cnode, tnode, type="CANDIDATE_OF", weight=cfg.weight_candidate_of)

    return G

# ------------------------------
# Relatedness metrics
# ------------------------------
def relatedness_metapath(G: nx.Graph, role_node: str, candidate_node: str) -> float:
    """
    Count Role -> Skill <- Candidate two-hop connections.
    Normalize by number of required skills.
    """
    if role_node not in G or candidate_node not in G:
        return 0.0
    role_skills = {n for n in G.neighbors(role_node) if G.nodes[n].get("type") == "skill"}
    cand_skills = {n for n in G.neighbors(candidate_node) if G.nodes[n].get("type") == "skill"}
    if not role_skills:
        return 0.0
    return len(role_skills & cand_skills) / float(len(role_skills))

def relatedness_adamic_adar(G: nx.Graph, role_node: str, candidate_node: str) -> float:
    """Adamic/Adar over shared skill neighbors."""
    if role_node not in G or candidate_node not in G:
        return 0.0
    cn = nx.adamic_adar_index(G, [(role_node, candidate_node)])
    for _, __, score in cn:
        return float(score or 0.0)
    return 0.0

def relatedness_jaccard(G: nx.Graph, role_node: str, candidate_node: str) -> float:
    """Jaccard similarity of neighbor sets (mostly skills)."""
    if role_node not in G or candidate_node not in G:
        return 0.0
    jac = nx.jaccard_coefficient(G, [(role_node, candidate_node)])
    for _, __, score in jac:
        return float(score or 0.0)
    return 0.0

def relatedness_ppr(G: nx.Graph, role_node: str, candidate_node: str, alpha: float = 0.15) -> float:
    """
    Personalized PageRank (random walk with restart) starting at role_node.
    Return the PPR score mass that lands on candidate_node.
    """
    if role_node not in G or candidate_node not in G:
        return 0.0
    ppr = nx.pagerank(G, alpha=1 - alpha, personalization={role_node: 1.0})
    return float(ppr.get(candidate_node, 0.0))

def rank_candidates_by_kg(G: nx.Graph, role_node: str, top_k: int = 5,
                          w_meta: float = 0.5, w_ppr: float = 0.4, w_jaccard: float = 0.1) -> list[tuple[str, float, dict]]:
    """
    Blend multiple KG signals into a final score.
    Returns: list of (candidate_node, score, breakdown)
    """
    candidates = [n for n, d in G.nodes(data=True) if d.get("type") == "candidate"]
    scores = []
    for c in candidates:
        s_meta = relatedness_metapath(G, role_node, c)
        s_ppr = relatedness_ppr(G, role_node, c)
        s_jac = relatedness_jaccard(G, role_node, c)
        final = w_meta*s_meta + w_ppr*s_ppr + w_jaccard*s_jac
        scores.append((c, final, {"meta": s_meta, "ppr": s_ppr, "jaccard": s_jac}))
    scores.sort(key=lambda x: x[1], reverse=True)
    return scores[:top_k]
