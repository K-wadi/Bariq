import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  icon,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
}) => {
  const baseClasses = 'flex items-center justify-center font-medium transition-all rounded-md';
  
  const variantClasses = {
    primary: 'bg-gradient-primary text-white hover:opacity-90 shadow-sm',
    secondary: 'bg-primary-clean text-white hover:bg-opacity-90 shadow-sm',
    outline: 'bg-transparent border-2 border-primary-clean text-primary-clean hover:bg-primary-clean/10',
    text: 'bg-transparent text-primary-clean hover:bg-primary-clean/10',
  };
  
  const sizeClasses = {
    small: 'text-sm px-3 py-1',
    medium: 'px-5 py-2',
    large: 'text-lg px-6 py-3',
  };
  
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClass} ${className}`;
  
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );
  
  if (to) {
    return (
      <Link to={to} className={allClasses}>
        {content}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={allClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  
  return (
    <button
      type={type}
      className={allClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;