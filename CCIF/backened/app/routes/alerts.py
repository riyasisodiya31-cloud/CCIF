from fastapi import APIRouter
from app.database import get_connection

router = APIRouter()

@router.get("/")
def get_alerts():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM alerts")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    keys = ["id","title","location","severity","time","signal"]
    return [dict(zip(keys, row)) for row in rows]