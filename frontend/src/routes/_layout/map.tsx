import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/map")({
  component: MapPage,
  head: () => ({
    meta: [{ title: "Map - Tavily App" }],
  }),
})

function MapPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">URL Mapping</h1>
        <p className="text-muted-foreground">
          Discover and map URLs from websites
        </p>
      </div>
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Coming soon...
      </div>
    </div>
  )
}
