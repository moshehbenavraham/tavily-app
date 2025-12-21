import { z } from "zod"

/**
 * Parse URL input string into array of URLs.
 * Supports comma-separated, newline-separated, or mixed separators.
 * Filters out empty strings and trims whitespace.
 */
export function parseUrlInput(input: string): string[] {
  if (!input.trim()) return []

  return input
    .split(/[\n,]+/)
    .map((url) => url.trim())
    .filter((url) => url.length > 0)
}

/**
 * Validate a single URL string.
 * Returns true if the URL is valid, false otherwise.
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
 * Get validation message for invalid URLs.
 */
function getInvalidUrlsMessage(input: string): string {
  const urls = parseUrlInput(input)
  const invalidUrls = urls.filter((url) => !isValidUrl(url))
  if (invalidUrls.length === 0) {
    return "Invalid URL format"
  }
  if (invalidUrls.length === 1) {
    return `Invalid URL: ${invalidUrls[0]}`
  }
  const preview = invalidUrls.slice(0, 3).join(", ")
  return `Invalid URLs: ${preview}${invalidUrls.length > 3 ? "..." : ""}`
}

/**
 * Zod schema for extract form validation.
 * Validates that at least one valid URL is provided.
 */
export const extractFormSchema = z.object({
  urls: z
    .string()
    .min(1, { message: "At least one URL is required" })
    .refine(
      (value) => {
        const urls = parseUrlInput(value)
        return urls.length > 0
      },
      { message: "At least one URL is required" },
    )
    .superRefine((value, ctx) => {
      const urls = parseUrlInput(value)
      const hasInvalidUrls = !urls.every(isValidUrl)
      if (hasInvalidUrls) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: getInvalidUrlsMessage(value),
        })
      }
    }),
})

// Type for form data
export type ExtractFormData = z.infer<typeof extractFormSchema>

// Props for ExtractForm component
export interface ExtractFormProps {
  onExtractComplete?: (data: unknown) => void
}

// Default form values
export const extractFormDefaults: ExtractFormData = {
  urls: "",
}
