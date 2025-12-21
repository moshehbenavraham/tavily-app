import { FileText } from "lucide-react"

export function ExtractEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-4">
        <FileText className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No extractions yet</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter one or more URLs above to extract their content.
      </p>
    </div>
  )
}

export default ExtractEmptyState
