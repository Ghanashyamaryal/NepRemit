import type { Provider, Bank } from "@/types";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NepRemit",
    url: "https://nepremit.com",
    logo: "https://nepremit.com/logo.png",
    description: "Compare Nepal remittance rates and fees from 20+ providers",
    sameAs: [
      "https://twitter.com/nepremit",
      "https://facebook.com/nepremit",
      "https://linkedin.com/company/nepremit",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@nepremit.com",
    },
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NepRemit",
    url: "https://nepremit.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://nepremit.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateProviderSchema(provider: Provider) {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: provider.name,
    description: provider.description,
    url: provider.website,
    logo: provider.logo,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: provider.rating,
      reviewCount: provider.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: provider.fees.flatFee === 0 ? "Free" : `$${provider.fees.flatFee}`,
    areaServed: provider.countries.map((country) => ({
      "@type": "Country",
      name: country,
    })),
  };
}

export function generateBankSchema(bank: Bank) {
  return {
    "@context": "https://schema.org",
    "@type": "BankOrCreditUnion",
    name: bank.name,
    alternateName: bank.shortName,
    url: bank.website,
    logo: bank.logo,
    address: {
      "@type": "PostalAddress",
      addressLocality: bank.headquarters,
      addressCountry: "NP",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: bank.branches * 10, // Estimate
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
