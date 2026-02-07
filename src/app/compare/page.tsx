import type { Metadata } from "next";
import NextLink from "next/link";
import { Plus, X, Check, ArrowRight } from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { Heading, Text } from "@/components/atoms/Typography";
import { SearchBar } from "@/components/molecules/SearchBar";
import { providers } from "@/data/providers";

export const metadata: Metadata = {
  title: "Compare Remittance Providers Nepal - Side-by-Side Rates",
  description:
    "Compare IME Pay, Prabhu Pay, and all banks side-by-side. See rates, fees, transfer speed, and user reviews to find the best remittance service.",
};

export default function ComparePage() {
  const selectedProviders = providers.slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-neutral-50">
        {/* Page Header */}
        <section className="bg-white border-b border-neutral-200 py-8">
          <div className="container">
            <Heading level="h1" className="mb-2">
              Compare Providers
            </Heading>
            <Text color="muted" className="max-w-2xl">
              Compare remittance providers side-by-side to find the best rates,
              fees, and features for sending money to Nepal.
            </Text>
          </div>
        </section>

        {/* Provider Selection */}
        <section className="py-8">
          <div className="container">
            {/* Search */}
            <div className="mb-8">
              <SearchBar
                placeholder="Search providers to compare..."
                className="max-w-md"
              />
            </div>

            {/* Provider Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {providers.map((provider) => {
                const isSelected = selectedProviders.some(
                  (p) => p.id === provider.id
                );
                return (
                  <Card
                    key={provider.id}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? "ring-2 ring-primary-500 bg-primary-50"
                        : "hover:shadow-md"
                    }`}
                    padding="sm"
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-neutral-100 flex items-center justify-center font-semibold text-neutral-600 shrink-0">
                        {provider.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Text weight="medium" className="truncate">
                          {provider.name}
                        </Text>
                        <Text variant="caption" color="muted">
                          {provider.currentRate?.toFixed(2)} NPR
                        </Text>
                      </div>
                      {isSelected ? (
                        <Check className="h-5 w-5 text-primary-600" />
                      ) : (
                        <Plus className="h-5 w-5 text-neutral-400" />
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Comparison Table</CardTitle>
                  <Badge variant="primary">
                    {selectedProviders.length} providers selected
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-6 py-4 text-left">
                        <Text variant="small" weight="semibold" color="muted">
                          Feature
                        </Text>
                      </th>
                      {selectedProviders.map((provider) => (
                        <th key={provider.id} className="px-6 py-4 text-center min-w-[180px]">
                          <div className="flex flex-col items-center gap-2">
                            <div className="h-12 w-12 rounded-lg bg-neutral-100 flex items-center justify-center font-bold text-lg">
                              {provider.name.charAt(0)}
                            </div>
                            <Text weight="semibold">{provider.name}</Text>
                            <button className="text-neutral-400 hover:text-neutral-600">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    <tr>
                      <td className="px-6 py-4">
                        <Text weight="medium">Exchange Rate</Text>
                      </td>
                      {selectedProviders.map((provider, index) => (
                        <td
                          key={provider.id}
                          className={`px-6 py-4 text-center ${
                            index === 0 ? "bg-secondary-50" : ""
                          }`}
                        >
                          <Text weight="semibold" className="text-lg tabular-nums">
                            {provider.currentRate?.toFixed(2)}
                          </Text>
                          {index === 0 && (
                            <Badge variant="success" size="sm" className="mt-1">
                              Best
                            </Badge>
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <Text weight="medium">Transfer Fee</Text>
                      </td>
                      {selectedProviders.map((provider) => (
                        <td key={provider.id} className="px-6 py-4 text-center">
                          <Text>
                            {provider.fees.flatFee === 0
                              ? "Free"
                              : `$${provider.fees.flatFee}`}
                          </Text>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <Text weight="medium">Transfer Speed</Text>
                      </td>
                      {selectedProviders.map((provider) => (
                        <td key={provider.id} className="px-6 py-4 text-center">
                          <Text>{provider.speed}</Text>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <Text weight="medium">Min Amount</Text>
                      </td>
                      {selectedProviders.map((provider) => (
                        <td key={provider.id} className="px-6 py-4 text-center">
                          <Text>${provider.limits.minAmount}</Text>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <Text weight="medium">Max Amount</Text>
                      </td>
                      {selectedProviders.map((provider) => (
                        <td key={provider.id} className="px-6 py-4 text-center">
                          <Text>${provider.limits.maxAmount.toLocaleString()}</Text>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <Text weight="medium">Rating</Text>
                      </td>
                      {selectedProviders.map((provider) => (
                        <td key={provider.id} className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-accent-500">★</span>
                            <Text>{provider.rating.toFixed(1)}</Text>
                            <Text variant="caption" color="muted">
                              ({provider.reviewCount.toLocaleString()})
                            </Text>
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4">
                        <Text weight="medium">Key Features</Text>
                      </td>
                      {selectedProviders.map((provider) => (
                        <td key={provider.id} className="px-6 py-4">
                          <ul className="space-y-1">
                            {provider.features.slice(0, 3).map((feature) => (
                              <li key={feature} className="flex items-center gap-1 text-sm">
                                <Check className="h-3 w-3 text-secondary-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="px-6 py-4" />
                      {selectedProviders.map((provider) => (
                        <td key={provider.id} className="px-6 py-4 text-center">
                          <Button asChild fullWidth>
                            <NextLink href={`/providers/${provider.slug}`}>
                              View Details
                              <ArrowRight className="h-4 w-4" />
                            </NextLink>
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
