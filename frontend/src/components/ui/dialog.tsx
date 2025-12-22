import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        // Luxury overlay with subtle blur and warm tint
        `fixed inset-0 z-50
         bg-[oklch(0.14_0.01_60/0.6)] backdrop-blur-sm
         dark:bg-[oklch(0.08_0.01_60/0.7)]
         data-[state=open]:animate-in data-[state=closed]:animate-out
         data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
         duration-300`,
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          // Luxury dialog with refined shadows and animations
          `fixed top-[50%] left-[50%] z-50
           w-full max-w-[calc(100%-2rem)] sm:max-w-lg
           translate-x-[-50%] translate-y-[-50%]
           grid gap-5 p-6 sm:p-8

           /* Visual styling */
           bg-background border border-border
           rounded-2xl
           shadow-[0_4px_16px_oklch(0_0_0/0.08),0_24px_48px_oklch(0_0_0/0.12)]
           dark:shadow-[0_4px_16px_oklch(0_0_0/0.3),0_24px_48px_oklch(0_0_0/0.4)]

           /* Subtle top accent line */
           before:absolute before:inset-x-0 before:top-0 before:h-px
           before:bg-gradient-to-r before:from-transparent
           before:via-border-strong before:to-transparent
           before:rounded-t-2xl

           /* Animations */
           data-[state=open]:animate-in data-[state=closed]:animate-out
           data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
           data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
           data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]
           data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]
           duration-300`,
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className={cn(
              // Refined close button
              `absolute top-4 right-4
               h-8 w-8 rounded-lg
               flex items-center justify-center
               text-muted-foreground
               transition-all duration-200
               hover:bg-surface-2 hover:text-foreground
               focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
               disabled:pointer-events-none
               [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4`
            )}
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn(
        // Refined header spacing
        "flex flex-col gap-2 text-center sm:text-left",
        className
      )}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        // Footer with proper spacing and alignment
        `flex flex-col-reverse gap-3 pt-2
         sm:flex-row sm:justify-end`,
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        // Display typography for dialog titles
        `font-display text-xl font-semibold
         tracking-tight text-foreground`,
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        // Body typography for descriptions
        `font-body text-[15px] text-muted-foreground
         leading-relaxed`,
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
