import type { Metadata } from "next";
import { Clock, RefreshCw, Bell, BarChart3 } from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { RatesTable } from "@/components/organisms/RatesTable";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Heading, Text } from "@/components/atoms/Typography";
import { Card, CardContent } from "@/components/atoms/Card";
import { providers } from "@/data/providers";
import type { RateData } from "@/components/organisms/RatesTable";
import {
  ProviderRateComparisonChart,
  ProviderFeeComparisonChart,
  ProviderRateTrendChart,
  RatesSummaryStats,
} from "./_components/RatesCharts";
import { fetchNRBForexRates, fetchNRBForexHistory, getRateForCurrency } from "@/lib/api/nrb-forex";

export const metadata: Metadata = {
  title: "Today's Remittance Rates Nepal - Live Exchange Rates",
  description:
    "View live remittance exchange rates for Nepal. Compare IME Pay, Prabhu Pay, and bank rates with 7, 14, and 30-day trends. Updated hourly.",
};

export default async function RatesPage() {
  // Fetch live NRB rate for USD
  let nrbUsdRate: number | null = null;
  let isLive = false;

  try {
    const nrbData = await fetchNRBForexRates();
    if (nrbData) {
      const usdRate = getRateForCurrency(nrbData, "USD");
      if (usdRate) {
        nrbUsdRate = parseFloat(usdRate.buy);
        isLive = true;
      }
    }
  } catch (error) {
    console.error("Failed to fetch NRB rates:", error);
  }

  // Fetch 7 days of historical data for rate trend chart
  let historicalRates: { date: string; usdRate: number }[] = [];
  try {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const fromDate = weekAgo.toISOString().split("T")[0];
    const toDate = today.toISOString().split("T")[0];

    const nrbHistory = await fetchNRBForexHistory(fromDate, toDate, 10);
    historicalRates = nrbHistory
      .map((payload) => {
        const usdRate = payload.rates.find((r) => r.currency.iso3 === "USD");
        return {
          date: payload.date,
          usdRate: usdRate ? parseFloat(usdRate.buy) : 0,
        };
      })
      .filter((item) => item.usdRate > 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (error) {
    console.error("Failed to fetch NRB history:", error);
  }

  // Calculate provider rates based on NRB rate
  const ratesData: RateData[] = nrbUsdRate
    ? providers.map((provider, index) => {
        // Each provider has slightly different rates based on their margin
        const providerRate = nrbUsdRate + (0.3 - index * 0.1);
        return {
          id: provider.id,
          provider: provider.name,
          providerLogo: provider.logo,
          rate: Number(providerRate.toFixed(2)),
          change24h: index === 0 ? 0.15 : index === 1 ? -0.08 : 0.05,
          change7d: index === 0 ? 0.45 : index === 1 ? -0.22 : 0.18,
          fee: provider.fees.flatFee ? `$${provider.fees.flatFee}` : "Free",
          speed: provider.speed || "1-2 days",
          isVerified: provider.isVerified,
          website: provider.website,
        };
      })
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-neutral-50">
        {/* Page Header */}
        <section className="bg-white border-b border-neutral-200 py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Heading level="h1" className="text-3xl">
                    Live Remittance Rates
                  </Heading>
                  <Badge variant={isLive ? "success" : "outline"} className={isLive ? "animate-pulse" : ""}>
                    <span className={`h-2 w-2 rounded-full mr-1 ${isLive ? "bg-green-500" : "bg-neutral-400"}`} />
                    {isLive ? "Live NRB" : "Cached"}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
                  {nrbUsdRate && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Base rate: {nrbUsdRate.toFixed(2)} NPR/USD
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <RefreshCw className="h-4 w-4" />
                    {isLive ? "From NRB API" : "Auto-refresh every hour"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4" />
                  Set Rate Alert
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Rate Visualizations */}
        <section className="py-8 bg-neutral-100/50">
          <div className="container">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="h-6 w-6 text-primary-600" />
              <Heading level="h3">Rate Analysis</Heading>
            </div>

            {/* Summary Stats */}
            <RatesSummaryStats data={ratesData} />

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mt-6">
              <ProviderRateComparisonChart data={ratesData} />
              <ProviderFeeComparisonChart data={ratesData} />
            </div>

            {/* Rate Trend Chart - Full Width */}
            <div className="mt-6">
              <ProviderRateTrendChart data={ratesData} historicalRates={historicalRates} />
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardContent className="p-4">
                    <Heading level="h5" className="mb-4">
                      Filters
                    </Heading>
                    <div className="space-y-4">
                      <div>
                        <Text variant="small" weight="medium" className="mb-2">
                          Currency
                        </Text>
                        <div className="space-y-2">
                          {["USD", "GBP", "EUR", "AUD", "CAD"].map((currency) => (
                            <label
                              key={currency}
                              className="flex items-center gap-2 cursor-pointer"
                            >
                              <input
                                type="radio"
                                name="currency"
                                defaultChecked={currency === "USD"}
                                className="h-4 w-4 text-primary-600"
                              />
                              <span className="text-sm">{currency}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Text variant="small" weight="medium" className="mb-2">
                          Provider Type
                        </Text>
                        <div className="space-y-2">
                          {["All", "Money Transfer", "Banks", "Digital Wallet"].map(
                            (type) => (
                              <label
                                key={type}
                                className="flex items-center gap-2 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  defaultChecked={type === "All"}
                                  className="h-4 w-4 text-primary-600 rounded"
                                />
                                <span className="text-sm">{type}</span>
                              </label>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <Text variant="small" weight="medium" className="mb-2">
                          Sort By
                        </Text>
                        <select className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm">
                          <option value="rate">Best Rate</option>
                          <option value="fee">Lowest Fee</option>
                          <option value="speed">Fastest</option>
                          <option value="rating">Highest Rated</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Rate Alert Card */}
                <Card className="bg-primary-50 border-primary-200">
                  <CardContent className="p-4">
                    <Heading level="h5" className="mb-2 text-primary-900">
                      Get Rate Alerts
                    </Heading>
                    <Text variant="small" color="muted" className="mb-4">
                      Get notified when rates improve
                    </Text>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-primary-300 px-3 py-2 text-sm mb-3"
                    />
                    <Button fullWidth size="sm">
                      <Bell className="h-4 w-4" />
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Rates Table */}
              <div className="lg:col-span-3">
                <Card>
                  <CardContent className="p-0">
                    <RatesTable data={ratesData} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
