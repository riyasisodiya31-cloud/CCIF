# CCIF Backend

## Setup

1. Create and activate a Python environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Make sure PostgreSQL is running and the `ccif` database exists.

4. Set the Anthropic API key for the Copilot endpoint:

```bash
export ANTHROPIC_API_KEY="your_anthropic_api_key"
```

## Run the server

From `CCIF/backened`:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Available endpoints

- `GET /` — health check
- `GET /cases` — all cases
- `GET /cases/{case_id}` — single case
- `GET /suspects` — all suspects
- `GET /suspects/{suspect_id}` — single suspect
- `GET /alerts` — all alerts
- `GET /evidence` — all evidence
- `GET /evidence/{case_id}` — evidence by case
- `POST /evidence` — add new evidence
- `GET /dashboard/stats` — dashboard metrics
- `GET /graph/network` — Cytoscape graph data
- `POST /copilot/query` — Anthropic Claude query

## Example requests

### Add evidence

```bash
curl -X POST http://localhost:8000/evidence \
  -H "Content-Type: application/json" \
  -d '{
    "case_id": "C-2401",
    "type": "CCTV Frame",
    "uploaded_by": "Officer Riley",
    "timestamp": "2026-05-19T15:30:00Z",
    "trust": 82,
    "integrity": 94,
    "summary": "Frame from surveillance camera."
  }'
```

### Dashboard stats

```bash
curl http://localhost:8000/dashboard/stats
```

### Graph network

```bash
curl http://localhost:8000/graph/network
```

### Copilot query

```bash
curl -X POST http://localhost:8000/copilot/query \
  -H "Content-Type: application/json" \
  -d '{"query":"Summarize the top active cases."}'
```
