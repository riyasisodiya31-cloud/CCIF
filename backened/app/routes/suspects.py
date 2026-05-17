from fastapi import APIRouter

router = APIRouter()

suspects = [
    {
        "id":"S-1001",
        "name":"Arjun Varma",
        "risk":92,
        "gang":"North Quay Syndicate"
    },
    {
        "id":"S-1002",
        "name":"Meera Khan",
        "risk":78,
        "gang":"None"
    }
]

@router.get("/")
def get_suspects():
    return suspects