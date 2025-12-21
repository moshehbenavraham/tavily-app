import { createFileRoute } from "@tanstack/react-router"
import { useRef, useState } from "react"

import type { CrawlResponse } from "@/client/types.gen"
import { CrawlEmptyState } from "@/components/Tavily/CrawlEmptyState"
import { CrawlForm } from "@/components/Tavily/CrawlForm"
import { CrawlMetadata } from "@/components/Tavily/CrawlMetadata"
import { CrawlResultsList } from "@/components/Tavily/CrawlResultsList"
import { CrawlSkeleton } from "@/components/Tavily/CrawlSkeleton"
import { useCrawl } from "@/hooks/useCrawl"

export const Route = createFileRoute("/_layout/crawl")({
  component: CrawlPage,
  head: () => ({
    meta: [{ title: "Crawl - Tavily App" }],
  }),
})

function CrawlPage() {
  const [crawlResult, setCrawlResult] = useState<CrawlResponse | null>(null)
  const [responseTime, setResponseTime] = useState<number | undefined>()
  const startTimeRef = useRef<number>(0)

  const mutation = useCrawl({
    onSuccess: (data) => {
      setResponseTime(Date.now() - startTimeRef.current)
      setCrawlResult(data)
    },
  })

  // Create a wrapped mutation that tracks timing
  const timedMutation = {
    ...mutation,
    mutate: (request: Parameters<typeof mutation.mutate>[0]) => {
      startTimeRef.current = Date.now()
      mutation.mutate(request)
    },
  } as typeof mutation

  const results = crawlResult?.results || []
  const totalPages = crawlResult?.total_pages || results.length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Web Crawling</h1>
        <p className="text-muted-foreground">
          Recursively crawl websites and extract content from discovered pages.
        </p>
      </div>

      {/* Form */}
      <CrawlForm mutation={timedMutation} />

      {/* Results Section */}
      {mutation.isPending ? (
        <CrawlSkeleton count={3} />
      ) : crawlResult ? (
        <div className="space-y-4">
          <CrawlMetadata
            baseUrl={crawlResult.base_url}
            totalPages={totalPages}
            responseTime={responseTime}
          />
          {results.length > 0 ? (
            <CrawlResultsList results={results} />
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              <p>No pages were crawled from this URL.</p>
            </div>
          )}
        </div>
      ) : (
        <CrawlEmptyState />
      )}
    </div>
  )
}
