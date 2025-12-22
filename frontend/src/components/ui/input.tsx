import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles - refined typography and spacing
        `flex h-11 w-full min-w-0
         rounded-xl border border-border
         bg-surface-1 px-4 py-2
         font-body text-[15px] text-foreground
         placeholder:text-muted-foreground
         selection:bg-primary/20 selection:text-foreground`,

        // Transitions
        `transition-all duration-200 ease-[cubic-bezier(0.25,1,0.5,1)]`,

        // Focus state - Forest Green ring
        `focus:border-primary focus:bg-background
         focus:shadow-[0_0_0_3px_oklch(0.35_0.08_160/0.15)]
         focus:outline-none
         dark:focus:shadow-[0_0_0_3px_oklch(0.55_0.10_160/0.2)]`,

        // Invalid state - Burgundy
        `aria-invalid:border-destructive
         aria-invalid:focus:shadow-[0_0_0_3px_oklch(0.50_0.18_25/0.15)]
         dark:aria-invalid:focus:shadow-[0_0_0_3px_oklch(0.60_0.18_25/0.2)]`,

        // Disabled state
        `disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`,

        // File input styling
        `file:inline-flex file:h-8 file:border-0 file:bg-transparent
         file:text-sm file:font-medium file:text-foreground`,

        // Dark mode adjustments
        `dark:bg-surface-1 dark:border-[oklch(1_0_0/0.1)]
         dark:focus:border-[oklch(0.55_0.10_160)]`,

        className
      )}
      {...props}
    />
  )
}

export { Input }
