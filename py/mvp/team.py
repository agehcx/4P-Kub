from __future__ import annotations
from dataclasses import dataclass
from typing import List, Dict, Any
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

BIG5 = ["O","C","E","A","N"]

@dataclass
class Team:
    team_id: str
    team_name: str
    team_skills: List[str]
    O: float
    C: float
    E: float
    A: float
    N: float

def jaccard(a: set, b: set) -> float:
    if not a and not b:
        return 1.0
    return len(a & b) / max(1, len(a | b))

def recommend_team(candidate_row: pd.Series, teams_df: pd.DataFrame, required_skills: List[str]) -> pd.DataFrame:
    """
    Score each team on:
    - Skill complementarity: how much candidate covers team gaps for required skills
    - Personality fit: cosine similarity between candidate Big5 and team centroid
    - Balance factor: prefer teams not already saturated with candidate's dominant skills
    """
    cand_skills = set(candidate_row["canonical_skills"] or [])
    req = set(required_skills)
    cand_vec = candidate_row[["O","C","E","A","N"]].to_numpy(dtype=float).reshape(1,-1)

    rows = []
    for _, t in teams_df.iterrows():
        team_skill_set = set((t["team_skills"] or "").split("|")) if isinstance(t["team_skills"], str) else set(t["team_skills"] or [])
        # Team gaps relative to required skills
        team_gaps = req - team_skill_set
        coverage = len(cand_skills & team_gaps) / max(1,len(team_gaps)) if team_gaps else 1.0

        team_vec = t[["O","C","E","A","N"]].to_numpy(dtype=float).reshape(1,-1)
        personality = float(cosine_similarity(cand_vec, team_vec)[0,0])

        # Diversity bonus: avoid too-high overlap with team's existing skills
        overlap = len(cand_skills & team_skill_set) / max(1,len(req))
        diversity = 1.0 - overlap  # prefer bringing new skills

        score = 0.55*coverage + 0.35*personality + 0.10*diversity

        rows.append({
            "team_id": t["team_id"],
            "team_name": t["team_name"],
            "coverage_gaps": round(coverage,3),
            "personality_fit": round(personality,3),
            "diversity_bonus": round(diversity,3),
            "final_score": round(score,3)
        })
    out = pd.DataFrame(rows).sort_values("final_score", ascending=False).reset_index(drop=True)
    return out
