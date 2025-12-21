import { ChevronDown, ChevronUp, ExternalLink, Globe } from "lucide-react"
import { useState } from "react"

import type { CrawlResult } from "@/client/types.gen"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Maximum characters to show in collapsed state
const CONTENT_PREVIEW_LENGTH = 500

interface CrawlResultCardProps {
  result: CrawlResult
  index: number
}

/**
 * Truncate URL for display, preserving domain
 */
function truncateUrl(url: string, maxLength = 60): string {
  if (url.length <= maxLength) {
    return url
  }

  try {
    const parsed = new URL(url)
    const domain = parsed.hostname
    const path = parsed.pathname + parsed.search

    if (domain.length >= maxLength - 3) {
      return `${domain.slice(0, maxLength - 3)}...`
    }

    const remainingLength = maxLength - domain.length - 3
    if (path.length > remainingLength) {
      return `${domain + path.slice(0, remainingLength)}...`
    }

    return domain + path
  } catch {
    return `${url.slice(0, maxLength - 3)}...`
  }
}

/**
 * Card component for displaying a single crawled page result.
 * Supports expand/collapse for long content.
 */
export function CrawlResultCard({ result, index }: CrawlResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const content = result.raw_content || ""
  const needsTruncation = content.length > CONTENT_PREVIEW_LENGTH
  const displayContent =
    needsTruncation && !isExpanded
      ? `${content.slice(0, CONTENT_PREVIEW_LENGTH)}...`
      : content

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-tight">
            Page {index + 1}
          </CardTitle>
        </div>
        <CardDescription className="flex items-center gap-1.5">
          <Globe className="h-3 w-3 shrink-0" />
          <span className="truncate text-xs">{truncateUrl(result.url)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {content ? (
          <div
            className={cn(
              "whitespace-pre-wrap text-sm text-muted-foreground",
              !isExpanded && needsTruncation && "max-h-48 overflow-hidden",
            )}
          >
            {displayContent}
          </div>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            No content extracted from this page.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {needsTruncation && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1.5"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  Show More ({Math.round(content.length / 1000)}k chars)
                </>
              )}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() =>
              window.open(result.url, "_blank", "noopener,noreferrer")
            }
          >
            <ExternalLink className="h-3 w-3" />
            Open URL
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CrawlResultCard
