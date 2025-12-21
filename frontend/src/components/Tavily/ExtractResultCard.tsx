import {
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
} from "lucide-react"
import { useState } from "react"

import type { ExtractResult } from "@/client/types.gen"
import { Badge } from "@/components/ui/badge"
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

/**
 * Props for a successful extraction result
 */
interface SuccessResultProps {
  type: "success"
  result: ExtractResult
}

/**
 * Props for a failed extraction result
 */
interface FailedResultProps {
  type: "failed"
  url: string
  error?: string
}

export type ExtractResultCardProps = SuccessResultProps | FailedResultProps

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
 * Card component for displaying extraction results.
 * Supports both successful extractions and failed extractions.
 */
export function ExtractResultCard(props: ExtractResultCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (props.type === "failed") {
    return (
      <Card className="border-destructive/50 bg-destructive/5">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <CardTitle className="text-base">Extraction Failed</CardTitle>
            </div>
            <Badge variant="destructive">Failed</Badge>
          </div>
          <CardDescription className="flex items-center gap-1.5">
            <Globe className="h-3 w-3 shrink-0" />
            <span className="truncate text-xs">{truncateUrl(props.url)}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {props.error || "Unable to extract content from this URL."}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3 gap-1.5"
            onClick={() =>
              window.open(props.url, "_blank", "noopener,noreferrer")
            }
          >
            <ExternalLink className="h-3 w-3" />
            Open URL
          </Button>
        </CardContent>
      </Card>
    )
  }

  // Success state
  const { result } = props
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
            Extracted Content
          </CardTitle>
          <Badge
            className={cn(
              "shrink-0",
              "bg-green-100 text-green-800 border-green-200",
              "dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
            )}
          >
            Success
          </Badge>
        </div>
        <CardDescription className="flex items-center gap-1.5">
          <Globe className="h-3 w-3 shrink-0" />
          <span className="truncate text-xs">{truncateUrl(result.url)}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          className={cn(
            "whitespace-pre-wrap text-sm text-muted-foreground",
            !isExpanded && needsTruncation && "max-h-48 overflow-hidden",
          )}
        >
          {displayContent}
        </div>

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

export default ExtractResultCard
