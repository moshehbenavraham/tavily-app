import { useMutation } from "@tanstack/react-query"

import { TavilyService } from "@/client"
import type { SearchRequest, SearchResponse } from "@/client/types.gen"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface UseTavilySearchOptions {
  onSuccess?: (data: SearchResponse) => void
}

export function useTavilySearch(options?: UseTavilySearchOptions) {
  const { showErrorToast } = useCustomToast()

  const mutation = useMutation({
    mutationFn: (data: SearchRequest) =>
      TavilyService.search({ requestBody: data }),
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
    onError: handleError.bind(showErrorToast),
  })

  return mutation
}

export default useTavilySearch
