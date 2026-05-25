from fastapi import APIRouter
from app.database import get_connection

router = APIRouter()


@router.get("/stats")
def get_dashboard_stats():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) FROM cases")
    total_cases = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM cases WHERE LOWER(status) = 'active'")
    active_cases = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM cases WHERE LOWER(status) = 'critical'")
    critical_cases = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM suspects")
    total_suspects = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM evidence")
    total_evidence = cur.fetchone()[0]

    cur.execute(
        "SELECT COUNT(*) FROM alerts WHERE LOWER(severity) IN ('high', 'critical', 'urgent')"
    )
    active_alerts = cur.fetchone()[0]

    cur.execute(
        """
        SELECT id, case_id, type AS event_type, timestamp AS event_time, summary AS detail
        FROM evidence
        UNION ALL
        SELECT id, NULL, 'alert', time AS event_time, title AS detail
        FROM alerts
        ORDER BY event_time DESC
        LIMIT 10
        """
    )
    activity_rows = cur.fetchall()

    activity_feed = []
    for row in activity_rows:
        event_id, case_id, event_type, event_time, detail = row
        timestamp = event_time.isoformat() if hasattr(event_time, "isoformat") else event_time
        activity_feed.append(
            {
                "id": event_id,
                "source": event_type,
                "caseId": case_id,
                "detail": detail,
                "timestamp": timestamp,
            }
        )

    cur.close()
    conn.close()

    return {
        "totalCases": total_cases,
        "activeCases": active_cases,
        "criticalCases": critical_cases,
        "totalSuspects": total_suspects,
        "totalEvidence": total_evidence,
        "activeAlerts": active_alerts,
        "activityFeed": activity_feed,
    }
