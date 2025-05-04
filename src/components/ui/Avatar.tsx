import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
  status
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-gray-400',
    away: 'bg-amber-500',
    busy: 'bg-rose-500'
  };

  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };

  const statusPositions = {
    sm: 'right-0 bottom-0',
    md: 'right-0 bottom-0',
    lg: 'right-0.5 bottom-0.5',
    xl: 'right-1 bottom-1'
  };

  const classes = [
    'rounded-full object-cover',
    sizeStyles[size],
    className
  ].join(' ');

  return (
    <div className="relative inline-block">
      <img src={src} alt={alt} className={classes} />
      
      {status && (
        <span 
          className={`absolute ${statusPositions[size]} ${statusSizes[size]} ${statusColors[status]} rounded-full border-2 border-white`}
          aria-hidden="true"
        ></span>
      )}
    </div>
  );
};

export default Avatar;