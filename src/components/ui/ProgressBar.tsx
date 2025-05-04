import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showValue?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  height?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showValue = false,
  variant = 'primary',
  height = 'md',
  animated = true,
  className = ''
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const baseStyle = 'w-full rounded-full overflow-hidden bg-gray-200';
  
  const variantStyles = {
    primary: 'bg-indigo-500',
    secondary: 'bg-sky-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500'
  };
  
  const heightStyles = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  const animationStyle = animated ? 'transition-all duration-500 ease-out' : '';
  
  const containerClasses = [baseStyle, heightStyles[height], className].join(' ');
  const barClasses = [variantStyles[variant], heightStyles[height], animationStyle].join(' ');

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm font-medium text-gray-700">{value}/{max}</span>
          )}
        </div>
      )}
      <div className={containerClasses}>
        <div 
          className={barClasses} 
          style={{ width: `${percentage}%` }}
          role="progressbar" 
          aria-valuenow={value} 
          aria-valuemin={0} 
          aria-valuemax={max}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;