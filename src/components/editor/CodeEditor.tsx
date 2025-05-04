import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Code, Copy, Play, Save, Share2 } from 'lucide-react';

interface CodeEditorProps {
  defaultLanguage?: string;
  defaultCode?: string;
  onRun?: (code: string) => void;
  onSave?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  defaultLanguage = 'javascript',
  defaultCode = '// Start coding here\n',
  onRun,
  onSave
}) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string>('');

  const handleEditorChange = (value: string = '') => {
    setCode(value);
  };

  const handleRun = () => {
    try {
      // For demo purposes, we'll just evaluate the code
      // In production, this should be handled more securely
      const result = eval(code);
      setOutput(String(result));
      onRun?.(code);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
  };

  const handleSave = () => {
    onSave?.(code);
  };

  return (
    <div className="space-y-4">
      <Card className="p-0 overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <select 
              className="bg-gray-700 border-none rounded px-2 py-1 text-sm"
              value={defaultLanguage}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              icon={<Copy className="h-4 w-4" />}
            >
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
              icon={<Save className="h-4 w-4" />}
            >
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Share2 className="h-4 w-4" />}
            >
              Share
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleRun}
              icon={<Play className="h-4 w-4" />}
            >
              Run
            </Button>
          </div>
        </div>

        <Editor
          height="400px"
          defaultLanguage={defaultLanguage}
          defaultValue={defaultCode}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true
          }}
        />
      </Card>

      {output && (
        <Card className="bg-gray-800 text-white">
          <h3 className="text-sm font-medium mb-2">Output:</h3>
          <pre className="font-mono text-sm whitespace-pre-wrap">{output}</pre>
        </Card>
      )}
    </div>
  );
};

export default CodeEditor;