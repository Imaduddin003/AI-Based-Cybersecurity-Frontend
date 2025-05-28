import React, { useState } from 'react';
import axios from 'axios';
import { inputClass, buttonClass, cardClass, headingClass, resultText } from '../styles/tw';

function AnomalyFrom() {
  const [features, setFeatures] = useState(Array(20).fill(0));
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const updated = [...features];
    updated[index] = parseFloat(value);
    setFeatures(updated);
  };

  const fillSampleInput = () => {
    const sample = [
      0.1, 0.2, 0.3, 0, 1, 0.5, 0.6, 0.1, 0.2, 0.3,
      0, 1, 0.5, 0.6, 0.7, 0.3, 0.2, 0.1, 0, 1,
    ];
    setFeatures(sample);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/anomaly/predict_anomaly", {
        features,
      });
      setResult(response.data.prediction);
    } catch (error) {
      console.error("Error:", error);
      setResult("Error: Unable to get prediction.");
    }
  };

  return (
    <div className={cardClass}>
      <h2 className={headingClass}>Anomaly Detection</h2>
      <p className="text-gray-500 mb-4">Enter system behavior features to detect anomalies.</p>

      <div className="flex gap-4 mb-4">
        <button 
          onClick={fillSampleInput} 
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Fill Sample Input
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {features.map((val, index) => (
          <input
            key={index}
            type="number"
            placeholder={'Feature ${index + 1}'}
            value={val}
            onChange={(e) => handleChange(index, e.target.value)}
            className={inputClass}
          />
        ))}
        <button type="submit" className={'col-span-full mt-4 ${buttonClass}'}>
          Predict
        </button>
      </form>

      {result !== null && (
        <div className={'${resultText} mt-6'}>
          Prediction Result:{" "}
          {result === 1 ? (
            <span className="text-red-600">Anomaly Detected</span>
          ) : result === 0 ? (
            <span className="text-green-600">Normal</span>
          ) : (
            <span className="text-yellow-600">{result}</span>
          )}
        </div>
      )}
    </div>
  );
}

export default AnomalyFrom;