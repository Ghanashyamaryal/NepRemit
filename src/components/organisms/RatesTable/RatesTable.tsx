"use client";

import * as React from "react";
import { TrendingUp, TrendingDown, Minus, ArrowUpDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Text } from "@/components/atoms/Typography";
import { Skeleton } from "@/components/atoms/Loader";
import { cn } from "@/lib/utils";

export interface RateData {
  id: string;
  provider: string;
  providerLogo?: string;
  rate: number;
  change24h?: number;
  change7d?: number;
  fee: string;
  speed: string;
  minAmount?: number;
  maxAmount?: number;
  website?: string;
  isVerified?: boolean;
}

export interface RatesTableProps {
  data: RateData[];
  isLoading?: boolean;
  onCompare?: (providerId: string) => void;
  onSort?: (field: string, direction: "asc" | "desc") => void;
  selectedIds?: string[];
  className?: string;
}

const RatesTable = React.forwardRef<HTMLDivElement, RatesTableProps>(
  (
    { data, isLoading, onCompare, onSort, selectedIds = [], className },
    ref
  ) => {
    const [sortField, setSortField] = React.useState<string>("rate");
    const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc");

    const handleSort = (field: string) => {
      const newDirection =
        sortField === field && sortDirection === "desc" ? "asc" : "desc";
      setSortField(field);
      setSortDirection(newDirection);
      onSort?.(field, newDirection);
    };

    const getTrendIcon = (change?: number) => {
      if (change === undefined) return Minus;
      return change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;
    };

    const getTrendColor = (change?: number) => {
      if (change === undefined) return "text-neutral-500";
      return change > 0
        ? "text-secondary-600"
        : change < 0
        ? "text-error"
        : "text-neutral-500";
    };

    if (isLoading) {
      return (
        <div className={cn("space-y-4", className)} ref={ref}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      );
    }

    return (
      <div className={cn("overflow-x-auto", className)} ref={ref}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="px-4 py-3 text-left">
                <Text variant="small" weight="semibold" color="muted">
                  Provider
                </Text>
              </th>
              <th className="px-4 py-3 text-right">
                <button
                  onClick={() => handleSort("rate")}
                  className="inline-flex items-center gap-1 text-neutral-600 hover:text-neutral-900"
                >
                  <Text variant="small" weight="semibold">
                    Rate (NPR)
                  </Text>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </th>
              <th className="px-4 py-3 text-right hidden sm:table-cell">
                <Text variant="small" weight="semibold" color="muted">
                  24h Change
                </Text>
              </th>
              <th className="px-4 py-3 text-right hidden md:table-cell">
                <Text variant="small" weight="semibold" color="muted">
                  7d Change
                </Text>
              </th>
              <th className="px-4 py-3 text-right hidden lg:table-cell">
                <Text variant="small" weight="semibold" color="muted">
                  Fee
                </Text>
              </th>
              <th className="px-4 py-3 text-right hidden lg:table-cell">
                <Text variant="small" weight="semibold" color="muted">
                  Speed
                </Text>
              </th>
              <th className="px-4 py-3 text-right">
                <Text variant="small" weight="semibold" color="muted">
                  Action
                </Text>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {data.map((item, index) => {
              const TrendIcon24h = getTrendIcon(item.change24h);
              const TrendIcon7d = getTrendIcon(item.change7d);
              const isSelected = selectedIds.includes(item.id);
              const isBestRate = index === 0;

              return (
                <tr
                  key={item.id}
                  className={cn(
                    "hover:bg-neutral-50 transition-colors",
                    isSelected && "bg-primary-50"
                  )}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {item.providerLogo ? (
                        <img
                          src={item.providerLogo}
                          alt={item.provider}
                          className="h-10 w-10 rounded-lg object-contain border border-neutral-200 p-1"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center font-semibold text-neutral-600">
                          {item.provider.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <Text weight="medium">{item.provider}</Text>
                          {isBestRate && (
                            <Badge variant="success" size="sm">
                              Best Rate
                            </Badge>
                          )}
                          {item.isVerified && (
                            <Badge variant="primary" size="sm">
                              Verified
                            </Badge>
                          )}
                        </div>
                        {item.website && (
                          <a
                            href={item.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-neutral-500 hover:text-primary-600 flex items-center gap-1"
                          >
                            Visit site
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Text
                      weight="semibold"
                      className={cn(
                        "tabular-nums text-lg",
                        isBestRate && "text-secondary-600"
                      )}
                    >
                      {item.rate.toFixed(2)}
                    </Text>
                  </td>
                  <td className="px-4 py-4 text-right hidden sm:table-cell">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 tabular-nums",
                        getTrendColor(item.change24h)
                      )}
                    >
                      <TrendIcon24h className="h-4 w-4" />
                      {item.change24h !== undefined
                        ? `${item.change24h > 0 ? "+" : ""}${item.change24h.toFixed(2)}%`
                        : "-"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right hidden md:table-cell">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 tabular-nums",
                        getTrendColor(item.change7d)
                      )}
                    >
                      <TrendIcon7d className="h-4 w-4" />
                      {item.change7d !== undefined
                        ? `${item.change7d > 0 ? "+" : ""}${item.change7d.toFixed(2)}%`
                        : "-"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right hidden lg:table-cell">
                    <Text variant="small">{item.fee}</Text>
                  </td>
                  <td className="px-4 py-4 text-right hidden lg:table-cell">
                    <Text variant="small">{item.speed}</Text>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button
                      variant={isSelected ? "primary" : "outline"}
                      size="sm"
                      onClick={() => onCompare?.(item.id)}
                    >
                      {isSelected ? "Selected" : "Compare"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
);

RatesTable.displayName = "RatesTable";

export { RatesTable };
