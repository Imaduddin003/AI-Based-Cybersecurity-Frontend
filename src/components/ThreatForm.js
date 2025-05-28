import React from 'react';

function ThreatForm() {
  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-lg font-semibold mb-4">Enter Threat Features</h2>
      <input
        type="text"
        placeholder="Comma-separated features e.g. 0.1,0.2,0.3..."
        className="w-full border px-3 py-2 mb-4"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Predict</button>
    </div>
  );
}

export default ThreatForm;