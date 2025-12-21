import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/extract")({
  component: ExtractPage,
  head: () => ({
    meta: [{ title: "Extract - Tavily App" }],
  }),
})

function ExtractPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Content Extraction
        </h1>
        <p className="text-muted-foreground">
          Extract clean content from web pages using Tavily
        </p>
      </div>
      <div className="rounded-lg border p-8 text-center text-muted-foreground">
        Coming soon...
      </div>
    </div>
  )
}
