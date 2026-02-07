"use client";

import * as React from "react";
import { BankCard } from "./BankCard";
import { cn } from "@/lib/utils";
import type { Bank } from "@/types";
import { Building2 } from "lucide-react";

interface BankGridProps {
  banks: Bank[];
  viewMode: "grid" | "list";
  isLoading?: boolean;
  className?: string;
}

export function BankGrid({ banks, viewMode, isLoading, className }: BankGridProps) {
  if (isLoading) {
    return (
      <div className={cn("grid gap-6", viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <BankCardSkeleton key={i} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (banks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="h-20 w-20 rounded-full bg-neutral-100 flex items-center justify-center mb-6">
          <Building2 className="h-10 w-10 text-neutral-400" />
        </div>
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">No banks found</h3>
        <p className="text-neutral-500 text-center max-w-md">
          Try adjusting your search query or filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6 transition-all duration-300",
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "grid-cols-1 max-w-3xl mx-auto",
        className
      )}
    >
      {banks.map((bank, index) => (
        <div
          key={bank.id}
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
        >
          <BankCard
            bank={bank}
            variant={index < 3 && viewMode === "grid" ? "featured" : "default"}
          />
        </div>
      ))}
    </div>
  );
}

function BankCardSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200/60 bg-white p-6 space-y-5">
      {/* Header skeleton */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-neutral-200 animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-32 rounded bg-neutral-200 animate-pulse" />
            <div className="h-4 w-48 rounded bg-neutral-100 animate-pulse" />
          </div>
        </div>
        <div className="h-6 w-20 rounded-full bg-neutral-100 animate-pulse" />
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-16 rounded-xl bg-neutral-50 animate-pulse" />
        ))}
      </div>

      {/* Partners skeleton */}
      <div className="pt-2 space-y-2">
        <div className="h-3 w-28 rounded bg-neutral-100 animate-pulse" />
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-20 rounded-full bg-neutral-100 animate-pulse" />
          ))}
        </div>
      </div>

      {/* Actions skeleton */}
      <div className="flex gap-2 pt-3 border-t border-neutral-100">
        <div className="flex-1 h-9 rounded-lg bg-neutral-100 animate-pulse" />
        <div className="h-9 w-9 rounded-lg bg-neutral-100 animate-pulse" />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
}
