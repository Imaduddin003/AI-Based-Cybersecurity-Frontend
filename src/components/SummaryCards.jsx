import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShieldAlert, Bug, Activity, MailWarning } from "lucide-react";

const cardStyle = "flex items-center gap-4 p-4 rounded shadow bg-white";

function SummaryCards() {
  const [data, setData] = useState({
    intrusion: 0,
    malware: 0,
    anomaly: 0,
    phishing: 0,
  });

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dashboard/summary")
      .then(res => setData(res.data))
      .catch(err => console.error("Failed to load summary", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className={cardStyle}>
        <ShieldAlert className="text-red-600" />
        <div>
          <p className="text-gray-600">Intrusions</p>
          <h2 className="text-2xl font-bold">{data.intrusion}</h2>
        </div>
      </div>
      <div className={cardStyle}>
        <Bug className="text-yellow-500" />
        <div>
          <p className="text-gray-600">Malware</p>
          <h2 className="text-2xl font-bold">{data.malware}</h2>
        </div>
      </div>
      <div className={cardStyle}>
        <Activity className="text-blue-500" />
        <div>
          <p className="text-gray-600">Anomalies</p>
          <h2 className="text-2xl font-bold">{data.anomaly}</h2>
        </div>
      </div>
      <div className={cardStyle}>
        <MailWarning className="text-green-600" />
        <div>
          <p className="text-gray-600">Phishing</p>
          <h2 className="text-2xl font-bold">{data.phishing}</h2>
        </div>
      </div>
    </div>
  );
}

export default SummaryCards;