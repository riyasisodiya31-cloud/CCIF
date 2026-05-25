from datetime import datetime, timedelta, timezone
from app.database import get_connection

EVIDENCE_TYPES = [
    "CCTV Frame",
    "Call Log",
    "Forensic Report",
    "Manifest",
    "Bank Trace",
    "Witness Note",
    "GPS Ping",
]

CASE_IDS = [f"C-{2401 + i}" for i in range(15)]


def main():
    conn = get_connection()
    cur = conn.cursor()

    inserted = 0
    now = datetime.now(timezone.utc)

    for index in range(50):
        evidence_id = f"E-{5001 + index}"
        case_id = CASE_IDS[index % len(CASE_IDS)]
        evidence_type = EVIDENCE_TYPES[index % len(EVIDENCE_TYPES)]
        uploaded_by = "Officer Auto"
        timestamp = now - timedelta(minutes=index * 15)
        trust = 58 + ((index * 7) % 40)
        integrity = min(100, 60 + ((index * 3) % 40))
        summary = f"{evidence_type} evidence for case {case_id}."

        cur.execute("SELECT 1 FROM evidence WHERE id = %s", (evidence_id,))
        if cur.fetchone():
            continue

        cur.execute(
            "INSERT INTO evidence (id, case_id, type, uploaded_by, timestamp, trust, integrity, summary) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (
                evidence_id,
                case_id,
                evidence_type,
                uploaded_by,
                timestamp,
                trust,
                integrity,
                summary,
            ),
        )
        inserted += 1

    conn.commit()
    cur.close()
    conn.close()
    print(f"Inserted {inserted} evidence row(s)")


if __name__ == "__main__":
    main()
