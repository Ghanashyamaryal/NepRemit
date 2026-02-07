import * as React from "react";
import NextLink from "next/link";
import { TrendingUp, Mail, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { Link } from "@/components/atoms/Link";
import { Text, Heading } from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

const footerLinks = {
  services: {
    title: "Services",
    links: [
      { name: "Compare Rates", href: "/rates" },
      { name: "Compare Providers", href: "/compare" },
      { name: "Calculator", href: "/calculator" },
      { name: "Forex Rates", href: "/forex" },
    ],
  },
  providers: {
    title: "Providers",
    links: [
      { name: "All Providers", href: "/providers" },
      { name: "Commercial Banks", href: "/banks" },
      { name: "IME Pay", href: "/providers/ime-pay" },
      { name: "Prabhu Pay", href: "/providers/prabhu-pay" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Blog", href: "/blog" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Contact Us", href: "/contact" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Disclaimer", href: "/disclaimer" },
    ],
  },
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "YouTube", href: "#", icon: Youtube },
];

export interface FooterProps {
  className?: string;
}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className }, ref) => {
    return (
      <footer
        ref={ref}
        className={cn("bg-neutral-900 text-neutral-300", className)}
      >
        <div className="container py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            {/* Brand Section */}
            <div className="col-span-2">
              <NextLink
                href="/"
                className="flex items-center gap-2 font-heading text-xl font-bold text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span>NepRemit</span>
              </NextLink>
              <Text color="muted" className="mt-4 max-w-xs text-neutral-400">
                Compare remittance rates from 20+ providers and find the best
                deals for sending money to Nepal.
              </Text>

              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:info@nepremit.com"
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  info@nepremit.com
                </a>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="rounded-lg bg-neutral-800 p-2 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([key, section]) => (
              <div key={key}>
                <Heading level="h6" className="text-white mb-4">
                  {section.title}
                </Heading>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        variant="footer"
                        className="text-neutral-400 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 border-t border-neutral-800 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <Text variant="small" className="text-neutral-500">
                &copy; {new Date().getFullYear()} NepRemit. All rights reserved.
              </Text>
              <Text variant="small" className="text-neutral-500">
                Exchange rates are indicative and may vary. Always verify with
                the provider.
              </Text>
            </div>
          </div>
        </div>
      </footer>
    );
  }
);

Footer.displayName = "Footer";

export { Footer };
