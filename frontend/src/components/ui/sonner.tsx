"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-5" />,
        info: <InfoIcon className="size-5" />,
        warning: <TriangleAlertIcon className="size-5" />,
        error: <OctagonXIcon className="size-5" />,
        loading: <Loader2Icon className="size-5 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: `group toast
                  font-body text-[14px]
                  bg-background border-border
                  shadow-[0_4px_16px_oklch(0_0_0/0.08),0_12px_32px_oklch(0_0_0/0.08)]
                  dark:shadow-[0_4px_16px_oklch(0_0_0/0.4)]`,
          title: "font-semibold text-[15px] tracking-tight",
          description: "text-muted-foreground text-[14px]",
          actionButton: `bg-primary text-primary-foreground
                         font-medium text-[13px]
                         hover:bg-primary/90`,
          cancelButton: `bg-surface-2 text-foreground
                         font-medium text-[13px]
                         hover:bg-surface-3`,
          success: `border-success/30 [&>svg]:text-success
                    bg-success/5 dark:bg-success/10`,
          error: `border-destructive/30 [&>svg]:text-destructive
                  bg-destructive/5 dark:bg-destructive/10`,
          warning: `border-warning/30 [&>svg]:text-warning
                    bg-warning/5 dark:bg-warning/10`,
          info: `border-info/30 [&>svg]:text-info
                 bg-info/5 dark:bg-info/10`,
        },
      }}
      style={
        {
          "--normal-bg": "var(--background)",
          "--normal-text": "var(--foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "12px",
          "--width": "380px",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
