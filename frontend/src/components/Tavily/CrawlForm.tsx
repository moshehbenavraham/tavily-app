import { zodResolver } from "@hookform/resolvers/zod"
import type { UseMutationResult } from "@tanstack/react-query"
import { ChevronDown, ChevronUp, Globe } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import type { CrawlRequest, CrawlResponse } from "@/client/types.gen"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"
import { useCrawl } from "@/hooks/useCrawl"
import {
  CRAWL_CONSTRAINTS,
  type CrawlFormData,
  crawlFormDefaults,
  crawlFormSchema,
  parseCommaSeparated,
} from "@/lib/schemas/crawl"

type CrawlMutation = UseMutationResult<CrawlResponse, Error, CrawlRequest>

interface CrawlFormProps {
  onCrawlComplete?: (data: CrawlResponse) => void
  mutation?: CrawlMutation
}

export function CrawlForm({
  onCrawlComplete,
  mutation: externalMutation,
}: CrawlFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  const form = useForm<CrawlFormData>({
    resolver: zodResolver(crawlFormSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: crawlFormDefaults,
  })

  const internalMutation = useCrawl({
    onSuccess: onCrawlComplete,
  })

  const mutation = externalMutation ?? internalMutation

  const onSubmit = (data: CrawlFormData) => {
    // Build request with optional fields
    const request: CrawlRequest = {
      url: data.url.trim(),
      max_depth: data.max_depth,
      max_breadth: data.max_breadth,
      limit: data.limit,
    }

    // Add optional fields if provided
    if (data.instructions?.trim()) {
      request.instructions = data.instructions.trim()
    }

    const paths = parseCommaSeparated(data.select_paths || "")
    if (paths.length > 0) {
      request.select_paths = paths
    }

    const domains = parseCommaSeparated(data.select_domains || "")
    if (domains.length > 0) {
      request.select_domains = domains
    }

    mutation.mutate(request)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* URL Input */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Website URL <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter the starting URL for the crawl.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Advanced Options Toggle */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Hide Advanced Options
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show Advanced Options
            </>
          )}
        </Button>

        {/* Advanced Options Section */}
        {showAdvanced && (
          <div className="space-y-6 rounded-lg border bg-muted/30 p-4">
            {/* Depth, Breadth, Limit Row */}
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="max_depth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Depth</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={CRAWL_CONSTRAINTS.depth.min}
                        max={CRAWL_CONSTRAINTS.depth.max}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Link levels to follow (0-5)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_breadth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Breadth</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={CRAWL_CONSTRAINTS.breadth.min}
                        max={CRAWL_CONSTRAINTS.breadth.max}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 1)
                        }
                      />
                    </FormControl>
                    <FormDescription>Links per page (1-100)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="limit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Limit</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={CRAWL_CONSTRAINTS.limit.min}
                        max={CRAWL_CONSTRAINTS.limit.max}
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 1)
                        }
                      />
                    </FormControl>
                    <FormDescription>Total pages (1-100)</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Instructions Textarea */}
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Focus on documentation pages, skip blog posts..."
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Natural language guidance for content selection (optional).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Path and Domain Filters */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="select_paths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Paths</FormLabel>
                    <FormControl>
                      <Input placeholder="/docs/, /api/, /guide/" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated path filters (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="select_domains"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Domains</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="api.example.com, docs.example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Additional domains to include (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <LoadingButton type="submit" loading={mutation.isPending}>
          <Globe className="mr-2 h-4 w-4" />
          Start Crawl
        </LoadingButton>
      </form>
    </Form>
  )
}

export default CrawlForm
