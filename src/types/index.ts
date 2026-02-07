// Currency Types
export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag?: string;
  decimals: number;
}

// Exchange Rate Types
export interface ExchangeRate {
  id: string;
  baseCurrency: string;
  targetCurrency: string;
  buyRate: number;
  sellRate: number;
  midRate: number;
  timestamp: string;
  source: "NRB" | "PROVIDER" | "BANK";
}

export interface RateHistory {
  date: string;
  rate: number;
  change: number;
}

// Provider Types
export type TransferMethod = "bank_transfer" | "card" | "wallet" | "cash";
export type DeliveryMethod = "bank_deposit" | "cash_pickup" | "mobile_wallet" | "home_delivery";

export interface FeeStructure {
  type: "flat" | "percentage" | "tiered";
  flatFee?: number;
  percentageFee?: number;
  tiers?: FeeTier[];
  minFee?: number;
  maxFee?: number;
}

export interface FeeTier {
  minAmount: number;
  maxAmount: number;
  fee: number;
  feeType: "flat" | "percentage";
}

export interface TransferLimits {
  minAmount: number;
  maxAmount: number;
  dailyLimit?: number;
  monthlyLimit?: number;
  currency: string;
}

export interface Provider {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  description: string;
  website: string;
  countries: string[];
  transferMethods: TransferMethod[];
  deliveryMethods: DeliveryMethod[];
  fees: FeeStructure;
  limits: TransferLimits;
  rating: number;
  reviewCount: number;
  established: number;
  licensedBy: string[];
  features: string[];
  promoCode?: string;
  isActive: boolean;
  isVerified?: boolean;
  currentRate?: number;
  speed?: string;
}

// Bank Types
export interface Bank {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  logo?: string;
  swiftCode: string;
  type: "commercial" | "development" | "microfinance";
  website: string;
  headquarters: string;
  branches: number;
  hasRemittance: boolean;
  remittancePartners: string[];
  exchangeRates?: ExchangeRate[];
  lastUpdated?: string;
}

// Comparison Types
export interface ComparisonResult {
  providerId: string;
  providerName: string;
  providerLogo?: string;
  sendAmount: number;
  sendCurrency: string;
  receiveAmount: number;
  receiveCurrency: string;
  exchangeRate: number;
  totalFees: number;
  feeBreakdown: FeeBreakdownItem[];
  deliveryTime: string;
  deliveryMethods: DeliveryMethod[];
  savings?: number;
  isBestRate: boolean;
  isCheapest: boolean;
  isFastest: boolean;
}

export interface FeeBreakdownItem {
  name: string;
  amount: number;
  type: "fixed" | "percentage";
}

// Calculator Types
export interface CalculatorInput {
  sendAmount: number;
  sendCurrency: string;
  receiveCurrency: string;
  transferMethod?: TransferMethod;
  deliveryMethod?: DeliveryMethod;
}

export interface CalculatorResult {
  input: CalculatorInput;
  results: ComparisonResult[];
  bestOverall: string;
  timestamp: string;
}

// API Types
export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    perPage: number;
    lastUpdated: string;
  };
  error?: ApiError;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// NRB Forex Types
export interface NRBForexRate {
  currency: {
    iso3: string;
    name: string;
    unit: number;
  };
  buy: string;
  sell: string;
  date: string;
}

export interface NRBForexResponse {
  status: {
    code: number;
  };
  data: {
    payload: NRBForexRate[];
  };
}
