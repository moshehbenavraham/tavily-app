import { ExternalLink, FileText } from "lucide-react"

import type { PerplexitySearchResult } from "@/client/types.gen"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PerplexityCitationsListProps {
  citations?: string[]
  searchResults?: PerplexitySearchResult[]
}

export function PerplexityCitationsList({
  citations,
  searchResults,
}: PerplexityCitationsListProps) {
  // Use search_results for detailed info, fallback to citations for URLs only
  const sources = searchResults?.length ? searchResults : null
  const urlList = citations ?? []

  if (!sources && urlList.length === 0) {
    return (
      <Card variant="muted">
        <CardContent className="py-6 text-center text-sm text-muted-foreground">
          No sources available for this response.
        </CardContent>
      </Card>
    )
  }

  // If we have detailed search results, use those
  if (sources) {
    return (
      <Card variant="muted">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" />
            Sources ({sources.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {sources.map((source, index) => (
            <div
              key={`source-${index}-${source.url}`}
              className="rounded-lg border p-3 transition-colors hover:bg-muted/50"
            >
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-2"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate font-medium text-foreground group-hover:text-primary">
                      {source.title || "Untitled Source"}
                    </span>
                    <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
                  </div>
                  {source.snippet && (
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {source.snippet}
                    </p>
                  )}
                  <p className="mt-1 truncate text-xs text-muted-foreground/70">
                    {source.url}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  // Fallback: just URLs from citations array
  return (
    <Card variant="muted">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <FileText className="h-4 w-4" />
          Citations ({urlList.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {urlList.map((url, index) => (
            <li key={`citation-${index}-${url}`}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium">
                  {index + 1}
                </span>
                <span className="truncate">{url}</span>
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export default PerplexityCitationsList
