import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/">Intrusion</Link>
      <Link to="/malware">Malware</Link>
      <Link to="/anomaly">Anomaly</Link>
      <Link to="/phishing">Phishing</Link>
    </nav>
  );
};

export default Navbar;