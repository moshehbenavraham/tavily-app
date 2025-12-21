import { zodResolver } from "@hookform/resolvers/zod"
import type { UseMutationResult } from "@tanstack/react-query"
import { FileText } from "lucide-react"
import { useForm } from "react-hook-form"

import type { ExtractRequest, ExtractResponse } from "@/client/types.gen"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"
import { Textarea } from "@/components/ui/textarea"
import { useExtract } from "@/hooks/useExtract"
import {
  type ExtractFormData,
  extractFormDefaults,
  extractFormSchema,
  parseUrlInput,
} from "@/lib/schemas/extract"

type ExtractMutation = UseMutationResult<ExtractResponse, Error, ExtractRequest>

interface ExtractFormProps {
  onExtractComplete?: (data: ExtractResponse) => void
  mutation?: ExtractMutation
}

export function ExtractForm({
  onExtractComplete,
  mutation: externalMutation,
}: ExtractFormProps) {
  const form = useForm<ExtractFormData>({
    resolver: zodResolver(extractFormSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: extractFormDefaults,
  })

  const internalMutation = useExtract({
    onSuccess: onExtractComplete,
  })

  const mutation = externalMutation ?? internalMutation

  const onSubmit = (data: ExtractFormData) => {
    const urls = parseUrlInput(data.urls)

    // Build request: single URL as string, multiple as array
    const request: ExtractRequest = {
      urls: urls.length === 1 ? urls[0] : urls,
    }

    mutation.mutate(request)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="urls"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                URLs to Extract <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="https://example.com/page1&#10;https://example.com/page2&#10;&#10;Enter URLs separated by commas or new lines..."
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter one or more URLs to extract content from. Separate
                multiple URLs with commas or new lines.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" loading={mutation.isPending}>
          <FileText className="mr-2 h-4 w-4" />
          Extract Content
        </LoadingButton>
      </form>
    </Form>
  )
}

export default ExtractForm
