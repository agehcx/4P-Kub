import json
import pandas as pd
from mvp.kg import build_kg, KGConfig, _node_id, rank_candidates_by_kg

def main():
    G = build_kg("mvp/data/sample_resumes.csv", "mvp/data/sample_teams.csv", "mvp/data/role_requirements.json")
    role = json.load(open("mvp/data/role_requirements.json"))["role"]
    role_node = _node_id("role", role)

    print("=== KG Relatedness Demo ===")
    print(f"Role node: {role_node}")
    print()

    ranked = rank_candidates_by_kg(G, role_node, top_k=5)
    print("Top candidates by KG signals (node_id, score, breakdown):")
    for node, score, br in ranked:
        print(f"{node}\t{score:.4f}\t{br}")

if __name__ == '__main__':
    main()
