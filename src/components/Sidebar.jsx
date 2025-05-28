import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 flex flex-col p-6 shadow-lg">
      <h2 className="text-sm font-semibold leading-tight text-white">
  AI-BASED CYBERSECURITY THREAT DETECTION AND PREVENTION SYSTEM
</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
        <Link to="/" className="hover:text-blue-400">Intrusion</Link>
        <Link to="/malware" className="hover:text-blue-400">Malware</Link>
        <Link to="/anomaly" className="hover:text-blue-400">Anomaly</Link>
        <Link to="/phishing" className="hover:text-blue-400">Phishing</Link>
      </nav>
    </div>
  );
}

export default Sidebar;