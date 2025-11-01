from __future__ import annotations
import re
from typing import List, Set, Dict

# Tiny taxonomy: canonical_skill -> synonyms/keywords
SKILL_TAXONOMY: Dict[str, List[str]] = {
    "python": ["python", "pandas", "numpy", "scikit-learn", "sklearn"],
    "sql": ["sql", "postgres", "mysql", "sqlite", "snowflake"],
    "data analysis": ["data analysis", "analytics", "insight", "dashboard", "reporting"],
    "machine learning": ["machine learning", "ml", "classification", "regression", "clustering"],
    "supply chain": ["supply chain", "inventory", "logistics", "demand planning", "forecasting"],
    "agritech": ["agritech", "precision farming", "livestock", "feed", "aquaculture"],
    "communication": ["communication", "present", "presentation", "stakeholder", "client"],
    "java": ["java", "spring", "jvm"],
    "javascript": ["javascript", "node.js", "node", "react"],
    "cloud": ["cloud", "aws", "gcp", "azure"],
}

CANONICAL = list(SKILL_TAXONOMY.keys())

def normalize_text(s: str) -> str:
    return re.sub(r"[^a-z0-9+.\- ]", " ", s.lower())

def extract_skills(text: str) -> Set[str]:
    """Return a set of canonical skills mentioned in the text via keyword match."""
    t = normalize_text(text or "")
    found = set()
    for canon, words in SKILL_TAXONOMY.items():
        for w in words:
            if re.search(rf"\b{re.escape(w)}\b", t):
                found.add(canon)
                break
    return found
