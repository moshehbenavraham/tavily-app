import { z } from "zod"

/**
 * Validate a single URL string.
 * Returns true if the URL is valid HTTP/HTTPS, false otherwise.
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "http:" || parsed.protocol === "https:"
  } catch {
    return false
  }
}

/**
 * Parse comma-separated input string into array of trimmed strings.
 * Filters out empty strings after trimming.
 */
export function parseCommaSeparated(input: string): string[] {
  if (!input.trim()) return []

  return input
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

/**
 * Zod schema for crawl form validation.
 * URL is required, all other fields are optional with sensible defaults.
 */
export const crawlFormSchema = z.object({
  url: z
    .string()
    .min(1, { message: "URL is required" })
    .refine(
      (value) => {
        const trimmed = value.trim()
        return trimmed.length > 0 && isValidUrl(trimmed)
      },
      { message: "Please enter a valid URL (e.g., https://example.com)" },
    ),
  max_depth: z
    .number()
    .min(0, { message: "Depth must be at least 0" })
    .max(5, { message: "Depth cannot exceed 5" }),
  max_breadth: z
    .number()
    .min(1, { message: "Breadth must be at least 1" })
    .max(100, { message: "Breadth cannot exceed 100" }),
  limit: z
    .number()
    .min(1, { message: "Limit must be at least 1" })
    .max(100, { message: "Limit cannot exceed 100" }),
  instructions: z.string().optional(),
  select_paths: z.string().optional(),
  select_domains: z.string().optional(),
})

// Type for form data
export type CrawlFormData = z.infer<typeof crawlFormSchema>

// Props for CrawlForm component
export interface CrawlFormProps {
  onCrawlComplete?: (data: unknown) => void
}

// Default form values
export const crawlFormDefaults: CrawlFormData = {
  url: "",
  max_depth: 1,
  max_breadth: 20,
  limit: 10,
  instructions: "",
  select_paths: "",
  select_domains: "",
}

// Crawl parameter constraints for UI
export const CRAWL_CONSTRAINTS = {
  depth: { min: 0, max: 5, default: 1 },
  breadth: { min: 1, max: 100, default: 20 },
  limit: { min: 1, max: 100, default: 10 },
} as const
