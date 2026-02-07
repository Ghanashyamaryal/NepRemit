"use client";

import * as React from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Globe,
  Bell,
  Shield,
  Camera,
  Save,
  Trash2,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/lib/utils";

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "AED", name: "UAE Dirham" },
];

const countries = [
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "MY", name: "Malaysia" },
  { code: "QA", name: "Qatar" },
];

export default function ProfilePage() {
  const [profile, setProfile] = React.useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    country: "US",
    defaultCurrency: "USD",
  });

  const [notifications, setNotifications] = React.useState({
    rateAlerts: true,
    weeklyDigest: true,
    promotions: false,
    productUpdates: true,
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-1">Account Settings</h1>
                <p className="text-neutral-600">Manage your profile and preferences</p>
              </div>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center"
              >
                Go to Dashboard
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-6">
              {/* Profile Section */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="h-5 w-5 text-primary-600" />
                  <h2 className="text-lg font-semibold text-neutral-900">Profile Information</h2>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6 mb-6 pb-6 border-b border-neutral-100">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-2xl font-bold text-primary-600">
                      {profile.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center hover:bg-neutral-50 transition-colors">
                      <Camera className="h-4 w-4 text-neutral-600" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{profile.name}</h3>
                    <p className="text-sm text-neutral-500">{profile.email}</p>
                    <button className="text-sm text-primary-600 hover:text-primary-700 mt-1">
                      Change avatar
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Country
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <select
                        value={profile.country}
                        onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none appearance-none bg-white"
                      >
                        {countries.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-5 w-5 text-secondary-600" />
                  <h2 className="text-lg font-semibold text-neutral-900">Preferences</h2>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Default Currency
                  </label>
                  <select
                    value={profile.defaultCurrency}
                    onChange={(e) => setProfile({ ...profile, defaultCurrency: e.target.value })}
                    className="w-full max-w-xs px-4 py-2.5 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none appearance-none bg-white"
                  >
                    {currencies.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-neutral-500 mt-1">
                    This will be pre-selected when using the calculator
                  </p>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Bell className="h-5 w-5 text-accent-600" />
                  <h2 className="text-lg font-semibold text-neutral-900">Email Notifications</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "rateAlerts", label: "Rate Alerts", desc: "Get notified when rates change significantly" },
                    { key: "weeklyDigest", label: "Weekly Digest", desc: "Receive weekly summary of best rates" },
                    { key: "promotions", label: "Promotions", desc: "Special offers from our partner providers" },
                    { key: "productUpdates", label: "Product Updates", desc: "New features and improvements" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center justify-between p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 cursor-pointer transition-colors"
                    >
                      <div>
                        <div className="font-medium text-neutral-900">{item.label}</div>
                        <div className="text-sm text-neutral-500">{item.desc}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) =>
                          setNotifications({ ...notifications, [item.key]: e.target.checked })
                        }
                        className="h-5 w-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 rounded-2xl border border-red-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
                </div>
                <p className="text-red-700 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(true)}
                  className="border-red-300 text-red-600 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-2">Delete Account?</h3>
                <p className="text-neutral-600">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button className="flex-1 bg-red-600 hover:bg-red-700">
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
