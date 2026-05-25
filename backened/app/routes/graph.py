from fastapi import APIRouter
from app.database import get_connection

router = APIRouter()


@router.get("/network")
def get_graph_network():
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("SELECT id, title, location, trust FROM cases")
    case_rows = cur.fetchall()

    cur.execute("SELECT id, name, location, gang, risk FROM suspects")
    suspect_rows = cur.fetchall()

    cur.execute("SELECT id, case_id, type, trust FROM evidence")
    evidence_rows = cur.fetchall()

    cur.close()
    conn.close()

    nodes = []
    edges = []

    # Case nodes
    for case_id, title, location, trust in case_rows:
        nodes.append({"data": {"id": case_id, "label": title, "type": "case", "risk": trust, "location": location}})

    # Suspect nodes
    for suspect_id, name, location, gang, risk in suspect_rows:
        nodes.append({"data": {"id": suspect_id, "label": name, "type": "suspect", "risk": risk, "location": location}})

    # Evidence nodes (first 24)
    for ev_id, case_id, ev_type, trust in evidence_rows[:24]:
        nodes.append({"data": {"id": ev_id, "label": ev_type, "type": "evidence", "risk": trust}})

    # Location nodes (unique locations)
    seen_locations = set()
    for _, _, location, _ in case_rows:
        if location and location not in seen_locations:
            seen_locations.add(location)
            nodes.append({"data": {"id": f"L-{location}", "label": location, "type": "location", "risk": 68}})

    # Gang nodes (unique non-None gangs)
    seen_gangs = set()
    for _, _, _, gang, _ in suspect_rows:
        if gang and gang != 'None' and gang not in seen_gangs:
            seen_gangs.add(gang)
            nodes.append({"data": {"id": f"G-{gang}", "label": gang, "type": "gang", "risk": 86}})

    # Edges: suspect → case (location match)
    for suspect_id, _, s_loc, _, _ in suspect_rows:
        for case_id, _, c_loc, _ in case_rows:
            if s_loc and c_loc and s_loc.strip().lower() == c_loc.strip().lower():
                edges.append({"data": {"id": f"{suspect_id}-{case_id}", "source": suspect_id, "target": case_id, "label": "INVOLVED_IN"}})

    # Edges: case → evidence
    for ev_id, case_id, _, _ in evidence_rows[:24]:
        edges.append({"data": {"id": f"{case_id}-{ev_id}", "source": case_id, "target": ev_id, "label": "HAS_EVIDENCE"}})

    # Edges: suspect → gang
    for suspect_id, _, _, gang, _ in suspect_rows:
        if gang and gang != 'None':
            edges.append({"data": {"id": f"{suspect_id}-G-{gang}", "source": suspect_id, "target": f"G-{gang}", "label": "AFFILIATED_WITH"}})

    # Edges: case → location
    for case_id, _, location, _ in case_rows:
        if location:
            edges.append({"data": {"id": f"{case_id}-L-{location}", "source": case_id, "target": f"L-{location}", "label": "LOCATED_AT"}})

    return {"nodes": nodes, "edges": edges}
