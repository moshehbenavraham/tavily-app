import { ExternalLink, Images } from "lucide-react"

import type { SearchImage } from "@/client/types.gen"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SearchImageGridProps {
  images: SearchImage[]
}

export function SearchImageGrid({ images }: SearchImageGridProps) {
  if (!images || images.length === 0) {
    return null
  }

  const handleImageClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <Card variant="elevated">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-heading">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Images className="h-4 w-4 text-accent-foreground" />
          </span>
          <span>Image Results</span>
          <Badge variant="secondary" className="ml-1 font-mono text-xs">
            {images.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image.url}-${index}`}
              onClick={() => handleImageClick(image.url)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-surface-1 shadow-luxury-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-luxury-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={image.description || `Open image ${index + 1}`}
            >
              <img
                src={image.url}
                alt={image.description || `Search result image ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  target.parentElement?.classList.add("bg-muted")
                }}
              />
              {/* Hover overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-black backdrop-blur-sm">
                    <ExternalLink className="h-3 w-3" />
                    Open
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default SearchImageGrid
