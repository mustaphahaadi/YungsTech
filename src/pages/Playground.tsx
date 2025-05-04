import React from 'react';
import CodeEditor from '../components/editor/CodeEditor';
import { Code } from 'lucide-react';

const defaultCode = `// Welcome to the Code Playground!
// Try running this example:

function greet(name) {
  return \`Hello, \${name}! Welcome to coding!\`;
}

greet("Student");
`;

const Playground: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Code className="mr-2 h-6 w-6 text-blue-500" />
          Code Playground
        </h2>
      </div>

      <CodeEditor
        defaultCode={defaultCode}
        defaultLanguage="javascript"
        onSave={(code) => {
          console.log('Saving code:', code);
        }}
      />
    </div>
  );
};

export default Playground;