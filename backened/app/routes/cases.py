from fastapi import APIRouter

router = APIRouter()

cases = [
    {
        "id":"C-2401",
        "title":"Harbor Container Theft",
        "location":"Chennai Port",
        "status":"Active"
    },
    {
        "id":"C-2402",
        "title":"Velachery Card Skimming Ring",
        "location":"Velachery",
        "status":"Review"
    }
]

@router.get("/")
def get_cases():
    return cases