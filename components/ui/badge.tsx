import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        success:
          "border-transparent bg-[#ECF9F0] text-[#107937] hover:bg-[#ECF9F0]",
        warning:
          "border-transparent bg-[#FDF9E7] text-warning hover:bg-[#FDF9E7]",
        danger: "border-transparent bg-[#FCEDEE] text-error hover:bg-[#FCEDEE]",
        secondary: "bg-[#F0F0F0] text-grey-1000 hover:bg-[#F0F0F0]",
        info: "bg-[#E9EFFC] text-[#1D55CE] hover:bg-[#E9EFFC]",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
