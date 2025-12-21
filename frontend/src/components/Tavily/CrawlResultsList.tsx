import type { CrawlResult } from "@/client/types.gen"

import { CrawlResultCard } from "./CrawlResultCard"

interface CrawlResultsListProps {
  results: CrawlResult[]
}

/**
 * Scrollable container for displaying crawl results.
 * Renders a list of CrawlResultCard components.
 */
export function CrawlResultsList({ results }: CrawlResultsListProps) {
  if (results.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
        <p>No pages were crawled from this URL.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
      {results.map((result, index) => (
        <CrawlResultCard key={result.url} result={result} index={index} />
      ))}
    </div>
  )
}

export default CrawlResultsList
