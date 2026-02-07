"use client";

import * as React from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Building2,
  ExternalLink,
  MapPin,
  GitBranch,
  Banknote,
  ArrowRight,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/atoms/Card";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";
import type { Bank } from "@/types";

interface BankCardProps {
  bank: Bank;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

export function BankCard({ bank, className, variant = "default" }: BankCardProps) {
  const [copied, setCopied] = React.useState(false);

  const copySwiftCode = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await navigator.clipboard.writeText(bank.swiftCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBankGradient = (name: string) => {
    const gradients: Record<string, string> = {
      nabil: "from-red-500/10 via-red-500/5 to-transparent",
      nibl: "from-blue-500/10 via-blue-500/5 to-transparent",
      "global-ime": "from-green-500/10 via-green-500/5 to-transparent",
      "nepal-sbi": "from-blue-600/10 via-blue-600/5 to-transparent",
      himalayan: "from-sky-500/10 via-sky-500/5 to-transparent",
      everest: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      "nic-asia": "from-purple-500/10 via-purple-500/5 to-transparent",
      sanima: "from-orange-500/10 via-orange-500/5 to-transparent",
      machhapuchchhre: "from-cyan-500/10 via-cyan-500/5 to-transparent",
      kumari: "from-pink-500/10 via-pink-500/5 to-transparent",
    };
    return gradients[bank.slug.split("-")[0]] || "from-neutral-500/10 via-neutral-500/5 to-transparent";
  };

  if (variant === "compact") {
    return (
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          "hover:shadow-lg hover:shadow-primary-500/10 hover:-translate-y-0.5",
          "border-neutral-200/60 bg-white/80 backdrop-blur-sm",
          className
        )}
        hoverable
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center overflow-hidden border border-neutral-200/50">
              {bank.logo ? (
                <Image
                  src={bank.logo}
                  alt={bank.name}
                  width={32}
                  height={32}
                  className="object-contain"
                />
              ) : (
                <Building2 className="h-5 w-5 text-neutral-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <Text weight="semibold" className="truncate">
                {bank.shortName}
              </Text>
              <Text variant="caption" color="muted" className="font-mono">
                {bank.swiftCode}
              </Text>
            </div>
            {bank.hasRemittance && (
              <CheckCircle2 className="h-4 w-4 text-secondary-500" />
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-500",
        "hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1",
        "border-neutral-200/60 bg-white/90 backdrop-blur-sm",
        variant === "featured" && "ring-2 ring-primary-500/20",
        className
      )}
      hoverable
    >
      {/* Gradient Background */}
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          getBankGradient(bank.slug)
        )}
      />

      {/* Featured Badge */}
      {variant === "featured" && (
        <div className="absolute -top-1 -right-1 z-10">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-lg shadow-lg">
            Featured
          </div>
        </div>
      )}

      <CardContent className="relative p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {/* Logo Container with Glassmorphism */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-white to-neutral-50 border border-neutral-200/50 shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow duration-300">
                {bank.logo ? (
                  <Image
                    src={bank.logo}
                    alt={bank.name}
                    width={48}
                    height={48}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <Building2 className="h-8 w-8 text-neutral-400 transition-colors duration-300 group-hover:text-primary-500" />
                )}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors duration-300">
                {bank.shortName}
              </h3>
              <Text variant="small" color="muted" className="line-clamp-1">
                {bank.name}
              </Text>
            </div>
          </div>

          {bank.hasRemittance && (
            <Badge
              variant="success"
              className="bg-secondary-50 text-secondary-700 border-secondary-200 shadow-sm"
            >
              <Banknote className="h-3 w-3 mr-1" />
              Remittance
            </Badge>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* SWIFT Code */}
          <button
            onClick={copySwiftCode}
            className="group/swift flex items-center gap-2 p-3 rounded-xl bg-neutral-50/80 hover:bg-neutral-100 border border-neutral-200/50 transition-all duration-200"
          >
            <div className="flex-1 text-left">
              <Text variant="caption" color="muted" className="block">
                SWIFT Code
              </Text>
              <Text weight="bold" className="font-mono text-sm tracking-wider">
                {bank.swiftCode}
              </Text>
            </div>
            {copied ? (
              <Check className="h-4 w-4 text-secondary-500" />
            ) : (
              <Copy className="h-4 w-4 text-neutral-400 opacity-0 group-hover/swift:opacity-100 transition-opacity" />
            )}
          </button>

          {/* Branches */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/50">
            <GitBranch className="h-4 w-4 text-primary-500" />
            <div>
              <Text variant="caption" color="muted" className="block">
                Branches
              </Text>
              <Text weight="bold" className="text-sm">
                {bank.branches}+
              </Text>
            </div>
          </div>

          {/* Type */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/50">
            <Building2 className="h-4 w-4 text-accent-500" />
            <div>
              <Text variant="caption" color="muted" className="block">
                Type
              </Text>
              <Text weight="bold" className="text-sm capitalize">
                {bank.type}
              </Text>
            </div>
          </div>

          {/* Headquarters */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/50">
            <MapPin className="h-4 w-4 text-red-500" />
            <div>
              <Text variant="caption" color="muted" className="block">
                HQ
              </Text>
              <Text weight="bold" className="text-sm">
                {bank.headquarters}
              </Text>
            </div>
          </div>
        </div>

        {/* Remittance Partners */}
        {bank.remittancePartners.length > 0 && (
          <div className="pt-2">
            <Text variant="caption" color="muted" className="mb-2 block">
              Remittance Partners
            </Text>
            <div className="flex flex-wrap gap-1.5">
              {bank.remittancePartners.map((partner) => (
                <span
                  key={partner}
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-neutral-100">
          <Button
            asChild
            variant="primary"
            size="sm"
            className="flex-1 group/btn bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <NextLink href={`/banks/${bank.slug}`}>
              View Details
              <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </NextLink>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hover:bg-neutral-50 transition-colors duration-200"
          >
            <a href={bank.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
