'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <Card className="flex flex-col items-center w-full max-w-2xl p-6">
      <CardHeader className="w-full">
        <CardTitle className="text-2xl font-bold text-center whitespace-nowrap">Time Converter</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {/* Real-time timestamp */}
        <Card className="w-full text-center mb-4 p-3">
          <p className="text-gray-700 font-bold">📅 Current Time: {currentTime.toLocaleString()}</p>
          <p className="text-gray-700 font-bold">⏳ Epoch Time: {Math.floor(currentTime.getTime() / 1000)}</p>
        </Card>

        {/* Input for Epoch Time */}
        <div className="w-full">
          <Label htmlFor="epoch-input" className="block text-gray-700 font-bold">Enter Unix Timestamp:</Label>
          <Input
            id="epoch-input"
            type="text"
            value={epochInput}
            onChange={handleEpochChange}
            className="w-full mt-2"
            placeholder="Example: 1742528497..."
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Display Human-Readable Time */}
        {humanReadableTime && (
          <Card className="w-full mt-4 p-3 text-center">
            <pre className="text-gray-700 whitespace-pre-line">{humanReadableTime}</pre>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}