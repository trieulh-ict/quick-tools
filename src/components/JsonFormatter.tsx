'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [isValidJson, setIsValidJson] = useState(false);
  const [isXmlFormat, setIsXmlFormat] = useState(false);
  const [isSnakeCase, setIsSnakeCase] = useState(false);

  const [codeEditorHeight, setCodeEditorHeight] = useState(0);
  

  const textareaInputRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaOutputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function updateHeights() {
      if (textareaInputRef.current) {
        setCodeEditorHeight(textareaInputRef.current.clientHeight);
      }
      
    }
    updateHeights();
    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [inputJson, formattedJson]);

  const toSnakeCase = (str: string) =>
    str.replace(/([A-Z])/g, (match, offset) =>
      (offset === 0 || /^[A-Z]+$/.test(str) ? match.toLowerCase() : `_${match.toLowerCase()}`)
    );

  const toCamelCase = (str: string) =>
    str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

  const transformKeys = useCallback((obj: unknown, toSnake: boolean): unknown => {
    function transform(innerObj: unknown): unknown {
      if (Array.isArray(innerObj)) {
        return innerObj.map(transform);
      } else if (innerObj !== null && typeof innerObj === "object") {
        return Object.fromEntries(
          Object.entries(innerObj as Record<string, unknown>).map(([key, value]) => [
            toSnake ? toSnakeCase(key) : toCamelCase(key),
            transform(value),
          ])
        );
      }
      return innerObj;
    }
    return transform(obj);
  }, []);

  const convertToXml = useCallback((json: Record<string, unknown> | unknown[], indent = 2): string => {
    if (typeof json !== 'object' || json === null) return String(json);
    const spaces = ' '.repeat(indent);
    return Object.entries(json as Record<string, unknown>)
      .map(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          return `${spaces}<${key}>\n${convertToXml(value as Record<string, unknown> | unknown[], indent + 2)}\n${spaces}</${key}>`;
        } else {
          return `${spaces}<${key}>${value}</${key}>`;
        }
      })
      .join('\n');
  }, []);

  useEffect(() => {
    try {
      let parsed = JSON.parse(inputJson);
      parsed = transformKeys(parsed, isSnakeCase) as Record<string, unknown> | unknown[];
      setFormattedJson(
        isXmlFormat
          ? `<root>\n${convertToXml(parsed as Record<string, unknown>)}\n</root>`
          : JSON.stringify(parsed, null, 2)
      );
      setIsValidJson(true);
    } catch {
      setFormattedJson('❌ Invalid JSON: Please check the format.');
      setIsValidJson(false);
    }
  }, [inputJson, isXmlFormat, isSnakeCase, transformKeys, convertToXml]);

  const handleCopy = () => {
    if (isValidJson) {
      navigator.clipboard.writeText(formattedJson);
      toast("JSON copied successfully!", {
        description: "The formatted JSON has been copied to your clipboard.",
      });
    }
  };

  return (
    <Card className="flex flex-col w-full p-4 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center whitespace-nowrap overflow-hidden text-ellipsis">JSON Formatter</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-row gap-4 overflow-hidden min-h-[60vh] items-start justify-center">
        <Textarea
          ref={textareaInputRef}
          className="flex-1 w-full min-h-[50vh] p-4 min-w-0"
          placeholder="Paste JSON here..."
          value={inputJson}
          onChange={(e) => {
            setInputJson(e.target.value);
          }}
        />
        <div className="flex flex-col justify-center items-center">
          <Button
            className="w-full"
            disabled={!isValidJson}
            onClick={handleCopy}
          >
            Copy JSON
          </Button>
          <Button
            className="w-full mt-2"
            onClick={() => setIsXmlFormat((prev) => !prev)}
          >
            Switch to {isXmlFormat ? 'JSON' : 'XML'}
          </Button>
          <Button
            className="w-full mt-2"
            onClick={() => setIsSnakeCase((prev) => !prev)}
          >
            Switch to {isSnakeCase ? 'camelCase' : 'snake_case'}
          </Button>
        </div>
        <div ref={textareaOutputRef} className="flex-1 w-full min-w-0 bg-white flex relative h-full">
          <AceEditor
            mode={isXmlFormat ? "xml" : "json"}
            theme="github"
            name="json-output-editor"
            editorProps={{ $blockScrolling: true }}
            value={formattedJson}
            readOnly={true}
            width="100%"
            height={codeEditorHeight ? `${codeEditorHeight}px` : '100%'}
            highlightActiveLine={false}
            showGutter={true}
            showPrintMargin={false}
            fontSize={16}
            wrapEnabled={true}
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 2,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}