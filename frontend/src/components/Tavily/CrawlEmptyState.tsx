import { Globe } from "lucide-react"

/**
 * Empty state component for crawl results.
 * Displayed when no crawl has been performed yet.
 */
export function CrawlEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4">
        <Globe className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No crawl results yet</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter a URL above to start crawling and extracting content.
      </p>
    </div>
  )
}

export default CrawlEmptyState
