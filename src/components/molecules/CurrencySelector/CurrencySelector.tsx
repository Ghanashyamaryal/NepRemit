"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import { cn } from "@/lib/utils";

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
}

export interface CurrencySelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  currencies: Currency[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  showFlag?: boolean;
  showSymbol?: boolean;
  showName?: boolean;
}

const CurrencySelector = React.forwardRef<
  HTMLButtonElement,
  CurrencySelectorProps
>(
  (
    {
      value,
      onValueChange,
      currencies,
      placeholder = "Select currency",
      disabled,
      error,
      className,
      showFlag = true,
      showSymbol = false,
      showName = false,
    },
    ref
  ) => {
    const selectedCurrency = currencies.find((c) => c.code === value);

    return (
      <Select value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectTrigger ref={ref} error={error} className={cn("w-full", className)}>
          <SelectValue placeholder={placeholder}>
            {selectedCurrency && (
              <span className="flex items-center gap-2">
                {showFlag && selectedCurrency.flag && (
                  <span className="text-lg">{selectedCurrency.flag}</span>
                )}
                <span className="font-medium">{selectedCurrency.code}</span>
                {showSymbol && (
                  <span className="text-neutral-500">
                    ({selectedCurrency.symbol})
                  </span>
                )}
                {showName && (
                  <span className="text-neutral-500 hidden sm:inline">
                    - {selectedCurrency.name}
                  </span>
                )}
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {currencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              <span className="flex items-center gap-2">
                {showFlag && currency.flag && (
                  <span className="text-lg">{currency.flag}</span>
                )}
                <span className="font-medium">{currency.code}</span>
                <span className="text-neutral-500">
                  {currency.symbol} - {currency.name}
                </span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
);

CurrencySelector.displayName = "CurrencySelector";

export { CurrencySelector };
