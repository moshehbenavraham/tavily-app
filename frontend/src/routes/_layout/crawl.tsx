import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/crawl")({
  component: CrawlPage,
  head: () => ({
    meta: [{ title: "Crawl - Tavily App" }],
  }),
})

function CrawlPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Web Crawling</h1>
        <p className="text-muted-foreground">
          Recursively crawl websites and extract content
        </p>
      </div>
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Coming soon...
      </div>
    </div>
  )
}
