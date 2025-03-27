'use client';

import Image from 'next/image';
import { useState } from 'react';
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
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold">Welcome to Quick Tools!</h2>
            <p className="mt-4">Select a tool from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-108 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6 flex flex-col items-center shadow-lg border-r border-gray-900 shadow-md">
        {/* Author Profile Section */}
        <div className="flex flex-col items-center text-center">
          {/* Avatar Container */}
          <div className="relative w-24 h-24 rounded-xl flex items-center justify-center">
            <div className="cursor-pointer" onClick={() => setSelectedTool('')}>
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/avatar.jpeg`}
                alt="Lê Hải Triều"
                width={120}
                height={120}
                className="rounded-full"
              />
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
          <span className="bg-gray-700 text-gray-300 text-sm px-3 py-1 rounded-lg mt-1">
            Android Developer
          </span>

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
 
          <ul className="space-y-2 mt-3">
            <li
              className={`w-full text-left ml-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                selectedTool === 'json' 
                  ? 'bg-gray-700 shadow-md scale-[1.02]' 
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setSelectedTool('json')}
            >
              JSON Formatter
            </li>
            <li
              className={`w-full text-left ml-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                selectedTool === 'markdown' 
                  ? 'bg-gray-700 shadow-md scale-[1.02]' 
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setSelectedTool('markdown')}
            >
              Markdown Editor
            </li>
            <li
              className={`w-full text-left ml-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                selectedTool === 'plantuml' 
                  ? 'bg-gray-700 shadow-md scale-[1.02]' 
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setSelectedTool('plantuml')}
            >
              PlantUML Visualizer
            </li>
            <li
              className={`w-full text-left ml-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                selectedTool === 'base64' 
                  ? 'bg-gray-700 shadow-md scale-[1.02]' 
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setSelectedTool('base64')}
            >
              Base64 Decoder & Encoder
            </li>
            <li
              className={`w-full text-left ml-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                selectedTool === 'image-base64' 
                  ? 'bg-gray-700 shadow-md scale-[1.02]' 
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setSelectedTool('image-base64')}
            >
              Image to Base64 & Base64 to Image
            </li>
            <li
              className={`w-full text-left ml-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                selectedTool === 'color' 
                  ? 'bg-gray-700 shadow-md scale-[1.02]' 
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setSelectedTool('color')}
            >
              Color Converter
            </li>
            <li
              className={`w-full text-left ml-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                selectedTool === 'time' 
                  ? 'bg-gray-700 shadow-md scale-[1.02]' 
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setSelectedTool('time')}
            >
              Time Converter
            </li>
            <li
              className={`w-full text-left ml-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                selectedTool === 'android-assets' 
                  ? 'bg-gray-700 shadow-md scale-[1.02]' 
                  : 'hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setSelectedTool('android-assets')}
            >
              Android Asset Generator
            </li>
            {/* Resources Section */}
            <div className="mt-10 text-left text-gray-300 font-bold text-sm uppercase tracking-wide">
              Resources
            </div>
            
            <ul className="space-y-2 mt-3">
              <li
                className={`w-full text-left ml-3 px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                  selectedTool === 'vim' 
                    ? 'bg-gray-700 shadow-md scale-[1.02]' 
                    : 'hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setSelectedTool('vim')}
              >
                Vim Cheat Sheet
              </li>
            </ul>
            <div className="mt-6 w-full">
              <hr className="border-gray-600 my-4" />
              <li
                className={`w-full text-center px-2 py-2 text-sm rounded-lg cursor-pointer transition-transform duration-300 whitespace-nowrap transform ${
                  selectedTool === 'about' 
                    ? 'bg-gray-700 shadow-md scale-[1.02]' 
                    : 'hover:bg-gray-700 hover:text-white'
                }`}
                onClick={() => setSelectedTool('about')}
              >
                #About me
              </li>
            </div>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="animate-fade-in flex-grow min-w-240 bg-gray-50 p-8 flex items-center justify-center w-full">
        {renderContent()}
      </main>
    </div>
  );
}
