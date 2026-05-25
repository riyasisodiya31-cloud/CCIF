from fastapi import APIRouter, HTTPException
from app.database import get_connection

router = APIRouter()

@router.get("/")
def get_suspects():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM suspects")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    keys = ["id","name","age","risk","gang","location","photo"]
    return [dict(zip(keys, row)) for row in rows]

@router.get("/{suspect_id}")
def get_suspect(suspect_id: str):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM suspects WHERE id = %s", (suspect_id,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Suspect not found")
    keys = ["id","name","age","risk","gang","location","photo"]
    return dict(zip(keys, row))