'use client';

import { useState, useEffect, useRef } from 'react';
import plantumlEncoder from 'plantuml-encoder';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
    <Card className="flex flex-col w-full p-6">
      <CardHeader className="flex flex-row items-center justify-between w-full mb-4">
        <CardTitle className="text-2xl font-bold whitespace-nowrap">PlantUML Visualizer</CardTitle>
        {/* Help Icon next to title */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowHelp(!showHelp)}
          className="rounded-full text-sm font-bold"
        >
          ?
        </Button>
      </CardHeader>

      {/* Help Content */}
      {showHelp && (
        <Card className="mb-4 p-4 text-sm">
          <CardTitle className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">PlantUML Syntax Guide:</CardTitle>
          <CardContent className="mt-3 flex flex-wrap gap-2 p-0">
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
              <Button asChild key={item.name} variant="outline">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="flex flex-col w-full md:flex-row w-full gap-4">
        {/* UML Code Input */}
        <Textarea
          ref={textAreaRef}
          className="w-full md:w-1/2 font-mono resize-none"
          value={umlCode}
          onChange={handleInputChange}
          placeholder="Enter PlantUML code here..."
          style={{ minHeight: '50vh' }} // Ensure it starts with half of the visible webpage
        />

        {/* Rendered UML Image */}
        <Card className="w-full md:w-1/2 p-2 flex items-center justify-center min-h-[50vh]">
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
        </Card>
      </div>
    </Card>
  );
}