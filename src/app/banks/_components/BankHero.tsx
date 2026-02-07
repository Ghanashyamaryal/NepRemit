"use client";

import * as React from "react";
import { Search, Building2, TrendingUp, Shield, Globe } from "lucide-react";
import { Heading, Text } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

interface BankHeroProps {
  totalBanks: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

export function BankHero({
  totalBanks,
  searchQuery,
  onSearchChange,
  className,
}: BankHeroProps) {
  const stats = [
    { icon: Building2, label: "Banks", value: `${totalBanks}+` },
    { icon: TrendingUp, label: "Live Rates", value: "Real-time" },
    { icon: Shield, label: "NRB Licensed", value: "100%" },
    { icon: Globe, label: "Partners", value: "50+" },
  ];

  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900" />

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-400 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-secondary-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-400" />
            </span>
            <span className="text-sm font-medium text-white/90">Live Exchange Rates</span>
          </div>

          {/* Title */}
          <Heading level="h1" className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
            Nepal Commercial{" "}
            <span className="bg-gradient-to-r from-accent-300 to-secondary-300 bg-clip-text text-transparent">
              Banks
            </span>
          </Heading>

          {/* Subtitle */}
          <Text className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
            Compare exchange rates, remittance services, and find the best banking partner
            for your international money transfers to Nepal
          </Text>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mt-8">
            <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
            <div className="relative flex items-center bg-white rounded-2xl shadow-2xl shadow-primary-900/20 overflow-hidden">
              <Search className="h-5 w-5 text-neutral-400 ml-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search banks by name, SWIFT code, or location..."
                className="flex-1 px-4 py-4 text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="mr-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  <span className="sr-only">Clear search</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <stat.icon className="h-6 w-6 text-accent-300 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-center">
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L48 108C96 96 192 72 288 66C384 60 480 72 576 78C672 84 768 84 864 78C960 72 1056 60 1152 60C1248 60 1344 72 1392 78L1440 84V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            className="fill-neutral-50"
          />
        </svg>
      </div>
    </section>
  );
}
