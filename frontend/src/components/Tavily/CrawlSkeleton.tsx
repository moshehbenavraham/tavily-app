import { Loader2 } from "lucide-react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface CrawlSkeletonProps {
  count?: number
}

/**
 * Skeleton loading component for crawl results.
 * Displays a prominent loading indicator since crawls can take 30-150 seconds.
 */
export function CrawlSkeleton({ count = 3 }: CrawlSkeletonProps) {
  return (
    <div className="space-y-6">
      {/* Prominent loading message for long-running operation */}
      <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/30">
        <Loader2 className="h-5 w-5 animate-spin text-blue-600 dark:text-blue-400" />
        <div className="flex-1">
          <p className="font-medium text-blue-900 dark:text-blue-100">
            Crawling website...
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            This may take up to 2 minutes depending on depth and breadth
            settings.
          </p>
        </div>
      </div>

      {/* Skeleton cards */}
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-5 w-16" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CrawlSkeleton
