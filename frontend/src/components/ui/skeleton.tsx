import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        // Luxury shimmer effect - warm gradient animation
        `rounded-lg
         bg-gradient-to-r from-muted via-surface-2 to-muted
         bg-[length:200%_100%]
         animate-[luxuryShimmer_2s_ease-in-out_infinite]`,
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
