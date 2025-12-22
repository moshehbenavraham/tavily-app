import { Link2, Map as MapIcon, Scan } from "lucide-react"

export function MapEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {/* Icon container */}
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-muted/50 blur-xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-2 shadow-luxury-sm">
          <MapIcon className="h-7 w-7 text-muted-foreground" />
        </div>
      </div>

      {/* Text content */}
      <h3 className="mt-6 font-display text-xl font-medium tracking-tight text-foreground">
        No map results yet
      </h3>
      <p className="mt-2 max-w-sm text-body-sm leading-relaxed text-muted-foreground">
        Enter a website URL above to discover and map all accessible URLs
        without extracting their content.
      </p>

      {/* Feature hints */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-surface-1 px-3 py-2">
          <Scan className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">URL Discovery</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-surface-1 px-3 py-2">
          <Link2 className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs text-muted-foreground">Site Structure</span>
        </div>
      </div>
    </div>
  )
}

export default MapEmptyState
