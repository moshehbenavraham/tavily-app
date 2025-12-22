import { ExternalLink, Link } from "lucide-react"

import { Badge } from "@/components/ui/badge"

interface MapMetadataProps {
  baseUrl: string
  totalUrls: number
}

/**
 * Displays metadata for map results: base URL and total count.
 */
export function MapMetadata({ baseUrl, totalUrls }: MapMetadataProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/30 p-4">
      <div className="flex items-center gap-2">
        <Link className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Base URL:</span>
        <a
          href={baseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          {baseUrl}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <Badge variant="secondary" className="ml-auto">
        {totalUrls} {totalUrls === 1 ? "URL" : "URLs"} discovered
      </Badge>
    </div>
  )
}

export default MapMetadata
