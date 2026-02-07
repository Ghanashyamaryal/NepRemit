"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Target,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Shield,
  Globe,
  Award,
  ArrowRight,
  CheckCircle,
  Zap,
  BarChart3,
} from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";

const stats = [
  { value: "20+", label: "Providers Tracked", icon: TrendingUp },
  { value: "50K+", label: "Monthly Users", icon: Users },
  { value: "NPR 10M+", label: "Savings Facilitated", icon: BarChart3 },
  { value: "99.9%", label: "Uptime", icon: Zap },
];

const values = [
  {
    icon: Eye,
    title: "Transparency",
    description: "We show all rates, fees, and conditions upfront with no hidden costs or surprises.",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Real-time Data",
    description: "Our rates are updated continuously from official sources including NRB and provider APIs.",
    color: "accent",
  },
  {
    icon: Shield,
    title: "Unbiased Comparison",
    description: "We don't favor any provider. Our rankings are based purely on value for users.",
    color: "secondary",
  },
  {
    icon: Heart,
    title: "User First",
    description: "Every feature we build is designed to save you time and money on remittances.",
    color: "pink",
  },
];

const milestones = [
  { year: "2023", title: "Founded", description: "NepalRemit was launched to help Nepalis get better remittance rates" },
  { year: "2024", title: "10 Providers", description: "Expanded coverage to include all major remittance services" },
  { year: "2025", title: "Bank Integration", description: "Added all commercial banks with SWIFT codes and rates" },
  { year: "2026", title: "50K Users", description: "Reached milestone of serving 50,000 monthly active users" },
];

const team = [
  { name: "Anjan Shrestha", role: "Founder & CEO", image: "/images/team/anjan.jpg" },
  { name: "Priya Sharma", role: "Head of Product", image: "/images/team/priya.jpg" },
  { name: "Rajesh Thapa", role: "Lead Engineer", image: "/images/team/rajesh.jpg" },
  { name: "Sita Gurung", role: "Data Analyst", image: "/images/team/sita.jpg" },
];

const partners = [
  "Western Union",
  "MoneyGram",
  "IME",
  "Prabhu",
  "Remitly",
  "WorldRemit",
  "Xoom",
  "Wise",
];

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">{value}</div>
      <div className="text-white/70">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 py-20 md:py-28">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />
          </div>

          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <Globe className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white/90">Nepal&apos;s #1 Remittance Comparison Platform</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Helping Nepalis Get the{" "}
                <span className="bg-gradient-to-r from-accent-300 to-secondary-300 bg-clip-text text-transparent">
                  Best Rates
                </span>
              </h1>

              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                We believe everyone deserves to know the true cost of sending money. Our mission is to
                make remittance rates transparent and help families keep more of their hard-earned money.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-primary-600 hover:bg-white/90">
                  <Link href="/calculator">
                    Try Our Calculator
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline-dark" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto" preserveAspectRatio="none">
              <path
                d="M0 120L60 108C120 96 240 72 360 66C480 60 600 72 720 78C840 84 960 84 1080 78C1200 72 1320 60 1380 54L1440 48V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                className="fill-neutral-50"
              />
            </svg>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-14 w-14 rounded-2xl bg-primary-100 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Mission</h2>
                <p className="text-neutral-600 leading-relaxed">
                  To empower Nepali families worldwide with transparent, real-time remittance rate
                  comparisons, helping them save money on every transfer and make informed decisions
                  about their hard-earned income.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-14 w-14 rounded-2xl bg-secondary-100 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-secondary-600" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Our Vision</h2>
                <p className="text-neutral-600 leading-relaxed">
                  To become the most trusted remittance comparison platform in South Asia, setting the
                  standard for transparency and helping millions of families optimize their international
                  money transfers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <AnimatedCounter value={stat.value} label={stat.label} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Why Choose Us</h2>
              <p className="text-lg text-neutral-600">
                Our core values drive everything we do to serve our users better.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-6 border border-neutral-200 hover:border-primary-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${
                      value.color === "primary"
                        ? "bg-primary-100"
                        : value.color === "secondary"
                        ? "bg-secondary-100"
                        : value.color === "accent"
                        ? "bg-accent-100"
                        : "bg-pink-100"
                    }`}
                  >
                    <value.icon
                      className={`h-6 w-6 ${
                        value.color === "primary"
                          ? "text-primary-600"
                          : value.color === "secondary"
                          ? "text-secondary-600"
                          : value.color === "accent"
                          ? "text-accent-600"
                          : "text-pink-600"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{value.title}</h3>
                  <p className="text-neutral-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Our Journey</h2>
              <p className="text-lg text-neutral-600">
                From a simple idea to Nepal&apos;s leading remittance comparison platform.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200" />

                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative flex items-start gap-6 pl-4">
                      <div className="relative z-10 flex items-center justify-center h-8 w-8 rounded-full bg-primary-500 text-white text-xs font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 bg-neutral-50 rounded-xl p-6 border border-neutral-200">
                        <div className="text-sm font-semibold text-primary-600 mb-1">{milestone.year}</div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-2">{milestone.title}</h3>
                        <p className="text-neutral-600">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-neutral-600">
                The passionate people behind NepalRemit working to make remittances better.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <div key={index} className="group text-center">
                  <div className="relative mb-4 mx-auto w-32 h-32 rounded-2xl overflow-hidden bg-neutral-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Users className="h-12 w-12 text-neutral-400" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-neutral-900">{member.name}</h3>
                  <p className="text-sm text-neutral-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-16 bg-white border-t border-neutral-100">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">Providers We Track</h2>
              <p className="text-neutral-600">Rates from all major remittance services</p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl mx-auto">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-neutral-50 rounded-lg border border-neutral-200 text-neutral-600 font-medium hover:border-primary-300 hover:text-primary-600 transition-colors"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Award className="h-16 w-16 text-primary-500 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Ready to Save on Your Next Transfer?
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Join thousands of Nepalis who use NepalRemit to find the best exchange rates and save
                money on every remittance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/calculator">
                    Compare Rates Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Get in Touch</Link>
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
