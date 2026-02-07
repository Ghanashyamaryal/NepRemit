import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-heading font-bold tracking-tight", {
  variants: {
    level: {
      h1: "text-5xl leading-tight",
      h2: "text-4xl leading-tight",
      h3: "text-3xl leading-snug",
      h4: "text-2xl leading-snug",
      h5: "text-xl leading-normal",
      h6: "text-lg leading-normal",
    },
    color: {
      default: "text-neutral-900",
      primary: "text-primary-600",
      secondary: "text-secondary-600",
      muted: "text-neutral-500",
      white: "text-white",
    },
  },
  defaultVariants: {
    level: "h1",
    color: "default",
  },
});

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  asChild?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level, color, as, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : as || level || "h1";

    return (
      <Component
        className={cn(headingVariants({ level, color, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Heading.displayName = "Heading";

const textVariants = cva("", {
  variants: {
    variant: {
      body: "text-base leading-relaxed",
      lead: "text-lg leading-relaxed",
      small: "text-sm leading-normal",
      caption: "text-xs leading-normal",
      label: "text-sm font-medium leading-none",
    },
    color: {
      default: "text-neutral-700",
      primary: "text-primary-600",
      secondary: "text-secondary-600",
      muted: "text-neutral-500",
      success: "text-secondary-600",
      error: "text-error",
      white: "text-white",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "body",
    color: "default",
    weight: "normal",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "label";
  asChild?: boolean;
}

function Text({
  className,
  variant,
  color,
  weight,
  as: Component = "p",
  asChild = false,
  ...props
}: TextProps) {
  const Comp = asChild ? Slot : Component;

  return (
    <Comp
      className={cn(textVariants({ variant, color, weight, className }))}
      {...props}
    />
  );
}

Text.displayName = "Text";

export { Heading, headingVariants, Text, textVariants };
