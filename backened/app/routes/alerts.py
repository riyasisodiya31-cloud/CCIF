from fastapi import APIRouter

router = APIRouter()

alerts = [
    {
        "id":"A-101",
        "type":"Hotspot",
        "message":"3 burglaries detected near Chennai Port",
        "severity":"High"
    },

    {
        "id":"A-102",
        "type":"Pattern",
        "message":"Cold case similarity detected",
        "severity":"Medium"
    }
]

@router.get("/")
def get_alerts():
    return alerts