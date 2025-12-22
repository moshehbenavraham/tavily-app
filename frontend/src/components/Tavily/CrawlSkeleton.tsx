import { Globe, Loader2 } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

interface CrawlSkeletonProps {
  count?: number
}

export function CrawlSkeleton({ count = 3 }: CrawlSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Loading indicator with progress message */}
      <div className="relative overflow-hidden rounded-xl border border-info/20 bg-info/5 p-5">
        <div className="absolute left-0 top-0 h-full w-1 bg-info" />
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-info/10">
            <Loader2 className="h-5 w-5 animate-spin text-info" />
          </div>
          <div>
            <h4 className="font-body text-sm font-semibold text-foreground">
              Crawling website...
            </h4>
            <p className="mt-1 text-body-sm text-muted-foreground">
              This may take up to 2 minutes depending on your depth and breadth
              settings.
            </p>
          </div>
        </div>
      </div>

      {/* Skeleton cards */}
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl border border-border bg-card p-5"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            {/* Left accent */}
            <div className="absolute left-0 top-0 h-full w-1">
              <Skeleton className="h-full w-full" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-muted" />
                  <Skeleton className="h-3.5 w-32" />
                </div>
              </div>
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            {/* Content */}
            <div className="mt-4 space-y-2 rounded-lg bg-surface-1 p-4">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-11/12" />
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-2">
              <Skeleton className="h-8 w-20 rounded-lg" />
              <Skeleton className="h-8 w-16 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CrawlSkeleton
