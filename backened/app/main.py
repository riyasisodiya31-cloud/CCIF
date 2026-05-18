from fastapi import FastAPI
from app.routes import alerts
from fastapi.middleware.cors import CORSMiddleware

from app.routes import cases, suspects

app = FastAPI(
    title="CCIF API",
    description="Cognitive Criminal Intelligence Fabric"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
app.include_router(
    alerts.router,
    prefix="/alerts",
    tags=["Alerts"]
)