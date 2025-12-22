import { Hash, MessageSquare, Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"

interface SearchMetadataProps {
  query: string
  resultCount: number
  answer?: string | null
}

export function SearchMetadata({
  query,
  resultCount,
  answer,
}: SearchMetadataProps) {
  return (
    <div className="space-y-5">
      {/* Query Summary Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-surface-1 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-body-sm font-medium text-foreground">
            "{query}"
          </span>
        </div>
        <Badge variant="secondary" className="gap-1.5 font-mono text-xs">
          <Hash className="h-3 w-3" />
          {resultCount} {resultCount === 1 ? "result" : "results"}
        </Badge>
      </div>

      {/* AI Answer Card */}
      {answer && (
        <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-5">
          {/* Decorative accent */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-primary/30" />

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center gap-2">
                <h4 className="font-body text-sm font-semibold text-foreground">
                  AI Answer
                </h4>
                <Badge
                  variant="accent"
                  className="h-5 px-2 text-[10px] font-medium"
                >
                  <MessageSquare className="mr-1 h-2.5 w-2.5" />
                  Generated
                </Badge>
              </div>
              <p className="text-body-sm leading-relaxed text-muted-foreground">
                {answer}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchMetadata
