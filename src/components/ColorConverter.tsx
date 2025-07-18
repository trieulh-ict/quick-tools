'use client';

import { useState, useEffect } from 'react';
import { BsEyedropper } from 'react-icons/bs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

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
    toast("Copied to clipboard: " + hex);
  };

  return (
    <Card className="flex flex-col items-center w-full max-w-2xl p-6">
      <CardHeader className="w-full">
        <CardTitle className="text-2xl font-bold text-center whitespace-nowrap">Color Converter</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {/* Switcher */}
        <div className="flex w-full justify-center mb-4">
          <Button
            variant={mode === 'argb' ? 'default' : 'outline'}
            onClick={() => setMode('argb')}
            className="rounded-r-none"
          >
            ARGB to HEX
          </Button>
          <Button
            variant={mode === 'hex' ? 'default' : 'outline'}
            onClick={() => setMode('hex')}
            className="rounded-l-none"
          >
            HEX to ARGB
          </Button>
        </div>

        <div className="relative w-full flex flex-col items-center">
          {/* ARGB to HEX Mode */}
          {mode === 'argb' ? (
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 items-center justify-center w-full">
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={alpha}
                  onChange={(e) => setAlpha(Math.min(255, Math.max(0, Number(e.target.value.replace(/^0+(?=\d)/, '')) || 0)))}
                  placeholder="A"
                  className="w-16 text-center"
                />
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={red}
                  onChange={(e) => setRed(Math.min(255, Math.max(0, Number(e.target.value.replace(/^0+(?=\d)/, '')) || 0)))}
                  placeholder="R"
                  className="w-16 text-center"
                />
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={green}
                  onChange={(e) => setGreen(Math.min(255, Math.max(0, Number(e.target.value.replace(/^0+(?=\d)/, '')) || 0)))}
                  placeholder="G"
                  className="w-16 text-center"
                />
                <Input
                  type="number"
                  min="0"
                  max="255"
                  value={blue}
                  onChange={(e) => setBlue(Math.min(255, Math.max(0, Number(e.target.value.replace(/^0+(?=\d)/, '')) || 0)))}
                  placeholder="B"
                  className="w-16 text-center"
                />
                {/* Color Preview (Updates live) */}
                <div
                  className="w-12 h-12 rounded-md border"
                  style={{ backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha / 255})` }}
                ></div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.triggerEyedropper?.()}
                  title="Pick color from screen"
                >
                  <BsEyedropper size={20} />
                </Button>
              </div>
              <Input
                type="text"
                readOnly
                value={hex}
                className="w-full text-center cursor-pointer"
                onClick={copyToClipboard}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              <Input
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
                className="w-full text-center"
                placeholder="#RRGGBB or #AARRGGBB"
              />
              <div className="flex gap-2 items-center justify-center">
                <span className="text-gray-600">A: {alpha}</span>
                <span className="text-gray-600">R: {red}</span>
                <span className="text-gray-600">G: {green}</span>
                <span className="text-gray-600">B: {blue}</span>
                {/* Color Preview */}
                <div className="w-12 h-12 rounded-md border" style={{ backgroundColor: `rgba(${red}, ${green}, ${blue}, ${alpha / 255})` }}></div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.triggerEyedropper?.()}
                  title="Pick color from screen"
                >
                  <BsEyedropper size={20} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}