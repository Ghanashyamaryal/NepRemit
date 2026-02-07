"use client";

import * as React from "react";
import {
  Building2,
  Landmark,
  Shield,
  Banknote,
  Star,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

export type BankFilter = "all" | "top5" | "government" | "private" | "remittance";
export type ViewMode = "grid" | "list";

interface FilterChip {
  id: BankFilter;
  label: string;
  icon: React.ReactNode;
  count?: number;
}

interface BankFiltersProps {
  activeFilter: BankFilter;
  onFilterChange: (filter: BankFilter) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCount: number;
  filteredCount: number;
  className?: string;
}

export function BankFilters({
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  totalCount,
  filteredCount,
  className,
}: BankFiltersProps) {
  const filters: FilterChip[] = [
    { id: "all", label: "All Banks", icon: <LayoutGrid className="h-4 w-4" />, count: totalCount },
    { id: "top5", label: "Top 5", icon: <Star className="h-4 w-4" /> },
    { id: "government", label: "Government", icon: <Landmark className="h-4 w-4" /> },
    { id: "private", label: "Private", icon: <Building2 className="h-4 w-4" /> },
    { id: "remittance", label: "With Remittance", icon: <Banknote className="h-4 w-4" /> },
  ];

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 mr-2">
          <SlidersHorizontal className="h-4 w-4 text-neutral-500" />
          <span className="text-sm font-medium text-neutral-600">Filter:</span>
        </div>

        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={cn(
              "group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
              "transition-all duration-300 ease-out",
              "border",
              activeFilter === filter.id
                ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white border-primary-500 shadow-lg shadow-primary-500/25"
                : "bg-white text-neutral-600 border-neutral-200 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
            )}
          >
            {/* Background glow effect */}
            {activeFilter === filter.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full blur opacity-40" />
            )}

            <span className="relative flex items-center gap-2">
              <span
                className={cn(
                  "transition-transform duration-300",
                  activeFilter === filter.id ? "scale-110" : "group-hover:scale-110"
                )}
              >
                {filter.icon}
              </span>
              <span>{filter.label}</span>
              {filter.count !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-xs font-semibold",
                    activeFilter === filter.id
                      ? "bg-white/20 text-white"
                      : "bg-neutral-100 text-neutral-500 group-hover:bg-primary-100 group-hover:text-primary-600"
                  )}
                >
                  {filter.count}
                </span>
              )}
            </span>
          </button>
        ))}

        {/* Clear Filter */}
        {activeFilter !== "all" && (
          <button
            onClick={() => onFilterChange("all")}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-full text-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors duration-200"
          >
            <X className="h-3.5 w-3.5" />
            Clear
          </button>
        )}
      </div>

      {/* Results Count & View Toggle */}
      <div className="flex items-center justify-between py-2 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">
            Showing{" "}
            <span className="font-semibold text-neutral-900">{filteredCount}</span>{" "}
            {filteredCount === 1 ? "bank" : "banks"}
          </span>
          {activeFilter !== "all" && (
            <span className="text-sm text-primary-600">
              (filtered from {totalCount})
            </span>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
          <Button
            variant={viewMode === "grid" ? "primary" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "h-8 w-8 p-0 rounded-md",
              viewMode === "grid"
                ? "bg-white shadow-sm text-primary-600"
                : "text-neutral-500 hover:text-neutral-700"
            )}
            title="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "primary" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("list")}
            className={cn(
              "h-8 w-8 p-0 rounded-md",
              viewMode === "list"
                ? "bg-white shadow-sm text-primary-600"
                : "text-neutral-500 hover:text-neutral-700"
            )}
            title="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
