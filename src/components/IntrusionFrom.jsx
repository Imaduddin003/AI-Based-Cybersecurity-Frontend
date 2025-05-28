import React, { useState } from 'react';
import axios from 'axios';
import { inputClass, buttonClass, cardClass, headingClass, resultText } from '../styles/tw';

function IntrusionFrom() {
  const [features, setFeatures] = useState(Array(43).fill(0));
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const updated = [...features];
    updated[index] = parseFloat(value);
    setFeatures(updated);
  };

  const fillSampleInput = () => {
    const sample = [
      0.12, 0.03, 1.5, 0, 0, 2.1, 0.4, 0, 1, 0.8,
      3.2, 1.1, 0, 0, 0, 0, 2.7, 0, 1, 0,
      0.6, 0.5, 0, 0.1, 0, 1, 0, 0.3, 0.2, 0.9,
      1.4, 0, 0, 0.05, 0.07, 0, 1, 0, 0.2, 0.4,
      1.8, 0.6, 0
    ];
    setFeatures(sample);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/intrusion/predict_intrusion", {
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
      <h2 className={headingClass}>Intrusion Detection</h2>
      <p className="text-gray-500 mb-4">
        Enter network activity features to detect potential intrusions.
      </p>

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
            <span className="text-red-600">Threat Detected</span>
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

export default IntrusionFrom;