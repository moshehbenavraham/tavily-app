import { createFileRoute } from "@tanstack/react-router"
import { Sparkles } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute("/_layout/perplexity-research")({
  component: PerplexityResearchPage,
  head: () => ({
    meta: [{ title: "Perplexity Research - Tavily App" }],
  }),
})

function PerplexityResearchPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="page-enter space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-display-lg font-medium tracking-tight">
              Perplexity Research
            </h1>
          </div>
        </div>
        <p className="max-w-2xl text-body text-muted-foreground">
          Conduct deep research using Perplexity's Sonar API. Get comprehensive
          answers with citations and source references.
        </p>
      </header>

      <Card className="page-enter-child" variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-heading">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Coming Soon
          </CardTitle>
          <CardDescription>
            Deep research functionality is being implemented in upcoming
            sessions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This page will allow you to submit research queries to Perplexity's
            Sonar deep research model. Results will include detailed answers
            with citations, source URLs, and the ability to save findings to
            your Items collection.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
