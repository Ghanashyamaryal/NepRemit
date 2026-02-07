import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
    color: {
      default: "text-current",
      primary: "text-primary-600",
      secondary: "text-secondary-600",
      accent: "text-accent-500",
      muted: "text-neutral-400",
      success: "text-secondary-600",
      error: "text-error",
      warning: "text-accent-600",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export interface IconProps
  extends Omit<React.HTMLAttributes<SVGSVGElement>, "color">,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon;
  label?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, icon: IconComponent, size, color, label, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size, color, className }))}
        aria-label={label}
        aria-hidden={!label}
        {...props}
      />
    );
  }
);

Icon.displayName = "Icon";

export { Icon, iconVariants };
