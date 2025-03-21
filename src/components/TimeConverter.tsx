'use client';

import { useState, useEffect } from 'react';

export default function TimeConverter() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [epochInput, setEpochInput] = useState('');
  const [humanReadableTime, setHumanReadableTime] = useState('');
  const [error, setError] = useState('');

  // Update real-time timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert epoch to human-readable time
  const handleEpochChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEpochInput(value);

    const epochNumber = Number(value);
    if (!isNaN(epochNumber) && epochNumber > 0) {
      const date = new Date(epochNumber * 1000);
      if (!isNaN(date.getTime())) {
        setHumanReadableTime(`
          GMT: ${date.toUTCString()}
          Local Time: ${date.toLocaleString()}
        `);
        setError('');
      } else {
        setHumanReadableTime('');
        setError('⚠ Invalid epoch timestamp');
      }
    } else {
      setHumanReadableTime('');
      setError('⚠ Invalid epoch timestamp');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Time Converter</h2>

      {/* Real-time timestamp */}
      <div className="w-full text-center mb-4 p-3 bg-gray-100 rounded-md">
        <p className="text-gray-700 font-bold">📅 Current Time: {currentTime.toLocaleString()}</p>
        <p className="text-gray-700 font-bold">⏳ Epoch Time: {Math.floor(currentTime.getTime() / 1000)}</p>
      </div>

      {/* Input for Epoch Time */}
      <div className="w-full">
        <label className="block text-gray-700 font-bold">Enter Unix Timestamp:</label>
        <input
          type="text"
          value={epochInput}
          onChange={handleEpochChange}
          className="w-full p-2 border rounded-md mt-2"
          placeholder="Example: 1742528497..."
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      {/* Display Human-Readable Time */}
      {humanReadableTime && (
        <div className="w-full mt-4 p-3 bg-gray-100 rounded-md text-center">
          <pre className="text-gray-700 whitespace-pre-line">{humanReadableTime}</pre>
        </div>
      )}
    </div>
  );
}
