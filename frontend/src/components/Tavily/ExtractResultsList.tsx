import type { ExtractResponse, ExtractResult } from "@/client/types.gen"

import { ExtractResultCard } from "./ExtractResultCard"

interface ExtractResultsListProps {
  response: ExtractResponse
}

/**
 * Extract error info from failed_results array item
 */
function getFailedUrl(item: Record<string, unknown>): string {
  return (item.url as string) || "Unknown URL"
}

function getFailedError(item: Record<string, unknown>): string | undefined {
  return (item.error as string) || undefined
}

/**
 * Container component for displaying extraction results.
 * Separates successful extractions from failed ones.
 */
export function ExtractResultsList({ response }: ExtractResultsListProps) {
  const results = response.results || []
  const failedResults = response.failed_results || []

  if (results.length === 0 && failedResults.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Successful extractions */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Successful Extractions ({results.length})
          </h3>
          <div className="space-y-4">
            {results.map((result: ExtractResult, index: number) => (
              <ExtractResultCard
                key={`${result.url}-${index}`}
                type="success"
                result={result}
              />
            ))}
          </div>
        </div>
      )}

      {/* Failed extractions */}
      {failedResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-destructive">
            Failed Extractions ({failedResults.length})
          </h3>
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
        </div>
      )}
    </div>
  )
}

export default ExtractResultsList
