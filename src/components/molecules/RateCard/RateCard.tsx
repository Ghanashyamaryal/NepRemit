import * as React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Text, Heading } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface RateCardProps {
  baseCurrency: string;
  targetCurrency: string;
  rate: number;
  change?: number;
  changePercent?: number;
  timestamp?: string;
  providerName?: string;
  providerLogo?: string;
  className?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

const RateCard = React.forwardRef<HTMLDivElement, RateCardProps>(
  (
    {
      baseCurrency,
      targetCurrency,
      rate,
      change,
      changePercent,
      timestamp,
      providerName,
      providerLogo,
      className,
      onClick,
      size = "md",
    },
    ref
  ) => {
    // Use change if provided, otherwise fall back to changePercent for trend
    const trendValue = change !== undefined ? change : changePercent;
    const isPositive = trendValue !== undefined ? trendValue > 0 : false;
    const isNegative = trendValue !== undefined ? trendValue < 0 : false;

    const TrendIcon = isPositive
      ? TrendingUp
      : isNegative
      ? TrendingDown
      : Minus;

    const sizeClasses = {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const rateSizeClasses = {
      sm: "text-xl",
      md: "text-2xl",
      lg: "text-3xl",
    };

    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          sizeClasses[size],
          onClick && "cursor-pointer hover:shadow-lg transition-all",
          // Add colored left border based on trend
          isPositive && "border-l-4 border-l-emerald-500",
          isNegative && "border-l-4 border-l-red-500",
          className
        )}
        onClick={onClick}
        hoverable
      >
        <CardContent className="p-0 space-y-3">
          {/* Provider Info */}
          {(providerName || providerLogo) && (
            <div className="flex items-center gap-3">
              {providerLogo ? (
                <img
                  src={providerLogo}
                  alt={providerName || "Provider"}
                  className="h-10 w-10 object-contain rounded-lg bg-neutral-100 p-1"
                />
              ) : (
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 font-bold">
                    {providerName?.charAt(0) || "?"}
                  </span>
                </div>
              )}
              <Text weight="semibold" className="text-base">
                {providerName}
              </Text>
            </div>
          )}

          {/* Currency Pair */}
          <div className="flex items-center gap-2">
            <Text variant="small" color="muted">
              {baseCurrency} → {targetCurrency}
            </Text>
          </div>

          {/* Rate */}
          <div className="flex items-end justify-between gap-4">
            <Heading
              level="h4"
              className={cn("font-bold tabular-nums text-neutral-900", rateSizeClasses[size])}
            >
              {rate.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
            </Heading>

            {/* Change Badge */}
            {(change !== undefined || changePercent !== undefined) && (
              <Badge
                variant={
                  isPositive ? "success" : isNegative ? "error" : "default"
                }
                className="flex items-center gap-1"
              >
                <TrendIcon className="h-3 w-3" />
                {changePercent !== undefined && (
                  <span>
                    {isPositive ? "+" : ""}
                    {changePercent.toFixed(2)}%
                  </span>
                )}
              </Badge>
            )}
          </div>

          {/* Timestamp */}
          {timestamp && (
            <Text variant="caption" color="muted">
              {timestamp}
            </Text>
          )}
        </CardContent>
      </Card>
    );
  }
);

RateCard.displayName = "RateCard";

export { RateCard };
