import type { Metadata } from "next";
import {
  Clock,
  RefreshCw,
  Download,
  AlertCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card";
import { Heading, Text } from "@/components/atoms/Typography";
import {
  fetchNRBForexRates,
  fetchNRBForexHistory,
  type NRBForexPayload,
} from "@/lib/api/nrb-forex";
import {
  ForexCharts,
  MultiCurrencyComparison,
} from "./_components/ForexCharts";

export const metadata: Metadata = {
  title: "Nepal Forex Rates - Live NRB Currency Exchange Rates NPR",
  description:
    "Live forex rates from Nepal Rastra Bank (NRB). Track USD, EUR, GBP, AUD rates vs NPR with official central bank rates updated daily.",
};

// Helper to get flag for currency (comprehensive list)
function getFlag(iso3: string): string {
  const flags: Record<string, string> = {
    // Major currencies
    USD: "🇺🇸",
    EUR: "🇪🇺",
    GBP: "🇬🇧",
    CHF: "🇨🇭",
    AUD: "🇦🇺",
    CAD: "🇨🇦",
    SGD: "🇸🇬",
    JPY: "🇯🇵",
    NZD: "🇳🇿",
    // Asian currencies
    CNY: "🇨🇳",
    INR: "🇮🇳",
    MYR: "🇲🇾",
    KRW: "🇰🇷",
    THB: "🇹🇭",
    HKD: "🇭🇰",
    TWD: "🇹🇼",
    PHP: "🇵🇭",
    IDR: "🇮🇩",
    VND: "🇻🇳",
    // Middle East currencies
    AED: "🇦🇪",
    SAR: "🇸🇦",
    QAR: "🇶🇦",
    KWD: "🇰🇼",
    BHD: "🇧🇭",
    OMR: "🇴🇲",
    JOD: "🇯🇴",
    ILS: "🇮🇱",
    // European currencies
    SEK: "🇸🇪",
    DKK: "🇩🇰",
    NOK: "🇳🇴",
    PLN: "🇵🇱",
    CZK: "🇨🇿",
    HUF: "🇭🇺",
    RUB: "🇷🇺",
    TRY: "🇹🇷",
    // Other currencies
    ZAR: "🇿🇦",
    BRL: "🇧🇷",
    MXN: "🇲🇽",
    ARS: "🇦🇷",
    CLP: "🇨🇱",
    PKR: "🇵🇰",
    BDT: "🇧🇩",
    LKR: "🇱🇰",
    NPR: "🇳🇵",
  };
  return flags[iso3] || "🏳️";
}

interface ForexRate {
  currency: string;
  name: string;
  flag: string;
  unit: number;
  buy: number;
  sell: number;
}

function transformNRBData(payload: NRBForexPayload): ForexRate[] {
  return payload.rates.map((rate) => ({
    currency: rate.currency.iso3,
    name: rate.currency.name,
    flag: getFlag(rate.currency.iso3),
    unit: rate.currency.unit,
    buy: parseFloat(rate.buy),
    sell: parseFloat(rate.sell),
  }));
}

export default async function ForexPage() {
  // Fetch live rates from NRB API
  let forexRates: ForexRate[] = [];
  let lastUpdated: string = new Date().toISOString();
  let isLive = false;
  let historicalData: {
    date: string;
    rates: { currency: string; buy: number; sell: number; unit: number }[];
  }[] = [];

  try {
    const nrbData = await fetchNRBForexRates();
    if (nrbData) {
      forexRates = transformNRBData(nrbData);
      lastUpdated = nrbData.published_on || nrbData.date;
      isLive = true;
    }

    // Fetch 30 days of historical data for charts
    const today = new Date();
    const monthAgo = new Date(today);
    monthAgo.setDate(monthAgo.getDate() - 30);
    const fromDate = monthAgo.toISOString().split("T")[0];
    const toDate = today.toISOString().split("T")[0];

    const nrbHistory = await fetchNRBForexHistory(fromDate, toDate, 35);
    historicalData = nrbHistory.map((payload) => ({
      date: payload.date,
      rates: payload.rates.map((rate) => ({
        currency: rate.currency.iso3,
        buy: parseFloat(rate.buy),
        sell: parseFloat(rate.sell),
        unit: rate.currency.unit,
      })),
    }));
  } catch (error) {
    console.error("Failed to fetch NRB rates:", error);
  }

  // Sort to show major currencies first
  const majorCurrencies = [
    "USD",
    "EUR",
    "GBP",
    "AUD",
    "CAD",
    "JPY",
    "CHF",
    "SGD",
  ];
  const sortedRates = [...forexRates].sort((a, b) => {
    const aIndex = majorCurrencies.indexOf(a.currency);
    const bIndex = majorCurrencies.indexOf(b.currency);
    if (aIndex === -1 && bIndex === -1) return 0;
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  const majorRates = sortedRates.slice(0, 8);

  // Calculate previous day rates for comparison
  const getPreviousDayRate = (currency: string): number | null => {
    if (historicalData.length < 2) return null;
    // Sort by date descending to get most recent days
    const sorted = [...historicalData].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    // Get second most recent day (index 1 is previous day)
    const previousDay = sorted[1];
    if (!previousDay) return null;
    const rate = previousDay.rates.find((r) => r.currency === currency);
    return rate ? rate.buy / rate.unit : null;
  };

  // Calculate change for each rate
  const ratesWithChange = sortedRates.map((rate) => {
    const currentRate = rate.buy / rate.unit;
    const previousRate = getPreviousDayRate(rate.currency);
    const change = previousRate ? currentRate - previousRate : null;
    const changePercent = previousRate ? ((change || 0) / previousRate) * 100 : null;
    return {
      ...rate,
      change,
      changePercent,
    };
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-neutral-50">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Heading level="h1" className="text-3xl text-white">
                    NRB Forex Rates
                  </Heading>
                  <Badge
                    variant={isLive ? "success" : "outline"}
                    className={isLive ? "bg-secondary-500" : "bg-white/20"}
                  >
                    {isLive ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-white mr-1 animate-pulse" />
                        Live
                      </>
                    ) : (
                      "Cached"
                    )}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Published: {new Date(lastUpdated).toLocaleDateString()}{" "}
                    {new Date(lastUpdated).toLocaleTimeString()}
                  </span>
                </div>
                <Text variant="small" className="mt-2 text-white/70">
                  Official exchange rates from Nepal Rastra Bank (NRB)
                </Text>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline-dark" size="sm">
                  <Download className="h-4 w-4" />
                  Download CSV
                </Button>
                <Button variant="outline-dark" size="sm">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* API Source Info */}
        {isLive && (
          <section className="bg-secondary-50 border-b border-secondary-200 py-3">
            <div className="container">
              <div className="flex items-center gap-2 text-sm text-secondary-700">
                <AlertCircle className="h-4 w-4" />
                <span>
                  Data fetched from official NRB API:{" "}
                  <code className="bg-secondary-100 px-1.5 py-0.5 rounded text-xs">
                    https://www.nrb.org.np/api/forex/v1/rates
                  </code>
                </span>
              </div>
            </div>
          </section>
        )}

        {/* Major Currencies - Horizontal Scrollable */}
        <section className="py-6">
          <div className="container">
            <Heading level="h3" className="mb-4">
              Major Currencies
            </Heading>
            <div className="flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {majorRates.map((rate) => (
                <Card key={rate.currency} hoverable className="shrink-0 w-60">
                  <CardContent className="">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{rate.flag}</span>
                      <div>
                        <Text variant="small" weight="semibold">
                          {rate.currency}
                        </Text>
                        {rate.unit > 1 && (
                          <Text variant="caption" color="muted">
                            /{rate.unit}
                          </Text>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <div className="bg-secondary-50 rounded px-2 py-1 text-center">
                        <Text
                          variant="caption"
                          color="muted"
                          className="text-[10px]"
                        >
                          Buy
                        </Text>
                        <Text
                          variant="small"
                          weight="semibold"
                          className="tabular-nums text-secondary-700"
                        >
                          {rate.buy.toFixed(2)}
                        </Text>
                      </div>
                      <div className="bg-red-50 rounded px-2 py-1 text-center">
                        <Text
                          variant="caption"
                          color="muted"
                          className="text-[10px]"
                        >
                          Sell
                        </Text>
                        <Text
                          variant="small"
                          weight="semibold"
                          className="tabular-nums text-red-700"
                        >
                          {rate.sell.toFixed(2)}
                        </Text>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Full Rates Table */}
        <section className="py-6">
          <div className="container">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>All Currency Rates</span>
                  <Badge variant="outline">
                    {ratesWithChange.length} currencies
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-6 py-3 text-left">
                        <Text variant="small" weight="semibold" color="muted">
                          Currency
                        </Text>
                      </th>
                      <th className="px-6 py-3 text-right">
                        <Text variant="small" weight="semibold" color="muted">
                          Unit
                        </Text>
                      </th>
                      <th className="px-6 py-3 text-right">
                        <Text variant="small" weight="semibold" color="muted">
                          Buying (NPR)
                        </Text>
                      </th>
                      <th className="px-6 py-3 text-right">
                        <Text variant="small" weight="semibold" color="muted">
                          Selling (NPR)
                        </Text>
                      </th>
                      <th className="px-6 py-3 text-right">
                        <Text variant="small" weight="semibold" color="muted">
                          Change (1D)
                        </Text>
                      </th>
                      <th className="px-6 py-3 text-right">
                        <Text variant="small" weight="semibold" color="muted">
                          Spread
                        </Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {ratesWithChange.map((rate) => {
                      const spread = (
                        ((rate.sell - rate.buy) / rate.buy) *
                        100
                      ).toFixed(2);
                      const isUp = rate.change !== null && rate.change > 0;
                      const isDown = rate.change !== null && rate.change < 0;
                      return (
                        <tr key={rate.currency} className="hover:bg-neutral-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{rate.flag}</span>
                              <div>
                                <Text weight="medium">{rate.currency}</Text>
                                <Text variant="caption" color="muted">
                                  {rate.name}
                                </Text>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Text className="tabular-nums">{rate.unit}</Text>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Text
                              weight="medium"
                              className="tabular-nums text-secondary-600"
                            >
                              {rate.buy.toFixed(2)}
                            </Text>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Text weight="medium" className="tabular-nums">
                              {rate.sell.toFixed(2)}
                            </Text>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {rate.changePercent !== null ? (
                              <div className={`inline-flex items-center gap-1 ${isUp ? "text-green-600" : isDown ? "text-red-600" : "text-neutral-500"}`}>
                                {isUp ? (
                                  <TrendingUp className="h-4 w-4" />
                                ) : isDown ? (
                                  <TrendingDown className="h-4 w-4" />
                                ) : (
                                  <Minus className="h-4 w-4" />
                                )}
                                <Text variant="small" weight="medium" className="tabular-nums">
                                  {isUp ? "+" : ""}{rate.changePercent.toFixed(2)}%
                                </Text>
                              </div>
                            ) : (
                              <Text variant="small" color="muted">-</Text>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Text
                              variant="small"
                              className="tabular-nums text-neutral-500"
                            >
                              {spread}%
                            </Text>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rate Trend Charts */}
        <section className="py-8 bg-white border-y border-neutral-200">
          <div className="container">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="h-6 w-6 text-primary-600" />
              <Heading level="h3">Rate Trends</Heading>
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <ForexCharts
                majorRates={majorRates}
                historicalData={historicalData}
              />
              <MultiCurrencyComparison
                rates={majorRates}
                historicalData={historicalData}
              />
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-8">
          <div className="container">
            <Card className="bg-primary-50 border-primary-200">
              <CardContent className="p-6">
                <Heading level="h4" className="mb-4 text-primary-900">
                  About NRB Exchange Rates
                </Heading>
                <div className="grid md:grid-cols-2 gap-6 text-sm text-primary-800">
                  <div>
                    <Text weight="semibold" className="mb-2">
                      Buying Rate
                    </Text>
                    <Text>
                      The rate at which banks buy foreign currency from you
                      (when you sell foreign currency to the bank).
                    </Text>
                  </div>
                  <div>
                    <Text weight="semibold" className="mb-2">
                      Selling Rate
                    </Text>
                    <Text>
                      The rate at which banks sell foreign currency to you (when
                      you buy foreign currency from the bank).
                    </Text>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-primary-200">
                  <Text variant="small" className="text-primary-700">
                    <strong>Data Source:</strong> These rates are fetched from
                    the official Nepal Rastra Bank (NRB) API at{" "}
                    <code className="bg-primary-100 px-1 rounded">
                      nrb.org.np/api/forex/v1/rates
                    </code>
                    . Rates are published daily by Nepal&apos;s central bank and
                    serve as reference rates for all commercial banks.
                  </Text>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
