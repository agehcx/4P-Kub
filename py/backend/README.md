# CP Konha Knowledge Graph Backend

This FastAPI service exposes the recruiting MVP search and team-evaluation logic so the React front-end can call real algorithms instead of mocks.

## Quick start

```bash
cd py/backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```

The API will be available on http://localhost:8000.

## Key endpoints

- `GET /health` – service status check.
- `POST /search` – run the hybrid semantic + knowledge-graph ranking.
- `GET /candidates/{id}` – fetch a single candidate with detailed breakdown.
- `POST /team/evaluate` – evaluate a set of candidate IDs against required skills.

All endpoints return JSON that aligns with the React components in `frontend/` (scores in 0–1 range, top skills, rationales, etc.).
