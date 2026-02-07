import type { Metadata } from "next";
import { Filter, ArrowRight } from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Heading, Text } from "@/components/atoms/Typography";
import { SearchBar } from "@/components/molecules/SearchBar";
import { ProviderCard } from "@/components/molecules/ProviderCard";
import { providers } from "@/data/providers";

export const metadata: Metadata = {
  title: "All Remittance Providers in Nepal - Complete Directory",
  description:
    "Browse all money transfer services operating in Nepal. Detailed profiles, rates, fees, and reviews for IME, Prabhu, Western Union, and more.",
};

export default function ProvidersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-neutral-50">
        {/* Page Header */}
        <section className="bg-white border-b border-neutral-200 py-8">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <Heading level="h1" className="mb-2">
                  Remittance Providers
                </Heading>
                <Text color="muted">
                  Browse all {providers.length}+ providers operating in Nepal
                </Text>
              </div>
              <div className="flex items-center gap-3">
                <SearchBar placeholder="Search providers..." className="w-64" />
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Filters */}
        <section className="bg-white border-b border-neutral-200 py-4">
          <div className="container">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <Text variant="small" weight="medium" className="shrink-0">
                Quick filters:
              </Text>
              {["All Providers", "Zero Fees", "Instant Transfer", "Bank Deposit", "Cash Pickup"].map(
                (filter) => (
                  <Badge
                    key={filter}
                    variant={filter === "All Providers" ? "primary" : "outline"}
                    className="cursor-pointer whitespace-nowrap"
                  >
                    {filter}
                  </Badge>
                )
              )}
            </div>
          </div>
        </section>

        {/* Provider Grid */}
        <section className="py-8">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  id={provider.id}
                  name={provider.name}
                  logo={provider.logo}
                  rating={provider.rating}
                  reviewCount={provider.reviewCount}
                  rate={provider.currentRate}
                  fee={
                    provider.fees.flatFee === 0
                      ? "Free"
                      : `$${provider.fees.flatFee}`
                  }
                  speed={provider.speed}
                  features={provider.features}
                  isVerified={provider.isVerified}
                />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-10">
              <Button variant="outline" size="lg">
                Load More Providers
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
