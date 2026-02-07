import Link from "next/link";
import { Home, Search, ArrowRight, HelpCircle, Calculator, Building2, TrendingUp } from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";

const popularPages = [
  { href: "/", label: "Home", icon: Home, description: "Back to homepage" },
  { href: "/calculator", label: "Calculator", icon: Calculator, description: "Compare rates" },
  { href: "/providers", label: "Providers", icon: TrendingUp, description: "View all providers" },
  { href: "/banks", label: "Banks", icon: Building2, description: "Nepal banks" },
  { href: "/faqs", label: "FAQs", icon: HelpCircle, description: "Get help" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="relative mb-8">
            {/* Background decorations */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50" />
            </div>

            {/* 404 Number */}
            <div className="relative">
              <div className="text-[12rem] md:text-[16rem] font-bold leading-none bg-gradient-to-br from-primary-500 via-primary-600 to-primary-800 bg-clip-text text-transparent select-none">
                404
              </div>

              {/* Floating elements */}
              <div className="absolute top-1/4 left-0 w-8 h-8 bg-accent-400 rounded-lg rotate-12 animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="absolute top-1/3 right-0 w-6 h-6 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-primary-300 rounded-lg rotate-45 animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Oops! This page got lost in transit
          </h1>
          <p className="text-lg text-neutral-600 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved to a new location.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-10">
            <div className="flex items-center bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
              <Search className="h-5 w-5 text-neutral-400 ml-4" />
              <input
                type="text"
                placeholder="Search for what you need..."
                className="flex-1 px-4 py-3.5 text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none"
              />
              <Button variant="primary" size="sm" className="m-1.5">
                Search
              </Button>
            </div>
          </div>

          {/* Go Home Button */}
          <div className="mb-12">
            <Button asChild variant="primary" size="lg" className="group">
              <Link href="/">
                <Home className="h-5 w-5 mr-2" />
                Go to Homepage
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Popular Pages */}
          <div className="border-t border-neutral-200 pt-10">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-6">
              Try these instead
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {popularPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100 transition-all duration-300"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <page.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-neutral-900">{page.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
