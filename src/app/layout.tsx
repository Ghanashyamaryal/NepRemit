import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import { SessionProvider } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://nepremit.com"
  ),
  title: {
    default: "NepRemit - Best Remittance Rates & Exchange Rate Comparison Nepal",
    template: "%s | NepRemit",
  },
  description:
    "Compare real-time remittance rates from IME Pay, Prabhu Pay, and all Nepali banks. Calculate fees, track forex trends, and find the best money transfer deals to Nepal.",
  keywords: [
    "nepal remittance",
    "send money to nepal",
    "USD to NPR",
    "exchange rate nepal",
    "remittance comparison",
    "IME Pay rates",
    "Prabhu Pay rates",
    "nepal forex",
    "NRB exchange rate",
    "money transfer nepal",
    "best remittance rates",
    "nepal bank rates",
  ],
  authors: [{ name: "NepRemit" }],
  creator: "NepRemit",
  publisher: "NepRemit",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "NepRemit",
    title: "NepRemit - Best Remittance Rates & Exchange Rate Comparison Nepal",
    description:
      "Compare real-time remittance rates from 20+ providers. Find the best exchange rates and lowest fees for sending money to Nepal.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NepRemit - Nepal Remittance Comparison Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NepRemit - Compare Nepal Remittance Rates",
    description:
      "Find the best rates for sending money to Nepal. Compare 20+ providers instantly.",
    images: ["/twitter-image.png"],
    creator: "@nepremit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${manrope.variable} font-sans antialiased min-h-screen`}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
