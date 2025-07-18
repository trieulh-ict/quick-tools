'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ImageBase64Tool() {
  const [mode, setMode] = useState<'imageToBase64' | 'base64ToImage'>('imageToBase64');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [decodedImage, setDecodedImage] = useState<string | null>(null);


  // Handle file selection
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setBase64(reader.result as string);
  };

  // Handle drag & drop
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    if (event.dataTransfer.files.length > 0) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  };

  // Copy Base64 to clipboard
  const copyToClipboard = () => {
    if (base64) {
      navigator.clipboard.writeText(base64);
      toast("Copied to clipboard!", { description: "Base64 string copied." });
    }
  };

  // Decode Base64 to Image
  const handleBase64Input = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBase64(e.target.value);
    try {
      setDecodedImage(e.target.value);
    } catch {
      setDecodedImage(null);
    }
  };

  return (
    <Card className="flex flex-col items-center w-full max-w-2xl p-6 relative">
      <CardHeader className="w-full">
        <CardTitle className="text-2xl font-bold text-center whitespace-nowrap">Image Base64 Converter</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        {/* Mode Switcher */}
        <div className="flex w-full justify-center mb-4">
          <Button
            variant={mode === 'imageToBase64' ? 'default' : 'outline'}
            onClick={() => {
              setMode('imageToBase64');
              setBase64(null);
              setDecodedImage(null);
            }}
            className="rounded-r-none"
          >
            Image to Base64
          </Button>
          <Button
            variant={mode === 'base64ToImage' ? 'default' : 'outline'}
            onClick={() => {
              setMode('base64ToImage');
              setImageFile(null);
              setBase64(null);
            }}
            className="rounded-l-none"
          >
            Base64 to Image
          </Button>
        </div>

        {mode === 'imageToBase64' ? (
          <>
            {/* Drag & Drop Area */}
            <div
              className={`w-full h-40 border-2 border-dashed ${dragOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                } rounded-md flex items-center justify-center text-gray-600 cursor-pointer`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {imageFile ? (
                <p className="text-center">✔ {imageFile.name}</p>
              ) : (
                <p>Drag & Drop an image here or click to upload</p>
              )}
            </div>

            {/* File Input */}
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="fileInput"
              onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
            />
            <Label
              htmlFor="fileInput"
              className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 cursor-pointer"
            >
              Choose Image
            </Label>

            {/* File Info */}
            {imageFile && (
              <div className="mt-4 text-center">
                <p className="text-gray-600">File Type: {imageFile.type}</p>
                <p className="text-gray-600">Size: {(imageFile.size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            {/* Base64 Output */}
            {base64 && (
              <Textarea
                className="w-full h-32 mt-4 cursor-pointer"
                readOnly
                value={base64}
                onClick={copyToClipboard}
              />
            )}
          </>
        ) : (
          <>
            {/* Base64 Input */}
            <Textarea
              className="w-full h-32 mt-4"
              placeholder="Paste Base64 string here..."
              value={base64 || ''}
              onChange={handleBase64Input}
            />

            {/* Decoded Image Preview */}
            {decodedImage && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-gray-600">Decoded Image:</p>
                {/* Using regular img tag for base64 images because Next.js Image component 
                    doesn't natively support data URLs (base64). For this specific use case, 
                    the optimization benefits of next/image don't apply since we're working 
                    with dynamically generated content from user input. */}
                <img
                  src={decodedImage}
                  alt="Decoded"
                  className="mt-2 border rounded-md max-w-full w-full h-auto"
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}