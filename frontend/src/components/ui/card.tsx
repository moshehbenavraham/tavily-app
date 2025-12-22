import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  // Base styles
  `bg-card text-card-foreground flex flex-col gap-6 rounded-2xl border py-6
   transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]`,
  {
    variants: {
      variant: {
        // Default - Subtle surface with light border
        default: `bg-surface-1 border-border shadow-[0_1px_2px_oklch(0_0_0/0.02),0_2px_4px_oklch(0_0_0/0.04)]
                  dark:bg-surface-1 dark:border-[oklch(1_0_0/0.08)]`,

        // Elevated - More prominence with layered shadows
        elevated: `bg-surface-2 border-border
                   shadow-[0_1px_2px_oklch(0_0_0/0.02),0_4px_8px_oklch(0_0_0/0.04),0_8px_16px_oklch(0_0_0/0.04)]
                   hover:shadow-[0_1px_2px_oklch(0_0_0/0.02),0_4px_8px_oklch(0_0_0/0.03),0_12px_24px_oklch(0_0_0/0.06),0_24px_48px_oklch(0_0_0/0.06)]
                   hover:-translate-y-0.5
                   dark:bg-surface-2 dark:border-[oklch(1_0_0/0.1)]`,

        // Feature - Hero placement with gradient and accent border
        feature: `bg-gradient-to-br from-surface-1 to-surface-2 border-[oklch(0.82_0.01_75)]
                  shadow-[0_1px_2px_oklch(0_0_0/0.02),0_4px_8px_oklch(0_0_0/0.03),0_12px_24px_oklch(0_0_0/0.06),0_24px_48px_oklch(0_0_0/0.06)]
                  relative overflow-hidden rounded-[20px]
                  before:absolute before:inset-x-0 before:top-0 before:h-px
                  before:bg-gradient-to-r before:from-transparent before:via-accent/50 before:to-transparent
                  dark:from-surface-1 dark:to-surface-2 dark:border-[oklch(1_0_0/0.15)]`,

        // Interactive - Clickable card with hover states
        interactive: `bg-surface-1 border-border cursor-pointer
                      shadow-[0_1px_2px_oklch(0_0_0/0.02),0_2px_4px_oklch(0_0_0/0.04)]
                      hover:shadow-[0_1px_2px_oklch(0_0_0/0.02),0_4px_8px_oklch(0_0_0/0.04),0_8px_16px_oklch(0_0_0/0.04)]
                      hover:border-[oklch(0.82_0.01_75)] hover:-translate-y-1
                      active:translate-y-0 active:shadow-[0_1px_2px_oklch(0_0_0/0.02),0_2px_4px_oklch(0_0_0/0.04)]
                      dark:bg-surface-1 dark:border-[oklch(1_0_0/0.08)]
                      dark:hover:border-[oklch(1_0_0/0.2)]`,

        // Muted - Low emphasis
        muted: `bg-muted/50 border-transparent
                dark:bg-muted/30`,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        `@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6
         has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6`,
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        `font-body text-lg font-semibold leading-tight tracking-tight text-foreground`,
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        `font-body text-[14px] text-muted-foreground leading-relaxed`,
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6 [.border-t]:pt-6",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
