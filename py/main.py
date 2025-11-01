import json
import pandas as pd
from pathlib import Path
from mvp.pipeline import RecruitingMVP
from mvp.team import recommend_team

def demo():
    print("=== Smarter Recruiting & Team Formation — Python MVP ===")

    # โฟลเดอร์ที่ main.py อยู่
    base_dir = Path(__file__).resolve().parent

    data_dir     = base_dir / "mvp" / "data"
    role_path    = data_dir / "role_requirements.json"
    resumes_path = data_dir / "sample_resumes.csv"
    teams_path   = data_dir / "sample_teams.csv"

    # เช็กให้ชัวร์ว่ามีไฟล์ครบ
    for p in [role_path, resumes_path, teams_path]:
        if not p.exists():
            raise FileNotFoundError(f"Missing file: {p}\n"
                                    f"Current script dir: {base_dir}")

    rr = json.loads(role_path.read_text(encoding="utf-8"))
    print(f"Role: {rr['role']}")
    print(f"Required: {rr['required_skills']} | Nice-to-have: {rr['nice_to_have']}\n")

    # ✅ ใส่ path ที่ถูกต้อง (ผูกกับไฟล์จริง)
    mvp = RecruitingMVP(str(resumes_path))
    top = mvp.search_candidates(rr["required_skills"], rr["nice_to_have"], top_k=5)
    print("Top candidates:")
    print(top[["id","name","final_score","coverage_required","coverage_nice","years_experience"]])
    print()

    best = top.iloc[0]
    print(f"Best candidate: {best['name']} ({best['id']})")
    print(f"Canonical skills: {sorted(list(best['canonical_skills']))}\n")

    teams_df = pd.read_csv(teams_path)
    team_rank = recommend_team(best, teams_df, rr["required_skills"])
    print("Recommended team placement:")
    print(team_rank)

if __name__ == "__main__":
    demo()
