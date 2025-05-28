import React from 'react';
import ThreatForm from '../components/ThreatForm';
import PredictionResult from '../components/PredictionResult';

function Home() {
  return (
    <div className="p-6">
      <ThreatForm />
      <PredictionResult />
    </div>
  );
}

export default Home;