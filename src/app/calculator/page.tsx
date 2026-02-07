import type { Metadata } from "next";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Calculator } from "@/components/organisms/Calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Heading, Text } from "@/components/atoms/Typography";
import { providers } from "@/data/providers";
import { fetchNRBForexRates, getRateForCurrency } from "@/lib/api/nrb-forex";

export const metadata: Metadata = {
  title: "Remittance Calculator Nepal - Calculate Transfer Fees & Rates",
  description:
    "Calculate exactly how much money will be received in Nepal. Compare fees, exchange rates, and total costs across all providers.",
};

export default async function CalculatorPage() {
  // Fetch live NRB rates
  let isLive = false;
  let liveRates: { currency: string; buy: number; sell: number; unit: number }[] = [];
  let nrbUsdRate: number | null = null;

  try {
    const nrbData = await fetchNRBForexRates();
    if (nrbData) {
      isLive = true;
      liveRates = nrbData.rates.map(rate => ({
        currency: rate.currency.iso3,
        buy: parseFloat(rate.buy),
        sell: parseFloat(rate.sell),
        unit: rate.currency.unit,
      }));
      const usdRate = getRateForCurrency(nrbData, "USD");
      if (usdRate) {
        nrbUsdRate = parseFloat(usdRate.buy);
      }
    }
  } catch (error) {
    console.error("Failed to fetch NRB rates:", error);
  }

  // Calculate provider rates based on NRB rate
  const topProviders = nrbUsdRate
    ? providers.slice(0, 3).map((provider, index) => ({
        ...provider,
        liveRate: Number((nrbUsdRate + (0.25 - index * 0.15)).toFixed(2)),
      }))
    : [];
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-neutral-50 py-8">
        <div className="container">
          <div className="mb-8">
            <Heading level="h1" className="mb-2">
              Transfer Calculator
            </Heading>
            <Text color="muted">
              Calculate exactly how much your recipient will receive in Nepal
            </Text>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-2">
              <Calculator variant="full" liveRates={liveRates} isLive={isLive} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Amounts */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Amounts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {[100, 250, 500, 1000, 2000, 5000].map((amount) => (
                      <button
                        key={amount}
                        className="p-2 text-sm font-medium rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Best Rates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Best Rates Today
                    {isLive && (
                      <span className="inline-flex items-center gap-1 text-xs font-normal text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                        Live
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {topProviders.map((provider, index) => (
                    <div
                      key={provider.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-neutral-50"
                    >
                      <div className="flex items-center gap-2">
                        {index === 0 && (
                          <Badge variant="success" size="sm">
                            Best
                          </Badge>
                        )}
                        <Text variant="small" weight="medium">
                          {provider.name}
                        </Text>
                      </div>
                      <Text variant="small" className="tabular-nums font-semibold">
                        {provider.liveRate.toFixed(2)} NPR
                      </Text>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-primary-50 border-primary-200">
                <CardHeader>
                  <CardTitle className="text-primary-900">Pro Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-primary-800">
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold">•</span>
                      Send larger amounts to get better rates
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold">•</span>
                      Bank transfers usually have lower fees
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold">•</span>
                      Check rates during business hours
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary-600 font-bold">•</span>
                      Set rate alerts for better deals
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <Card className="bg-neutral-100 border-neutral-200">
                <CardContent className="p-4">
                  <Text variant="caption" color="muted">
                    <strong>Disclaimer:</strong> Exchange rates are indicative and
                    may vary at the time of actual transfer. Fees and delivery
                    times may differ based on payment method and delivery option.
                    Always verify with the provider before sending.
                  </Text>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
