import { ExternalLink, Globe, Link2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"

interface MapMetadataProps {
  baseUrl: string
  totalUrls: number
}

function extractDomain(url: string): string {
  try {
    const parsed = new URL(url)
    return parsed.hostname.replace(/^www\./, "")
  } catch {
    return url.slice(0, 30)
  }
}

export function MapMetadata({ baseUrl, totalUrls }: MapMetadataProps) {
  const domain = extractDomain(baseUrl)

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-surface-1 p-4">
      {/* Base URL */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Globe className="h-4 w-4 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-caption text-muted-foreground">Base URL</span>
          <a
            href={baseUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-mono text-xs text-foreground transition-colors hover:text-primary"
          >
            {domain}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      <div className="hidden h-8 w-px bg-border sm:block" />

      {/* Total URLs */}
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
          <Link2 className="h-4 w-4 text-success" />
        </div>
        <div className="flex flex-col">
          <span className="text-caption text-muted-foreground">
            URLs Discovered
          </span>
          <Badge variant="success" className="w-fit font-mono text-xs">
            {totalUrls}
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default MapMetadata
