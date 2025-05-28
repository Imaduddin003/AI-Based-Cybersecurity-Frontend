from fastapi import APIRouter

router = APIRouter()

@router.get("/summary")
def get_summary():
    return {
        "intrusion": 3,
        "malware": 1,
        "anomaly": 4,
        "phishing": 0
    }