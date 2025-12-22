import { Globe, Link2, Loader2 } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton loading component for map results.
 * Displays a prominent loading indicator since mapping can take 10-60 seconds.
 */
export function MapSkeleton() {
  // Pre-computed widths for consistent rendering
  const urlWidths = [85, 72, 90, 65, 78, 88, 70, 82]

  return (
    <div className="space-y-6">
      {/* Prominent loading message for long-running operation */}
      <div className="flex items-center gap-4 rounded-xl border border-info/20 bg-info/5 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-info/10">
          <Loader2 className="h-5 w-5 animate-spin text-info" />
        </div>
        <div className="flex-1 space-y-1">
          <p className="font-body text-sm font-medium text-foreground">
            Mapping URLs...
          </p>
          <p className="text-body-sm text-muted-foreground">
            Discovering URLs from the website. This may take up to a minute.
          </p>
        </div>
      </div>

      {/* Skeleton metadata */}
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface-1 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Globe className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        <div className="hidden h-8 w-px bg-border sm:block" />

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
            <Link2 className="h-4 w-4 text-success" />
          </div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>
      </div>

      <div className="separator-elegant" />

      {/* Skeleton URL list */}
      <div className="space-y-4">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-8 rounded-full" />
          </div>
          <Skeleton className="h-8 w-20 rounded-lg" />
        </div>

        {/* URL list skeleton */}
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="divide-y divide-border">
            {urlWidths.map((width, index) => (
              <div key={index} className="flex items-center gap-3 px-4 py-3">
                <Skeleton className="h-6 w-6 shrink-0 rounded-md" />
                <Skeleton
                  className="h-4 flex-1"
                  style={{ maxWidth: `${width}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapSkeleton
