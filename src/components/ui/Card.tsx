import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hover = false,
  bordered = false
}) => {
  const baseStyle = 'bg-white rounded-2xl shadow-md p-6';
  const hoverStyle = hover ? 'hover:shadow-lg transition-shadow duration-300 cursor-pointer' : '';
  const borderedStyle = bordered ? 'border border-gray-200' : '';
  
  const classes = [
    baseStyle,
    hoverStyle,
    borderedStyle,
    className
  ].join(' ');

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;