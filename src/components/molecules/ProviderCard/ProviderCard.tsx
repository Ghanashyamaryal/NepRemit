import * as React from "react";
import { Star, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Text, Heading } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface ProviderCardProps {
  id: string;
  name: string;
  logo?: string;
  rating?: number;
  reviewCount?: number;
  rate?: number;
  fee?: string;
  speed?: string;
  features?: string[];
  isVerified?: boolean;
  isPromoted?: boolean;
  className?: string;
  onCompare?: () => void;
  onViewDetails?: () => void;
}

const ProviderCard = React.forwardRef<HTMLDivElement, ProviderCardProps>(
  (
    {
      name,
      logo,
      rating,
      reviewCount,
      rate,
      fee,
      speed,
      features = [],
      isVerified,
      isPromoted,
      className,
      onCompare,
      onViewDetails,
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          isPromoted && "ring-2 ring-accent-500",
          className
        )}
        hoverable
      >
        {isPromoted && (
          <div className="absolute top-0 right-0">
            <Badge variant="accent" className="rounded-none rounded-bl-lg">
              Featured
            </Badge>
          </div>
        )}

        <CardContent className="p-0 space-y-4">
          {/* Header */}
          <div className="flex items-start gap-3">
            {logo ? (
              <img
                src={logo}
                alt={name}
                className="h-12 w-12 object-contain rounded-lg border border-neutral-200 p-1"
              />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Text weight="bold" className="text-lg">
                  {name.charAt(0)}
                </Text>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <Heading level="h5" className="truncate">
                  {name}
                </Heading>
                {isVerified && (
                  <CheckCircle className="h-4 w-4 text-secondary-500 shrink-0" />
                )}
              </div>

              {rating !== undefined && (
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-accent-400 text-accent-400" />
                  <Text variant="small" weight="medium">
                    {rating.toFixed(1)}
                  </Text>
                  {reviewCount !== undefined && (
                    <Text variant="small" color="muted">
                      ({reviewCount.toLocaleString()} reviews)
                    </Text>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {rate !== undefined && (
              <div className="text-center p-2 bg-neutral-50 rounded-lg">
                <Text variant="caption" color="muted">
                  Rate
                </Text>
                <Text weight="semibold" className="tabular-nums">
                  {rate.toFixed(2)}
                </Text>
              </div>
            )}
            {fee && (
              <div className="text-center p-2 bg-neutral-50 rounded-lg">
                <Text variant="caption" color="muted">
                  Fee
                </Text>
                <Text weight="semibold">{fee}</Text>
              </div>
            )}
            {speed && (
              <div className="text-center p-2 bg-neutral-50 rounded-lg">
                <Text variant="caption" color="muted">
                  Speed
                </Text>
                <Text weight="semibold">{speed}</Text>
              </div>
            )}
          </div>

          {/* Features */}
          {features.length > 0 && (
            <ul className="space-y-1">
              {features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-secondary-500 shrink-0" />
                  <Text variant="small" className="truncate">
                    {feature}
                  </Text>
                </li>
              ))}
            </ul>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {onViewDetails && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onViewDetails}
              >
                View Details
              </Button>
            )}
            {onCompare && (
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={onCompare}
              >
                Compare
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

ProviderCard.displayName = "ProviderCard";

export { ProviderCard };
