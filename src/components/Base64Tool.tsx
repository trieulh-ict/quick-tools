'use client';

import { useState } from 'react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch {
      setOutput('❌ Invalid input for Base64 decoding.');
    }
  };

  return (
    <div className="flex flex-col w-full items-center bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Base64 Encoder & Decoder</h2>

      {/* Toggle Encode/Decode Mode */}
      <div className="flex w-full justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-md text-white font-semibold transition-all duration-300 ${
            mode === 'encode' ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'
          }`}
          onClick={() => {
            setMode('encode');
            setOutput('');
          }}
        >
          Encode
        </button>
        <button
          className={`px-4 py-2 rounded-r-md text-white font-semibold transition-all duration-300 ${
            mode === 'decode' ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'
          }`}
          onClick={() => {
            setMode('decode');
            setOutput('');
          }}
        >
          Decode
        </button>
      </div>

      {/* Input and Output Fields with Convert Button in the Middle */}
      <div className="flex w-full gap-4">
        {/* Input Text Area */}
        <textarea
          className="w-full min-h-[50vh] p-3 border rounded-md bg-gray-50 shadow-inner overflow-hidden"
          placeholder="Enter text here..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          style={{ height: 'auto' }}
        />

        {/* Convert Button in the Middle */}
        <div className="flex flex-col justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow-md transition-all"
            onClick={handleConvert}
          >
            {mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}
          </button>
        </div>

        {/* Output Text Area */}
        <textarea
          className="w-full min-h-[50vh] p-3 border rounded-md bg-gray-100 shadow-inner overflow-hidden"
          readOnly
          value={output}
          style={{ height: 'auto' }}
          onChange={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
        />
      </div>
    </div>
  );
}
