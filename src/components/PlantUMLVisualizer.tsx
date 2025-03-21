'use client';

import { useState, useEffect, useRef } from 'react';
import plantumlEncoder from 'plantuml-encoder';

export default function PlantUMLVisualizer() {
  const [umlCode, setUmlCode] = useState(``);
  const [umlUrl, setUmlUrl] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  // Convert PlantUML to Encoded URL
  const generateUmlImage = (code: string) => {
    try {
      const encoded = plantumlEncoder.encode(code);
      return `https://www.plantuml.com/plantuml/svg/${encoded}`;
    } catch {
      return '';
    }
  };

  // Handle Input Change and Update Image
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = event.target.value;
    setUmlCode(newCode);
    setUmlUrl(generateUmlImage(newCode));
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
    }
  }, [umlCode]);

  return (
    <div className="flex flex-col w-full bg-white p-6 rounded-lg shadow-lg">
      <div className="flex w-full items-center w-full mb-4">
        <h2 className="text-2xl font-bold mr-2">PlantUML Visualizer</h2>
        {/* Help Icon next to title */}
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="bg-gray-300 w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold hover:bg-gray-400 transition-all"
        >
          ?
        </button>
      </div>

      {/* Help Content */}
      {showHelp && (
        <div className="mb-4 p-4 w-full border rounded-md bg-gray-100 text-sm">
          <strong className="text-lg font-semibold">PlantUML Syntax Guide:</strong>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { name: 'Class Diagram', link: 'https://plantuml.com/class-diagram' },
              { name: 'Use Case Diagram', link: 'https://plantuml.com/use-case-diagram' },
              { name: 'Sequence Diagram', link: 'https://plantuml.com/sequence-diagram' },
              { name: 'Activity Diagram', link: 'https://plantuml.com/activity-diagram-beta' },
              { name: 'State Diagram', link: 'https://plantuml.com/state-diagram' },
              { name: 'Object Diagram', link: 'https://plantuml.com/object-diagram' },
              { name: 'Deployment Diagram', link: 'https://plantuml.com/deployment-diagram' },
              { name: 'Component Diagram', link: 'https://plantuml.com/component-diagram' },
              { name: 'Timing Diagram', link: 'https://plantuml.com/timing-diagram' },
              { name: 'Gantt Diagram', link: 'https://plantuml.com/gantt-diagram' },
              { name: 'Mindmap Diagram', link: 'https://plantuml.com/mindmap-diagram' },
              { name: 'Work Breakdown Structure', link: 'https://plantuml.com/wbs-diagram' },
              { name: 'Salt UI Mockup', link: 'https://plantuml.com/salt' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-center rounded-lg shadow-md text-blue-600 font-semibold hover:bg-blue-500 hover:text-white transition-all cursor-pointer bg-white whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col w-full md:flex-row w-full gap-4">
        {/* UML Code Input */}
        <textarea
          ref={textAreaRef}
          className="w-full md:w-1/2 p-2 border rounded-md bg-gray-100 font-mono resize-none overflow-hidden"
          value={umlCode}
          onChange={handleInputChange}
          placeholder="Enter PlantUML code here..."
          style={{ minHeight: '50vh' }} // Ensure it starts with half of the visible webpage
        />

        {/* Rendered UML Image */}
        <div className="w-full md:w-1/2 border rounded-md p-2 bg-gray-50 flex items-center justify-center">
          {/* Using regular img tag for dynamically generated PlantUML images instead of Next.js Image component,
              as we're working with dynamically generated remote SVGs from the PlantUML server */}
          {umlUrl ? (
            <img 
              src={umlUrl} 
              alt="PlantUML Diagram" 
              className="max-w-full h-auto object-contain" 
            />
          ) : (
            <p className="text-gray-600">Diagram preview will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
}
