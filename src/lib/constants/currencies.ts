import type { Currency } from "@/types";

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", decimals: 2 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", decimals: 2 },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧", decimals: 2 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", decimals: 2 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", decimals: 2 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", decimals: 0 },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭", decimals: 2 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", decimals: 2 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", decimals: 2 },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", decimals: 2 },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰", decimals: 2 },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷", decimals: 0 },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾", decimals: 2 },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", decimals: 2 },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", decimals: 2 },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦", decimals: 2 },
  { code: "QAR", name: "Qatari Riyal", symbol: "ر.ق", flag: "🇶🇦", decimals: 2 },
  { code: "KWD", name: "Kuwaiti Dinar", symbol: "د.ك", flag: "🇰🇼", decimals: 3 },
  { code: "BHD", name: "Bahraini Dinar", symbol: "ب.د", flag: "🇧🇭", decimals: 3 },
  { code: "NPR", name: "Nepali Rupee", symbol: "Rs", flag: "🇳🇵", decimals: 2 },
];

export const SEND_CURRENCIES = CURRENCIES.filter((c) => c.code !== "NPR");
export const RECEIVE_CURRENCIES = CURRENCIES.filter((c) => c.code === "NPR");

export const getCurrency = (code: string): Currency | undefined =>
  CURRENCIES.find((c) => c.code === code);

export const formatCurrency = (
  amount: number,
  currencyCode: string,
  options?: Intl.NumberFormatOptions
): string => {
  const currency = getCurrency(currencyCode);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: currency?.decimals ?? 2,
    maximumFractionDigits: currency?.decimals ?? 2,
    ...options,
  }).format(amount);
};
