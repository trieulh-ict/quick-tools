'use client';

import { useState, useEffect, useCallback } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
const lightTheme = {
  ...themes.github,
  plain: {
    ...themes.github.plain,
    backgroundColor: "#ffffff",
  },
};

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [isValidJson, setIsValidJson] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isXmlFormat, setIsXmlFormat] = useState(false);
  const [isSnakeCase, setIsSnakeCase] = useState(false);

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
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
    }
  };

  return (
    <div className="flex flex-col w-full p-4 overflow-hidden">
      <h2 className="text-2xl font-bold mb-6 text-center">JSON Formatter</h2>
      <div className="flex flex-1 flex-row gap-4 overflow-hidden items-start justify-center">
        <textarea
          className="flex-1 w-full min-h-[50vh] max-w-[40%] border border-gray-300 rounded-md p-4 overflow-hidden min-w-0"
          placeholder="Paste JSON here..."
          value={inputJson}
          onChange={(e) => {
            setInputJson(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
          }}
          style={{ height: 'auto' }}
        />
        <div className="flex flex-col justify-center items-center">
          <button
            className={`w-full px-4 py-2 rounded-md font-semibold transition-all ${
                isValidJson ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-400 text-gray-700 cursor-not-allowed'
              }`}
            disabled={!isValidJson}
            onClick={handleCopy}
          >
            Copy JSON
          </button>
          <button
            className={`w-full mt-2 px-4 py-2 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all`}
            onClick={() => setIsXmlFormat((prev) => !prev)}
          >
            Switch to {isXmlFormat ? 'JSON' : 'XML'}
          </button>
          <button
            className={`w-full mt-2 px-4 py-2 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-all`}
            onClick={() => setIsSnakeCase((prev) => !prev)}
          >
            Switch to {isSnakeCase ? 'camelCase' : 'snake_case'}
          </button>
        </div>
        <div className="flex-1 w-full min-h-[50vh] max-w-[40%] border border-gray-300 rounded-md p-4 overflow-auto min-w-0 bg-white flex relative">
          {/* Line Numbers */}
          <div className="pr-4 text-gray-500 text-right select-none font-mono">
            {formattedJson.split('\n').map((_, index) => (
              <div key={index} className="leading-6">{index + 1}</div>
            ))}
          </div>
          {/* JSON Output */}
          <Highlight theme={lightTheme} code={formattedJson} language={isXmlFormat ? "xml" : "json"}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`w-full bg-white ${className}`} style={style}>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })} className="flex">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
          {showSnackbar && (
            <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
              ✅ JSON copied successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
