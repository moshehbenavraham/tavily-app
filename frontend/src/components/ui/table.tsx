import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        // Luxury container with refined borders and shadow
        `relative w-full overflow-hidden rounded-2xl
         border border-border bg-surface-1
         shadow-[0_1px_2px_oklch(0_0_0/0.02),0_4px_8px_oklch(0_0_0/0.04)]
         dark:shadow-[0_2px_8px_oklch(0_0_0/0.3)]`
      )}
    >
      <div className="overflow-x-auto">
        <table
          data-slot="table"
          className={cn(
            "w-full caption-bottom font-body text-[14px]",
            className
          )}
          {...props}
        />
      </div>
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn(
        // Elevated header with subtle background
        `bg-surface-2/50 border-b border-border
         dark:bg-surface-2/30
         [&_tr]:border-b-0`,
        className
      )}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        // Refined footer styling
        `bg-surface-2/30 border-t border-border
         font-medium [&>tr]:last:border-b-0`,
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        // Subtle hover with smooth transition
        `border-b border-border/50
         transition-colors duration-150 ease-out
         hover:bg-surface-1 dark:hover:bg-surface-2/50
         data-[state=selected]:bg-accent/10
         dark:data-[state=selected]:bg-accent/5`,
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        // Refined header cells with proper typography
        `h-12 px-4 text-left align-middle
         font-body text-[11px] font-semibold uppercase
         tracking-[0.05em] text-muted-foreground
         whitespace-nowrap
         [&:has([role=checkbox])]:pr-0
         [&>[role=checkbox]]:translate-y-[2px]`,
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        // Comfortable cell padding with proper alignment
        `px-4 py-4 align-middle
         font-body text-[14px] text-foreground
         [&:has([role=checkbox])]:pr-0
         [&>[role=checkbox]]:translate-y-[2px]`,
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        // Refined caption with proper spacing
        `mt-4 font-body text-[13px] text-muted-foreground`,
        className
      )}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
