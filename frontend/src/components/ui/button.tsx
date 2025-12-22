import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base styles - refined typography, smooth transitions, focus states
  `inline-flex items-center justify-center gap-2 whitespace-nowrap
   font-body text-sm font-medium tracking-wide
   transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]
   disabled:pointer-events-none disabled:opacity-50
   [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4
   shrink-0 [&_svg]:shrink-0
   outline-none
   focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
   aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`,
  {
    variants: {
      variant: {
        // Primary - Deep Forest Green with accent shadow and lift effect
        default: `bg-primary text-primary-foreground
                  shadow-[0_4px_14px_oklch(0.35_0.08_160/0.25),0_8px_24px_oklch(0.35_0.08_160/0.15)]
                  hover:bg-[oklch(0.40_0.09_160)] hover:-translate-y-0.5
                  hover:shadow-[0_6px_20px_oklch(0.35_0.08_160/0.3),0_12px_32px_oklch(0.35_0.08_160/0.2)]
                  active:translate-y-0 active:shadow-[0_4px_14px_oklch(0.35_0.08_160/0.25)]
                  dark:bg-[oklch(0.55_0.10_160)]
                  dark:shadow-[0_4px_14px_oklch(0.55_0.10_160/0.3),0_8px_24px_oklch(0.55_0.10_160/0.2)]
                  dark:hover:bg-[oklch(0.60_0.11_160)]
                  dark:hover:shadow-[0_6px_20px_oklch(0.55_0.10_160/0.35),0_12px_32px_oklch(0.55_0.10_160/0.25)]`,

        // Destructive - Deep Burgundy
        destructive: `bg-destructive text-white
                      shadow-[0_4px_14px_oklch(0.50_0.18_25/0.25)]
                      hover:bg-destructive/90 hover:-translate-y-0.5
                      hover:shadow-[0_6px_20px_oklch(0.50_0.18_25/0.3)]
                      active:translate-y-0
                      focus-visible:ring-destructive/30
                      dark:bg-[oklch(0.60_0.18_25)]
                      dark:shadow-[0_4px_14px_oklch(0.60_0.18_25/0.3)]`,

        // Outline - Subtle border with elegant hover
        outline: `border border-border bg-transparent
                  hover:bg-surface-1 hover:border-[oklch(0.82_0.01_75)]
                  active:bg-surface-2
                  dark:border-[oklch(1_0_0/0.15)] dark:hover:bg-surface-1 dark:hover:border-[oklch(1_0_0/0.25)]`,

        // Secondary - Graphite surface
        secondary: `bg-surface-2 text-foreground border border-border
                    hover:bg-surface-3 hover:border-[oklch(0.82_0.01_75)]
                    active:bg-surface-2
                    dark:bg-surface-2 dark:hover:bg-surface-3`,

        // Ghost - Minimal, text-only with subtle hover
        ghost: `text-muted-foreground
                hover:text-foreground hover:bg-surface-1
                dark:hover:bg-surface-1`,

        // Accent - Champagne Gold for special actions
        accent: `bg-accent text-accent-foreground
                 shadow-sm
                 hover:bg-[oklch(0.70_0.14_85)] hover:-translate-y-0.5
                 hover:shadow-md
                 active:translate-y-0
                 dark:bg-[oklch(0.78_0.14_85)] dark:text-[oklch(0.14_0.01_60)]
                 dark:hover:bg-[oklch(0.82_0.15_85)]`,

        // Link - Underlined text link
        link: `text-primary underline-offset-4 hover:underline p-0 h-auto
               dark:text-[oklch(0.55_0.10_160)]`,
      },
      size: {
        // Default - Comfortable padding
        default: "h-10 px-5 py-2 rounded-xl has-[>svg]:px-4",

        // Small - Compact
        sm: "h-9 px-4 py-2 rounded-lg gap-1.5 text-[13px] has-[>svg]:px-3",

        // Large - Prominent
        lg: "h-12 px-8 py-3 rounded-xl text-[15px] has-[>svg]:px-6",

        // Extra Large - Hero CTAs
        xl: "h-14 px-10 py-4 rounded-2xl text-base font-semibold has-[>svg]:px-8",

        // Icon buttons
        icon: "size-10 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
