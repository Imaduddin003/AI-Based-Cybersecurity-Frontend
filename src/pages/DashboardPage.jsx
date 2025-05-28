import React, { useState, useEffect } from "react";
import axios from "axios";
import { Download, AlertCircle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function DashboardPage() {
  const [stats, setStats] = useState({
    intrusion: 0,
    malware: 0,
    anomaly: 0,
    phishing: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch threat summary
    axios
      .get("http://127.0.0.1:8000/dashboard/summary")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Summary fetch error:", err));

    // Fetch chart data
    axios
      .get("http://127.0.0.1:8000/dashboard/chart-data")
      .then((res) => setChartData(res.data))
      .catch((err) => console.error("Chart data fetch failed:", err));
  }, []);

  const handleDownload = async (type) => {
    const url = 'http://127.0.0.1:8000/export/download-${type}';
    try {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], {
        type: type === "csv" ? "text/csv" : "application/json",
      });
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = 'cyber_data.${type}';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      alert("Download failed.");
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">AI Cybersecurity Dashboard</h1>
        <p className="text-gray-600">Real-time overview of threats detected by the system</p>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => handleDownload("json")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          <Download size={18} /> Download JSON
        </button>
        <button
          onClick={() => handleDownload("csv")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
        >
          <Download size={18} /> Download CSV
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold text-gray-700">Intrusions</h2>
          <p className="text-2xl text-red-500 font-bold">{stats.intrusion}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold text-gray-700">Malware</h2>
          <p className="text-2xl text-yellow-500 font-bold">{stats.malware}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold text-gray-700">Anomalies</h2>
          <p className="text-2xl text-blue-500 font-bold">{stats.anomaly}</p>
        </div>
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold text-gray-700">Phishing</h2>
          <p className="text-2xl text-green-500 font-bold">{stats.phishing}</p>
        </div>
      </div>

      {/* Alerts */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Threat Alerts</h2>
        <div className="space-y-2">
          <div className="bg-white shadow p-4 rounded flex items-center gap-4">
            <AlertCircle className="text-red-500" />
            <div>
              <p className="font-semibold">Intrusion Alert</p>
              <p className="text-sm text-gray-500">Suspicious login pattern detected.</p>
              <p className="text-xs text-gray-400">Just now</p>
            </div>
          </div>
          <div className="bg-white shadow p-4 rounded flex items-center gap-4">
            <AlertCircle className="text-yellow-500" />
            <div>
              <p className="font-semibold">Malware Alert</p>
              <p className="text-sm text-gray-500">Malware signature matched.</p>
              <p className="text-xs text-gray-400">5 min ago</p>
            </div>
          </div>
          <div className="bg-white shadow p-4 rounded flex items-center gap-4">
            <AlertCircle className="text-blue-500" />
            <div>
              <p className="font-semibold">Anomaly Alert</p>
              <p className="text-sm text-gray-500">Unusual data flow to unknown IP.</p>
              <p className="text-xs text-gray-400">10 min ago</p>
            </div>
          </div>
          <div className="bg-white shadow p-4 rounded flex items-center gap-4">
            <AlertCircle className="text-green-500" />
            <div>
              <p className="font-semibold">Phishing Alert</p>
              <p className="text-sm text-gray-500">Fake email detected and blocked.</p>
              <p className="text-xs text-gray-400">15 min ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Line Chart */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Intrusion & Malware Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="intrusion" stroke="#ef4444" name="Intrusion" />
            <Line type="monotone" dataKey="malware" stroke="#facc15" name="Malware" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardPage;