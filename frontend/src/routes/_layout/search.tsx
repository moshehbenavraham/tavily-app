import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/search")({
  component: SearchPage,
  head: () => ({
    meta: [{ title: "Search - Tavily App" }],
  }),
})

function SearchPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Web Search</h1>
        <p className="text-muted-foreground">
          Search the web using Tavily AI-powered search
        </p>
      </div>
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Coming soon...
      </div>
    </div>
  )
}
