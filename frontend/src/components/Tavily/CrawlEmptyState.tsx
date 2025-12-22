import { Globe, Layers, Network } from "lucide-react"

export function CrawlEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Icon container */}
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-muted/50 blur-xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2 shadow-luxury-sm">
          <Globe className="h-7 w-7 text-muted-foreground" />
        </div>
      </div>

      {/* Text content */}
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        No crawl results yet
      </h3>
      <p className="mt-2 max-w-sm text-body-sm leading-relaxed text-muted-foreground">
        Enter a website URL above to recursively crawl pages and extract their
        content automatically.
      </p>

      {/* Feature hints */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-surface-1 px-3 py-2">
          <Network className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">Recursive</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-surface-1 px-3 py-2">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">Multi-page</span>
        </div>
      </div>
    </div>
  )
}

export default CrawlEmptyState
