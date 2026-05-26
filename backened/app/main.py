from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import alerts, cases, copilot, crimes, dashboard, evidence, graph, officers, suspects

ROUTERS = (
    (cases.router, "/cases", ["Cases"]),
    (suspects.router, "/suspects", ["Suspects"]),
    (alerts.router, "/alerts", ["Alerts"]),
    (evidence.router, "/evidence", ["Evidence"]),
    (dashboard.router, "/dashboard", ["Dashboard"]),
    (graph.router, "/graph", ["Graph"]),
    (copilot.router, "/copilot", ["Copilot"]),
    (crimes.router, "/crimes", ["Crimes"]),
    (officers.router, "/officers", ["Officers"]),
)

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

@app.get("/api")
def api_home():
    return home()


for router, prefix, tags in ROUTERS:
    app.include_router(router, prefix=prefix, tags=tags)
    app.include_router(router, prefix=f"/api{prefix}", tags=tags)
