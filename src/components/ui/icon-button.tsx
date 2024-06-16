import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&>svg]:h-[--icon-size] [&>svg]:w-[--icon-size]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      rounded: {
        md: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
      fullWidth: {
        true: "w-full",
      },
      size: {
        sm: "h-7 w-7 [--icon-size:16px]",
        default: "h-10 w-10 [--icon-size:20px]",
        lg: "h-16 w-16 [--icon-size:24px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "full",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  label: string;
}

const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, label, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        aria-label={label}
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
