"use client";

import * as React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { cn } from "@/lib/utils";

// Color constants following the standards
export const CHART_COLORS = {
  positive: "#16a34a", // Green - up/positive
  negative: "#dc2626", // Red - down/negative
  neutral: "#3b82f6", // Blue - neutral
  primary: "#0284c7", // Primary blue
  secondary: "#059669", // Secondary green
  accent: "#f59e0b", // Accent orange
  grid: "#e5e7eb", // Grid lines
  text: "#6b7280", // Axis text
};

// Custom tooltip component with full precision
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: string;
  formatter?: (value: number, name: string) => string;
  labelFormatter?: (label: string) => string;
}

export function CustomTooltip({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
}: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-neutral-200 p-3 min-w-[150px]">
      <p className="text-sm font-medium text-neutral-900 mb-2">
        {labelFormatter ? labelFormatter(label || "") : label}
      </p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-neutral-600">{entry.name}</span>
            </div>
            <span className="text-sm font-semibold text-neutral-900 tabular-nums">
              {formatter
                ? formatter(entry.value, entry.name)
                : entry.value.toFixed(4)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Toggle-able Legend component
interface LegendItem {
  dataKey: string;
  name: string;
  color: string;
}

interface ToggleLegendProps {
  items: LegendItem[];
  visibleKeys: string[];
  onToggle: (dataKey: string) => void;
}

export function ToggleLegend({ items, visibleKeys, onToggle }: ToggleLegendProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
      {items.map((item) => {
        const isVisible = visibleKeys.includes(item.dataKey);
        return (
          <button
            key={item.dataKey}
            onClick={() => onToggle(item.dataKey)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all",
              isVisible
                ? "bg-neutral-100 text-neutral-900"
                : "bg-neutral-50 text-neutral-400 line-through"
            )}
          >
            <span
              className={cn(
                "w-3 h-3 rounded-full transition-opacity",
                !isVisible && "opacity-30"
              )}
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </button>
        );
      })}
    </div>
  );
}

// Rate Trend Line Chart
interface RateTrendChartProps {
  data: Array<{
    date: string;
    rate: number;
    [key: string]: string | number;
  }>;
  dataKey?: string;
  height?: number;
  showGrid?: boolean;
  showAverage?: boolean;
  color?: string;
  className?: string;
}

export function RateTrendChart({
  data,
  dataKey = "rate",
  height = 300,
  showGrid = true,
  showAverage = false,
  color = CHART_COLORS.neutral,
  className,
}: RateTrendChartProps) {
  const average = React.useMemo(() => {
    if (!showAverage || !data.length) return 0;
    return data.reduce((sum, d) => sum + (d[dataKey] as number), 0) / data.length;
  }, [data, dataKey, showAverage]);

  const minRate = Math.min(...data.map((d) => d[dataKey] as number));
  const maxRate = Math.max(...data.map((d) => d[dataKey] as number));
  const padding = (maxRate - minRate) * 0.1;

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS.grid}
              vertical={false}
            />
          )}
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: CHART_COLORS.text }}
            tickMargin={10}
          />
          <YAxis
            domain={[minRate - padding, maxRate + padding]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: CHART_COLORS.text }}
            tickFormatter={(value) => value.toFixed(2)}
            width={50}
          />
          <Tooltip
            content={
              <CustomTooltip
                formatter={(value) => `${value.toFixed(4)} NPR`}
                labelFormatter={(label) => `Date: ${label}`}
              />
            }
          />
          {showAverage && (
            <ReferenceLine
              y={average}
              stroke={CHART_COLORS.accent}
              strokeDasharray="5 5"
              label={{
                value: `Avg: ${average.toFixed(2)}`,
                position: "right",
                fill: CHART_COLORS.accent,
                fontSize: 11,
              }}
            />
          )}
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${dataKey})`}
            activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Multi-currency comparison chart
interface MultiCurrencyChartProps {
  data: Array<{
    date: string;
    [key: string]: string | number;
  }>;
  currencies: Array<{
    key: string;
    name: string;
    color: string;
  }>;
  height?: number;
  className?: string;
}

export function MultiCurrencyChart({
  data,
  currencies,
  height = 300,
  className,
}: MultiCurrencyChartProps) {
  const [visibleKeys, setVisibleKeys] = React.useState<string[]>(
    currencies.map((c) => c.key)
  );

  const toggleVisibility = (key: string) => {
    setVisibleKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_COLORS.grid}
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: CHART_COLORS.text }}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: CHART_COLORS.text }}
            tickFormatter={(value) => value.toFixed(2)}
            width={50}
          />
          <Tooltip
            content={
              <CustomTooltip
                formatter={(value) => `${value.toFixed(4)} NPR`}
                labelFormatter={(label) => `Date: ${label}`}
              />
            }
          />
          {currencies.map(
            (currency) =>
              visibleKeys.includes(currency.key) && (
                <Line
                  key={currency.key}
                  type="monotone"
                  dataKey={currency.key}
                  name={currency.name}
                  stroke={currency.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                />
              )
          )}
        </LineChart>
      </ResponsiveContainer>
      <ToggleLegend
        items={currencies.map((c) => ({
          dataKey: c.key,
          name: c.name,
          color: c.color,
        }))}
        visibleKeys={visibleKeys}
        onToggle={toggleVisibility}
      />
    </div>
  );
}

// Provider comparison bar chart
interface ProviderComparisonChartProps {
  data: Array<{
    provider: string;
    rate: number;
    fee: number;
    [key: string]: string | number;
  }>;
  height?: number;
  className?: string;
}

export function ProviderComparisonChart({
  data,
  height = 300,
  className,
}: ProviderComparisonChartProps) {
  const [visibleKeys, setVisibleKeys] = React.useState<string[]>(["rate", "fee"]);

  const toggleVisibility = (key: string) => {
    setVisibleKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Sort by rate descending
  const sortedData = [...data].sort((a, b) => b.rate - a.rate);

  const maxRate = Math.max(...data.map((d) => d.rate));
  const bestRate = maxRate;

  return (
    <div className={cn("w-full", className)}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 80, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_COLORS.grid}
            horizontal={false}
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: CHART_COLORS.text }}
            tickFormatter={(value) => value.toFixed(2)}
          />
          <YAxis
            type="category"
            dataKey="provider"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: CHART_COLORS.text }}
            width={70}
          />
          <Tooltip
            content={
              <CustomTooltip
                formatter={(value, name) =>
                  name === "Rate" ? `${value.toFixed(4)} NPR` : `$${value.toFixed(2)}`
                }
              />
            }
          />
          {visibleKeys.includes("rate") && (
            <Bar
              dataKey="rate"
              name="Rate"
              fill={CHART_COLORS.primary}
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              {sortedData.map((entry, index) => (
                <rect
                  key={index}
                  fill={entry.rate === bestRate ? CHART_COLORS.positive : CHART_COLORS.primary}
                />
              ))}
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
      <ToggleLegend
        items={[
          { dataKey: "rate", name: "Exchange Rate", color: CHART_COLORS.primary },
          { dataKey: "fee", name: "Transfer Fee", color: CHART_COLORS.accent },
        ]}
        visibleKeys={visibleKeys}
        onToggle={toggleVisibility}
      />
    </div>
  );
}

// Rate Change Indicator Chart (mini sparkline)
interface SparklineChartProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
}

export function SparklineChart({
  data,
  width = 80,
  height = 30,
  className,
}: SparklineChartProps) {
  const chartData = data.map((value, index) => ({ index, value }));
  const trend = data.length > 1 ? data[data.length - 1] - data[0] : 0;
  const color =
    trend > 0 ? CHART_COLORS.positive : trend < 0 ? CHART_COLORS.negative : CHART_COLORS.neutral;

  return (
    <div className={cn("inline-block", className)}>
      <ResponsiveContainer width={width} height={height}>
        <LineChart data={chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// Export button component for charts
interface ExportButtonProps {
  onExportCSV?: () => void;
  onExportPNG?: () => void;
  className?: string;
}

export function ChartExportButtons({ onExportCSV, onExportPNG, className }: ExportButtonProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {onExportCSV && (
        <button
          onClick={onExportCSV}
          className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
        >
          Export CSV
        </button>
      )}
      {onExportPNG && (
        <button
          onClick={onExportPNG}
          className="px-3 py-1.5 text-xs font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
        >
          Export PNG
        </button>
      )}
    </div>
  );
}
