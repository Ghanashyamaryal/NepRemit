import { cn } from "@/lib/utils";

interface ButtonSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ButtonSpinner({ className, size = "md" }: ButtonSpinnerProps) {
  const sizeClasses = {
    sm: "h-3 w-3 border",
    md: "h-4 w-4 border-2",
    lg: "h-5 w-5 border-2",
  };

  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full border-current border-r-transparent",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}
