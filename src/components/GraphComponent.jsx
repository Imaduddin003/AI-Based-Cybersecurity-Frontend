import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { day: "Mon", intrusion: 2, malware: 1, anomaly: 3, phishing: 0 },
  { day: "Tue", intrusion: 1, malware: 2, anomaly: 1, phishing: 0 },
  { day: "Wed", intrusion: 3, malware: 1, anomaly: 0, phishing: 1 },
  { day: "Thu", intrusion: 2, malware: 0, anomaly: 2, phishing: 0 },
  { day: "Fri", intrusion: 0, malware: 1, anomaly: 1, phishing: 1 },
  { day: "Sat", intrusion: 4, malware: 2, anomaly: 2, phishing: 0 },
  { day: "Sun", intrusion: 1, malware: 0, anomaly: 3, phishing: 1 },
];

function GraphComponent() {
  return (
    <div className="bg-white rounded shadow p-4 mt-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Threat Trends (Last 7 Days)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sampleData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="intrusion" stroke="#ef4444" />
          <Line type="monotone" dataKey="malware" stroke="#f59e0b" />
          <Line type="monotone" dataKey="anomaly" stroke="#3b82f6" />
          <Line type="monotone" dataKey="phishing" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraphComponent;