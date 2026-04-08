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
  const sizeMap = {
    sm: { container: "h-16 w-16", logo: "h-6 w-6 text-[10px]", orbit: 56, text: "text-xs" },
    md: { container: "h-24 w-24", logo: "h-9 w-9 text-sm", orbit: 84, text: "text-sm" },
    lg: { container: "h-32 w-32", logo: "h-12 w-12 text-lg", orbit: 112, text: "text-base" },
  };

  const s = sizeMap[size];

  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <div className={cn("relative", s.container)}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-neutral-200"
            />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="80 235"
              strokeLinecap="round"
              className="text-primary-600"
              style={{ animation: "orbit 1.2s linear infinite" }}
            />
          </svg>
        </div>
      </div>
    );
  }

  if (variant === "default") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
        <div className={cn("relative", s.container)}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-neutral-200"
            />
            <circle
              cx="60" cy="60" r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="60 255"
              strokeLinecap="round"
              className="text-primary-600"
              style={{ animation: "orbit 1.2s linear infinite" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={cn(
                "rounded-full bg-primary-600 flex items-center justify-center text-white font-bold",
                s.logo
              )}
              style={{ animation: "globe-pulse 2s ease-in-out infinite" }}
            >
              N
            </div>
          </div>
        </div>
        {message && (
          <p className={cn("text-neutral-500", s.text)}>{message}</p>
        )}
      </div>
    );
  }

  // Branded variant — orbital globe with transfer paths
  const orbitSize = s.orbit;
  const r1 = orbitSize / 2 - 4;
  const r2 = orbitSize / 2 - 14;
  const viewBox = `0 0 ${orbitSize} ${orbitSize}`;
  const center = orbitSize / 2;

  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-5", className)}
      style={{ animation: "fade-up 0.6s ease-out both" }}
    >
      {/* Orbital globe animation */}
      <div className="relative" style={{ width: orbitSize, height: orbitSize }}>
        <svg
          className="absolute inset-0"
          width={orbitSize}
          height={orbitSize}
          viewBox={viewBox}
        >
          {/* Outer dashed orbit ring */}
          <circle
            cx={center}
            cy={center}
            r={r1}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 6"
            className="text-primary-200"
            style={{ animation: "orbit 20s linear infinite" }}
          />

          {/* Inner solid orbit ring */}
          <circle
            cx={center}
            cy={center}
            r={r2}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary-100"
          />

          {/* Animated arc — primary transfer path */}
          <circle
            cx={center}
            cy={center}
            r={r1}
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="2.5"
            strokeDasharray="40 200"
            strokeLinecap="round"
            style={{ animation: "orbit 2.4s ease-in-out infinite" }}
          />

          {/* Animated arc — secondary transfer path (reverse) */}
          <circle
            cx={center}
            cy={center}
            r={r2}
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="2"
            strokeDasharray="30 180"
            strokeLinecap="round"
            style={{ animation: "orbit-reverse 3s ease-in-out infinite" }}
          />

          {/* Orbiting dot 1 */}
          <circle r="3" fill="#2563eb" style={{ opacity: 0.9 }}>
            <animateMotion
              dur="2.4s"
              repeatCount="indefinite"
              path={`M ${center + r1},${center} A ${r1},${r1} 0 1,1 ${center + r1 - 0.01},${center}`}
            />
          </circle>

          {/* Orbiting dot 2 */}
          <circle r="2.5" fill="#059669" style={{ opacity: 0.8 }}>
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path={`M ${center - r2},${center} A ${r2},${r2} 0 1,0 ${center - r2 + 0.01},${center}`}
            />
          </circle>

          {/* Orbiting dot 3 — small accent */}
          <circle r="2" fill="#f59e0b" style={{ opacity: 0.7 }}>
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path={`M ${center},${center - r1} A ${r1},${r1} 0 1,1 ${center + 0.01},${center - r1}`}
            />
          </circle>

          {/* Gradients */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="1" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" stopOpacity="0" />
              <stop offset="50%" stopColor="#059669" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white font-bold shadow-lg shadow-primary-600/20",
              s.logo
            )}
            style={{ animation: "globe-pulse 2.5s ease-in-out infinite" }}
          >
            N
          </div>
        </div>
      </div>

      {/* Loading text with shimmer */}
      <div className="flex flex-col items-center gap-1.5">
        <span
          className={cn(
            "font-heading font-semibold bg-clip-text text-transparent bg-[length:200%_auto]",
            s.text
          )}
          style={{
            backgroundImage: "linear-gradient(90deg, #2563eb 0%, #059669 50%, #2563eb 100%)",
            animation: "text-shimmer 3s linear infinite",
          }}
        >
          {message}
        </span>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-1 w-1 rounded-full bg-primary-400"
              style={{
                animation: "pulse 1.4s ease-in-out infinite",
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FullPageLoader({ message = "Loading" }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
      <PageLoader message={message} size="lg" variant="branded" />
    </div>
  );
}

export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex items-center gap-2 text-neutral-500">
      <PageLoader size="sm" variant="minimal" />
      {message && <span className="text-sm">{message}</span>}
    </div>
  );
}
