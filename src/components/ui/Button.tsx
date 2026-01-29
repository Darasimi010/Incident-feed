import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-medium 
    rounded-lg transition-all duration-200 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background
  `;

  const variantStyles = {
    primary: `
      bg-primary text-white 
      hover:bg-primary-hover 
      focus-visible:ring-primary
    `,
    secondary: `
      bg-surface text-foreground border border-border
      hover:bg-surface-hover hover:border-foreground-subtle
      focus-visible:ring-primary
    `,
    danger: `
      bg-danger text-white 
      hover:bg-danger-hover 
      focus-visible:ring-danger
    `,
    ghost: `
      bg-transparent text-foreground-muted
      hover:bg-surface hover:text-foreground
      focus-visible:ring-primary
    `,
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
