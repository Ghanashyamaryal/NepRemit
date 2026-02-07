"use client";

import * as React from "react";
import { ArrowDownUp, ArrowRight, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import { Button } from "@/components/atoms/Button";
import { Text, Heading } from "@/components/atoms/Typography";
import { AmountInput } from "@/components/molecules/AmountInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import { cn } from "@/lib/utils";
import type { Currency } from "@/components/molecules/CurrencySelector";

// Extended currency list with symbols
const allCurrencies: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "QAR", name: "Qatari Riyal", symbol: "﷼", flag: "🇶🇦" },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  { code: "KRW", name: "Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "NPR", name: "Nepali Rupee", symbol: "Rs", flag: "🇳🇵" },
];

// Default providers with fallback rates
const defaultProviders = [
  { id: "ime", name: "IME Pay", rateOffset: 0.25, fee: 0 },
  { id: "prabhu", name: "Prabhu Pay", rateOffset: 0.10, fee: 2 },
  { id: "western-union", name: "Western Union", rateOffset: -0.20, fee: 5 },
  { id: "remitly", name: "Remitly", rateOffset: -0.05, fee: 3.99 },
];

export interface LiveRate {
  currency: string;
  buy: number;
  sell: number;
  unit: number;
}

export interface CalculatorProps {
  className?: string;
  variant?: "full" | "compact";
  onCalculate?: (result: CalculationResult) => void;
  /** Live rates from NRB API - if not provided, uses fallback rates */
  liveRates?: LiveRate[];
  /** Whether rates are live from API */
  isLive?: boolean;
}

export interface CalculationResult {
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  provider: string;
  rate: number;
  fee: number;
}

const Calculator = React.forwardRef<HTMLDivElement, CalculatorProps>(
  ({ className, variant = "full", onCalculate, liveRates, isLive = false }, ref) => {
    const [sendAmount, setSendAmount] = React.useState("1000");
    const [sendCurrency, setSendCurrency] = React.useState("USD");
    const [receiveCurrency, setReceiveCurrency] = React.useState("NPR");
    const [selectedProvider, setSelectedProvider] = React.useState("ime");

    // Get base rate from live rates or use fallback
    const getBaseRate = React.useCallback((currency: string): number => {
      if (liveRates) {
        const liveRate = liveRates.find(r => r.currency === currency);
        if (liveRate) {
          // Adjust for unit (e.g., JPY is per 100 units)
          return liveRate.buy / liveRate.unit;
        }
      }
      // Fallback rates
      const fallbackRates: Record<string, number> = {
        USD: 133.50, EUR: 145.20, GBP: 169.80, AUD: 87.45, CAD: 98.30,
        SGD: 99.80, JPY: 0.895, CHF: 151.20, AED: 36.35, SAR: 35.55,
        QAR: 36.65, KWD: 435.50, MYR: 30.15, KRW: 0.0985, INR: 1.60,
      };
      return fallbackRates[currency] || 133.50;
    }, [liveRates]);

    const baseRate = getBaseRate(sendCurrency);

    // Calculate provider rates based on base rate
    const providers = defaultProviders.map(p => ({
      ...p,
      rate: Number((baseRate + p.rateOffset).toFixed(2)),
    }));

    const provider = providers.find((p) => p.id === selectedProvider);
    const rate = provider?.rate || baseRate;
    const fee = provider?.fee || 0;
    const sendAmountNum = parseFloat(sendAmount) || 0;
    const receiveAmount = (sendAmountNum - fee) * rate;

    // Filter currencies that have rates available
    const availableCurrencies = allCurrencies.filter(c =>
      c.code === "NPR" || getBaseRate(c.code) > 0
    );

    const handleSwap = () => {
      setSendCurrency(receiveCurrency);
      setReceiveCurrency(sendCurrency);
    };

    const handleCalculate = () => {
      if (onCalculate && provider) {
        onCalculate({
          sendAmount: sendAmountNum,
          sendCurrency,
          receiveAmount,
          receiveCurrency,
          provider: provider.name,
          rate,
          fee,
        });
      }
    };

    if (variant === "compact") {
      return (
        <Card ref={ref} className={cn("", className)}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Quick Calculator
              {isLive && (
                <span className="inline-flex items-center gap-1 text-xs font-normal text-green-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Live
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AmountInput
              label="You Send"
              amount={sendAmount}
              currency={sendCurrency}
              onAmountChange={setSendAmount}
              onCurrencyChange={setSendCurrency}
              currencies={availableCurrencies.filter((c) => c.code !== "NPR")}
              size="md"
            />
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <span>Rate: {rate.toFixed(2)}</span>
                <span>|</span>
                <span>Fee: ${fee.toFixed(2)}</span>
              </div>
            </div>
            <AmountInput
              label="Recipient Gets"
              amount={receiveAmount.toFixed(2)}
              currency={receiveCurrency}
              currencies={[availableCurrencies.find((c) => c.code === "NPR")!]}
              readOnly
              size="md"
            />
            <Button fullWidth onClick={handleCalculate}>
              See Full Breakdown
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card ref={ref} className={cn("", className)}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Transfer Calculator</span>
            {isLive && (
              <span className="inline-flex items-center gap-1 text-xs font-normal text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live NRB Rates
              </span>
            )}
          </CardTitle>
          <Text variant="small" color="muted">
            Calculate how much your recipient will receive
          </Text>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Send Amount */}
          <AmountInput
            label="You Send"
            amount={sendAmount}
            currency={sendCurrency}
            onAmountChange={setSendAmount}
            onCurrencyChange={setSendCurrency}
            currencies={availableCurrencies.filter((c) => c.code !== "NPR")}
            size="lg"
          />

          {/* Swap Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleSwap}
              className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
            >
              <ArrowDownUp className="h-5 w-5 text-neutral-600" />
            </button>
          </div>

          {/* Receive Amount */}
          <AmountInput
            label="Recipient Gets"
            amount={receiveAmount.toFixed(2)}
            currency={receiveCurrency}
            currencies={[availableCurrencies.find((c) => c.code === "NPR")!]}
            readOnly
            size="lg"
          />

          {/* Provider Selection */}
          <div className="space-y-2">
            <Text variant="small" weight="medium" color="muted">
              Select Provider
            </Text>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    <span className="flex items-center justify-between w-full">
                      <span>{p.name}</span>
                      <span className="text-neutral-500 ml-4">
                        {p.rate.toFixed(2)} NPR | ${p.fee} fee
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Breakdown */}
          <div className="rounded-lg bg-neutral-50 p-4 space-y-3">
            <div className="flex justify-between">
              <Text variant="small" color="muted">
                Exchange Rate
              </Text>
              <Text variant="small" weight="medium" className="tabular-nums">
                1 {sendCurrency} = {rate.toFixed(4)} {receiveCurrency}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="small" color="muted">
                Transfer Fee
              </Text>
              <Text variant="small" weight="medium" className="tabular-nums">
                ${fee.toFixed(2)} {sendCurrency}
              </Text>
            </div>
            <hr className="border-neutral-200" />
            <div className="flex justify-between">
              <Text variant="small" weight="semibold">
                Total to Pay
              </Text>
              <Text weight="semibold" className="tabular-nums">
                ${sendAmountNum.toFixed(2)} {sendCurrency}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="small" weight="semibold" color="primary">
                Recipient Gets
              </Text>
              <Heading level="h5" color="primary" className="tabular-nums">
                Rs {receiveAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Heading>
            </div>
          </div>

          {/* Info Notice */}
          <div className="flex items-start gap-2 text-xs text-neutral-500">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <span>
              Rates are indicative and may vary. Final rate will be confirmed by
              the provider at the time of transfer.
            </span>
          </div>

          {/* CTA */}
          <Button fullWidth size="lg" onClick={handleCalculate}>
            Compare All Providers
            <ArrowRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    );
  }
);

Calculator.displayName = "Calculator";

export { Calculator };
