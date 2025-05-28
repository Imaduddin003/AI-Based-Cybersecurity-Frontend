import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import IntrusionPage from "./pages/IntrusionPage";
import MalwarePage from "./pages/MalwarePage";
import AnomalyPage from "./pages/AnomalyPage";
import PhishingPage from "./pages/PhishingPage";
import DashboardPage from "./pages/DashboardPage"; // ✅ Dashboard Page Added

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 p-6 w-full bg-gray-100 min-h-screen">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/" element={<IntrusionPage />} />
            <Route path="/malware" element={<MalwarePage />} />
            <Route path="/anomaly" element={<AnomalyPage />} />
            <Route path="/phishing" element={<PhishingPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;