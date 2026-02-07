"use client";

import * as React from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  TrendingUp,
  Building2,
  ArrowRightLeft,
  Landmark,
  DollarSign,
  User,
  LogOut,
  Calculator,
  Bell,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Link } from "@/components/atoms/Link";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Rates", href: "/rates", icon: TrendingUp },
  { name: "Forex", href: "/forex", icon: DollarSign },
  { name: "Calculator", href: "/calculator", icon: Calculator },
  { name: "Compare", href: "/compare", icon: ArrowRightLeft },
  { name: "Providers", href: "/providers", icon: Building2 },
  { name: "Banks", href: "/banks", icon: Landmark },
];

export interface HeaderProps {
  className?: string;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className }, ref) => {
    const { data: session, status } = useSession();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [userMenuOpen, setUserMenuOpen] = React.useState(false);

    const isLoggedIn = status === "authenticated";
    const isLoading = status === "loading";

    const handleLogout = async () => {
      setUserMenuOpen(false);
      await signOut({ callbackUrl: "/" });
    };

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80",
          className
        )}
      >
        <nav className="container flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <NextLink
            href="/"
            className="flex items-center gap-2 font-heading text-xl font-bold text-blue-600 shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="hidden sm:inline">NepRemit</span>
          </NextLink>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex lg:items-center lg:gap-1 flex-1 justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                variant="nav"
                className="px-3 py-2 rounded-lg hover:bg-neutral-100 text-sm"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth - Right */}
          <div className="hidden lg:flex lg:items-center lg:gap-3 shrink-0">
            {isLoading ? (
              <div className="h-10 w-24 bg-neutral-100 animate-pulse rounded-lg" />
            ) : isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={32}
                      height={32}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-neutral-700">
                    {session?.user?.name?.split(" ")[0] || "User"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-neutral-200 bg-white shadow-lg z-20">
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-neutral-100 mb-2">
                          <p className="font-medium text-neutral-900 truncate">
                            {session?.user?.name}
                          </p>
                          <p className="text-sm text-neutral-500 truncate">
                            {session?.user?.email}
                          </p>
                        </div>
                        <NextLink
                          href="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 rounded-lg hover:bg-neutral-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </NextLink>
                        <NextLink
                          href="/alerts"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 rounded-lg hover:bg-neutral-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Bell className="h-4 w-4" />
                          Rate Alerts
                        </NextLink>
                        <NextLink
                          href="/profile"
                          className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 rounded-lg hover:bg-neutral-100"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </NextLink>
                        <hr className="my-2 border-neutral-100" />
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <NextLink href="/login">Login</NextLink>
                </Button>
                <Button asChild size="sm">
                  <NextLink href="/register">Sign Up</NextLink>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">
              {mobileMenuOpen ? "Close menu" : "Open menu"}
            </span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navigation.map((item) => (
                <NextLink
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 text-neutral-500" />
                  {item.name}
                </NextLink>
              ))}

              <hr className="my-3 border-neutral-200" />

              {/* Mobile Auth */}
              {isLoading ? (
                <div className="h-10 bg-neutral-100 animate-pulse rounded-lg" />
              ) : isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 px-3 py-2">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-600" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-neutral-900">
                        {session?.user?.name}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                  <NextLink
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5 text-neutral-500" />
                    Dashboard
                  </NextLink>
                  <NextLink
                    href="/alerts"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Bell className="h-5 w-5 text-neutral-500" />
                    Rate Alerts
                  </NextLink>
                  <NextLink
                    href="/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-neutral-700 hover:bg-neutral-100"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5 text-neutral-500" />
                    Settings
                  </NextLink>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <Button asChild variant="outline" fullWidth>
                    <NextLink
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </NextLink>
                  </Button>
                  <Button asChild fullWidth>
                    <NextLink
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </NextLink>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    );
  }
);

Header.displayName = "Header";

export { Header };
