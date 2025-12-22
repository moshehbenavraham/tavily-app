import { Skeleton } from "@/components/ui/skeleton"

interface ExtractSkeletonProps {
  count?: number
}

export function ExtractSkeleton({ count = 3 }: ExtractSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-xl border border-border bg-card p-5"
          style={{ animationDelay: `${index * 75}ms` }}
        >
          {/* Left accent bar skeleton */}
          <div className="absolute left-0 top-0 h-full w-1">
            <Skeleton className="h-full w-full" />
          </div>

          {/* Header skeleton */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </div>

          {/* Content skeleton */}
          <div className="mt-4 space-y-2 rounded-lg bg-surface-1 p-4">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-4/5" />
          </div>

          {/* Actions skeleton */}
          <div className="mt-4 flex items-center gap-2">
            <Skeleton className="h-8 w-28 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExtractSkeleton
