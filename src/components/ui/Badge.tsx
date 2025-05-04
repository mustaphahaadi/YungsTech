import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  className = ''
}) => {
  const baseStyle = 'font-medium rounded-full inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-indigo-100 text-indigo-800',
    secondary: 'bg-sky-100 text-sky-800',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    danger: 'bg-rose-100 text-rose-800',
    info: 'bg-violet-100 text-violet-800'
  };
  
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  const classes = [
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    className
  ].join(' ');

  return (
    <span className={classes}>
      {children}
    </span>
  );
};

export default Badge;