import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

import type { ExtractResponse } from "@/client/types.gen"
import { ExtractEmptyState } from "@/components/Tavily/ExtractEmptyState"
import { ExtractForm } from "@/components/Tavily/ExtractForm"
import { ExtractResultsList } from "@/components/Tavily/ExtractResultsList"
import { ExtractSkeleton } from "@/components/Tavily/ExtractSkeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useExtract } from "@/hooks/useExtract"

export const Route = createFileRoute("/_layout/extract")({
  component: ExtractPage,
  head: () => ({
    meta: [{ title: "Extract - Tavily App" }],
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

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Content Extraction
        </h1>
        <p className="text-muted-foreground">
          Extract clean content from web pages using Tavily
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>URL Input</CardTitle>
        </CardHeader>
        <CardContent>
          <ExtractForm mutation={mutation} />
        </CardContent>
      </Card>

      {/* Loading skeleton */}
      {showSkeleton && (
        <Card>
          <CardHeader>
            <CardTitle>Extracting content...</CardTitle>
          </CardHeader>
          <CardContent>
            <ExtractSkeleton count={3} />
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {showEmptyState && (
        <Card>
          <CardContent className="pt-6">
            <ExtractEmptyState />
          </CardContent>
        </Card>
      )}

      {/* Extraction results */}
      {hasResults && !mutation.isPending && (
        <Card>
          <CardHeader>
            <CardTitle>Extraction Results</CardTitle>
          </CardHeader>
          <CardContent>
            <ExtractResultsList response={extractResults} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
