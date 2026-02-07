"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  CreditCard,
  Building2,
  Calculator,
  Globe,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

type FAQCategory = "general" | "rates" | "fees" | "providers" | "banks" | "calculator" | "forex";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

const categories: { id: FAQCategory; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "General", icon: HelpCircle },
  { id: "rates", label: "Rates", icon: TrendingUp },
  { id: "fees", label: "Fees", icon: CreditCard },
  { id: "providers", label: "Providers", icon: Globe },
  { id: "banks", label: "Banks", icon: Building2 },
  { id: "calculator", label: "Calculator", icon: Calculator },
  { id: "forex", label: "Forex", icon: TrendingUp },
];

const faqs: FAQ[] = [
  // General
  {
    id: "1",
    category: "general",
    question: "What is NepalRemit?",
    answer:
      "NepalRemit is a free comparison platform that helps you find the best exchange rates for sending money to Nepal. We compare rates from multiple remittance providers and banks to help you make informed decisions and save money on every transfer.",
  },
  {
    id: "2",
    category: "general",
    question: "Is NepalRemit a remittance service?",
    answer:
      "No, NepalRemit is not a remittance service itself. We are a comparison platform that aggregates and displays rates from various remittance providers and banks. To send money, you'll need to use one of the providers listed on our platform.",
  },
  {
    id: "3",
    category: "general",
    question: "Is NepalRemit free to use?",
    answer:
      "Yes, NepalRemit is completely free for users. We don't charge any fees for comparing rates or using our calculator. We may earn affiliate commissions from some providers when you click through to their websites.",
  },
  {
    id: "4",
    category: "general",
    question: "How often are rates updated?",
    answer:
      "We update rates from NRB (Nepal Rastra Bank) daily. Provider rates are typically updated multiple times per day. However, actual rates at the time of your transaction may vary, so always verify with the provider before sending money.",
  },
  // Rates
  {
    id: "5",
    category: "rates",
    question: "Why do exchange rates differ between providers?",
    answer:
      "Exchange rates differ between providers due to various factors including their operating costs, profit margins, transfer volumes, partnerships with banks, and market competition. Some providers offer better rates but charge higher fees, while others have lower fees but less favorable rates.",
  },
  {
    id: "6",
    category: "rates",
    question: "What is the mid-market rate?",
    answer:
      "The mid-market rate (also called the interbank rate) is the midpoint between buy and sell prices for a currency. It's the fairest rate available and is what banks use when trading among themselves. Most remittance providers add a margin on top of this rate.",
  },
  {
    id: "7",
    category: "rates",
    question: "How can I get the best exchange rate?",
    answer:
      "To get the best rate: 1) Compare rates on NepalRemit before every transfer, 2) Consider the total cost including fees, 3) Send larger amounts less frequently (better rates), 4) Use providers with the best rates for your corridor, 5) Look for promotions or first-time user bonuses.",
  },
  // Fees
  {
    id: "8",
    category: "fees",
    question: "What types of fees are involved in remittances?",
    answer:
      "Remittance fees typically include: 1) Transfer fee (flat or percentage), 2) Exchange rate margin (hidden in the rate), 3) Receiving bank fees (sometimes), 4) Intermediary bank fees (for bank transfers). Always check the total amount the recipient will receive, not just the advertised fee.",
  },
  {
    id: "9",
    category: "fees",
    question: "How do I compare fees between providers?",
    answer:
      "Use our calculator to compare the total amount your recipient will receive after all fees. Enter the amount you want to send, and we'll show you the final received amount from each provider, making it easy to compare the true cost.",
  },
  // Providers
  {
    id: "10",
    category: "providers",
    question: "Which remittance providers do you track?",
    answer:
      "We track all major providers sending money to Nepal including Western Union, MoneyGram, IME, Prabhu, Remitly, WorldRemit, Wise (TransferWise), Xoom, and many more. We're constantly adding new providers to give you more options.",
  },
  {
    id: "11",
    category: "providers",
    question: "How do I choose the right provider?",
    answer:
      "Consider these factors: 1) Exchange rate offered, 2) Total fees, 3) Transfer speed, 4) Available delivery options (bank deposit, cash pickup, mobile wallet), 5) Your recipient's location and preference, 6) Provider reputation and reviews.",
  },
  // Banks
  {
    id: "12",
    category: "banks",
    question: "What is a SWIFT code?",
    answer:
      "A SWIFT code (also called BIC) is an 8-11 character code that identifies a specific bank internationally. You need the recipient bank's SWIFT code when sending money via bank transfer. All Nepal bank SWIFT codes are available on our Banks page.",
  },
  {
    id: "13",
    category: "banks",
    question: "Which Nepal banks support remittance?",
    answer:
      "Almost all commercial banks in Nepal support receiving remittances. Major banks include Nabil Bank, NIC Asia, Global IME, Nepal SBI, Himalayan Bank, and Everest Bank. Most are connected to international remittance networks like Western Union and IME.",
  },
  // Calculator
  {
    id: "14",
    category: "calculator",
    question: "How does the remittance calculator work?",
    answer:
      "Enter the amount you want to send, select your sending country and currency, and our calculator will show you rates from multiple providers. You'll see the exchange rate, fees, and final amount the recipient will receive from each provider.",
  },
  {
    id: "15",
    category: "calculator",
    question: "Can I compare rates for different amounts?",
    answer:
      "Yes! Rates often vary based on the amount you're sending. Some providers offer better rates for larger transfers. Try different amounts in our calculator to see how the rates change.",
  },
  // Forex
  {
    id: "16",
    category: "forex",
    question: "Where do you get NRB forex rates?",
    answer:
      "We fetch official forex rates directly from Nepal Rastra Bank (NRB) using their official API. These are the reference rates published daily by Nepal's central bank and are used as benchmarks by banks and financial institutions.",
  },
  {
    id: "17",
    category: "forex",
    question: "What's the difference between buy and sell rates?",
    answer:
      "Buy rate is what the bank pays you when you sell foreign currency. Sell rate is what you pay to buy foreign currency. For remittances to Nepal, you care about the sell rate (NPR/USD) - how many Nepali Rupees you get for each Dollar or other currency.",
  },
];

function FAQAccordion({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [feedback, setFeedback] = React.useState<"helpful" | "not-helpful" | null>(null);

  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
      >
        <span className="font-medium text-neutral-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-neutral-500 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-200 ease-in-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-0">
            <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>

            {/* Feedback buttons */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100">
              <span className="text-sm text-neutral-500">Was this helpful?</span>
              <button
                onClick={() => setFeedback("helpful")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
                  feedback === "helpful"
                    ? "bg-secondary-100 text-secondary-700"
                    : "bg-neutral-100 text-neutral-600 hover:bg-secondary-50"
                )}
              >
                <ThumbsUp className="h-4 w-4" />
                Yes
              </button>
              <button
                onClick={() => setFeedback("not-helpful")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors",
                  feedback === "not-helpful"
                    ? "bg-red-100 text-red-700"
                    : "bg-neutral-100 text-neutral-600 hover:bg-red-50"
                )}
              >
                <ThumbsDown className="h-4 w-4" />
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<FAQCategory | "all">("all");

  const filteredFAQs = React.useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-accent-500 via-accent-600 to-orange-600 py-16 md:py-20">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-400 rounded-full blur-3xl" />
          </div>

          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Get answers about remittance rates, forex calculations, provider selection, and more.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <div className="flex items-center bg-white rounded-xl shadow-lg overflow-hidden">
                  <Search className="h-5 w-5 text-neutral-400 ml-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search FAQs..."
                    className="flex-1 px-4 py-4 text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mr-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path
                d="M0 80L60 72C120 64 240 48 360 42.7C480 37 600 43 720 48C840 53 960 59 1080 56C1200 53 1320 43 1380 37.3L1440 32V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
                className="fill-neutral-50"
              />
            </svg>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container">
            <div className="grid lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Sidebar - Categories */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm">
                  <h2 className="font-semibold text-neutral-900 mb-4 px-2">Categories</h2>
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                        activeCategory === "all"
                          ? "bg-primary-50 text-primary-700"
                          : "text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      <HelpCircle className="h-5 w-5" />
                      <span className="font-medium">All Questions</span>
                      <span className="ml-auto text-sm bg-neutral-100 px-2 py-0.5 rounded-full">
                        {faqs.length}
                      </span>
                    </button>

                    {categories.map((cat) => {
                      const count = faqs.filter((f) => f.category === cat.id).length;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                            activeCategory === cat.id
                              ? "bg-primary-50 text-primary-700"
                              : "text-neutral-600 hover:bg-neutral-50"
                          )}
                        >
                          <cat.icon className="h-5 w-5" />
                          <span className="font-medium">{cat.label}</span>
                          <span className="ml-auto text-sm bg-neutral-100 px-2 py-0.5 rounded-full">
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* FAQ List */}
              <div className="lg:col-span-3 space-y-4">
                {searchQuery && (
                  <div className="text-sm text-neutral-500 mb-4">
                    Showing {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
                  </div>
                )}

                {filteredFAQs.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                    <HelpCircle className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">No results found</h3>
                    <p className="text-neutral-600 mb-4">
                      Try a different search term or browse by category.
                    </p>
                    <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}>
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredFAQs.map((faq) => (
                      <FAQAccordion key={faq.id} faq={faq} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-12 bg-white border-t border-neutral-100">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <MessageCircle className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-neutral-900 mb-3">Still have questions?</h2>
              <p className="text-neutral-600 mb-6">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="mailto:support@nepremit.com">Email Us</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
