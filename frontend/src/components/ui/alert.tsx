import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  // Base styles - luxury container with refined grid layout
  `relative w-full rounded-xl border px-4 py-4
   font-body text-[14px]
   grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr]
   has-[>svg]:gap-x-3 gap-y-1 items-start
   [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:text-current
   transition-colors duration-200`,
  {
    variants: {
      variant: {
        // Default - Subtle surface with border
        default: `bg-surface-1 border-border text-foreground
                  [&>svg]:text-muted-foreground
                  *:data-[slot=alert-description]:text-muted-foreground`,

        // Destructive - Deep burgundy theme
        destructive: `bg-destructive/5 border-destructive/20 text-destructive
                      dark:bg-destructive/10 dark:border-destructive/30
                      [&>svg]:text-destructive
                      *:data-[slot=alert-description]:text-destructive/80`,

        // Success - Teal green theme
        success: `bg-success/5 border-success/20 text-success
                  dark:bg-success/10 dark:border-success/30
                  [&>svg]:text-success
                  *:data-[slot=alert-description]:text-success/80`,

        // Warning - Amber theme
        warning: `bg-warning/10 border-warning/30 text-[oklch(0.45_0.12_70)]
                  dark:bg-warning/5 dark:border-warning/20
                  dark:text-warning
                  [&>svg]:text-warning
                  *:data-[slot=alert-description]:text-[oklch(0.50_0.10_70)]
                  dark:*:data-[slot=alert-description]:text-warning/80`,

        // Info - Slate blue theme
        info: `bg-info/5 border-info/20 text-info
               dark:bg-info/10 dark:border-info/30
               [&>svg]:text-info
               *:data-[slot=alert-description]:text-info/80`,

        // Accent - Champagne gold theme (for highlights/featured)
        accent: `bg-accent/10 border-accent/30 text-accent-foreground
                 dark:bg-accent/5 dark:border-accent/20
                 [&>svg]:text-accent
                 *:data-[slot=alert-description]:text-accent-foreground/80`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        // Refined title with proper typography
        `col-start-2 line-clamp-1 min-h-5
         font-body font-semibold text-[15px]
         tracking-tight`,
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        // Description with refined typography
        `col-start-2 grid justify-items-start gap-1
         font-body text-[14px] leading-relaxed
         [&_p]:leading-relaxed`,
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
