import { BarChart3 } from "lucide-react"

import type { PerplexityUsage } from "@/client/types.gen"
import { Badge } from "@/components/ui/badge"

interface PerplexityUsageStatsProps {
  usage: PerplexityUsage | null | undefined
}

export function PerplexityUsageStats({ usage }: PerplexityUsageStatsProps) {
  if (!usage) {
    return null
  }

  const { prompt_tokens = 0, completion_tokens = 0, total_tokens = 0 } = usage

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <BarChart3 className="h-4 w-4" />
        <span>Token Usage:</span>
      </div>
      <Badge variant="secondary" className="font-mono text-xs">
        Prompt: {prompt_tokens.toLocaleString()}
      </Badge>
      <Badge variant="secondary" className="font-mono text-xs">
        Completion: {completion_tokens.toLocaleString()}
      </Badge>
      <Badge variant="outline" className="font-mono text-xs">
        Total: {total_tokens.toLocaleString()}
      </Badge>
    </div>
  )
}

export default PerplexityUsageStats
