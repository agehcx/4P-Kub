from __future__ import annotations

import json
import sys
from functools import lru_cache
from itertools import combinations
from pathlib import Path
from typing import Iterable, List, Optional

import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.append(str(BASE_DIR))

from mvp.kg import (  # noqa: E402
    KGConfig,
    build_kg,
    relatedness_adamic_adar,
    relatedness_jaccard,
    relatedness_metapath,
    relatedness_ppr,
)
from mvp.pipeline import RecruitingMVP  # noqa: E402

DATA_DIR = BASE_DIR / "mvp" / "data"
RESUMES_CSV = DATA_DIR / "sample_resumes.csv"
TEAMS_CSV = DATA_DIR / "sample_teams.csv"
ROLE_JSON = DATA_DIR / "role_requirements.json"

if not all(path.exists() for path in (RESUMES_CSV, TEAMS_CSV, ROLE_JSON)):
    missing = [str(p) for p in (RESUMES_CSV, TEAMS_CSV, ROLE_JSON) if not p.exists()]
    raise RuntimeError(f"Missing data files for knowledge graph backend: {missing}")

ROLE_CONFIG = json.loads(ROLE_JSON.read_text())
DEFAULT_REQUIRED = ROLE_CONFIG.get("required_skills", [])
DEFAULT_NICE = ROLE_CONFIG.get("nice_to_have", [])
ROLE_NODE = f"role:{ROLE_CONFIG['role']}"

app = FastAPI(title="CP Konha Graph-RAG API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _parse_skills(raw: Optional[Iterable[str] | str]) -> List[str]:
    if raw is None:
        return []
    if isinstance(raw, (list, tuple, set)):
        items = list(raw)
    else:
        items = [chunk for chunk in str(raw).replace(";", ",").split(",")]
    return [item.strip().lower() for item in items if item and item.strip()]


class SearchRequest(BaseModel):
    projectName: Optional[str] = Field(default=None, description="Human readable mission name")
    query: Optional[str] = Field(default=None, description="Free-text filter after scoring")
    requiredSkills: List[str] | None = Field(default=None, description="List of mandatory skills")
    niceToHave: List[str] | None = Field(default=None, description="List of optional skills")
    teamSize: Optional[int] = Field(default=None, ge=1)
    limit: int = Field(default=10, ge=1, le=100)


class TeamEvaluationRequest(BaseModel):
    candidateIds: List[str] = Field(default_factory=list)
    requiredSkills: List[str] | None = None

    @property
    def required(self) -> List[str]:
        skills = self.requiredSkills or []
        return [s.strip().lower() for s in skills if s]


class Gap(BaseModel):
    skill: str
    severity: str


class TeamEvaluationResponse(BaseModel):
    teamScore: float
    gaps: List[Gap]
    diversityMetrics: dict
    alternatives: List[dict]


@lru_cache(maxsize=1)
def _load_mvp() -> RecruitingMVP:
    return RecruitingMVP(str(RESUMES_CSV))


@lru_cache(maxsize=1)
def _load_graph():
    cfg = KGConfig(role_id=ROLE_NODE)
    return build_kg(str(RESUMES_CSV), str(TEAMS_CSV), str(ROLE_JSON), cfg)


def _candidate_row_by_id(candidate_id: str):
    mvp = _load_mvp()
    df = mvp.df
    match = df[df["id"] == candidate_id]
    if match.empty:
        raise KeyError(candidate_id)
    return match.iloc[0]


def _score_candidates(required: List[str], nice_to_have: List[str], limit: int) -> List[dict]:
    mvp = _load_mvp()
    required = required or DEFAULT_REQUIRED
    nice_to_have = nice_to_have or DEFAULT_NICE
    df = mvp.search_candidates(required=required, nice_to_have=nice_to_have, top_k=max(limit, len(mvp.df)))

    graph = _load_graph()
    role_node = ROLE_NODE

    records = df.to_dict(orient="records")
    scores = []
    meta_vals, ppr_vals, jac_vals, aa_vals = [], [], [], []

    for row in records:
        candidate_node = f"candidate:{row['id']}"
        meta = float(relatedness_metapath(graph, role_node, candidate_node))
        ppr = float(relatedness_ppr(graph, role_node, candidate_node))
        jac = float(relatedness_jaccard(graph, role_node, candidate_node))
        aa = float(relatedness_adamic_adar(graph, role_node, candidate_node))
        meta_vals.append(meta)
        ppr_vals.append(ppr)
        jac_vals.append(jac)
        aa_vals.append(aa)
        scores.append((row, meta, ppr, jac, aa))

    max_meta = max(meta_vals) if meta_vals else 1.0
    max_ppr = max(ppr_vals) if ppr_vals else 1.0
    max_jac = max(jac_vals) if jac_vals else 1.0
    max_aa = max(aa_vals) if aa_vals else 1.0

    payload: List[dict] = []
    for row, meta, ppr, jac, aa in scores:
        canon_skills = row.get("canonical_skills")
        if isinstance(canon_skills, str):
            canon_skills = canon_skills.replace(";", ",").split(",")
        if isinstance(canon_skills, (set, tuple)):
            canon_skills = list(canon_skills)
        canon_skills = [skill.strip() for skill in canon_skills or [] if skill]

        skill_score = float(row.get("coverage_required", 0.0))
        network_score = 0.5 * (meta / max_meta if max_meta else 0.0) + 0.3 * (
            ppr / max_ppr if max_ppr else 0.0
        ) + 0.2 * (aa / max_aa if max_aa else 0.0)

        semantic_score = float(row.get("sem_score", 0.0))
        coverage_nice = float(row.get("coverage_nice", 0.0))
        years_exp = float(row.get("years_experience", 0.0))
        final_score = float(row.get("final_score", 0.0))

        required_pct = int(round(skill_score * 100))
        nice_pct = int(round(coverage_nice * 100))

        rationale_short = (
            f"{row['name']} covers {required_pct}% of required skills"
            f" and brings {years_exp:.0f} years experience."
        )
        rationale_full = (
            f"Semantic similarity {semantic_score:.2f}, required skill coverage {required_pct}%"
            f" plus optional skill coverage {nice_pct}%."
            f" KG meta-path: {meta:.3f}, PPR: {ppr:.4f}, Adamic/Adar: {aa:.3f}."
        )

        payload.append(
            {
                "id": row["id"],
                "name": row.get("name", row["id"]),
                "title": ROLE_CONFIG["role"],
                "photo": f"https://i.pravatar.cc/150?u={row['id']}",
                "score": max(0.0, min(1.0, final_score)),
                "skillScore": max(0.0, min(1.0, skill_score)),
                "networkScore": max(0.0, min(1.0, float(network_score))),
                "semanticScore": max(0.0, min(1.0, semantic_score)),
                "coverageNice": max(0.0, min(1.0, coverage_nice)),
                "yearsExperience": years_exp,
                "topSkills": [skill.title() for skill in canon_skills][:6],
                "canonicalSkills": canon_skills,
                "resumeText": row.get("resume_text", ""),
                "rationaleShort": rationale_short,
                "rationaleFull": rationale_full,
            }
        )

    return payload


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/search")
def search(request: SearchRequest) -> dict:
    required = _parse_skills(request.requiredSkills) or DEFAULT_REQUIRED
    nice_to_have = _parse_skills(request.niceToHave) or DEFAULT_NICE
    candidates = _score_candidates(required, nice_to_have, limit=request.limit)

    if request.query:
        query_lower = request.query.lower()
        filtered = []
        for candidate in candidates:
            name_match = query_lower in candidate["name"].lower()
            skill_match = any(query_lower in skill.lower() for skill in candidate["canonicalSkills"])
            if name_match or skill_match:
                filtered.append(candidate)
        candidates = filtered or candidates

    limited = candidates[: request.limit]
    return {"candidates": limited, "total": len(candidates)}


@app.get("/candidates/{candidate_id}")
def get_candidate(candidate_id: str) -> dict:
    try:
        base_row = _candidate_row_by_id(candidate_id)
    except KeyError:
        raise HTTPException(status_code=404, detail="Candidate not found") from None

    candidate_profile = next(
        (item for item in _score_candidates(DEFAULT_REQUIRED, DEFAULT_NICE, limit=len(_load_mvp().df)) if item["id"] == candidate_id),
        None,
    )
    if not candidate_profile:
        raise HTTPException(status_code=404, detail="Candidate not ranked")

    profile = dict(candidate_profile)
    profile.update(
        {
            "personality": {
                "O": float(base_row.get("O", 0.0)),
                "C": float(base_row.get("C", 0.0)),
                "E": float(base_row.get("E", 0.0)),
                "A": float(base_row.get("A", 0.0)),
                "N": float(base_row.get("N", 0.0)),
            },
            "yearsExperience": float(base_row.get("years_experience", 0.0)),
        }
    )
    return profile


def _team_alternatives(required: List[str], team_size: int) -> List[dict]:
    candidates = _score_candidates(required, DEFAULT_NICE, limit=len(_load_mvp().df))
    top_ids = [candidate["id"] for candidate in candidates[: min(5, len(candidates))]]
    combos = list(combinations(top_ids, min(team_size, len(top_ids))))
    alternatives = []
    for idx, combo in enumerate(combos[:3]):
        alternatives.append(
            {
                "name": f"Option {idx + 1}",
                "candidateIds": list(combo),
            }
        )
    return alternatives


@app.post("/team/evaluate", response_model=TeamEvaluationResponse)
def evaluate_team(request: TeamEvaluationRequest):
    if not request.candidateIds:
        raise HTTPException(status_code=400, detail="candidateIds required")

    required = request.required or DEFAULT_REQUIRED
    profiles = _score_candidates(required, DEFAULT_NICE, limit=len(_load_mvp().df))
    lookup = {profile["id"]: profile for profile in profiles}

    selected = []
    for candidate_id in request.candidateIds:
        if candidate_id not in lookup:
            raise HTTPException(status_code=404, detail=f"Candidate {candidate_id} not found in rankings")
        selected.append(lookup[candidate_id])

    avg_score = float(np.mean([profile["score"] for profile in selected])) if selected else 0.0

    team_skills = {skill.lower() for profile in selected for skill in profile.get("canonicalSkills", [])}
    required_set = {skill.lower() for skill in required}
    missing = sorted(required_set - team_skills)

    gaps = [Gap(skill=skill.title(), severity="high" if idx < 2 else "medium") for idx, skill in enumerate(missing)]
    coverage_ratio = 1.0 - (len(missing) / len(required_set)) if required_set else 1.0
    team_score = max(0.0, min(1.0, 0.7 * avg_score + 0.3 * coverage_ratio))

    personality_keys = ["O", "C", "E", "A", "N"]
    diversity = {}
    for key in personality_keys:
        values = [profile.get("personality", {}).get(key, 0.5) for profile in selected]
        diversity[key] = float(np.mean(values)) if values else 0.5

    diversity.update(
        {
            "teamSize": len(selected),
            "avgExperience": float(np.mean([profile.get("yearsExperience", 0.0) for profile in selected])) if selected else 0.0,
        }
    )

    alternatives = _team_alternatives(required, max(1, len(selected)))

    return TeamEvaluationResponse(
        teamScore=team_score,
        gaps=gaps,
        diversityMetrics=diversity,
        alternatives=alternatives,
    )
