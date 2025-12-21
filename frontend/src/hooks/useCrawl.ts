import { useMutation } from "@tanstack/react-query"

import { TavilyService } from "@/client"
import type { CrawlRequest, CrawlResponse } from "@/client/types.gen"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"

interface UseCrawlOptions {
  onSuccess?: (data: CrawlResponse) => void
}

/**
 * React Query mutation hook for Tavily website crawling.
 * Handles single URL crawling with extended timeout for long operations.
 * Crawl operations can take 30-150 seconds.
 */
export function useCrawl(options?: UseCrawlOptions) {
  const { showErrorToast } = useCustomToast()

  const mutation = useMutation({
    mutationFn: (data: CrawlRequest) =>
      TavilyService.crawl({ requestBody: data }),
    onSuccess: (data) => {
      options?.onSuccess?.(data)
    },
    onError: handleError.bind(showErrorToast),
  })

  return mutation
}

export default useCrawl
