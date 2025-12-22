import { Check, Copy, ExternalLink } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"

interface MapResultsListProps {
  urls: string[]
}

/**
 * Displays a scrollable list of discovered URLs with copy functionality.
 * Each URL has a copy button, and there's a "Copy All" button for bulk copy.
 */
export function MapResultsList({ urls }: MapResultsListProps) {
  const [copiedText, copy] = useCopyToClipboard()

  const handleCopyUrl = async (url: string) => {
    const success = await copy(url)
    if (success) {
      toast.success("URL copied to clipboard")
    } else {
      toast.error("Failed to copy URL")
    }
  }

  const handleCopyAll = async () => {
    const allUrls = urls.join("\n")
    const success = await copy(allUrls)
    if (success) {
      toast.success(`${urls.length} URLs copied to clipboard`)
    } else {
      toast.error("Failed to copy URLs")
    }
  }

  return (
    <div className="rounded-lg border">
      {/* Header with Copy All button */}
      <div className="flex items-center justify-between border-b bg-muted/30 px-4 py-3">
        <span className="text-sm font-medium text-muted-foreground">
          Discovered URLs
        </span>
        <Button variant="outline" size="sm" onClick={handleCopyAll}>
          <Copy className="mr-2 h-3 w-3" />
          Copy All
        </Button>
      </div>

      {/* Scrollable URL list */}
      <div className="max-h-96 overflow-y-auto">
        <ul className="divide-y">
          {urls.map((url, index) => (
            <li
              key={index}
              className="flex items-center gap-2 px-4 py-2 hover:bg-muted/50"
            >
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 truncate text-sm text-primary hover:underline"
                title={url}
              >
                {url}
              </a>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-muted-foreground hover:text-primary"
                aria-label="Open URL in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
              <button
                type="button"
                onClick={() => handleCopyUrl(url)}
                className="shrink-0 text-muted-foreground hover:text-primary"
                aria-label="Copy URL to clipboard"
              >
                {copiedText === url ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MapResultsList
