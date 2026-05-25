from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import alerts, cases, copilot, dashboard, evidence, graph, suspects

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
app.include_router(
    evidence.router,
    prefix="/evidence",
    tags=["Evidence"]
)
app.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["Dashboard"]
)
app.include_router(
    graph.router,
    prefix="/graph",
    tags=["Graph"]
)
app.include_router(
    copilot.router,
    prefix="/copilot",
    tags=["Copilot"]
)