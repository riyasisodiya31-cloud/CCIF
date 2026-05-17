from fastapi import FastAPI

from app.routes import cases,suspects

app = FastAPI(
    title="CCIF API",
    description="Cognitive Criminal Intelligence Fabric"
)

@app.get("/")
def home():
    return {
        "message":"CCIF Backend Running"
    }

app.include_router(
    cases.router,
    prefix="/cases",
    tags=["Cases"]
)

app.include_router(
    suspects.router,
    prefix="/suspects",
    tags=["Suspects"]
)