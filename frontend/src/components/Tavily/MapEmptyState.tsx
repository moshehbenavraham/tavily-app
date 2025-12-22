import { Map as MapIcon } from "lucide-react"

/**
 * Empty state component for map results.
 * Displayed when no mapping has been performed yet.
 */
export function MapEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4">
        <MapIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No map results yet</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter a URL above to discover and map URLs from a website.
      </p>
    </div>
  )
}

export default MapEmptyState
