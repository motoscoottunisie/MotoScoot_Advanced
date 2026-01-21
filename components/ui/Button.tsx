import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: "bg-[#E65100] text-white hover:bg-orange-700 shadow-lg shadow-orange-600/10",
    dark: "bg-gray-900 text-white hover:bg-black shadow-lg shadow-gray-900/10",
    outline: "bg-white border-2 border-gray-200 text-gray-700 hover:border-primary-600 hover:text-primary-600",
    ghost: "bg-transparent text-gray-500 hover:bg-gray-100",
    success: "bg-[#25D366] text-white hover:bg-[#128C7E] shadow-lg shadow-green-600/10",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/10",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px] rounded-lg gap-1.5",
    md: "px-5 py-3 text-[11px] rounded-xl gap-2",
    lg: "px-8 py-4 text-xs rounded-2xl gap-2.5",
    xl: "px-10 py-5 text-sm rounded-[1.25rem] gap-3",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin"></span>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};