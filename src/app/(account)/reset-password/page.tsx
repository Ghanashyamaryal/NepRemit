"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";
import { Button } from "@/components/atoms/Button";
import { ButtonSpinner } from "@/components/atoms/ButtonSpinner";
import { cn } from "@/lib/utils";

const passwordRequirements = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Contains lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "Contains number", test: (p: string) => /\d/.test(p) },
];

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const passwordStrength = passwordRequirements.filter((req) => req.test(password)).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Invalid or missing reset token. Please request a new password reset.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const allRequirementsMet = passwordRequirements.every((req) => req.test(password));
    if (!allRequirementsMet) {
      setError("Please meet all password requirements");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to reset password. Please try again.");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Invalid token state
  if (!token) {
    return (
      <div className="flex min-h-screen flex-col bg-neutral-50">
        <Header />

        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-red-100 mb-4">
                  <AlertCircle className="h-7 w-7 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                  Invalid Reset Link
                </h1>
                <p className="text-neutral-600 mb-6">
                  This password reset link is invalid or has expired. Please request a new one.
                </p>
                <Button asChild className="w-full">
                  <Link href="/forgot-password">Request New Link</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
            {success ? (
              /* Success State */
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-secondary-100 mb-4">
                  <CheckCircle2 className="h-7 w-7 text-secondary-600" />
                </div>
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                  Password Reset!
                </h1>
                <p className="text-neutral-600 mb-6">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
                <Button asChild className="w-full">
                  <Link href="/login">
                    Sign In
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ) : (
              /* Form State */
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-100 mb-4">
                    <Lock className="h-7 w-7 text-primary-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-neutral-900 mb-2">
                    Set new password
                  </h1>
                  <p className="text-neutral-600">
                    Your new password must be different from previously used passwords.
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>

                    {/* Password Strength */}
                    {password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((level) => (
                            <div
                              key={level}
                              className={cn(
                                "h-1 flex-1 rounded-full transition-colors",
                                passwordStrength >= level
                                  ? passwordStrength <= 2
                                    ? "bg-red-500"
                                    : passwordStrength === 3
                                    ? "bg-accent-500"
                                    : "bg-secondary-500"
                                  : "bg-neutral-200"
                              )}
                            />
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          {passwordRequirements.map((req, i) => (
                            <div
                              key={i}
                              className={cn(
                                "flex items-center gap-1 text-xs",
                                req.test(password)
                                  ? "text-secondary-600"
                                  : "text-neutral-400"
                              )}
                            >
                              <Check
                                className={cn(
                                  "h-3 w-3",
                                  req.test(password) ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {req.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-neutral-700 mb-1.5"
                    >
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className={cn(
                          "w-full pl-10 pr-4 py-3 rounded-xl border outline-none transition-all",
                          confirmPassword && password !== confirmPassword
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                            : "border-neutral-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                        )}
                        placeholder="Confirm your password"
                      />
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="mt-1 text-xs text-red-600">
                        Passwords don&apos;t match
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isLoading || password !== confirmPassword}
                  >
                    {isLoading ? (
                      <>
                        <ButtonSpinner className="mr-2" />
                        Resetting...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
