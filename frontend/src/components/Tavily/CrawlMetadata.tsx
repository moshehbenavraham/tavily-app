import { Clock, FileStack, Globe } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface CrawlMetadataProps {
  baseUrl: string
  totalPages: number
  responseTime?: number
}

/**
 * Metadata display for crawl results.
 * Shows base URL, total pages crawled, and optional response time.
 */
export function CrawlMetadata({
  baseUrl,
  totalPages,
  responseTime,
}: CrawlMetadataProps) {
  // Format response time for display
  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`
    const seconds = (ms / 1000).toFixed(1)
    return `${seconds}s`
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/50 p-4">
      {/* Base URL */}
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Base:</span>
        <a
          href={baseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          {baseUrl}
        </a>
      </div>

      <Separator orientation="vertical" className="h-5 hidden sm:block" />

      {/* Total pages */}
      <div className="flex items-center gap-2">
        <FileStack className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Pages:</span>
        <Badge variant="secondary">{totalPages}</Badge>
      </div>

      {/* Response time (optional) */}
      {responseTime !== undefined && (
        <>
          <Separator orientation="vertical" className="h-5 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Time:</span>
            <Badge variant="outline">{formatTime(responseTime)}</Badge>
          </div>
        </>
      )}
    </div>
  )
}

export default CrawlMetadata
