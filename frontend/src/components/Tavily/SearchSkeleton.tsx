import { Skeleton } from "@/components/ui/skeleton"

interface SearchSkeletonProps {
  count?: number
}

export function SearchSkeleton({ count = 6 }: SearchSkeletonProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-border bg-card p-5"
          style={{
            animationDelay: `${index * 50}ms`,
          }}
        >
          {/* Header skeleton */}
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-4/5" />
              <Skeleton className="h-3.5 w-2/5" />
            </div>
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>

          {/* Content skeleton */}
          <div className="mb-4 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />
          </div>

          {/* Footer skeleton */}
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      ))}
    </div>
  )
}

export default SearchSkeleton
