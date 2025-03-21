'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-2rem)] p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Markdown Editor</h2>
      <div className="flex flex-1 flex-row gap-4 overflow-hidden items-center justify-center">
        {/* Markdown Input */}
        <textarea
          className="w-full flex-1 h-full max-w-[40%] border border-gray-300 rounded-md p-4 resize-none overflow-auto min-w-0"
          placeholder="Type your markdown here..."
          value={markdownText}
          onChange={(e) => setMarkdownText(e.target.value)}
        />

        {/* Copy Button */}
        <div className="flex justify-center items-center">
          <button
            className="px-4 py-2 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleCopy}
          >
            Copy Markdown
          </button>
        </div>

        {/* Rendered Markdown Output */}
        <div className="w-full flex-1 h-full max-w-[40%] border border-gray-300 rounded-md p-4 overflow-auto min-w-0 bg-white relative">
          <div className="max-w-full prose prose-lg markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
          </div>
          {showSnackbar && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
              ✅ Markdown copied successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}