"use client";

import * as React from "react";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  RefreshCw,
  ChevronDown,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";
import {
  RateTrendChart,
  MultiCurrencyChart,
  ChartExportButtons,
  CHART_COLORS,
} from "@/components/molecules/Charts";

interface HistoricalRate {
  currency: string;
  buy: number;
  sell: number;
  unit: number;
}

interface HistoricalData {
  date: string;
  rates: HistoricalRate[];
}

interface HistoryPageClientProps {
  historicalData: HistoricalData[];
}

const quickRanges = [
  { label: "7D", days: 7 },
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
];

const currencies = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
];

const currencyConfig = [
  { key: "USD", name: "US Dollar", color: CHART_COLORS.primary },
  { key: "EUR", name: "Euro", color: CHART_COLORS.positive },
  { key: "GBP", name: "British Pound", color: CHART_COLORS.accent },
  { key: "AUD", name: "Australian Dollar", color: "#8b5cf6" },
];

export function HistoryPageClient({ historicalData }: HistoryPageClientProps) {
  const [selectedRange, setSelectedRange] = React.useState(30);
  const [selectedCurrency, setSelectedCurrency] = React.useState("USD");
  const [showCurrencyDropdown, setShowCurrencyDropdown] = React.useState(false);
  const [showComparison, setShowComparison] = React.useState(false);

  // Transform historical data for the selected currency and range
  const data = React.useMemo(() => {
    const sortedData = [...historicalData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const slicedData = sortedData.slice(-selectedRange);

    return slicedData.map((day, index) => {
      const currencyRate = day.rates.find((r) => r.currency === selectedCurrency);
      const rate = currencyRate ? currencyRate.buy / currencyRate.unit : 0;

      const prevDay = index > 0 ? slicedData[index - 1] : null;
      const prevRate = prevDay?.rates.find((r) => r.currency === selectedCurrency);
      const prevRateValue = prevRate ? prevRate.buy / prevRate.unit : rate;
      const change = rate - prevRateValue;

      return {
        date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        fullDate: day.date,
        rate: Number(rate.toFixed(2)),
        change: Number(change.toFixed(2)),
      };
    });
  }, [historicalData, selectedCurrency, selectedRange]);

  // Generate multi-currency comparison data
  const multiCurrencyData = React.useMemo(() => {
    const sortedData = [...historicalData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const slicedData = sortedData.slice(-selectedRange);

    return slicedData.map((day) => {
      const result: { date: string; [key: string]: string | number } = {
        date: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      };

      currencyConfig.forEach((config) => {
        const rate = day.rates.find((r) => r.currency === config.key);
        if (rate) {
          result[config.key] = Number((rate.buy / rate.unit).toFixed(2));
        }
      });

      return result;
    });
  }, [historicalData, selectedRange]);

  const handleExportCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Rate,Change\n" +
      data.map((row) => `${row.fullDate},${row.rate},${row.change}`).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `${selectedCurrency}_NPR_rates.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentRate = data[data.length - 1]?.rate || 0;
  const previousRate = data[0]?.rate || 0;
  const rateChange = currentRate - previousRate;
  const percentChange = previousRate ? ((rateChange / previousRate) * 100).toFixed(2) : "0";
  const isUp = rateChange > 0;

  const stats = {
    average: data.length > 0 ? (data.reduce((sum, d) => sum + d.rate, 0) / data.length).toFixed(2) : "0",
    highest: data.length > 0 ? Math.max(...data.map((d) => d.rate)).toFixed(2) : "0",
    lowest: data.length > 0 ? Math.min(...data.map((d) => d.rate)).toFixed(2) : "0",
    volatility: data.length > 0
      ? Math.sqrt(data.reduce((sum, d) => sum + Math.pow(d.rate - currentRate, 2), 0) / data.length).toFixed(2)
      : "0",
  };

  const selectedCurrencyData = currencies.find((c) => c.code === selectedCurrency);
  const hasData = historicalData.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                Historical Exchange Rates
              </h1>
              <p className="text-lg text-white/80">
                Official NRB rates - Analyze trends and make informed decisions.
              </p>
              {hasData && (
                <Badge variant="success" className="mt-4 bg-white/20">
                  <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse" />
                  Live from NRB API
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="py-6 bg-white border-b border-neutral-200 sticky top-0 z-20">
          <div className="container">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 max-w-6xl mx-auto">
              {/* Left - Currency Selector */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <button
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    className="flex items-center gap-3 px-4 py-2.5 bg-neutral-100 rounded-xl hover:bg-neutral-200 transition-colors"
                  >
                    <span className="text-2xl">{selectedCurrencyData?.flag}</span>
                    <div className="text-left">
                      <div className="font-semibold text-neutral-900">{selectedCurrency}/NPR</div>
                      <div className="text-xs text-neutral-500">{selectedCurrencyData?.name}</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-neutral-500" />
                  </button>

                  {showCurrencyDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl border border-neutral-200 shadow-lg py-2 z-30">
                      {currencies.map((currency) => (
                        <button
                          key={currency.code}
                          onClick={() => {
                            setSelectedCurrency(currency.code);
                            setShowCurrencyDropdown(false);
                          }}
                          className={cn(
                            "w-full flex items-center gap-3 px-4 py-2 hover:bg-neutral-50",
                            selectedCurrency === currency.code && "bg-primary-50"
                          )}
                        >
                          <span className="text-xl">{currency.flag}</span>
                          <div className="text-left">
                            <div className="font-medium text-neutral-900">{currency.code}</div>
                            <div className="text-xs text-neutral-500">{currency.name}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Current Rate Display */}
                {hasData && (
                  <div className="hidden sm:block">
                    <div className="text-2xl font-bold text-neutral-900">
                      {currentRate.toFixed(2)} <span className="text-sm font-normal text-neutral-500">NPR</span>
                    </div>
                    <div className={cn("flex items-center text-sm", isUp ? "text-green-600" : "text-red-600")}>
                      {isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      <span>{Math.abs(rateChange).toFixed(2)} ({percentChange}%)</span>
                      <span className="text-neutral-500 ml-1">vs {selectedRange}d ago</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Right - Date Range */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-neutral-100 rounded-lg p-1">
                  {quickRanges.map((range) => (
                    <button
                      key={range.days}
                      onClick={() => setSelectedRange(range.days)}
                      className={cn(
                        "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                        selectedRange === range.days
                          ? "bg-white text-primary-600 shadow-sm"
                          : "text-neutral-600 hover:text-neutral-900"
                      )}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>

                <Button variant="outline" size="sm" className="hidden md:flex">
                  <Calendar className="h-4 w-4 mr-2" />
                  Custom
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-8">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              {!hasData ? (
                <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                  <p className="text-neutral-500">No historical data available. Please try again later.</p>
                </div>
              ) : (
                <>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <h2 className="text-lg font-semibold text-neutral-900">
                          {showComparison ? "Multi-Currency Comparison" : `${selectedCurrency} to NPR Exchange Rate`}
                        </h2>
                        <button
                          onClick={() => setShowComparison(!showComparison)}
                          className={cn(
                            "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                            showComparison
                              ? "bg-primary-100 text-primary-700"
                              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                          )}
                        >
                          {showComparison ? "Single Currency" : "Compare Currencies"}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <ChartExportButtons onExportCSV={handleExportCSV} />
                      </div>
                    </div>

                    {showComparison ? (
                      <MultiCurrencyChart data={multiCurrencyData} currencies={currencyConfig} height={320} />
                    ) : (
                      <RateTrendChart
                        data={data}
                        dataKey="rate"
                        height={320}
                        showGrid={true}
                        showAverage={true}
                        color={CHART_COLORS.primary}
                      />
                    )}
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl border border-neutral-200 p-4">
                      <div className="flex items-center gap-2 text-neutral-500 text-sm mb-1">
                        <BarChart3 className="h-4 w-4" />
                        Average Rate
                      </div>
                      <div className="text-2xl font-bold text-neutral-900">{stats.average}</div>
                    </div>
                    <div className="bg-white rounded-xl border border-neutral-200 p-4">
                      <div className="flex items-center gap-2 text-neutral-500 text-sm mb-1">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Highest
                      </div>
                      <div className="text-2xl font-bold text-green-600">{stats.highest}</div>
                    </div>
                    <div className="bg-white rounded-xl border border-neutral-200 p-4">
                      <div className="flex items-center gap-2 text-neutral-500 text-sm mb-1">
                        <TrendingDown className="h-4 w-4 text-red-500" />
                        Lowest
                      </div>
                      <div className="text-2xl font-bold text-red-600">{stats.lowest}</div>
                    </div>
                    <div className="bg-white rounded-xl border border-neutral-200 p-4">
                      <div className="flex items-center gap-2 text-neutral-500 text-sm mb-1">
                        <Minus className="h-4 w-4" />
                        Volatility
                      </div>
                      <div className="text-2xl font-bold text-neutral-900">±{stats.volatility}</div>
                    </div>
                  </div>

                  {/* Data Table */}
                  <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
                      <h3 className="font-semibold text-neutral-900">Daily Rates (NRB Official)</h3>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={handleExportCSV}>
                          <Download className="h-4 w-4 mr-2" />
                          CSV
                        </Button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-neutral-50">
                          <tr>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                              Rate (NPR)
                            </th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                              Change
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                          {[...data].reverse().slice(0, 10).map((row) => (
                            <tr key={row.fullDate} className="hover:bg-neutral-50">
                              <td className="px-6 py-3 text-sm text-neutral-900">{row.fullDate}</td>
                              <td className="px-6 py-3 text-sm font-medium text-neutral-900 text-right tabular-nums">
                                {row.rate.toFixed(2)}
                              </td>
                              <td className="px-6 py-3 text-right">
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 text-sm font-medium",
                                    row.change > 0 ? "text-green-600" : row.change < 0 ? "text-red-600" : "text-neutral-500"
                                  )}
                                >
                                  {row.change > 0 ? (
                                    <TrendingUp className="h-3 w-3" />
                                  ) : row.change < 0 ? (
                                    <TrendingDown className="h-3 w-3" />
                                  ) : null}
                                  {row.change > 0 ? "+" : ""}
                                  {row.change.toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {data.length > 10 && (
                      <div className="px-6 py-4 border-t border-neutral-200 text-center">
                        <Button variant="outline" size="sm">
                          Show All {data.length} Records
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Trend Analysis */}
        {hasData && (
          <section className="py-8 bg-white border-t border-neutral-100">
            <div className="container">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-xl font-bold text-neutral-900 mb-6">Trend Analysis</h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500">Trend</div>
                        <div className="font-semibold text-neutral-900">
                          {isUp ? "Upward" : rateChange < 0 ? "Downward" : "Stable"}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600">
                      The {selectedCurrency}/NPR rate has {isUp ? "increased" : "decreased"} by{" "}
                      {Math.abs(Number(percentChange))}% over the selected period.
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500">Volatility</div>
                        <div className="font-semibold text-neutral-900">
                          {Number(stats.volatility) < 0.5 ? "Low" : Number(stats.volatility) < 1 ? "Moderate" : "High"}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Price fluctuations have been{" "}
                      {Number(stats.volatility) < 0.5 ? "minimal" : Number(stats.volatility) < 1 ? "moderate" : "significant"},
                      with a standard deviation of ±{stats.volatility}.
                    </p>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <div className="text-sm text-neutral-500">Best Time to Send</div>
                        <div className="font-semibold text-neutral-900">
                          {currentRate >= Number(stats.average) ? "Now" : "Wait"}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Current rate is {currentRate >= Number(stats.average) ? "above" : "below"} the period average.{" "}
                      {currentRate >= Number(stats.average) ? "Good time to transfer." : "Consider waiting for better rates."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
