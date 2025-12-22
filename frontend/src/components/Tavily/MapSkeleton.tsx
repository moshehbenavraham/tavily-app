import { Loader2 } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"

/**
 * Skeleton loading component for map results.
 * Displays a prominent loading indicator since mapping can take 10-60 seconds.
 */
export function MapSkeleton() {
  return (
    <div className="space-y-6">
      {/* Prominent loading message for long-running operation */}
      <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
        <div className="flex-1">
          <p className="font-medium text-blue-900 dark:text-blue-100">
            Mapping URLs...
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Discovering URLs from the website. This may take up to a minute.
          </p>
        </div>
      </div>

      {/* Skeleton URL list */}
      <div className="space-y-2 rounded-lg border p-4">
        <div className="flex items-center justify-between pb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2 py-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton
              className="h-4 flex-1"
              style={{ width: `${60 + Math.random() * 30}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MapSkeleton
