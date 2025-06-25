import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10 md:h-12',
    large: 'h-12 md:h-14',
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl md:text-2xl',
    large: 'text-2xl md:text-3xl',
  };

  return (
    <div className="flex items-center group transition-transform hover:scale-102">
      <img
        src="/BARIQ-AUTOCARE.svg"
        alt="Bariq Autocare logo icon"
        className={`${sizeClasses[size]} mr-3 w-auto`}
      />
      <div 
        className={`font-display font-bold ${textSizes[size]}`}
        style={{
          background: 'linear-gradient(to right, #2bd5ec, #26bbee, #119ef3, #1e87c5, #e1e3e4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        BARIQ AUTOCARE
      </div>
    </div>
  );
};

export default Logo;