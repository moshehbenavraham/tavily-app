# Session 02: Frontend Hooks and Save Buttons

**Session ID**: `phase02-session02-frontend-hooks-and-save-buttons`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 3-4 hours

---

## Objective

Implement the frontend infrastructure for saving Tavily results to Items, including a reusable useSaveToItems hook, mapper functions for each Tavily result type, and Save buttons integrated into all Tavily result components.

---

## Scope

### In Scope (MVP)

- Create useSaveToItems TanStack Query mutation hook
- Create mapper utilities for each Tavily type (search, extract, crawl, map)
- Add Save button to SearchResultCard component
- Add Save button to SearchResultDetail dialog/view
- Add Save button to ExtractResultCard component
- Add Save button to CrawlResultCard component
- Add Save All button to MapResultsList component
- Implement loading states for save operations
- Show toast notifications for save success/failure
- Handle save errors gracefully
- Prevent duplicate saves (optional: check existing Items)

### Out of Scope

- Items page UI changes (Session 03)
- Batch save operations (except Map Save All)
- Undo save functionality
- Save to specific collection/folder
- Offline save queue

---

## Prerequisites

- [ ] Session 01 complete - backend model updated and frontend client regenerated
- [ ] Frontend TypeScript types include new Item fields
- [ ] All Tavily result components exist and are functional
- [ ] Toast notification system (Sonner) configured

---

## Deliverables

1. **useSaveToItems Hook** (`frontend/src/hooks/useSaveToItems.ts`)
   - TanStack Query mutation for creating Items
   - Accepts mapped Item data
   - Returns mutation state and trigger function
   - Invalidates Items query on success

2. **Mapper Utilities** (`frontend/src/lib/tavily-mappers.ts`)
   - mapSearchResultToItem(result, query)
   - mapExtractResultToItem(result)
   - mapCrawlResultToItem(result, baseUrl, index)
   - mapMapResultsToItem(urls, baseUrl)

3. **Updated Search Components**
   - SearchResultCard with Save button
   - SearchResultDetail with Save button

4. **Updated Extract Components**
   - ExtractResultCard with Save button

5. **Updated Crawl Components**
   - CrawlResultCard with Save button

6. **Updated Map Components**
   - MapResultsList with Save All button
   - Individual URL save (optional)

---

## Technical Details

### useSaveToItems Hook

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ItemsService, ItemCreate } from "@/client";
import { toast } from "sonner";

export function useSaveToItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: ItemCreate) =>
      ItemsService.createItem({ requestBody: item }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] });
      toast.success("Saved to Items");
    },
    onError: (error) => {
      toast.error("Failed to save item");
      console.error(error);
    },
  });
}
```

### Mapper Functions

```typescript
import { ItemCreate } from "@/client";
import { SearchResult, ExtractResult, CrawlResult } from "@/client";

export function mapSearchResultToItem(
  result: SearchResult,
  query: string
): ItemCreate {
  return {
    title: result.title,
    description: result.content?.slice(0, 255),
    source_url: result.url,
    content: result.raw_content || result.content,
    content_type: "search",
    metadata: { score: result.score, query },
  };
}

export function mapExtractResultToItem(result: ExtractResult): ItemCreate {
  const domain = new URL(result.url).hostname;
  return {
    title: domain,
    description: `Extracted from ${result.url}`,
    source_url: result.url,
    content: result.raw_content,
    content_type: "extract",
    metadata: { images: result.images },
  };
}

export function mapCrawlResultToItem(
  result: CrawlResult,
  baseUrl: string,
  index: number
): ItemCreate {
  const path = new URL(result.url).pathname;
  return {
    title: path || "/",
    description: `Crawled from ${baseUrl}`,
    source_url: result.url,
    content: result.raw_content,
    content_type: "crawl",
    metadata: { base_url: baseUrl, index },
  };
}

export function mapMapResultsToItem(
  urls: string[],
  baseUrl: string
): ItemCreate {
  const domain = new URL(baseUrl).hostname;
  return {
    title: domain,
    description: `${urls.length} URLs from ${baseUrl}`,
    source_url: baseUrl,
    content: JSON.stringify(urls, null, 2),
    content_type: "map",
    metadata: { total_urls: urls.length },
  };
}
```

### Save Button Component Pattern

```typescript
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useSaveToItems } from "@/hooks/useSaveToItems";

function SaveButton({ item, disabled }: { item: ItemCreate; disabled?: boolean }) {
  const { mutate, isPending } = useSaveToItems();

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => mutate(item)}
      disabled={disabled || isPending}
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Save className="h-4 w-4" />
      )}
      <span className="ml-2">Save</span>
    </Button>
  );
}
```

---

## Success Criteria

- [ ] useSaveToItems hook created and functional
- [ ] All four mapper functions implemented with correct field mapping
- [ ] Save button appears on SearchResultCard
- [ ] Save button appears on SearchResultDetail
- [ ] Save button appears on ExtractResultCard
- [ ] Save button appears on CrawlResultCard
- [ ] Save All button appears on MapResultsList
- [ ] Clicking Save creates an Item with correct data
- [ ] Loading spinner shown during save operation
- [ ] Success toast shown after save completes
- [ ] Error toast shown if save fails
- [ ] Items query invalidated after successful save
- [ ] No TypeScript errors
- [ ] No lint errors
