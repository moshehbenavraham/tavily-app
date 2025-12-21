import { z } from "zod"

// Search depth options for Tavily web search
export const searchDepthOptions = ["basic", "advanced"] as const
export type SearchDepthOption = (typeof searchDepthOptions)[number]

// Search topic options for Tavily web search
export const searchTopicOptions = ["general", "news"] as const
export type SearchTopicOption = (typeof searchTopicOptions)[number]

// Zod schema for search form validation
export const tavilySearchSchema = z.object({
  query: z
    .string()
    .min(1, { message: "Search query is required" })
    .max(400, { message: "Query must be 400 characters or less" }),
  search_depth: z.enum(searchDepthOptions),
  topic: z.enum(searchTopicOptions),
  max_results: z
    .number()
    .int()
    .min(1, { message: "Minimum 1 result" })
    .max(20, { message: "Maximum 20 results" }),
  include_domains: z.string(),
  exclude_domains: z.string(),
  include_answer: z.boolean(),
  include_images: z.boolean(),
})

// Type for form data
export type SearchFormData = z.infer<typeof tavilySearchSchema>

// Helper to convert comma-separated string to array or null
export function parseDomainList(value: string): string[] | null {
  if (!value.trim()) return null
  return value
    .split(",")
    .map((d) => d.trim())
    .filter((d) => d.length > 0)
}

// Default form values
export const searchFormDefaults: SearchFormData = {
  query: "",
  search_depth: "basic",
  topic: "general",
  max_results: 5,
  include_domains: "",
  exclude_domains: "",
  include_answer: false,
  include_images: false,
}
