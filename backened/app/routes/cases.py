from fastapi import APIRouter, HTTPException
from app.database import get_connection

router = APIRouter()

@router.get("/")
def get_cases():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM cases")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    keys = ["id","title","type","location","officer","status","date","trust","summary"]
    return [dict(zip(keys, row)) for row in rows]

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
    keys = ["id","title","type","location","officer","status","date","trust","summary"]
    return dict(zip(keys, row))