import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

function ThreatChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dashboard/summary")
      .then(res => {
        const summary = res.data;
        const chartData = [
          { name: "Intrusion", value: summary.intrusion },
          { name: "Malware", value: summary.malware },
          { name: "Anomaly", value: summary.anomaly },
          { name: "Phishing", value: summary.phishing },
        ];
        setData(chartData);
      })
      .catch(err => {
        console.error("Error fetching dashboard summary:", err);
      });
  }, []);

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Threat Distribution (Live)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThreatChart;