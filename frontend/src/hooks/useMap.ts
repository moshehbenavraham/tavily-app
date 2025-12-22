import { useMutation } from "@tanstack/react-query"

import { TavilyService } from "@/client"
import type { MapRequest, MapResponse } from "@/client/types.gen"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface UseMapOptions {
  onSuccess?: (data: MapResponse) => void
}

/**
 * React Query mutation hook for Tavily URL mapping.
 * Discovers URLs from a website without extracting content.
 * Map operations typically take 10-60 seconds.
 */
export function useMap(options?: UseMapOptions) {
  const { showErrorToast } = useCustomToast()

  const mutation = useMutation({
    mutationFn: (data: MapRequest) =>
      TavilyService.mapUrls({ requestBody: data }),
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
    onError: handleError.bind(showErrorToast),
  })

  return mutation
}

export default useMap
