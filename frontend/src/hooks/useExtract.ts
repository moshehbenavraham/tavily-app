import { useMutation } from "@tanstack/react-query"

import { TavilyService } from "@/client"
import type { ExtractRequest, ExtractResponse } from "@/client/types.gen"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface UseExtractOptions {
  onSuccess?: (data: ExtractResponse) => void
}

/**
 * React Query mutation hook for Tavily content extraction.
 * Handles single URL or batch URL extraction with error handling.
 */
export function useExtract(options?: UseExtractOptions) {
  const { showErrorToast } = useCustomToast()

  const mutation = useMutation({
    mutationFn: (data: ExtractRequest) =>
      TavilyService.extract({ requestBody: data }),
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
    onError: handleError.bind(showErrorToast),
  })

  return mutation
}

export default useExtract
