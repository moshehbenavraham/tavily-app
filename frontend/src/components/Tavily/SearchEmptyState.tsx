import { SearchX } from "lucide-react"

interface SearchEmptyStateProps {
  query?: string
}

export function SearchEmptyState({ query }: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Icon container with subtle animation */}
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-muted/50 blur-xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2 shadow-luxury-sm">
          <SearchX className="h-7 w-7 text-muted-foreground" />
        </div>
      </div>

      {/* Text content */}
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        No results found
      </h3>
      <p className="mt-2 max-w-sm text-body-sm leading-relaxed text-muted-foreground">
        {query ? (
          <>
            We couldn't find any results for{" "}
            <span className="font-medium text-foreground">"{query}"</span>.
            <br />
            Try adjusting your search terms or filters.
          </>
        ) : (
          "Enter a search query above to discover relevant web content."
        )}
      </p>

      {/* Suggestions */}
      {query && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-caption text-muted-foreground">
            Suggestions:
          </span>
          <span className="rounded-md bg-surface-1 px-2.5 py-1 text-xs text-muted-foreground">
            Check spelling
          </span>
          <span className="rounded-md bg-surface-1 px-2.5 py-1 text-xs text-muted-foreground">
            Use fewer keywords
          </span>
          <span className="rounded-md bg-surface-1 px-2.5 py-1 text-xs text-muted-foreground">
            Try different terms
          </span>
        </div>
      )}
    </div>
  )
}

export default SearchEmptyState
