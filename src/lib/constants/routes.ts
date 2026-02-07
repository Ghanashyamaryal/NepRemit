export const ROUTES = {
  home: "/",
  rates: "/rates",
  compare: "/compare",
  providers: "/providers",
  providerDetail: (slug: string) => `/providers/${slug}`,
  banks: "/banks",
  bankDetail: (slug: string) => `/banks/${slug}`,
  calculator: "/calculator",
  forex: "/forex",
  faq: "/faq",
  blog: "/blog",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const NAVIGATION_ITEMS = [
  { name: "Rates", href: ROUTES.rates },
  { name: "Compare", href: ROUTES.compare },
  { name: "Providers", href: ROUTES.providers },
  { name: "Banks", href: ROUTES.banks },
  { name: "Calculator", href: ROUTES.calculator },
] as const;
