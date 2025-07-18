'use client';


import { useState, useEffect } from 'react';
import JsonFormatter from '../components/JsonFormatter';
import MarkdownEditor from '../components/MarkdownEditor';
import AboutMe from '../components/AboutMe';
import Base64Tool from '../components/Base64Tool';
import ImageBase64Tool from '../components/ImageBase64Tool';
import ColorConverter from '../components/ColorConverter';
import TimeConverter from '../components/TimeConverter';
import PlantUMLVisualizer from '../components/PlantUMLVisualizer';
import AndroidAssetGenerator from '../components/AndroidAssetGenerator';
import VimCheatSheet from '../components/VimCheatSheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [selectedTool, setSelectedTool] = useState('');

  const renderContent = () => {
    switch (selectedTool) {
      case 'json':
        return <JsonFormatter />;
      case 'markdown':
        return <MarkdownEditor />;
      case 'base64':
        return <Base64Tool />;
      case 'image-base64':
        return <ImageBase64Tool />;
      case 'color':
        return <ColorConverter />;
      case 'time':
        return <TimeConverter />;
      case 'plantuml':
        return <PlantUMLVisualizer />;
      case 'about':
        return <AboutMe />;
      case 'android-assets':
        return <AndroidAssetGenerator />;
      case 'vim':
        return <VimCheatSheet />;
      default:
        return <QuoteDisplay />;
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <Card className="w-108 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center shadow-lg border-r border-gray-900 shadow-md rounded-none">
        {/* Author Profile Section */}
        <div className="flex flex-col items-center text-center">
          {/* Avatar Container */}
          <div className="relative w-24 h-24 rounded-xl flex items-center justify-center">
            <div className="cursor-pointer" onClick={() => setSelectedTool('')}>
              <Avatar className="w-24 h-24">
                <AvatarImage src={`${process.env.NEXT_PUBLIC_BASE_PATH}/avatar.jpeg`} alt="Lê Hải Triều" />
                <AvatarFallback>LT</AvatarFallback>
              </Avatar>
            </div>
            {/* Online Indicator */}
            <div className="absolute bottom-0 right-0">
              {/* Pulsing Outer Effect */}
              <div className="absolute w-4 h-4 bg-green-500 opacity-75 rounded-full animate-ping"></div>
              {/* Solid Inner Circle */}
              <div className="relative w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
          </div>

          {/* Name & Title */}
          <h1 className="text-xl font-semibold mt-3">Lê Hải Triều</h1>
          <Badge variant="secondary" className="mt-1">
            Android Developer
          </Badge>

          {/* Contact Information */}
          <div className="mt-4 w-full text-left">
            <hr className="border-gray-600 my-4" />
            <div className="flex items-center gap-2 text-gray-300">
              📧
              <a href="mailto:trieulh.bk@gmail.com" className="text-sm truncate hover:underline">
                trieulh.bk@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-300 mt-2">
              📱 <span className="text-sm">+84 79314****</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 mt-2">
              📍 <span className="text-sm">Hanoi, Vietnam</span>
            </div>
          </div>
        </div>

        {/* Navigation / Tools List */}
        <nav className="mt-10 w-full">
          {/* Quick Tools Label */}
          <div className="text-left text-gray-300 font-bold text-sm uppercase tracking-wide">
            Quick Tools
          </div>

          <ScrollArea className="h-[calc(100vh-350px)] pr-4">
            <ul className="space-y-2 mt-3">
              <li>
                <Button
                  variant={selectedTool === 'json' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool('json')}
                >
                  JSON Formatter
                </Button>
              </li>
              <li>
                <Button
                  variant={selectedTool === 'markdown' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool('markdown')}
                >
                  Markdown Editor
                </Button>
              </li>
              <li>
                <Button
                  variant={selectedTool === 'plantuml' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool('plantuml')}
                >
                  PlantUML Visualizer
                </Button>
              </li>
              <li>
                <Button
                  variant={selectedTool === 'base64' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool('base64')}
                >
                  Base64 Decoder & Encoder
                </Button>
              </li>
              <li>
                <Button
                  variant={selectedTool === 'image-base64' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool('image-base64')}
                >
                  Image to Base64 & Base64 to Image
                </Button>
              </li>
              <li>
                <Button
                  variant={selectedTool === 'color' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool('color')}
                >
                  Color Converter
                </Button>
              </li>
              <li>
                <Button
                  variant={selectedTool === 'time' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool('time')}
                >
                  Time Converter
                </Button>
              </li>
              <li>
                <Button
                  variant={selectedTool === 'android-assets' ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedTool('android-assets')}
                >
                  Android Asset Generator
                </Button>
              </li>
              {/* Resources Section */}
              <div className="mt-10 text-left text-gray-300 font-bold text-sm uppercase tracking-wide">
                Resources
              </div>

              <ul className="space-y-2 mt-3">
                <li>
                  <Button
                    variant={selectedTool === 'vim' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setSelectedTool('vim')}
                  >
                    Vim Cheat Sheet
                  </Button>
                </li>
              </ul>
              <div className="mt-6 w-full">
                <hr className="border-gray-600 my-4" />
                <li>
                  <Button
                    variant={selectedTool === 'about' ? 'secondary' : 'ghost'}
                    className="w-full justify-center"
                    onClick={() => setSelectedTool('about')}
                  >
                    #About me
                  </Button>
                </li>
              </div>
            </ul>
          </ScrollArea>
        </nav>
      </Card>

      {/* Main Content Area */}
      <main className="animate-fade-in flex-grow min-w-240 bg-gray-50 p-8 flex items-center justify-center w-full">
        {renderContent()}
      </main>
    </div>
  );
}

function QuoteDisplay() {
  const [quote, setQuote] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://animechan.io/api/v1/quotes/random'))
      .then(res => res.json())
      .then(data => {
        const parsed = JSON.parse(data.contents);
        if (parsed?.status === 'success' && parsed.data?.content) {
          setQuote(parsed.data.content);
        }
      })
      .catch(() => {
        setQuote(null);
      });
  }, []);

  return (
    <Card className="text-center p-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">Welcome to Quick Tools!</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mt-4">Select a tool from the sidebar to get started.</p>
        {quote && <blockquote className="mt-8 px-8 italic text-gray-600">“{quote}”</blockquote>}
      </CardContent>
    </Card>
  );
}