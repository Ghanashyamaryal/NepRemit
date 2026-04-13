"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { refreshForexRates } from "../_actions";

interface ForexRate {
  currency: string;
  name: string;
  unit: number;
  buy: number;
  sell: number;
  change: number | null;
  changePercent: number | null;
}

interface ForexActionsProps {
  rates: ForexRate[];
  publishedAt: string;
}

function escapeCsv(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function buildCsv(rates: ForexRate[], publishedAt: string): string {
  const header = [
    "Currency",
    "Name",
    "Unit",
    "Buying (NPR)",
    "Selling (NPR)",
    "Change (1D)",
    "Change % (1D)",
    "Spread %",
  ];

  const rows = rates.map((r) => {
    const spread = (((r.sell - r.buy) / r.buy) * 100).toFixed(2);
    return [
      r.currency,
      r.name,
      String(r.unit),
      r.buy.toFixed(4),
      r.sell.toFixed(4),
      r.change !== null ? r.change.toFixed(4) : "",
      r.changePercent !== null ? r.changePercent.toFixed(2) : "",
      spread,
    ]
      .map(escapeCsv)
      .join(",");
  });

  const preamble = `# NRB Forex Rates\n# Published: ${publishedAt}\n# Source: https://www.nrb.org.np/api/forex/v1/rates\n`;
  return preamble + header.map(escapeCsv).join(",") + "\n" + rows.join("\n") + "\n";
}

export function ForexActions({ rates, publishedAt }: ForexActionsProps) {
  const router = useRouter();
  const [isRefreshing, startRefresh] = React.useTransition();

  const handleDownload = () => {
    const csv = buildCsv(rates, publishedAt);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date(publishedAt).toISOString().slice(0, 10);
    a.href = url;
    a.download = `nrb-forex-${dateStr}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    startRefresh(async () => {
      await refreshForexRates();
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline-dark"
        size="sm"
        onClick={handleDownload}
        disabled={rates.length === 0}
      >
        <Download className="h-4 w-4" />
        Download CSV
      </Button>
      <Button
        variant="outline-dark"
        size="sm"
        onClick={handleRefresh}
        disabled={isRefreshing}
      >
        <RefreshCw
          className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
        />
        {isRefreshing ? "Refreshing..." : "Refresh"}
      </Button>
    </div>
  );
}
