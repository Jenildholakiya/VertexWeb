"use client";

import { useClickSound } from "@/hooks/useClickSound";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg"; // Define the size prop here
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md", // Default to medium
  className,
  onClick,
  children,
  ...props
}: ButtonProps) => {
  const { playClick } = useClickSound();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick(); // Consistent tactile feedback
    if (onClick) onClick(e);
  };

  const variants = {
    primary: "bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/20",
    outline: "border border-white/10 text-white hover:bg-white/5",
  };

  // Define size classes to resolve the TypeScript error
  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-sm",
    lg: "px-10 py-5 text-base",
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "rounded-xl font-bold uppercase tracking-widest transition-all active:scale-95 cursor-pointer flex items-center justify-center",
        variants[variant],
        sizes[size], // Apply the size class
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};