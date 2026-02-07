import * as React from "react";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/atoms/Card";
import { Text, Heading } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
    label?: string;
  };
  variant?: "default" | "primary" | "secondary" | "accent" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      description,
      icon: Icon,
      trend,
      variant = "default",
      size = "md",
      className,
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const valueSizeClasses = {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
    };

    const iconSizeClasses = {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
    };

    const variantClasses = {
      default: "bg-white",
      primary: "bg-primary-50",
      secondary: "bg-secondary-50",
      accent: "bg-accent-50",
      dark: "bg-white/10 backdrop-blur-sm border-white/20",
    };

    const iconVariantClasses = {
      default: "bg-neutral-100 text-neutral-600",
      primary: "bg-primary-100 text-primary-600",
      secondary: "bg-secondary-100 text-secondary-600",
      accent: "bg-accent-100 text-accent-600",
      dark: "bg-white/20 text-white",
    };

    const isDark = variant === "dark";

    const TrendIcon =
      trend?.direction === "up"
        ? TrendingUp
        : trend?.direction === "down"
        ? TrendingDown
        : Minus;

    const trendColorClass =
      trend?.direction === "up"
        ? "text-secondary-600"
        : trend?.direction === "down"
        ? "text-error"
        : "text-neutral-500";

    return (
      <Card
        ref={ref}
        className={cn(sizeClasses[size], variantClasses[variant], className)}
      >
        <CardContent className="p-0">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <Text
                variant="small"
                color={isDark ? "default" : "muted"}
                weight="medium"
                className={isDark ? "text-white/70" : undefined}
              >
                {title}
              </Text>
              <Heading
                level="h4"
                className={cn(
                  "font-bold tabular-nums",
                  valueSizeClasses[size],
                  isDark && "text-white"
                )}
              >
                {typeof value === "number" ? value.toLocaleString() : value}
              </Heading>
              {(description || trend) && (
                <div className="flex items-center gap-2">
                  {trend && (
                    <span
                      className={cn(
                        "flex items-center gap-1",
                        isDark ? "text-white" : trendColorClass
                      )}
                    >
                      <TrendIcon className="h-4 w-4" />
                      <Text
                        variant="small"
                        weight="medium"
                        className={isDark ? "text-white" : undefined}
                      >
                        {trend.value > 0 ? "+" : ""}
                        {trend.value}%
                      </Text>
                    </span>
                  )}
                  {(description || trend?.label) && (
                    <Text
                      variant="small"
                      color={isDark ? "default" : "muted"}
                      className={isDark ? "text-white/70" : undefined}
                    >
                      {description || trend?.label}
                    </Text>
                  )}
                </div>
              )}
            </div>
            {Icon && (
              <div
                className={cn(
                  "rounded-lg p-2",
                  iconSizeClasses[size],
                  iconVariantClasses[variant]
                )}
              >
                <Icon className="h-full w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

StatCard.displayName = "StatCard";

export { StatCard };
