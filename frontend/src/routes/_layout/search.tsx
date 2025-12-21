import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

import type { SearchResponse } from "@/client/types.gen"
import { SearchForm } from "@/components/Tavily/SearchForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const Route = createFileRoute("/_layout/search")({
  component: SearchPage,
  head: () => ({
    meta: [{ title: "Search - Tavily App" }],
  }),
})

function SearchPage() {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(
    null,
  )

  const handleSearchComplete = (data: SearchResponse) => {
    setSearchResults(data)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Web Search</h1>
        <p className="text-muted-foreground">
          Search the web using Tavily AI-powered search
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchForm onSearchComplete={handleSearchComplete} />
        </CardContent>
      </Card>

      {/* Results placeholder for Session 03 */}
      {searchResults && (
        <Card>
          <CardHeader>
            <CardTitle>Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Found {searchResults.results?.length ?? 0} results for "
              {searchResults.query}"
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Full results display will be implemented in Session 03.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
