"use client";

import * as React from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  size?: "sm" | "md" | "lg";
  showClearButton?: boolean;
  showSearchButton?: boolean;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      className,
      value,
      onChange,
      onSearch,
      onClear,
      size = "md",
      showClearButton = true,
      showSearchButton = false,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(value || "");
    const displayValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (value === undefined) {
        setInternalValue("");
      }
      onChange?.("");
      onClear?.();
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(displayValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        onSearch?.(displayValue);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={cn("relative flex items-center gap-2", className)}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <Input
            ref={ref}
            type="search"
            value={displayValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            inputSize={size}
            className="pl-10 pr-10"
            {...props}
          />
          {showClearButton && displayValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {showSearchButton && (
          <Button type="submit" size={size}>
            Search
          </Button>
        )}
      </form>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };
