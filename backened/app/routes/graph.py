from fastapi import APIRouter
from app.database import get_connection

router = APIRouter()


def _numeric_tail(value):
    digits = "".join(char for char in str(value) if char.isdigit())
    return int(digits) if digits else 0


@router.get("/network")
def get_graph_network():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
        id,
        title,
        location,
        type,
        status,
        trust
        FROM cases
    """)

    case_rows = cur.fetchall()

    cur.execute("""
        SELECT
        id,
        name,
        location
        FROM suspects
    """)

    suspect_rows = cur.fetchall()

    cur.close()
    conn.close()

    nodes = []
    edges = []

    # ---------- CASE NODES ----------

    for case_id, title, location, case_type, status, trust in case_rows:

        risk = trust or 80

        if str(status).lower() == "critical":
            risk = max(risk, 95)

        elif str(case_type).lower() in {"smuggling", "weapons", "corruption"}:
            risk = max(risk, 88)

        nodes.append({

            "data":{

                "id":f"case-{case_id}",

                "label":title,

                "group":"case",

                "location":location,

                "crimeType":case_type,

                "risk":risk

            }

        })


    # ---------- SUSPECT NODES ----------

    for suspect_id, name, location in suspect_rows:

        suspect_number = _numeric_tail(suspect_id)
        risk = 70 + (suspect_number % 25)

        nodes.append({

            "data":{

                "id":f"suspect-{suspect_id}",

                "label":name,

                "group":"suspect",

                "location":location,

                "risk":risk

            }

        })


    # ---------- RELATIONSHIP ENGINE ----------

    for suspect_id, name, suspect_location in suspect_rows:

        for case_id, title, case_location, case_type, status, trust in case_rows:

            score = 0

            # location intelligence

            if (

                suspect_location
                and case_location
                and suspect_location.strip().lower()
                ==
                case_location.strip().lower()

            ):

                score += 50


            # keyword intelligence

            if "harbor" in title.lower():

                score += 25


            # simulated behavioral matching

            if _numeric_tail(suspect_id) % 2 == _numeric_tail(case_id) % 2:

                score += 25


            # create relationship

            if score >= 50:

                edges.append({

                    "data":{

                        "id":
                        f"edge-{suspect_id}-{case_id}",

                        "source":
                        f"suspect-{suspect_id}",

                        "target":
                        f"case-{case_id}",

                        "relationship":
                        "high-confidence-link",

                        "confidence":
                        score

                    }

                })


    # fallback edge

    if not edges and case_rows and suspect_rows:

        suspect_id, _, _ = suspect_rows[0]
        case_id, _, _, _, _, _ = case_rows[0]

        edges.append({

            "data":{

                "id":
                f"edge-{suspect_id}-{case_id}",

                "source":
                f"suspect-{suspect_id}",

                "target":
                f"case-{case_id}",

                "relationship":
                "related",

                "confidence":
                50

            }

        })

    return {

        "nodes":nodes,

        "edges":edges

    }
