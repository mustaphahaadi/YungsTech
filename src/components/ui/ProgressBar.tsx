import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: 'indigo' | 'green' | 'yellow' | 'red' | 'blue';
  height?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = 'indigo',
  height = 'md',
  className = '',
}) => {
  // Ensure progress is between 0-100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);
  
  const colorClasses = {
    indigo: 'bg-indigo-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-500',
    red: 'bg-rose-600',
    blue: 'bg-blue-600',
  };
  
  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full ${heightClasses[height]} ${className}`}>
      <div 
        className={`${colorClasses[color]} ${heightClasses[height]} rounded-full transition-all duration-300 ease-in-out`}
        style={{ width: `${normalizedProgress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;