import type { Metadata } from "next";
import { fetchNRBForexHistory } from "@/lib/api/nrb-forex";
import { HistoryPageClient } from "./_components/HistoryPageClient";

export const metadata: Metadata = {
  title: "Historical Exchange Rates Nepal - NRB Rate History",
  description:
    "View historical exchange rates from Nepal Rastra Bank. Analyze USD, EUR, GBP trends against NPR with interactive charts.",
};

export default async function HistoryPage() {
  // Fetch 90 days of historical data from NRB API
  const today = new Date();
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setDate(threeMonthsAgo.getDate() - 90);

  const fromDate = threeMonthsAgo.toISOString().split("T")[0];
  const toDate = today.toISOString().split("T")[0];

  let historicalData: {
    date: string;
    rates: { currency: string; buy: number; sell: number; unit: number }[];
  }[] = [];

  try {
    const nrbHistory = await fetchNRBForexHistory(fromDate, toDate, 100);
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
    console.error("Failed to fetch NRB history:", error);
  }

  return <HistoryPageClient historicalData={historicalData} />;
}
