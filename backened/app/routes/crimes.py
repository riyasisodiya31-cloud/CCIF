from fastapi import APIRouter

router = APIRouter()

CRIME_CATEGORIES = [
    {
        "id": "cargo-theft",
        "name": "Port / Cargo Theft",
        "crimeCode": "PT",
        "assignedUnit": "Port Intelligence Unit",
        "priorityLevel": "Critical",
        "description": "Container diversion, cargo manifests, dock access abuse, and logistics theft patterns.",
    },
    {
        "id": "financial-fraud",
        "name": "Financial Fraud & Card Skimming",
        "crimeCode": "FT",
        "assignedUnit": "Cyber Crime Unit",
        "priorityLevel": "High",
        "description": "Card skimming, synthetic identities, transaction laundering, and bank fraud clusters.",
    },
    {
        "id": "burglary-serial-theft",
        "name": "Burglary / Serial Theft",
        "crimeCode": "BG",
        "assignedUnit": "Theft Investigation Unit",
        "priorityLevel": "High",
        "description": "Residential break-ins, serial theft signatures, staged entry, and repeat target corridors.",
    },
    {
        "id": "vehicle-theft",
        "name": "Vehicle Theft Networks",
        "crimeCode": "VT",
        "assignedUnit": "Auto Crime Cell",
        "priorityLevel": "Elevated",
        "description": "Vehicle stripping rings, ignition tampering, altered plates, and recovery route analysis.",
    },
    {
        "id": "smuggling-trafficking",
        "name": "Smuggling & Illegal Trafficking",
        "crimeCode": "SM",
        "assignedUnit": "Port Intelligence Unit",
        "priorityLevel": "Critical",
        "description": "Illegal goods movement, convoy anomalies, forged permits, and interdiction intelligence.",
    },
    {
        "id": "organized-crime",
        "name": "Organized Crime Syndicates",
        "crimeCode": "OC",
        "assignedUnit": "Criminal Intelligence Division",
        "priorityLevel": "Critical",
        "description": "Syndicate structures, extortion, corruption links, recruitment, and multi-case command patterns.",
    },
]


@router.get("/")
def get_crimes():
    return CRIME_CATEGORIES
