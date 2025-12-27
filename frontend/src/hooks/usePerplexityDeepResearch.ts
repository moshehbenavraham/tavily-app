import { useMutation } from "@tanstack/react-query"

import { PerplexityService } from "@/client"
import type {
  PerplexityDeepResearchRequest,
  PerplexityDeepResearchResponse,
} from "@/client/types.gen"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface UsePerplexityDeepResearchOptions {
  onSuccess?: (data: PerplexityDeepResearchResponse) => void
}

export function usePerplexityDeepResearch(
  options?: UsePerplexityDeepResearchOptions,
) {
  const { showErrorToast } = useCustomToast()

  const mutation = useMutation({
    mutationFn: (data: PerplexityDeepResearchRequest) =>
      PerplexityService.deepResearch({ requestBody: data }),
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
    onError: handleError.bind(showErrorToast),
  })

  return mutation
}

export default usePerplexityDeepResearch
