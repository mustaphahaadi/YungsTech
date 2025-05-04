import React, { useState } from 'react';
import { Exercise } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { AlertCircle, ArrowRight, Code, Lightbulb } from 'lucide-react';

interface CodeExerciseProps {
  exercise: Exercise;
  onComplete: () => void;
}

const CodeExercise: React.FC<CodeExerciseProps> = ({ exercise, onComplete }) => {
  const [code, setCode] = useState(exercise.starterCode);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [feedback, setFeedback] = useState('');

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setResult(null);
    setFeedback('');
  };

  const checkCode = () => {
    // In a real app, this would be more sophisticated
    // For demo purposes, we're just doing simple string comparison
    if (code.trim().includes(exercise.solution.trim())) {
      setResult('success');
      setFeedback('Great job! Your code works perfectly!');
    } else {
      setResult('error');
      setFeedback('Hmm, that\'s not quite right. Try again or check a hint!');
    }
  };

  const showNextHint = () => {
    if (currentHint < exercise.hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
    setShowHint(true);
  };

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="text-xl font-bold text-gray-800">{exercise.title}</h2>
        <p className="text-gray-600 mt-2">{exercise.description}</p>
        
        <div className="bg-indigo-50 rounded-lg p-4 mt-4 border-l-4 border-indigo-400">
          <h3 className="font-semibold text-indigo-800">Instructions:</h3>
          <p className="text-indigo-700 mt-1">{exercise.instructions}</p>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">Your Code:</h3>
            <Badge language={exercise.language} />
          </div>
          
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <textarea
              value={code}
              onChange={handleCodeChange}
              className="w-full h-60 bg-gray-800 text-gray-100 font-mono p-4 focus:outline-none"
              spellCheck="false"
            />
          </div>
          
          <div className="flex justify-between mt-4">
            <Button 
              variant="secondary" 
              onClick={() => setShowHint(!showHint)}
              icon={<Lightbulb className="h-4 w-4" />}
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
            
            <Button 
              variant="primary" 
              onClick={checkCode}
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Run Code
            </Button>
          </div>
        </div>
        
        {showHint && (
          <div className="mt-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
            <div className="flex justify-between">
              <h3 className="font-semibold text-amber-800 flex items-center">
                <Lightbulb className="h-4 w-4 mr-2" />
                Hint {currentHint + 1} of {exercise.hints.length}
              </h3>
              
              {exercise.hints.length > 1 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={showNextHint}
                  disabled={currentHint === exercise.hints.length - 1}
                >
                  Next Hint
                </Button>
              )}
            </div>
            <p className="text-amber-700 mt-2">{exercise.hints[currentHint]}</p>
          </div>
        )}
        
        {result && (
          <div className={`mt-4 p-4 rounded-lg ${
            result === 'success' ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'
          }`}>
            <h3 className={`font-semibold flex items-center ${
              result === 'success' ? 'text-emerald-800' : 'text-rose-800'
            }`}>
              {result === 'success' ? (
                <CheckIcon className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              {result === 'success' ? 'Success!' : 'Not quite right'}
            </h3>
            <p className={result === 'success' ? 'text-emerald-700' : 'text-rose-700'} data-testid="feedback">
              {feedback}
            </p>
            
            {result === 'success' && (
              <Button 
                variant="success" 
                className="mt-3" 
                onClick={onComplete}
              >
                Continue
              </Button>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

// Simple check icon component
const CheckIcon = ({ className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

// Badge for code language
const Badge = ({ language }: { language: string }) => {
  const colors = {
    'blocks': 'bg-emerald-100 text-emerald-800',
    'html': 'bg-orange-100 text-orange-800',
    'css': 'bg-blue-100 text-blue-800',
    'javascript': 'bg-yellow-100 text-yellow-800'
  };
  
  const color = colors[language as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      <Code className="h-3 w-3 inline-block mr-1" />
      {language.toUpperCase()}
    </span>
  );
};

export default CodeExercise;