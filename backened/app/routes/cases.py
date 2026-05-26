from datetime import date
from random import randint

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.database import get_connection

router = APIRouter()

CASE_KEYS = ["id", "title", "type", "location", "officer", "status", "date", "trust", "summary"]


class CaseCreate(BaseModel):
    id: str | None = None
    title: str = Field(..., min_length=2)
    type: str = Field(..., min_length=2)
    location: str = Field(..., min_length=2)
    officer: str = Field(..., min_length=2)
    status: str = "Active"
    date: date
    trust: int = Field(75, ge=0, le=100)
    summary: str = Field(..., min_length=10)


def row_to_case(row):
    return dict(zip(CASE_KEYS, row))


def generate_case_id(cur):
    for _ in range(20):
        case_id = f"C-{randint(1000, 9999)}"
        cur.execute("SELECT 1 FROM cases WHERE id = %s", (case_id,))
        if not cur.fetchone():
            return case_id
    raise HTTPException(status_code=500, detail="Unable to generate unique case id")

@router.get("/")
def get_cases():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM cases")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [row_to_case(row) for row in rows]

@router.post("/", status_code=201)
def create_case(case: CaseCreate):
    conn = get_connection()
    cur = conn.cursor()

    case_id = case.id or generate_case_id(cur)
    cur.execute("SELECT 1 FROM cases WHERE id = %s", (case_id,))
    if cur.fetchone():
        cur.close()
        conn.close()
        raise HTTPException(status_code=409, detail="Case id already exists")

    values = (
        case_id,
        case.title,
        case.type,
        case.location,
        case.officer,
        case.status,
        case.date,
        case.trust,
        case.summary,
    )
    cur.execute(
        """
        INSERT INTO cases (id, title, type, location, officer, status, date, trust, summary)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *
        """,
        values,
    )
    row = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    return row_to_case(row)

@router.get("/{case_id}")
def get_case(case_id: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM cases WHERE id = %s", (case_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Case not found")
    return row_to_case(row)
