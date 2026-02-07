"use client";

import { cn } from "@/lib/utils";

interface PageLoaderProps {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "branded";
}

export function PageLoader({
  message = "Loading...",
  className,
  size = "md",
  variant = "branded",
}: PageLoaderProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-neutral-200 border-t-primary-600",
            sizeClasses[size]
          )}
        />
      </div>
    );
  }

  if (variant === "default") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-neutral-200 border-t-primary-600",
            sizeClasses[size]
          )}
        />
        {message && (
          <p className={cn("text-neutral-500 animate-pulse", textSizeClasses[size])}>
            {message}
          </p>
        )}
      </div>
    );
  }

  // Branded variant
  return (
    <div className={cn("flex flex-col items-center justify-center gap-6", className)}>
      {/* Animated Logo */}
      <div className="relative">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary-100" />
        {/* Spinning ring */}
        <div
          className={cn(
            "rounded-full border-4 border-transparent border-t-primary-600 animate-spin",
            size === "sm" ? "h-12 w-12" : size === "md" ? "h-16 w-16" : "h-24 w-24"
          )}
        />
        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "rounded-full bg-primary-600 flex items-center justify-center text-white font-bold",
              size === "sm" ? "h-6 w-6 text-xs" : size === "md" ? "h-8 w-8 text-sm" : "h-12 w-12 text-lg"
            )}
          >
            N
          </div>
        </div>
      </div>

      {/* Loading text with animated dots */}
      <div className="flex items-center gap-1">
        <span className={cn("text-neutral-600 font-medium", textSizeClasses[size])}>
          {message}
        </span>
        <span className="flex gap-0.5">
          <span className="animate-bounce text-primary-600" style={{ animationDelay: "0ms" }}>.</span>
          <span className="animate-bounce text-primary-600" style={{ animationDelay: "150ms" }}>.</span>
          <span className="animate-bounce text-primary-600" style={{ animationDelay: "300ms" }}>.</span>
        </span>
      </div>
    </div>
  );
}

export function FullPageLoader({ message = "Loading" }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <PageLoader message={message} size="lg" variant="branded" />
    </div>
  );
}

export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex items-center gap-2 text-neutral-500">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-primary-600" />
      {message && <span className="text-sm">{message}</span>}
    </div>
  );
}
