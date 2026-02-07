"use client";

import * as React from "react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { banks } from "@/data/banks";
import { BankHero, BankFilters, BankGrid, type BankFilter, type ViewMode } from "./_components";
import type { Bank } from "@/types";

export default function BanksPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState<BankFilter>("all");
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");

  // Filter banks based on search and filter
  const filteredBanks = React.useMemo(() => {
    let result = [...banks];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (bank) =>
          bank.name.toLowerCase().includes(query) ||
          bank.shortName.toLowerCase().includes(query) ||
          bank.swiftCode.toLowerCase().includes(query) ||
          bank.headquarters.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    switch (activeFilter) {
      case "top5":
        // Sort by branches and take top 5
        result = [...result].sort((a, b) => b.branches - a.branches).slice(0, 5);
        break;
      case "government":
        // In Nepal, Rastriya Banijya Bank and Nepal Bank are government banks
        // For demo, we'll filter by specific IDs or simulate
        result = result.filter((bank) =>
          ["nepal-bank", "rastriya-banijya-bank"].includes(bank.id) ||
          bank.name.toLowerCase().includes("rastriya") ||
          bank.name.toLowerCase().includes("nepal bank")
        );
        break;
      case "private":
        // All commercial banks except government ones
        result = result.filter(
          (bank) =>
            !["nepal-bank", "rastriya-banijya-bank"].includes(bank.id) &&
            !bank.name.toLowerCase().includes("rastriya")
        );
        break;
      case "remittance":
        result = result.filter((bank) => bank.hasRemittance);
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, activeFilter]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <BankHero
          totalBanks={banks.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Content */}
        <section className="py-8 md:py-12">
          <div className="container">
            {/* Filters */}
            <BankFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalCount={banks.length}
              filteredCount={filteredBanks.length}
              className="mb-8"
            />

            {/* Bank Grid */}
            <BankGrid banks={filteredBanks} viewMode={viewMode} />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 bg-white border-t border-neutral-100">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                Why Choose Nepal Commercial Banks?
              </h2>
              <p className="text-neutral-600 mb-8">
                All commercial banks in Nepal are regulated by Nepal Rastra Bank (NRB),
                ensuring safe and reliable banking services for international remittances.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-white border border-primary-100">
                  <div className="h-12 w-12 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">NRB Regulated</h3>
                  <p className="text-sm text-neutral-600">
                    All banks are licensed and monitored by Nepal Rastra Bank
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary-50 to-white border border-secondary-100">
                  <div className="h-12 w-12 rounded-xl bg-secondary-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-6 w-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Fast Transfers</h3>
                  <p className="text-sm text-neutral-600">
                    Receive money within minutes through SWIFT and remittance partners
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-50 to-white border border-accent-100">
                  <div className="h-12 w-12 rounded-xl bg-accent-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Wide Network</h3>
                  <p className="text-sm text-neutral-600">
                    Branches across Nepal with multiple remittance partners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
