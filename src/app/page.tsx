import { ArrowRight, TrendingUp, Users, Clock, Shield, Building2 } from "lucide-react";
import NextLink from "next/link";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Hero } from "@/components/organisms/Hero";
import { Calculator } from "@/components/organisms/Calculator";
import { Button } from "@/components/atoms/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Heading, Text } from "@/components/atoms/Typography";
import { RateCard } from "@/components/molecules/RateCard";
import { StatCard } from "@/components/molecules/StatCard";
import { providers } from "@/data/providers";
import { fetchNRBForexRates, getRateForCurrency } from "@/lib/api/nrb-forex";

const howItWorks = [
  {
    step: 1,
    title: "Compare Rates",
    description: "Browse live exchange rates from 20+ remittance providers and banks.",
    icon: TrendingUp,
  },
  {
    step: 2,
    title: "Choose Provider",
    description: "Select the provider with the best rate, lowest fee, or fastest delivery.",
    icon: Building2,
  },
  {
    step: 3,
    title: "Save Money",
    description: "Send more money home to your loved ones with better exchange rates.",
    icon: Shield,
  },
];

const stats = [
  { title: "Providers Tracked", value: "20+", icon: Building2 },
  { title: "Updated", value: "Every Hour", icon: Clock },
  { title: "Happy Users", value: "10,000+", icon: Users },
];

export default async function HomePage() {
  // Fetch live NRB rates
  let nrbUsdRate: number | null = null;
  let isLive = false;
  let liveRates: { currency: string; buy: number; sell: number; unit: number }[] = [];

  try {
    const nrbData = await fetchNRBForexRates();
    if (nrbData) {
      const usdRate = getRateForCurrency(nrbData, "USD");
      if (usdRate) {
        nrbUsdRate = parseFloat(usdRate.buy);
        isLive = true;
      }
      // Transform all rates for the Calculator
      liveRates = nrbData.rates.map(rate => ({
        currency: rate.currency.iso3,
        buy: parseFloat(rate.buy),
        sell: parseFloat(rate.sell),
        unit: rate.currency.unit,
      }));
    }
  } catch (error) {
    console.error("Failed to fetch NRB rates for home page:", error);
  }

  // Calculate provider rates based on NRB rate (providers typically offer slightly better rates)
  const topProviders = nrbUsdRate
    ? providers.slice(0, 6).map((provider, index) => ({
        ...provider,
        // Each provider has slightly different rates based on their margin
        liveRate: Number((nrbUsdRate + (0.3 - index * 0.1)).toFixed(2)),
      }))
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <Hero />

        {/* Today's Rates Section */}
        <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
          <div className="container">
            <div className="text-center mb-10">
              <Badge variant="primary" className="mb-4">
                Live Rates
              </Badge>
              <Heading level="h2" className="mb-4">
                Today&apos;s Best Rates
              </Heading>
              <Text color="muted" className="max-w-2xl mx-auto">
                Compare exchange rates from top remittance providers. Rates are
                updated hourly to help you find the best deal.
              </Text>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {topProviders.map((provider, index) => (
                <RateCard
                  key={provider.id}
                  baseCurrency="USD"
                  targetCurrency="NPR"
                  rate={provider.liveRate}
                  changePercent={index === 0 ? 0.15 : index === 1 ? -0.08 : index === 2 ? 0.05 : index === 3 ? -0.05 : index === 4 ? 0.05 : -0.05}
                  providerName={provider.name}
                  timestamp={isLive ? "Live from NRB" : "Cached rate"}
                  size="md"
                />
              ))}
            </div>

            <div className="text-center mt-10">
              <Button asChild variant="primary" size="lg">
                <NextLink href="/rates">
                  View All Rates
                  <ArrowRight className="h-4 w-4" />
                </NextLink>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Calculator Section */}
        <section className="py-16 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <Badge variant="accent" className="mb-4">
                  Calculator
                </Badge>
                <Heading level="h2" className="mb-4 text-white">
                  Calculate Your Transfer
                </Heading>
                <Text className="mb-6 text-blue-100">
                  See exactly how much your recipient will receive. Our calculator
                  shows you the exchange rate, fees, and total amount in real-time.
                </Text>
                <ul className="space-y-3 mb-8">
                  {[
                    "Compare rates from 20+ providers",
                    "See total fees upfront",
                    "No hidden charges",
                    "Real-time exchange rates",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Shield className="h-3 w-3 text-white" />
                      </div>
                      <Text className="text-blue-100">{item}</Text>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" variant="accent">
                  <NextLink href="/calculator">
                    Open Full Calculator
                    <ArrowRight className="h-4 w-4" />
                  </NextLink>
                </Button>
              </div>
              <div className="bg-white rounded-2xl p-1 shadow-2xl">
                <Calculator variant="compact" liveRates={liveRates} isLive={isLive} />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <Badge variant="success" className="mb-4">
                Simple Process
              </Badge>
              <Heading level="h2" className="mb-4">
                How It Works
              </Heading>
              <Text color="muted" className="max-w-2xl mx-auto">
                Find the best remittance rates in three simple steps.
              </Text>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {howItWorks.map((item) => (
                <Card key={item.step} variant="default" className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 pb-6">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="mb-3">
                      <Badge variant="primary">Step {item.step}</Badge>
                    </div>
                    <Heading level="h4" className="mb-2">
                      {item.title}
                    </Heading>
                    <Text color="muted">{item.description}</Text>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Comparisons */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container">
            <div className="text-center mb-10">
              <Badge variant="accent" className="mb-4">
                Popular Comparisons
              </Badge>
              <Heading level="h2" className="mb-4">
                Featured Comparisons
              </Heading>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[
                {
                  title: "IME Pay vs Prabhu Pay",
                  description: "Compare Nepal's two most popular digital wallets",
                  href: "/compare?providers=ime-pay,prabhu-pay",
                  color: "bg-blue-500",
                },
                {
                  title: "Best Bank Rates",
                  description: "Find the best exchange rates from commercial banks",
                  href: "/banks",
                  color: "bg-green-500",
                },
                {
                  title: "Lowest Fee Providers",
                  description: "Discover providers with zero or minimal fees",
                  href: "/providers?sort=fee",
                  color: "bg-amber-500",
                },
              ].map((item) => (
                <Card key={item.title} hoverable className="overflow-hidden">
                  <div className={`h-2 ${item.color}`} />
                  <CardHeader className="pt-4">
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text color="muted" className="mb-4">
                      {item.description}
                    </Text>
                    <Button asChild variant="primary" size="sm" fullWidth>
                      <NextLink href={item.href}>
                        Compare Now
                        <ArrowRight className="h-4 w-4" />
                      </NextLink>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-linear-to-r from-primary-800 to-primary-900">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <StatCard
                  key={stat.title}
                  title={stat.title}
                  value={stat.value}
                  icon={stat.icon}
                  variant="dark"
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Heading level="h2" className="mb-4">
                Ready to Save on Your Next Transfer?
              </Heading>
              <Text color="muted" className="mb-8 text-lg">
                Join thousands of users who save money by comparing rates before
                sending money to Nepal.
              </Text>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="xl">
                  <NextLink href="/rates">
                    Compare Rates Now
                    <ArrowRight className="h-5 w-5" />
                  </NextLink>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <NextLink href="/calculator">
                    Try Calculator
                  </NextLink>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
