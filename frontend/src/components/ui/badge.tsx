import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base styles
  `inline-flex items-center justify-center
   rounded-full border px-2.5 py-0.5
   font-body text-[11px] font-semibold uppercase tracking-wider
   w-fit whitespace-nowrap shrink-0
   [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none
   transition-colors duration-200 overflow-hidden`,
  {
    variants: {
      variant: {
        // Default - Forest Green
        default: `border-transparent bg-primary text-primary-foreground
                  [a&]:hover:bg-[oklch(0.40_0.09_160)]
                  dark:bg-[oklch(0.55_0.10_160)]`,

        // Secondary - Subtle surface
        secondary: `border-border bg-surface-2 text-foreground
                    [a&]:hover:bg-surface-3
                    dark:bg-surface-2 dark:border-[oklch(1_0_0/0.1)]`,

        // Destructive - Burgundy
        destructive: `border-transparent bg-destructive text-white
                      [a&]:hover:bg-destructive/90
                      dark:bg-[oklch(0.60_0.18_25)]`,

        // Outline - Bordered with no fill
        outline: `border-border bg-transparent text-foreground
                  [a&]:hover:bg-surface-1
                  dark:border-[oklch(1_0_0/0.15)]`,

        // Success - Teal green
        success: `border-transparent bg-success text-white
                  [a&]:hover:bg-success/90
                  dark:bg-[oklch(0.65_0.15_155)]`,

        // Warning - Amber
        warning: `border-transparent bg-warning text-[oklch(0.25_0.05_70)]
                  [a&]:hover:bg-warning/90
                  dark:bg-[oklch(0.75_0.15_70)] dark:text-[oklch(0.15_0.03_70)]`,

        // Info - Slate blue
        info: `border-transparent bg-info text-white
               [a&]:hover:bg-info/90
               dark:bg-[oklch(0.60_0.10_250)]`,

        // Accent - Champagne gold
        accent: `border-transparent bg-accent text-accent-foreground
                 [a&]:hover:bg-[oklch(0.70_0.14_85)]
                 dark:bg-[oklch(0.78_0.14_85)] dark:text-[oklch(0.14_0.01_60)]`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
