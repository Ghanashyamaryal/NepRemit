import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    color: {
      default: "text-neutral-500",
      primary: "text-primary-600",
      secondary: "text-secondary-600",
      white: "text-white",
    },
  },
  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

export interface SpinnerProps
  extends Omit<React.HTMLAttributes<SVGSVGElement>, "color">,
    VariantProps<typeof spinnerVariants> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size, color, ...props }, ref) => {
    return (
      <Loader2
        ref={ref}
        className={cn(spinnerVariants({ size, color, className }))}
        {...props}
      />
    );
  }
);

Spinner.displayName = "Spinner";

const skeletonVariants = cva("animate-pulse rounded-md bg-neutral-200", {
  variants: {
    variant: {
      default: "",
      text: "h-4 w-full",
      avatar: "rounded-full",
      card: "h-32",
      image: "h-48",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export interface ProgressBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  value: number;
  max?: number;
  showValue?: boolean;
  color?: "primary" | "secondary" | "accent";
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    { className, value, max = 100, showValue = false, color = "primary", ...props },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const colorClasses = {
      primary: "bg-primary-600",
      secondary: "bg-secondary-600",
      accent: "bg-accent-500",
    };

    return (
      <div className={cn("relative", className)} ref={ref} {...props}>
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300 ease-out",
              colorClasses[color]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {showValue && (
          <span className="mt-1 text-xs text-neutral-500">
            {Math.round(percentage)}%
          </span>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";

export {
  Spinner,
  spinnerVariants,
  Skeleton,
  skeletonVariants,
  ProgressBar,
};
