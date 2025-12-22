import { createFileRoute } from "@tanstack/react-router"
import { useRef, useState } from "react"

import type { MapResponse } from "@/client/types.gen"
import { MapEmptyState } from "@/components/Tavily/MapEmptyState"
import { MapForm } from "@/components/Tavily/MapForm"
import { MapMetadata } from "@/components/Tavily/MapMetadata"
import { MapResultsList } from "@/components/Tavily/MapResultsList"
import { MapSkeleton } from "@/components/Tavily/MapSkeleton"
import { useMap } from "@/hooks/useMap"

export const Route = createFileRoute("/_layout/map")({
  component: MapPage,
  head: () => ({
    meta: [{ title: "Map - Tavily App" }],
  }),
})

function MapPage() {
  const [mapResult, setMapResult] = useState<MapResponse | null>(null)
  const startTimeRef = useRef<number>(0)

  const mutation = useMap({
    onSuccess: (data) => {
      setMapResult(data)
    },
  })

  // Create a wrapped mutation that tracks timing
  const timedMutation = {
    ...mutation,
    mutate: (request: Parameters<typeof mutation.mutate>[0]) => {
      startTimeRef.current = Date.now()
      mutation.mutate(request)
    },
  } as typeof mutation

  const urls = mapResult?.urls || []
  const totalUrls = mapResult?.total_urls || urls.length

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">URL Mapping</h1>
        <p className="text-muted-foreground">
          Discover and map URLs from websites without extracting content.
        </p>
      </div>

      {/* Form */}
      <MapForm mutation={timedMutation} />

      {/* Results Section */}
      {mutation.isPending ? (
        <MapSkeleton />
      ) : mapResult ? (
        <div className="space-y-4">
          <MapMetadata baseUrl={mapResult.base_url} totalUrls={totalUrls} />
          {urls.length > 0 ? (
            <MapResultsList urls={urls} />
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center text-muted-foreground">
              <p>No URLs were discovered from this website.</p>
            </div>
          )}
        </div>
      ) : (
        <MapEmptyState />
      )}
    </div>
  )
}
