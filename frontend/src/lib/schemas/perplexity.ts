import { z } from "zod"

// Search mode options for Perplexity deep research
export const searchModeOptions = ["auto", "news", "academic", "social"] as const
export type SearchModeOption = (typeof searchModeOptions)[number]

// Reasoning effort options for Perplexity reasoning models
export const reasoningEffortOptions = ["low", "medium", "high"] as const
export type ReasoningEffortOption = (typeof reasoningEffortOptions)[number]

// Search context size options for Perplexity Sonar API
export const searchContextSizeOptions = ["low", "medium", "high"] as const
export type SearchContextSizeOption = (typeof searchContextSizeOptions)[number]

// Recency filter options for Perplexity search
export const recencyFilterOptions = ["hour", "day", "week", "month"] as const
export type RecencyFilterOption = (typeof recencyFilterOptions)[number]

// Model options for Perplexity deep research
export const modelOptions = ["sonar", "sonar-pro", "sonar-reasoning"] as const
export type ModelOption = (typeof modelOptions)[number]

// Date format regex for MM/DD/YYYY validation
const dateFormatRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/

// Zod schema for Perplexity deep research form validation
export const perplexityDeepResearchSchema = z.object({
  // Core fields
  query: z
    .string()
    .min(1, { message: "Research query is required" })
    .max(10000, { message: "Query must be 10,000 characters or less" }),
  model: z.enum(modelOptions),
  system_prompt: z.string().optional(),

  // Reasoning options
  search_mode: z.enum(searchModeOptions).optional(),
  reasoning_effort: z.enum(reasoningEffortOptions).optional(),
  search_context_size: z.enum(searchContextSizeOptions).optional(),

  // Generation parameters
  max_tokens: z
    .number()
    .int()
    .min(1, { message: "Minimum 1 token" })
    .max(16384, { message: "Maximum 16,384 tokens" })
    .optional(),
  temperature: z
    .number()
    .min(0, { message: "Minimum temperature is 0" })
    .max(2, { message: "Maximum temperature is 2" })
    .optional(),
  top_p: z
    .number()
    .min(0, { message: "Minimum top_p is 0" })
    .max(1, { message: "Maximum top_p is 1" })
    .optional(),
  top_k: z.number().int().min(0).optional(),
  presence_penalty: z
    .number()
    .min(-2, { message: "Minimum presence penalty is -2" })
    .max(2, { message: "Maximum presence penalty is 2" })
    .optional(),
  frequency_penalty: z
    .number()
    .min(-2, { message: "Minimum frequency penalty is -2" })
    .max(2, { message: "Maximum frequency penalty is 2" })
    .optional(),

  // Search filters
  search_recency_filter: z.enum(recencyFilterOptions).optional(),
  search_domain_filter: z.string(), // Comma-separated string, converted to array before API call
  search_after_date_filter: z
    .string()
    .refine((val) => !val || dateFormatRegex.test(val), {
      message: "Date must be in MM/DD/YYYY format",
    })
    .optional(),
  search_before_date_filter: z
    .string()
    .refine((val) => !val || dateFormatRegex.test(val), {
      message: "Date must be in MM/DD/YYYY format",
    })
    .optional(),

  // Output options
  return_images: z.boolean(),
  return_related_questions: z.boolean(),
})

// Type for form data
export type PerplexityFormData = z.infer<typeof perplexityDeepResearchSchema>

// Helper to convert comma-separated string to array or null
export function parseDomainList(value: string): string[] | null {
  if (!value.trim()) return null
  return value
    .split(",")
    .map((d) => d.trim())
    .filter((d) => d.length > 0)
}

// Default form values
export const perplexityFormDefaults: PerplexityFormData = {
  query: "",
  model: "sonar",
  system_prompt: "",
  search_mode: "auto",
  reasoning_effort: undefined,
  search_context_size: undefined,
  max_tokens: undefined,
  temperature: undefined,
  top_p: undefined,
  top_k: undefined,
  presence_penalty: undefined,
  frequency_penalty: undefined,
  search_recency_filter: undefined,
  search_domain_filter: "",
  search_after_date_filter: "",
  search_before_date_filter: "",
  return_images: false,
  return_related_questions: false,
}
