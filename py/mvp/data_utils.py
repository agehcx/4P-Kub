from __future__ import annotations

"""Utility helpers for loading candidate datasets with varying schemas."""

import io
import re
from pathlib import Path
from typing import Iterable

import pandas as pd


CANONICAL_COLUMNS = ["id", "name", "years_experience", "resume_text", "skills", "O", "C", "E", "A", "N"]


def _read_csv_resilient(path: Path) -> pd.DataFrame:
    """Read a CSV file while tolerating leading blank rows or stray commas."""

    try:
        df = pd.read_csv(path)
    except pd.errors.ParserError:
        df = None

    if df is not None and not df.empty:
        # If at least one non-empty column exists we can return immediately.
        col_names = [str(col) for col in df.columns]
        if any(name.strip() for name in col_names):
            return df

    # Fallback: strip blank/whitespace-only lines then re-parse.
    text = Path(path).read_text(encoding="utf-8")
    cleaned_lines = [line for line in text.splitlines() if line.strip()]
    if not cleaned_lines:
        return pd.DataFrame()

    buffer = io.StringIO("\n".join(cleaned_lines))
    return pd.read_csv(buffer)


def _estimate_years_experience(role: str) -> float:
    role_lower = (role or "").lower()
    if any(keyword in role_lower for keyword in ["head", "director", "chief"]):
        return 12.0
    if "senior" in role_lower:
        return 9.0
    if any(keyword in role_lower for keyword in ["manager", "lead"]):
        return 7.0
    if any(keyword in role_lower for keyword in ["specialist", "scientist", "analyst", "engineer", "developer", "consultant", "architect"]):
        return 5.0
    if any(keyword in role_lower for keyword in ["junior", "assistant", "technician", "intern"]):
        return 3.0
    return 5.0


def _normalise_skill_string(raw: str) -> str:
    tokens = [token.strip() for token in re.split(r"[;,|]", raw or "") if token.strip()]
    return "; ".join(tokens)


def _normalise_personality(value: object) -> float:
    try:
        numeric = float(value)
    except (TypeError, ValueError):
        return 0.5
    return numeric / 5.0 if numeric > 1 else numeric


def load_candidate_dataframe(resumes_csv: str | Path) -> pd.DataFrame:
    """Load a CSV of candidates and map it to the canonical columns used by the MVP.

    The helper tolerates legacy columns such as ``EmployeeID`` and personality scores
    stored on a 1-5 scale. Missing columns are filled with sensible defaults so the
    downstream ranking pipeline can operate without additional wrangling.
    """

    path = Path(resumes_csv)
    df = _read_csv_resilient(path).copy()
    if df.empty:
        return pd.DataFrame(columns=CANONICAL_COLUMNS)

    # Drop synthetic index columns that appear as "Unnamed: 0" etc.
    df = df.loc[:, [col for col in df.columns if not str(col).startswith("Unnamed")]]
    df = df.dropna(how="all")

    rename_map = {
        "EmployeeID": "id",
        "employee_id": "id",
        "Name": "name",
        "BusinessUnit": "business_unit",
        "Business Unit": "business_unit",
        "Role": "role",
        "Title": "role",
        "Skills": "skills",
        "Skill": "skills",
        "PastProjects": "past_projects",
        "PerformanceReviewSummary": "summary",
        "Summary": "summary",
        "O_Score": "O",
        "C_Score": "C",
        "E_Score": "E",
        "A_Score": "A",
        "N_Score": "N",
        "YearsExperience": "years_experience",
        "Years Experience": "years_experience",
    }

    present_map = {src: dst for src, dst in rename_map.items() if src in df.columns}
    if present_map:
        df = df.rename(columns=present_map)

    # Ensure canonical columns exist.
    for column in CANONICAL_COLUMNS:
        if column not in df.columns:
            df[column] = None

    df["id"] = df["id"].fillna("").astype(str).str.strip()
    df["name"] = df["name"].fillna("").astype(str).str.strip()
    df["role"] = df["role"].fillna("").astype(str).str.strip()
    df["business_unit"] = df["business_unit"].fillna("").astype(str).str.strip()
    df["past_projects"] = df["past_projects"].fillna("").astype(str).str.strip()
    df["summary"] = df["summary"].fillna("").astype(str).str.strip()

    df["skills"] = df["skills"].fillna("").astype(str).map(_normalise_skill_string)

    if df["years_experience"].isna().all():
        df["years_experience"] = df["role"].map(_estimate_years_experience)
    else:
        df["years_experience"] = pd.to_numeric(df["years_experience"], errors="coerce").fillna(
            df["role"].map(_estimate_years_experience)
        )

    resume_parts = (
        df["name"].where(df["name"] != "", other="Candidate")
        + " works in "
        + df["business_unit"].replace("", "the organisation")
        + " as "
        + df["role"].replace("", "a team member")
        + ". Key projects: "
        + df["past_projects"].replace("", "n/a")
        + ". "
        + df["summary"].replace("", "")
    )

    if "resume_text" in df.columns:
        df["resume_text"] = df["resume_text"].fillna("").astype(str)
        needs_text = df["resume_text"].str.strip() == ""
        df.loc[needs_text, "resume_text"] = resume_parts.str.replace("\n", " ")
    else:
        df["resume_text"] = resume_parts.str.replace("\n", " ")

    for trait in ["O", "C", "E", "A", "N"]:
        df[trait] = df[trait].apply(_normalise_personality).fillna(0.5)

    df = df.dropna(subset=["id", "name"]).reset_index(drop=True)
    return df[CANONICAL_COLUMNS].copy()
