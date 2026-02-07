import * as React from "react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center gap-1 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded",
  {
    variants: {
      variant: {
        default:
          "text-primary-600 hover:text-primary-700 hover:underline underline-offset-4",
        muted:
          "text-neutral-500 hover:text-neutral-700",
        nav: "text-neutral-700 hover:text-primary-600 font-medium",
        footer: "text-neutral-500 hover:text-neutral-700 text-sm",
        button:
          "text-primary-600 hover:text-primary-700 font-medium",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface LinkComponentProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof linkVariants> {
  href: string;
  external?: boolean;
  showExternalIcon?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkComponentProps>(
  (
    {
      className,
      href,
      variant,
      size,
      external,
      showExternalIcon = true,
      children,
      ...props
    },
    ref
  ) => {
    const isExternal = external || href.startsWith("http") || href.startsWith("//");

    if (isExternal) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn(linkVariants({ variant, size, className }))}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
          {showExternalIcon && (
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
          )}
        </a>
      );
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(linkVariants({ variant, size, className }))}
        {...(props as Omit<NextLinkProps, "href">)}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = "Link";

export { Link, linkVariants };
