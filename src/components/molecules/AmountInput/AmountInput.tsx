"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/Select";
import { Text } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import type { Currency } from "../CurrencySelector";

export interface AmountInputProps {
  amount?: string;
  currency?: string;
  onAmountChange?: (amount: string) => void;
  onCurrencyChange?: (currency: string) => void;
  currencies: Currency[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

const AmountInput = React.forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      amount,
      currency,
      onAmountChange,
      onCurrencyChange,
      currencies,
      label,
      placeholder = "0.00",
      disabled,
      error,
      className,
      readOnly,
      size = "md",
    },
    ref
  ) => {
    const selectedCurrency = currencies.find((c) => c.code === currency);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      // Allow only numbers and decimal point
      if (/^\d*\.?\d*$/.test(value)) {
        onAmountChange?.(value);
      }
    };

    const sizeClasses = {
      sm: "h-10",
      md: "h-12",
      lg: "h-14",
    };

    const inputSizeClasses = {
      sm: "text-lg",
      md: "text-xl",
      lg: "text-2xl",
    };

    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <Text variant="small" weight="medium" color="muted">
            {label}
          </Text>
        )}
        <div
          className={cn(
            "flex items-center rounded-lg border bg-white overflow-hidden transition-colors",
            error ? "border-error" : "border-neutral-300 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20",
            disabled && "opacity-50 cursor-not-allowed",
            sizeClasses[size]
          )}
        >
          {/* Amount Input */}
          <div className="flex-1 flex items-center px-4">
            {selectedCurrency && (
              <span className="text-neutral-500 mr-2">
                {selectedCurrency.symbol}
              </span>
            )}
            <input
              ref={ref}
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              className={cn(
                "w-full bg-transparent outline-none font-semibold tabular-nums",
                inputSizeClasses[size],
                readOnly && "cursor-default"
              )}
            />
          </div>

          {/* Currency Selector */}
          <div className="border-l border-neutral-200">
            <Select
              value={currency}
              onValueChange={onCurrencyChange}
              disabled={disabled}
            >
              <SelectTrigger
                className={cn(
                  "border-0 rounded-none bg-neutral-50 focus:ring-0 focus:ring-offset-0 min-w-[100px]",
                  sizeClasses[size]
                )}
              >
                <SelectValue placeholder="Currency">
                  {selectedCurrency && (
                    <span className="flex items-center gap-2">
                      {selectedCurrency.flag && (
                        <span>{selectedCurrency.flag}</span>
                      )}
                      <span className="font-medium">{selectedCurrency.code}</span>
                    </span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    <span className="flex items-center gap-2">
                      {curr.flag && <span>{curr.flag}</span>}
                      <span className="font-medium">{curr.code}</span>
                      <span className="text-neutral-500">- {curr.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {error && (
          <Text variant="small" color="error">
            {error}
          </Text>
        )}
      </div>
    );
  }
);

AmountInput.displayName = "AmountInput";

export { AmountInput };
