"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  RateTrendChart,
  MultiCurrencyChart,
  SparklineChart,
  CHART_COLORS,
} from "@/components/molecules/Charts";
import { cn } from "@/lib/utils";

interface ForexRate {
  currency: string;
  name: string;
  flag: string;
  unit: number;
  buy: number;
  sell: number;
}

interface HistoricalRateData {
  date: string;
  rates: { currency: string; buy: number; sell: number; unit: number }[];
}

interface ForexChartsProps {
  majorRates: ForexRate[];
  historicalData?: HistoricalRateData[];
}

export function ForexCharts({ majorRates, historicalData = [] }: ForexChartsProps) {
  const [selectedCurrency, setSelectedCurrency] = React.useState(majorRates[0]?.currency || "USD");

  const selectedRate = majorRates.find((r) => r.currency === selectedCurrency);

  // Transform historical data for the selected currency
  const chartData = React.useMemo(() => {
    if (historicalData.length === 0) {
      // Fallback: generate placeholder data from current rate
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return {
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          rate: selectedRate?.buy || 133.5,
        };
      });
    }

    // Sort by date ascending
    const sorted = [...historicalData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sorted.slice(-30).map((day) => {
      const currencyRate = day.rates.find((r) => r.currency === selectedCurrency);
      const rate = currencyRate ? currencyRate.buy / currencyRate.unit : 0;
      return {
        date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        rate: Number(rate.toFixed(2)),
      };
    });
  }, [historicalData, selectedCurrency, selectedRate?.buy]);

  // Generate sparkline data for each currency
  const sparklineData = React.useMemo(() => {
    const data: Record<string, number[]> = {};

    if (historicalData.length === 0) {
      // Fallback: use current rates as flat lines
      majorRates.forEach((rate) => {
        data[rate.currency] = Array(7).fill(rate.buy);
      });
      return data;
    }

    const sorted = [...historicalData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const last7Days = sorted.slice(-7);

    majorRates.forEach((rate) => {
      data[rate.currency] = last7Days.map((day) => {
        const currencyRate = day.rates.find((r) => r.currency === rate.currency);
        return currencyRate ? currencyRate.buy / currencyRate.unit : rate.buy;
      });
    });

    return data;
  }, [historicalData, majorRates]);

  // Calculate trend
  const firstRate = chartData[0]?.rate || 0;
  const lastRate = chartData[chartData.length - 1]?.rate || 0;
  const trend = lastRate - firstRate;
  const trendPercent = firstRate > 0 ? ((trend / firstRate) * 100).toFixed(2) : "0";

  return (
    <div className="space-y-6">
      {/* Currency selector pills */}
      <div className="flex flex-wrap gap-2">
        {majorRates.slice(0, 6).map((rate) => {
          const sparkline = sparklineData[rate.currency] || [];
          const currencyTrend = sparkline.length > 1 ? sparkline[sparkline.length - 1] - sparkline[0] : 0;

          return (
            <button
              key={rate.currency}
              onClick={() => setSelectedCurrency(rate.currency)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all",
                selectedCurrency === rate.currency
                  ? "bg-primary-50 border-primary-300 shadow-sm"
                  : "bg-white border-neutral-200 hover:border-neutral-300"
              )}
            >
              <span className="text-lg">{rate.flag}</span>
              <span className="font-medium text-neutral-900">{rate.currency}</span>
              <SparklineChart data={sparkline} width={50} height={20} />
              <span
                className={cn(
                  "text-xs font-medium",
                  currencyTrend >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {currencyTrend >= 0 ? "+" : ""}
                {currencyTrend.toFixed(2)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main chart */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selectedRate?.flag}</span>
            <div>
              <h3 className="font-semibold text-neutral-900">
                {selectedRate?.currency}/NPR - {historicalData.length > 0 ? "30" : "7"} Day Trend
              </h3>
              <p className="text-sm text-neutral-500">{selectedRate?.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-neutral-900">
              {selectedRate?.buy.toFixed(2)} <span className="text-sm font-normal">NPR</span>
            </div>
            <div
              className={cn(
                "flex items-center justify-end gap-1 text-sm font-medium",
                trend >= 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {trend >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>
                {trend >= 0 ? "+" : ""}
                {trend.toFixed(2)} ({trendPercent}%)
              </span>
            </div>
          </div>
        </div>

        <RateTrendChart
          data={chartData}
          dataKey="rate"
          height={250}
          showGrid={true}
          showAverage={true}
          color={trend >= 0 ? CHART_COLORS.positive : CHART_COLORS.negative}
        />
      </div>
    </div>
  );
}

// Multi-currency comparison component
interface MultiCurrencyComparisonProps {
  rates: ForexRate[];
  historicalData?: HistoricalRateData[];
}

export function MultiCurrencyComparison({ rates, historicalData = [] }: MultiCurrencyComparisonProps) {
  // Generate comparison data from real historical data
  const comparisonData = React.useMemo(() => {
    if (historicalData.length === 0) {
      // Fallback: generate flat data from current rates
      return Array.from({ length: 14 }, (_, i) => {
        const dateObj = new Date();
        dateObj.setDate(dateObj.getDate() - (13 - i));

        const dayData: { date: string; [key: string]: string | number } = {
          date: dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        };

        rates.slice(0, 4).forEach((rate) => {
          dayData[rate.currency] = rate.buy;
        });

        return dayData;
      });
    }

    const sorted = [...historicalData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sorted.slice(-14).map((day) => {
      const dayData: { date: string; [key: string]: string | number } = {
        date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      };

      rates.slice(0, 4).forEach((rate) => {
        const currencyRate = day.rates.find((r) => r.currency === rate.currency);
        if (currencyRate) {
          dayData[rate.currency] = Number((currencyRate.buy / currencyRate.unit).toFixed(2));
        }
      });

      return dayData;
    });
  }, [rates, historicalData]);

  const currencyConfig = rates.slice(0, 4).map((rate, index) => ({
    key: rate.currency,
    name: rate.name,
    color: [CHART_COLORS.primary, CHART_COLORS.positive, CHART_COLORS.accent, "#8b5cf6"][index],
  }));

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4">
      <h3 className="font-semibold text-neutral-900 mb-4">
        Currency Comparison - 14 Day Trend
        {historicalData.length > 0 && (
          <span className="text-xs font-normal text-green-600 ml-2">(NRB Data)</span>
        )}
      </h3>
      <MultiCurrencyChart data={comparisonData} currencies={currencyConfig} height={300} />
    </div>
  );
}
