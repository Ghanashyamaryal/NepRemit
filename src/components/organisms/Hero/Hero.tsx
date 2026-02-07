import * as React from "react";
import NextLink from "next/link";
import { ArrowRight, Calculator, TrendingUp, Shield, Clock } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Heading, Text } from "@/components/atoms/Typography";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";

const trustIndicators = [
  { icon: TrendingUp, label: "20+ Providers" },
  { icon: Clock, label: "Updated Hourly" },
  { icon: Shield, label: "100% Free" },
];

export interface HeroProps {
  className?: string;
}

const Hero = React.forwardRef<HTMLElement, HeroProps>(({ className }, ref) => {
  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 py-16 lg:py-24",
        className
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <Badge variant="accent" size="lg" className="mb-6">
            Live Rates Updated Every Hour
          </Badge>

          {/* Heading */}
          <Heading
            level="h1"
            color="white"
            className="mb-6 text-4xl sm:text-5xl lg:text-6xl"
          >
            Send More Money{" "}
            <span className="text-amber-400">Home to Nepal</span>
          </Heading>

          {/* Subheading */}
          <Text
            variant="lead"
            color="white"
            className="mb-8 text-neutral-200 max-w-2xl mx-auto"
          >
            Compare live exchange rates from 20+ remittance providers and banks.
            Find the best rates, lowest fees, and fastest transfers.
          </Text>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild size="xl" variant="accent">
              <NextLink href="/rates">
                Compare Rates Now
                <ArrowRight className="h-5 w-5" />
              </NextLink>
            </Button>
            <Button asChild size="xl" variant="outline-dark">
              <NextLink href="/calculator">
                <Calculator className="h-5 w-5" />
                Calculate Transfer
              </NextLink>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {trustIndicators.map((indicator) => (
              <div
                key={indicator.label}
                className="flex items-center gap-2 text-white/80"
              >
                <indicator.icon className="h-5 w-5" />
                <Text variant="small" weight="medium" className="text-white/80">
                  {indicator.label}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards - Optional floating cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <Text variant="caption" className="text-white/70">
              Best Rate Today
            </Text>
            <Heading level="h4" className="text-white tabular-nums">
              134.25
            </Heading>
            <Text variant="caption" className="text-amber-400">
              USD → NPR
            </Text>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <Text variant="caption" className="text-white/70">
              Providers Compared
            </Text>
            <Heading level="h4" className="text-white tabular-nums">
              20+
            </Heading>
            <Text variant="caption" className="text-white/70">
              Including Banks
            </Text>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
            <Text variant="caption" className="text-white/70">
              Average Savings
            </Text>
            <Heading level="h4" className="text-white tabular-nums">
              $12
            </Heading>
            <Text variant="caption" className="text-emerald-400">
              Per $500 sent
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export { Hero };
