from fastapi import FastAPI

app = FastAPI(
    title="CCIF API",
    description="Cognitive Criminal Intelligence Fabric",
    version="1.0"
)

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


@app.get("/")
def home():
    return {"message":"CCIF Backend Running"}


@app.get("/cases")
def get_cases():
    return cases


@app.get("/suspects")
def get_suspects():
    return suspects