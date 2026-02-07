"use client";

import * as React from "react";
import Link from "next/link";
import {
  User,
  Bell,
  Search,
  TrendingUp,
  History,
  Star,
  ArrowRight,
  ChevronRight,
  Settings,
  Clock,
  Bookmark,
  AlertCircle,
} from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

const quickStats = [
  { label: "Saved Searches", value: "12", icon: Search, color: "primary" },
  { label: "Rate Alerts", value: "3", icon: Bell, color: "accent" },
  { label: "Comparisons", value: "45", icon: History, color: "secondary" },
  { label: "Favorites", value: "5", icon: Star, color: "pink" },
];

const recentActivity = [
  {
    type: "comparison",
    title: "Compared USD to NPR",
    description: "5 providers compared for $500",
    time: "2 hours ago",
    icon: TrendingUp,
  },
  {
    type: "alert",
    title: "Rate Alert Triggered",
    description: "USD/NPR crossed 133.50",
    time: "5 hours ago",
    icon: Bell,
  },
  {
    type: "search",
    title: "Searched Providers",
    description: "Western Union, IME, Prabhu",
    time: "1 day ago",
    icon: Search,
  },
  {
    type: "favorite",
    title: "Added to Favorites",
    description: "Remitly - Best rate provider",
    time: "2 days ago",
    icon: Star,
  },
];

const recommendations = [
  {
    provider: "Remitly",
    rate: "133.85",
    fee: "$0",
    reason: "Best rate for your usual amount",
  },
  {
    provider: "Wise",
    rate: "133.42",
    fee: "$3.50",
    reason: "Fastest transfer time",
  },
  {
    provider: "Western Union",
    rate: "132.95",
    fee: "$5.00",
    reason: "Cash pickup available",
  },
];

export default function DashboardPage() {
  const userName = "John";

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                  Welcome back, {userName}! 👋
                </h1>
                <p className="text-neutral-600">
                  Here&apos;s what&apos;s happening with your remittance tracking.
                </p>
              </div>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {quickStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-lg flex items-center justify-center",
                        stat.color === "primary" && "bg-primary-100",
                        stat.color === "secondary" && "bg-secondary-100",
                        stat.color === "accent" && "bg-accent-100",
                        stat.color === "pink" && "bg-pink-100"
                      )}
                    >
                      <stat.icon
                        className={cn(
                          "h-5 w-5",
                          stat.color === "primary" && "text-primary-600",
                          stat.color === "secondary" && "text-secondary-600",
                          stat.color === "accent" && "text-accent-600",
                          stat.color === "pink" && "text-pink-600"
                        )}
                      />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-neutral-900">{stat.value}</div>
                  <div className="text-sm text-neutral-500">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-neutral-900">Recent Activity</h2>
                  <Link
                    href="/activity"
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
                  >
                    View all
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-colors"
                    >
                      <div
                        className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                          activity.type === "comparison" && "bg-primary-100",
                          activity.type === "alert" && "bg-accent-100",
                          activity.type === "search" && "bg-blue-100",
                          activity.type === "favorite" && "bg-pink-100"
                        )}
                      >
                        <activity.icon
                          className={cn(
                            "h-5 w-5",
                            activity.type === "comparison" && "text-primary-600",
                            activity.type === "alert" && "text-accent-600",
                            activity.type === "search" && "text-blue-600",
                            activity.type === "favorite" && "text-pink-600"
                          )}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-neutral-900">{activity.title}</div>
                        <div className="text-sm text-neutral-500">{activity.description}</div>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-neutral-400 shrink-0">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Rate Alerts */}
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-neutral-900">Rate Alerts</h2>
                    <Link href="/alerts" className="text-sm text-primary-600 hover:text-primary-700">
                      Manage
                    </Link>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-accent-50 border border-accent-200">
                      <div className="flex items-center gap-2 text-accent-700 mb-1">
                        <AlertCircle className="h-4 w-4" />
                        <span className="font-medium text-sm">USD/NPR Alert</span>
                      </div>
                      <div className="text-sm text-accent-600">
                        Notify when rate crosses 134.00
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                      <div className="flex items-center gap-2 text-neutral-700 mb-1">
                        <Bell className="h-4 w-4" />
                        <span className="font-medium text-sm">GBP/NPR Alert</span>
                      </div>
                      <div className="text-sm text-neutral-500">
                        Notify when rate crosses 165.00
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    <Bell className="h-4 w-4 mr-2" />
                    Create New Alert
                  </Button>
                </div>

                {/* Recommendations */}
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-100 p-6">
                  <h2 className="text-lg font-semibold text-neutral-900 mb-4">
                    Recommended for You
                  </h2>

                  <div className="space-y-3">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-neutral-900">{rec.provider}</span>
                          <span className="text-sm font-semibold text-secondary-600">
                            {rec.rate} NPR
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500">{rec.reason}</div>
                      </div>
                    ))}
                  </div>

                  <Link href="/calculator">
                    <Button className="w-full mt-4">
                      Compare All Rates
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Compare Rates", href: "/calculator", icon: TrendingUp },
                { label: "View History", href: "/history", icon: History },
                { label: "Saved Providers", href: "/favorites", icon: Bookmark },
                { label: "Edit Profile", href: "/profile", icon: User },
              ].map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all group"
                >
                  <div className="h-10 w-10 rounded-lg bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <action.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <span className="font-medium text-neutral-900">{action.label}</span>
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
