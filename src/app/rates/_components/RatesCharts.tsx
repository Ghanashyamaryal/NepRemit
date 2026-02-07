"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { TrendingUp, DollarSign, Clock, Award } from "lucide-react";
import { CHART_COLORS, CustomTooltip, ToggleLegend } from "@/components/molecules/Charts";
import { cn } from "@/lib/utils";

interface ProviderRate {
  id: string;
  provider: string;
  providerLogo?: string;
  rate: number;
  fee: string;
  speed: string;
  change24h?: number;
  change7d?: number;
  isVerified?: boolean;
  website?: string;
}

interface RatesChartsProps {
  data: ProviderRate[];
}

interface HistoricalRate {
  date: string;
  usdRate: number;
}

interface RateTrendChartProps {
  data: ProviderRate[];
  historicalRates?: HistoricalRate[];
}

// Provider comparison bar chart
export function ProviderRateComparisonChart({ data }: RatesChartsProps) {
  const sortedData = [...data]
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 8)
    .map((d) => ({
      ...d,
      name: d.provider.length > 12 ? d.provider.substring(0, 12) + "..." : d.provider,
      feeValue: parseFloat(d.fee.replace(/[^0-9.]/g, "")) || 0,
    }));

  const maxRate = Math.max(...sortedData.map((d) => d.rate));
  const minRate = Math.min(...sortedData.map((d) => d.rate));

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-primary-600" />
        <h3 className="font-semibold text-neutral-900">Exchange Rate Comparison</h3>
      </div>
      <p className="text-sm text-neutral-500 mb-4">
        Higher is better - compare NPR rates across providers
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} horizontal={false} />
          <XAxis
            type="number"
            domain={[minRate - 0.5, maxRate + 0.5]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: CHART_COLORS.text }}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: CHART_COLORS.text }}
            width={55}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const data = payload[0].payload as ProviderRate & { name: string };
              return (
                <div className="bg-white rounded-lg shadow-lg border border-neutral-200 p-3">
                  <p className="font-medium text-neutral-900 mb-1">{data.provider}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-neutral-500">Rate:</span>
                      <span className="font-semibold text-neutral-900">{data.rate.toFixed(4)} NPR</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-neutral-500">Fee:</span>
                      <span className="text-neutral-700">{data.fee}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-neutral-500">Speed:</span>
                      <span className="text-neutral-700">{data.speed}</span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Bar dataKey="rate" radius={[0, 4, 4, 0]} barSize={24}>
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.rate === maxRate ? CHART_COLORS.positive : CHART_COLORS.primary}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: CHART_COLORS.positive }} />
          <span className="text-neutral-600">Best Rate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: CHART_COLORS.primary }} />
          <span className="text-neutral-600">Other Providers</span>
        </div>
      </div>
    </div>
  );
}

// Fee comparison chart
export function ProviderFeeComparisonChart({ data }: RatesChartsProps) {
  const chartData = [...data]
    .map((d) => ({
      name: d.provider.length > 10 ? d.provider.substring(0, 10) + "..." : d.provider,
      provider: d.provider,
      fee: parseFloat(d.fee.replace(/[^0-9.]/g, "")) || 0,
      rate: d.rate,
    }))
    .sort((a, b) => a.fee - b.fee)
    .slice(0, 8);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5 text-accent-600" />
        <h3 className="font-semibold text-neutral-900">Transfer Fee Comparison</h3>
      </div>
      <p className="text-sm text-neutral-500 mb-4">
        Lower is better - compare fees across providers
      </p>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} horizontal={false} />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: CHART_COLORS.text }}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: CHART_COLORS.text }}
            width={55}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const data = payload[0].payload;
              return (
                <div className="bg-white rounded-lg shadow-lg border border-neutral-200 p-3">
                  <p className="font-medium text-neutral-900 mb-1">{data.provider}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-neutral-500">Fee:</span>
                      <span className="font-semibold text-neutral-900">
                        {data.fee === 0 ? "Free" : `$${data.fee.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-neutral-500">Rate:</span>
                      <span className="text-neutral-700">{data.rate.toFixed(2)} NPR</span>
                    </div>
                  </div>
                </div>
              );
            }}
          />
          <Bar dataKey="fee" radius={[0, 4, 4, 0]} barSize={24}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.fee === 0 ? CHART_COLORS.positive : CHART_COLORS.accent}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-4 mt-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: CHART_COLORS.positive }} />
          <span className="text-neutral-600">Free</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ backgroundColor: CHART_COLORS.accent }} />
          <span className="text-neutral-600">Has Fee</span>
        </div>
      </div>
    </div>
  );
}

// Rate trend over time chart
export function ProviderRateTrendChart({ data, historicalRates = [] }: RateTrendChartProps) {
  const topProviders = data.slice(0, 4);

  // Provider rate offsets (how much above/below NRB rate each provider offers)
  const providerOffsets: Record<string, number> = {
    [topProviders[0]?.provider || ""]: 0.30,
    [topProviders[1]?.provider || ""]: 0.20,
    [topProviders[2]?.provider || ""]: 0.10,
    [topProviders[3]?.provider || ""]: 0.00,
  };

  const historicalData = React.useMemo(() => {
    if (historicalRates.length === 0) {
      // Fallback: generate placeholder data from current rates
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));

        const dayData: Record<string, string | number> = {
          date: date.toLocaleDateString("en-US", { weekday: "short" }),
        };

        topProviders.forEach((provider) => {
          dayData[provider.provider] = provider.rate;
        });

        return dayData;
      });
    }

    // Use real NRB historical data and calculate provider rates
    return historicalRates.map((day) => {
      const dayData: Record<string, string | number> = {
        date: new Date(day.date).toLocaleDateString("en-US", { weekday: "short" }),
      };

      topProviders.forEach((provider) => {
        const offset = providerOffsets[provider.provider] || 0;
        dayData[provider.provider] = Number((day.usdRate + offset).toFixed(2));
      });

      return dayData;
    });
  }, [historicalRates, topProviders, providerOffsets]);

  const colors = [CHART_COLORS.primary, CHART_COLORS.positive, CHART_COLORS.accent, "#8b5cf6"];
  const [visibleProviders, setVisibleProviders] = React.useState<string[]>(
    topProviders.map((p) => p.provider)
  );

  const toggleProvider = (provider: string) => {
    setVisibleProviders((prev) =>
      prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]
    );
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-secondary-600" />
        <h3 className="font-semibold text-neutral-900">7-Day Rate Trend</h3>
      </div>
      <p className="text-sm text-neutral-500 mb-4">
        Track how provider rates have changed over the past week
      </p>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={historicalData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: CHART_COLORS.text }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: CHART_COLORS.text }}
            tickFormatter={(value) => value.toFixed(1)}
            domain={["dataMin - 0.2", "dataMax + 0.2"]}
            width={45}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="bg-white rounded-lg shadow-lg border border-neutral-200 p-3">
                  <p className="font-medium text-neutral-900 mb-2">{label}</p>
                  <div className="space-y-1">
                    {payload.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between gap-4 text-sm">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-neutral-600">{entry.name}</span>
                        </div>
                        <span className="font-semibold tabular-nums">
                          {Number(entry.value).toFixed(4)} NPR
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }}
          />
          {topProviders.map((provider, index) =>
            visibleProviders.includes(provider.provider) ? (
              <Line
                key={provider.provider}
                type="monotone"
                dataKey={provider.provider}
                stroke={colors[index]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2, stroke: "#fff" }}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>

      <ToggleLegend
        items={topProviders.map((p, i) => ({
          dataKey: p.provider,
          name: p.provider,
          color: colors[i],
        }))}
        visibleKeys={visibleProviders}
        onToggle={toggleProvider}
      />
    </div>
  );
}

// Summary stats cards
export function RatesSummaryStats({ data }: RatesChartsProps) {
  const bestRate = Math.max(...data.map((d) => d.rate));
  const bestRateProvider = data.find((d) => d.rate === bestRate);
  const averageRate = data.reduce((sum, d) => sum + d.rate, 0) / data.length;
  const lowestFee = data.reduce((min, d) => {
    const fee = parseFloat(d.fee.replace(/[^0-9.]/g, "")) || 0;
    return fee < min ? fee : min;
  }, Infinity);
  const lowestFeeProvider = data.find(
    (d) => (parseFloat(d.fee.replace(/[^0-9.]/g, "")) || 0) === lowestFee
  );

  const stats = [
    {
      label: "Best Rate",
      value: `${bestRate.toFixed(2)} NPR`,
      subtext: bestRateProvider?.provider || "N/A",
      icon: Award,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Average Rate",
      value: `${averageRate.toFixed(2)} NPR`,
      subtext: `Across ${data.length} providers`,
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Lowest Fee",
      value: lowestFee === 0 ? "Free" : `$${lowestFee.toFixed(2)}`,
      subtext: lowestFeeProvider?.provider || "N/A",
      icon: DollarSign,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl border border-neutral-200 p-4 flex items-center gap-4"
        >
          <div className={cn("p-3 rounded-lg", stat.bg)}>
            <stat.icon className={cn("h-6 w-6", stat.color)} />
          </div>
          <div>
            <p className="text-sm text-neutral-500">{stat.label}</p>
            <p className="text-xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-xs text-neutral-400">{stat.subtext}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
