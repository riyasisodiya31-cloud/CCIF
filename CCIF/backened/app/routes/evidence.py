from datetime import datetime
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from app.database import get_connection

router = APIRouter()

class EvidenceIn(BaseModel):
    case_id: str = Field(..., example="C-2401")
    type: str = Field(..., example="CCTV Frame")
    uploaded_by: str = Field(..., example="Officer Riley")
    timestamp: datetime = Field(..., example="2026-05-19T15:30:00Z")
    trust: int = Field(..., ge=0, le=100, example=82)
    integrity: int = Field(..., ge=0, le=100, example=94)
    summary: str = Field(..., example="Frame from surveillance camera.")

class EvidenceOut(EvidenceIn):
    id: str


def _generate_next_evidence_id(cur):
    cur.execute("SELECT id FROM evidence WHERE id LIKE 'E-%' ORDER BY id DESC LIMIT 1")
    row = cur.fetchone()
    if not row:
        return "E-5001"
    last_id = row[0]
    try:
        counter = int(last_id.split("-", 1)[1])
    except (ValueError, IndexError):
        counter = 5000
    return f"E-{counter + 1:04d}"


@router.get("/")
def get_evidence():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM evidence")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    keys = ["id", "case_id", "type", "uploaded_by", "timestamp", "trust", "integrity", "summary"]
    return [dict(zip(keys, row)) for row in rows]


@router.get("/{case_id}")
def get_evidence_by_case(case_id: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM evidence WHERE case_id = %s", (case_id,))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    if not rows:
        raise HTTPException(status_code=404, detail="No evidence found for this case")
    keys = ["id", "case_id", "type", "uploaded_by", "timestamp", "trust", "integrity", "summary"]
    return [dict(zip(keys, row)) for row in rows]


@router.post("/", response_model=EvidenceOut, status_code=201)
def add_evidence(payload: EvidenceIn):
    conn = get_connection()
    cur = conn.cursor()
    evidence_id = _generate_next_evidence_id(cur)
    cur.execute(
        "INSERT INTO evidence (id, case_id, type, uploaded_by, timestamp, trust, integrity, summary) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        (
            evidence_id,
            payload.case_id,
            payload.type,
            payload.uploaded_by,
            payload.timestamp,
            payload.trust,
            payload.integrity,
            payload.summary,
        ),
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"id": evidence_id, **payload.dict()}
