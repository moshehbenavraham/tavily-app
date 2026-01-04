import { createFileRoute } from "@tanstack/react-router"
import { FileText } from "lucide-react"
import { useState } from "react"

import type { ExtractResponse } from "@/client/types.gen"
import { ExtractEmptyState } from "@/components/Tavily/ExtractEmptyState"
import { ExtractForm } from "@/components/Tavily/ExtractForm"
import { ExtractResultsList } from "@/components/Tavily/ExtractResultsList"
import { ExtractSkeleton } from "@/components/Tavily/ExtractSkeleton"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useExtract } from "@/hooks/useExtract"

export const Route = createFileRoute("/_layout/extract")({
  component: ExtractPage,
  head: () => ({
    meta: [{ title: "Extract - AI Search" }],
  }),
})

function ExtractPage() {
  const [extractResults, setExtractResults] = useState<ExtractResponse | null>(
    null,
  )

  const mutation = useExtract({
    onSuccess: (data) => {
      setExtractResults(data)
    },
  })

  const hasResults =
    extractResults &&
    ((extractResults.results && extractResults.results.length > 0) ||
      (extractResults.failed_results &&
        extractResults.failed_results.length > 0))
  const showEmptyState = !extractResults && !mutation.isPending
  const showSkeleton = mutation.isPending

  const successCount = extractResults?.results?.length ?? 0
  const failedCount = extractResults?.failed_results?.length ?? 0

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <header className="page-enter space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-display-lg font-medium tracking-tight">
              Content Extraction
            </h1>
          </div>
        </div>
        <p className="max-w-2xl text-body text-muted-foreground">
          Extract clean, structured content from web pages. Perfect for data
          collection, content analysis, and research workflows.
        </p>
      </header>

      {/* URL Input Card */}
      <Card className="page-enter-child" variant="elevated">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-heading">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            URL Input
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ExtractForm mutation={mutation} />
        </CardContent>
      </Card>

      {/* Loading skeleton */}
      {showSkeleton && (
        <Card className="page-enter-child" variant="default">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-heading">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              Extracting content...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ExtractSkeleton count={3} />
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {showEmptyState && (
        <Card className="page-enter-child" variant="default">
          <CardContent className="py-8">
            <ExtractEmptyState />
          </CardContent>
        </Card>
      )}

      {/* Extraction results */}
      {hasResults && !mutation.isPending && (
        <Card className="page-enter-child" variant="elevated">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-heading">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Extraction Results
              </CardTitle>
              <div className="flex items-center gap-2">
                {successCount > 0 && (
                  <Badge variant="success" className="font-mono text-xs">
                    {successCount} success
                  </Badge>
                )}
                {failedCount > 0 && (
                  <Badge variant="destructive" className="font-mono text-xs">
                    {failedCount} failed
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ExtractResultsList response={extractResults} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
