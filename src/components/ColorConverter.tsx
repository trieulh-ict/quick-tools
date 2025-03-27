'use client';

import { useState, useEffect } from 'react';
import { BsEyedropper } from 'react-icons/bs';

interface EyeDropperResult {
  sRGBHex: string;
}

type EyeDropperConstructor = new () => {
  open(): Promise<EyeDropperResult>;
};

declare global {
  interface Window {
    EyeDropper: EyeDropperConstructor;
    triggerEyedropper?: () => Promise<void>;
  }
}

function useEyedropper(onPick: (rgba: { r: number; g: number; b: number }) => void) {
  useEffect(() => {
    async function handlePick() {
      if ('EyeDropper' in window) {
        const eyeDropper = new window.EyeDropper();
        try {
          const result = await eyeDropper.open();
          const rgba = await fetch(`https://www.thecolorapi.com/id?hex=${result.sRGBHex.replace('#', '')}`)
            .then(res => res.json())
            .then(data => data.rgb);

          onPick(rgba);
        } catch (e) {
          console.error('Eyedropper cancelled or failed', e);
        }
      } else {
        alert('EyeDropper API not supported in your browser.');
      }
    }

    window.triggerEyedropper = handlePick;
  }, [onPick]);
}

export default function ColorConverter() {
  const [mode, setMode] = useState<'argb' | 'hex'>('argb');
  const [alpha, setAlpha] = useState(255);
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [hex, setHex] = useState('#000000');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    const hexColor = `#${alpha.toString(16).padStart(2, '0')}${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
    setHex(hexColor.toUpperCase());
  }, [alpha, red, green, blue]);

  useEyedropper((rgba) => {
    setRed(rgba.r);
    setGreen(rgba.g);
    setBlue(rgba.b);
    setAlpha(255);

    if (mode === 'hex') {
      const hexColor = `#${(255).toString(16).padStart(2, '0')}${rgba.r.toString(16).padStart(2, '0')}${rgba.g.toString(16).padStart(2, '0')}${rgba.b.toString(16).padStart(2, '0')}`;
      setHex(hexColor.toUpperCase());
    }
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Hide snackbar after 2 sec
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Color Converter</h2>

      {/* Switcher */}
      <div className="flex w-full justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-md text-white font-semibold transition-all duration-300 ${
            mode === 'argb' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
          onClick={() => setMode('argb')}
        >
          ARGB to HEX
        </button>
        <button
          className={`px-4 py-2 rounded-r-md text-white font-semibold transition-all duration-300 ${
            mode === 'hex' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
          onClick={() => setMode('hex')}
        >
          HEX to ARGB
        </button>
      </div>

      <div className="relative w-full flex flex-col items-center">
        {/* ARGB to HEX Mode */}
        {mode === 'argb' ? (
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 items-center justify-center w-full">
              <input 
                type="number" 
                min="0" 
                max="255" 
                value={alpha} 
                onChange={(e) => setAlpha(Math.min(255, Math.max(0, Number(e.target.value.replace(/^0+(?=\d)/, '')) || 0)))} 
                className="w-16 p-2 border rounded-md text-center" 
                placeholder="A" 
              />
              <input 
                type="number" 
                min="0" 
                max="255" 
                value={red} 
                onChange={(e) => setRed(Math.min(255, Math.max(0, Number(e.target.value.replace(/^0+(?=\d)/, '')) || 0)))} 
                className="w-16 p-2 border rounded-md text-center" 
                placeholder="R" 
              />
              <input 
                type="number" 
                min="0" 
                max="255" 
                value={green} 
                onChange={(e) => setGreen(Math.min(255, Math.max(0, Number(e.target.value.replace(/^0+(?=\d)/, '')) || 0)))} 
                className="w-16 p-2 border rounded-md text-center" 
                placeholder="G" 
              />
              <input 
                type="number" 
                min="0" 
                max="255" 
                value={blue} 
                onChange={(e) => setBlue(Math.min(255, Math.max(0, Number(e.target.value.replace(/^0+(?=\d)/, '')) || 0)))} 
                className="w-16 p-2 border rounded-md text-center" 
                placeholder="B" 
              />
              {/* Color Preview (Updates live) */}
              <div 
                className="w-12 h-12 rounded-md border" 
                style={{ backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha / 255})` }} 
              ></div>
              <button
                className="ml-2 p-2 border rounded-md hover:bg-gray-100"
                onClick={() => window.triggerEyedropper?.()}
                title="Pick color from screen"
              >
                <BsEyedropper size={20} />
              </button>
            </div>
            {/* Removed Convert to HEX button */}
            <input 
              type="text" 
              readOnly 
              value={hex} 
              className="w-full p-2 border rounded-md bg-gray-100 text-center cursor-pointer"
              onClick={copyToClipboard}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <input 
              type="text" 
              value={hex} 
              onChange={(e) => {
                const value = e.target.value.toUpperCase().replace(/[^0-9A-F]/g, '').slice(0, 8); // Allow max 8 characters
                setHex(`#${value}`);

                // If 6 characters are entered, assume A = FF internally
                const argbValue = value.length === 6 ? `FF${value}` : value.padStart(8, '0');
                
                if (argbValue.length === 8) {
                  setAlpha(parseInt(argbValue.slice(0, 2), 16));
                  setRed(parseInt(argbValue.slice(2, 4), 16));
                  setGreen(parseInt(argbValue.slice(4, 6), 16));
                  setBlue(parseInt(argbValue.slice(6, 8), 16));
                }
              }} 
              className="w-full p-2 border rounded-md text-center" 
              placeholder="#RRGGBB or #AARRGGBB" 
            />
            <div className="flex gap-2 items-center justify-center">
              <span className="text-gray-600">A: {alpha}</span>
              <span className="text-gray-600">R: {red}</span>
              <span className="text-gray-600">G: {green}</span>
              <span className="text-gray-600">B: {blue}</span>
              {/* Color Preview */}
              <div className="w-12 h-12 rounded-md border" style={{ backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha / 255})` }}></div>
              <button
                className="ml-2 p-2 border rounded-md hover:bg-gray-100"
                onClick={() => window.triggerEyedropper?.()}
                title="Pick color from screen"
              >
                <BsEyedropper size={20} />
              </button>
            </div>
          </div>
        )}
        {copied && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
            ✅ Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}
