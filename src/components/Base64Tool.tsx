'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
    <Card className="flex flex-col w-full items-center p-6">
      <CardHeader className="w-full">
        <CardTitle className="text-2xl font-bold text-center whitespace-nowrap">Base64 Encoder & Decoder</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {/* Toggle Encode/Decode Mode */}
        <div className="flex w-full justify-center mb-4">
          <Button
            variant={mode === 'encode' ? 'default' : 'outline'}
            onClick={() => {
              setMode('encode');
              setOutput('');
            }}
            className="rounded-r-none"
          >
            Encode
          </Button>
          <Button
            variant={mode === 'decode' ? 'default' : 'outline'}
            onClick={() => {
              setMode('decode');
              setOutput('');
            }}
            className="rounded-l-none"
          >
            Decode
          </Button>
        </div>

        {/* Input and Output Fields with Convert Button in the Middle */}
        <div className="flex w-full gap-4">
          {/* Input Text Area */}
          <Textarea
            placeholder="Enter text here..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            className="min-h-[50vh]"
          />

          {/* Convert Button in the Middle */}
          <div className="flex flex-col justify-center">
            <Button
              onClick={handleConvert}
            >
              {mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}
            </Button>
          </div>

          {/* Output Text Area */}
          <Textarea
            readOnly
            value={output}
            className="min-h-[50vh]"
          />
        </div>
      </CardContent>
    </Card>
  );
}