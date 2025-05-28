import React from "react";

function ThreatAlertCard({ type, message, time }) {
  const colorMap = {
    intrusion: "bg-red-100 text-red-700",
    malware: "bg-yellow-100 text-yellow-700",
    anomaly: "bg-blue-100 text-blue-700",
    phishing: "bg-green-100 text-green-700",
  };

  return (
    <div className={'p-4 rounded shadow ${colorMap[type]} border-l-4'}>
      <h3 className="font-semibold capitalize">{type} Alert</h3>
      <p className="text-sm">{message}</p>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
}

export default ThreatAlertCard;