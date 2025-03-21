'use client';

import { useState } from 'react';
export default function ImageBase64Tool() {
  const [mode, setMode] = useState<'imageToBase64' | 'base64ToImage'>('imageToBase64');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [base64, setBase64] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [copied, setCopied] = useState(false);
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide snackbar after 2 sec
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
    <div className="flex flex-col items-center w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg relative">
      <h2 className="text-2xl font-bold mb-4">Image Base64 Converter</h2>

      {/* Mode Switcher */}
      <div className="flex w-full justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-md text-white font-semibold transition-all duration-300 ${
            mode === 'imageToBase64' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
          onClick={() => {
            setMode('imageToBase64');
            setBase64(null);
            setDecodedImage(null);
          }}
        >
          Image to Base64
        </button>
        <button
          className={`px-4 py-2 rounded-r-md text-white font-semibold transition-all duration-300 ${
            mode === 'base64ToImage' ? 'bg-blue-600' : 'bg-gray-400 hover:bg-gray-500'
          }`}
          onClick={() => {
            setMode('base64ToImage');
            setImageFile(null);
            setBase64(null);
          }}
        >
          Base64 to Image
        </button>
      </div>

      {mode === 'imageToBase64' ? (
        <>
          {/* Drag & Drop Area */}
          <div
            className={`w-full h-40 border-2 border-dashed ${
              dragOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
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
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
          />
          <label
            htmlFor="fileInput"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600 transition-all"
          >
            Choose Image
          </label>

          {/* File Info */}
          {imageFile && (
            <div className="mt-4 text-center">
              <p className="text-gray-600">File Type: {imageFile.type}</p>
              <p className="text-gray-600">Size: {(imageFile.size / 1024).toFixed(2)} KB</p>
            </div>
          )}

          {/* Base64 Output */}
          {base64 && (
            <textarea
              className="w-full h-32 p-2 border rounded-md bg-gray-100 mt-4 cursor-pointer"
              readOnly
              value={base64}
              onClick={copyToClipboard}
            />
          )}
        </>
      ) : (
        <>
          {/* Base64 Input */}
          <textarea
            className="w-full h-32 p-2 border rounded-md bg-gray-100 mt-4"
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

      {/* Snackbar Notification */}
      {copied && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
          ✅ Copied to clipboard!
        </div>
      )}
    </div>
  );
}
