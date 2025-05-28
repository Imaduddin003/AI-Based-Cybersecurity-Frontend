from app.routers import intrusion, malware, anomaly, phishing, dashboard

# Add this:
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])