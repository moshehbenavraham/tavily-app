import { createFileRoute } from "@tanstack/react-router"
import { Telescope } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute("/_layout/gemini-research")({
  component: GeminiResearchPage,
  head: () => ({
    meta: [{ title: "Gemini Research - Tavily App" }],
  }),
})

function GeminiResearchPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="page-enter space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Telescope className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-display-lg font-medium tracking-tight">
              Gemini Research
            </h1>
          </div>
        </div>
        <p className="max-w-2xl text-body text-muted-foreground">
          Conduct deep research using Google's Gemini 2.0 Flash. Track progress
          in real-time with asynchronous job processing.
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
            This page will allow you to submit research queries to Google's
            Gemini deep research model. The asynchronous workflow supports
            long-running research tasks with real-time progress updates,
            cancellation, and the ability to save findings to your Items
            collection.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
