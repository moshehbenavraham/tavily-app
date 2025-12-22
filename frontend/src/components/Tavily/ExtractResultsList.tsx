import { CheckCircle2, XCircle } from "lucide-react"

import type { ExtractResponse, ExtractResult } from "@/client/types.gen"

import { ExtractResultCard } from "./ExtractResultCard"

interface ExtractResultsListProps {
  response: ExtractResponse
}

function getFailedUrl(item: Record<string, unknown>): string {
  return (item.url as string) || "Unknown URL"
}

function getFailedError(item: Record<string, unknown>): string | undefined {
  return (item.error as string) || undefined
}

export function ExtractResultsList({ response }: ExtractResultsListProps) {
  const results = response.results || []
  const failedResults = response.failed_results || []

  if (results.length === 0 && failedResults.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Successful extractions */}
      {results.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <h3 className="font-body text-sm font-semibold text-foreground">
              Successful Extractions
            </h3>
            <span className="rounded-full bg-success/10 px-2 py-0.5 font-mono text-xs text-success">
              {results.length}
            </span>
          </div>
          <div className="space-y-4">
            {results.map((result: ExtractResult, index: number) => (
              <ExtractResultCard
                key={`${result.url}-${index}`}
                type="success"
                result={result}
              />
            ))}
          </div>
        </section>
      )}

      {/* Failed extractions */}
      {failedResults.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-destructive" />
            <h3 className="font-body text-sm font-semibold text-foreground">
              Failed Extractions
            </h3>
            <span className="rounded-full bg-destructive/10 px-2 py-0.5 font-mono text-xs text-destructive">
              {failedResults.length}
            </span>
          </div>
          <div className="space-y-4">
            {failedResults.map(
              (item: Record<string, unknown>, index: number) => (
                <ExtractResultCard
                  key={`failed-${getFailedUrl(item)}-${index}`}
                  type="failed"
                  url={getFailedUrl(item)}
                  error={getFailedError(item)}
                />
              ),
            )}
          </div>
        </section>
      )}
    </div>
  )
}

export default ExtractResultsList
