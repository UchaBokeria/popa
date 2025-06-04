import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '',
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A1E2B] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
    
    const variantClasses = {
      primary: 'bg-[#E5253E] text-white hover:bg-[#C71F36] button-glow-red',
      secondary: 'bg-[#39FF85] text-[#1A1E2B] hover:bg-[#33DB73] button-glow-green',
      outline: 'border-2 border-[#E5253E] text-[#E5253E] hover:bg-[#E5253E]/10',
      accent: 'bg-[#00C4FF] text-white hover:bg-[#00A8DB] button-glow-blue'
    };
    
    const sizeClasses = {
      sm: 'h-9 px-3 rounded-md text-sm',
      md: 'h-10 px-4 py-2 rounded-md',
      lg: 'h-12 px-6 rounded-md text-lg'
    };
    
    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button }; 