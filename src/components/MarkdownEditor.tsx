'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiCopy } from 'react-icons/fi';

export default function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 3000);
  };

  return (
    <div className="flex flex-col w-full p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Markdown Editor</h2>
      <div className="mb-6 p-5 border border-gray-200 rounded-xl bg-gradient-to-br from-white to-gray-100 shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
          📝 Markdown Cheat Sheet
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p className="font-medium">Headings</p>
            <p><code>#</code> H1, <code>##</code> H2, <code>###</code> H3</p>
          </div>
          <div>
            <p className="font-medium">Text Styles</p>
            <p><code>**bold**</code>, <code>*italic*</code>, <code>~~strikethrough~~</code></p>
          </div>
          <div>
            <p className="font-medium">Links</p>
            <p><code>[Text](http://example.com)</code></p>
          </div>
          <div>
            <p className="font-medium">Inline & Block Code</p>
            <p><code>`inline`</code>, <code>```block```</code></p>
          </div>
          <div>
            <p className="font-medium">Lists</p>
            <p><code>* item</code> or <code>- item</code></p>
          </div>
          <div>
            <p className="font-medium">Blockquotes</p>
            <p><code>&gt; quote</code></p>
          </div>
          <div>
            <p className="font-medium">Images</p>
            <p><code>![alt](image.jpg)</code></p>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-row gap-4 overflow-hidden items-start justify-center">
        {/* Markdown Input */}
        <div className="relative w-full flex-1 max-w-[50%]">
          <textarea
            className="w-full border border-gray-300 rounded-md p-4 overflow-hidden min-w-0 min-h-[50vh]"
            placeholder="Type your markdown here..."
            value={markdownText}
            onChange={(e) => {
              setMarkdownText(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            style={{ height: 'auto' }}
          />
          <button
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800"
            onClick={handleCopy}
            title="Copy Markdown"
          >
            <FiCopy size={20} />
          </button>
        </div>
        {/* Rendered Markdown Output */}
        <div className="w-full flex-1 max-w-[50%] border border-gray-300 rounded-md p-4 overflow-auto min-w-0 bg-white relative min-h-[50vh]">
          <div className="max-w-full prose prose-lg markdown-content w-full">
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