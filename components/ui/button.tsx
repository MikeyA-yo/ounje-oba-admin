import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-primary active:outline-none active:ring-1 active:ring-offset-1 active:ring-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-500 active:bg-primary-700 disabled:bg-[#C6C6C6] disabled:text-[#8D8D8D]",
        primary_error:
          "bg-error text-white hover:bg-error-300 active:bg-error-400 disabled:bg-[#C6C6C6] disabled:text-[#8D8D8D]",
        outline:
          "border border-primary text-primary bg-background hover:bg-primary-500 hover:text-white active:bg-primary-700 active:text-white focus-visible:bg-primary focus-visible:text-white disabled:border-[#C6C6C6]  disabled:text-[#C6C6C6]",
        secondary:
          "bg-[#393939] text-white hover:bg-[#4C4C4C] active:bg-[#6F6F6F] disabled:bg-[#C6C6C6] disabled:text-[#8D8D8D]",
        ghost:
          "text-primary hover:bg-[#E5E5E5] active:bg-[#C6C6C6] focus-visible:bg-background disabled:text-[#C6C6C6]",
        ghost_error:
          "text-error hover:bg-error-300 hover:text-white active:bg-error-400 active:text-white focus-visible:bg-background disabled:text-[#C6C6C6]",
      },
      size: {
        default: "rounded-md p-3",
        sm: "rounded-md px-2 py-1",
        md: "rounded-md p-2",
        lg: "rounded-md px-3 pt-3 pb-4",
        xl: "rounded-md px-3 pt-3 pb-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
