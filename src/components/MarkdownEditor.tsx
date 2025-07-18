'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiCopy } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function MarkdownEditor() {
  const [markdownText, setMarkdownText] = useState('');
  

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    toast("Markdown copied successfully!", {
      description: "The markdown content has been copied to your clipboard.",
    });
  };

  return (
    <Card className="flex flex-col w-full p-4">
      <CardHeader className="w-full">
        <CardTitle className="text-2xl font-bold text-center whitespace-nowrap">Markdown Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <Card className="mb-6 p-5">
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
              📝 Markdown Cheat Sheet
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
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
          </CardContent>
        </Card>
        <div className="flex flex-1 flex-row gap-4 overflow-hidden items-start justify-center">
          {/* Markdown Input */}
          <div className="relative w-full flex-1 max-w-[50%]">
            <Textarea
              className="w-full min-h-[50vh] overflow-hidden min-w-0"
              placeholder="Type your markdown here..."
              value={markdownText}
              onChange={(e) => {
                setMarkdownText(e.target.value);
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleCopy}
              title="Copy Markdown"
            >
              <FiCopy size={20} />
            </Button>
          </div>
          {/* Rendered Markdown Output */}
          <Card className="w-full flex-1 max-w-[50%] p-4 overflow-auto min-w-0 relative min-h-[50vh]">
            <div className="max-w-full prose prose-lg markdown-content w-full">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownText}</ReactMarkdown>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}