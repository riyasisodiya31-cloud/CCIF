from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import alerts, cases, copilot, crimes, dashboard, evidence, graph, officers, suspects

app = FastAPI(
    title="CCIF API",
    description="Cognitive Criminal Intelligence Fabric"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
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
app.include_router(
    crimes.router,
    prefix="/crimes",
    tags=["Crimes"]
)
app.include_router(
    officers.router,
    prefix="/officers",
    tags=["Officers"]
)
