from fastapi import APIRouter
from app.database import get_connection

router = APIRouter()


@router.get("/network")
def get_graph_network():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT id, title, location FROM cases")
    case_rows = cur.fetchall()

    cur.execute("SELECT id, name, location FROM suspects")
    suspect_rows = cur.fetchall()

    cur.close()
    conn.close()

    nodes = []
    edges = []

    for case_id, title, location in case_rows:
        nodes.append(
            {
                "data": {
                    "id": f"case-{case_id}",
                    "label": title,
                    "group": "case",
                    "location": location,
                }
            }
        )

    for suspect_id, name, location in suspect_rows:
        nodes.append(
            {
                "data": {
                    "id": f"suspect-{suspect_id}",
                    "label": name,
                    "group": "suspect",
                    "location": location,
                }
            }
        )

    for suspect_id, name, suspect_location in suspect_rows:
        for case_id, title, case_location in case_rows:
            if (suspect_location and case_location and suspect_location.strip().lower() == case_location.strip().lower()):
                edges.append(
                    {
                        "data": {
                            "id": f"edge-{suspect_id}-{case_id}",
                            "source": f"suspect-{suspect_id}",
                            "target": f"case-{case_id}",
                            "relationship": "matched-location",
                        }
                    }
                )

    if not edges and case_rows and suspect_rows:
        suspect_id, _, _ = suspect_rows[0]
        case_id, _, _ = case_rows[0]
        edges.append(
            {
                "data": {
                    "id": f"edge-{suspect_id}-{case_id}",
                    "source": f"suspect-{suspect_id}",
                    "target": f"case-{case_id}",
                    "relationship": "related",
                }
            }
        )

    return {"nodes": nodes, "edges": edges}
