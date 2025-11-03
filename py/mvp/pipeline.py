from __future__ import annotations
import json
from dataclasses import dataclass
from typing import List, Dict, Any, Tuple
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from .data_utils import load_candidate_dataframe
from .skills import extract_skills

@dataclass
class Candidate:
    id: str
    name: str
    text: str
    skills: List[str]
    years_experience: float
    personality: Dict[str, float]  # Big5: O,C,E,A,N

class RecruitingMVP:
    def __init__(self, resumes_csv: str):
        self.df = load_candidate_dataframe(resumes_csv)
        self.df = self.df.fillna({"resume_text": "", "skills": ""})

        # Build documents (resume text + provided skills)
        corpus = (self.df["resume_text"].astype(str) + " " + self.df["skills"].astype(str)).tolist()
        self.vectorizer = TfidfVectorizer(min_df=1, max_df=0.9, ngram_range=(1,2))
        self.doc_matrix = self.vectorizer.fit_transform(corpus)
        # Extract canonical skills
        combined_text = self.df["resume_text"].astype(str) + " " + self.df["skills"].astype(str)
        self.df["canonical_skills"] = combined_text.map(extract_skills)
        # Personality vector
        self.personality_cols = ["O","C","E","A","N"]
        for col in self.personality_cols:
            if col not in self.df.columns:
                self.df[col] = 0.5

    def _role_query_text(self, required: List[str], nice_to_have: List[str]) -> str:
        return " ".join(required) + " " + " ".join(nice_to_have)

    def search_candidates(self, required: List[str], nice_to_have: List[str], top_k: int = 5) -> pd.DataFrame:
        """Blend semantic similarity and skill coverage into a single score."""
        query = self._role_query_text(required, nice_to_have)
        qv = self.vectorizer.transform([query])
        sem = cosine_similarity(qv, self.doc_matrix)[0]  # shape (n_candidates,)

        # Skill coverage
        req_set = set(required)
        nice_set = set(nice_to_have)
        cov_req, cov_nice = [], []
        for skills in self.df["canonical_skills"]:
            s = set(skills) if isinstance(skills, (set, list)) else set()
            cov_req.append(len(s & req_set) / max(1, len(req_set)))
            cov_nice.append(len(s & nice_set) / max(1, len(nice_set)) if nice_set else 0.0)
        cov_req = np.array(cov_req)
        cov_nice = np.array(cov_nice)

        # Years experience (min-max scaled)
        years = self.df["years_experience"].to_numpy(dtype=float)
        if years.size > 0 and years.max() > years.min():
            yrs = (years - years.min()) / (years.max() - years.min())
        else:
            yrs = np.zeros_like(years)

        # Final score (tunable weights)
        score = 0.55*sem + 0.25*cov_req + 0.10*cov_nice + 0.10*yrs

        out = self.df.copy()
        out["sem_score"] = sem
        out["coverage_required"] = cov_req
        out["coverage_nice"] = cov_nice
        out["exp_score"] = yrs
        out["final_score"] = score
        out = out.sort_values("final_score", ascending=False).reset_index(drop=True)
        out["canonical_skills"] = out["canonical_skills"].apply(
            lambda value: sorted(value) if isinstance(value, (set, list, tuple)) else []
        )
        out["resume_text"] = out["resume_text"].astype(str)
        return out[[
            "id",
            "name",
            "final_score",
            "sem_score",
            "coverage_required",
            "coverage_nice",
            "years_experience",
            "O",
            "C",
            "E",
            "A",
            "N",
            "canonical_skills",
            "resume_text",
        ]].head(top_k)

