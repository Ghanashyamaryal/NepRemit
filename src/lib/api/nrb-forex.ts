/**
 * NRB Forex API Integration
 * Official API from Nepal Rastra Bank: https://www.nrb.org.np/api-docs-v1/
 */

export interface NRBCurrency {
  iso3: string;
  name: string;
  unit: number;
}

export interface NRBRate {
  currency: NRBCurrency;
  buy: string;
  sell: string;
}

export interface NRBForexPayload {
  date: string;
  published_on: string;
  modified_on: string;
  rates: NRBRate[];
}

export interface NRBForexResponse {
  status: {
    code: number;
  };
  errors: unknown[];
  params: {
    page: number;
    per_page: number;
    from: string;
    to: string;
  };
  pagination: {
    page: number;
    pages: number;
    per_page: number;
    total: number;
  };
  data: {
    payload: NRBForexPayload[];
  };
}

const NRB_API_BASE = "https://www.nrb.org.np/api/forex/v1";

/**
 * Get date in YYYY-MM-DD format
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Fetch latest forex rates from NRB
 * Tries current date first, then goes back up to 7 days to find available rates
 */
export async function fetchNRBForexRates(): Promise<NRBForexPayload | null> {
  try {
    // Try to get rates from the last 7 days (to handle weekends/holidays)
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const fromDate = formatDate(weekAgo);
    const toDate = formatDate(today);

    const url = `${NRB_API_BASE}/rates?from=${fromDate}&to=${toDate}&per_page=10&page=1`;

    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("NRB API error:", response.status, response.statusText);
      return null;
    }

    const data: NRBForexResponse = await response.json();

    if (data.status.code !== 200) {
      console.error("NRB API returned error code:", data.status.code, data.errors);
      return null;
    }

    if (!data.data.payload || data.data.payload.length === 0) {
      console.error("NRB API returned no data");
      return null;
    }

    // Return the most recent rate (first in the list)
    return data.data.payload[0];
  } catch (error) {
    console.error("Failed to fetch NRB forex rates:", error);
    return null;
  }
}

/**
 * Fetch forex rates for a date range
 * @param fromDate - Start date in YYYY-MM-DD format
 * @param toDate - End date in YYYY-MM-DD format
 * @param perPage - Number of results per page (max 100)
 */
export async function fetchNRBForexHistory(
  fromDate: string,
  toDate: string,
  perPage = 30
): Promise<NRBForexPayload[]> {
  try {
    // Ensure perPage is within valid range
    const validPerPage = Math.min(Math.max(1, perPage), 100);

    const url = `${NRB_API_BASE}/rates?from=${fromDate}&to=${toDate}&per_page=${validPerPage}&page=1`;

    const response = await fetch(url, {
      next: { revalidate: 86400 }, // Cache for 24 hours
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("NRB History API error:", response.status);
      return [];
    }

    const data: NRBForexResponse = await response.json();

    if (data.status.code !== 200 || !data.data.payload) {
      return [];
    }

    return data.data.payload;
  } catch (error) {
    console.error("Failed to fetch NRB forex history:", error);
    return [];
  }
}

/**
 * Get exchange rate for a specific currency
 */
export function getRateForCurrency(
  payload: NRBForexPayload,
  currencyCode: string
): NRBRate | undefined {
  return payload.rates.find(
    (rate) => rate.currency.iso3.toUpperCase() === currencyCode.toUpperCase()
  );
}

/**
 * Common currencies with their display info
 */
export const COMMON_CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾" },
  { code: "KRW", name: "Korean Won", flag: "🇰🇷" },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦" },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦" },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "BHD", name: "Bahraini Dinar", flag: "🇧🇭" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
];
