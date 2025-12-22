# Saving Tavily Results to Items

## Overview

Add "Save" buttons to Tavily output pages (Search, Extract, Crawl, Map) that persist results to the Items system for later reference.

---

## Data Model Changes

### Extend Item Model

Add fields to `backend/app/models.py`:

```python
class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)
    # New fields
    source_url: str | None = Field(default=None, max_length=2048)
    content: str | None = Field(default=None, sa_type=Text)  # Full content, no limit
    content_type: str | None = Field(default=None, max_length=50)  # "search" | "extract" | "crawl" | "map"
    metadata: dict | None = Field(default=None, sa_type=JSON)  # score, query, images, etc.
```

### Field Mapping by Tavily Type

| Tavily Type | title | description | source_url | content | content_type | metadata |
|-------------|-------|-------------|------------|---------|--------------|----------|
| **Search** | result.title | truncate(result.content, 255) | result.url | result.raw_content | "search" | {score, query} |
| **Extract** | domain from URL | "Extracted from {url}" | result.url | result.raw_content | "extract" | {images} |
| **Crawl** | page path | "Crawled from {base_url}" | result.url | result.raw_content | "crawl" | {base_url, index} |
| **Map** | domain | "{count} URLs from {base_url}" | base_url | JSON of urls list | "map" | {total_urls} |

---

## Backend Changes

### 1. Database Migration

```bash
# After model changes
alembic revision --autogenerate -m "Add content fields to Item"
alembic upgrade head
```

### 2. Update Schemas (`backend/app/models.py`)

```python
class ItemCreate(ItemBase):
    pass  # Now includes new optional fields

class ItemUpdate(SQLModel):
    title: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)
    source_url: str | None = None
    content: str | None = None
    content_type: str | None = None
    metadata: dict | None = None

class ItemPublic(ItemBase):
    id: uuid.UUID
    owner_id: uuid.UUID
```

### 3. No Route Changes Needed

Existing POST `/api/v1/items/` endpoint works as-is since `ItemCreate` inherits from `ItemBase`.

---

## Frontend Changes

### 1. Regenerate Client

```bash
cd frontend && npm run generate-client
```

### 2. Create Save Hook (`frontend/src/hooks/useSaveToItems.ts`)

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ItemsService, ItemCreate } from "@/client"
import { useCustomToast } from "@/hooks/useCustomToast"

export function useSaveToItems() {
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  return useMutation({
    mutationFn: (item: ItemCreate) =>
      ItemsService.createItem({ requestBody: item }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"] })
      showSuccessToast("Saved to Items")
    },
    onError: (error) => showErrorToast(error),
  })
}
```

### 3. Add Save Buttons to Result Components

| Component | Location | Button Placement |
|-----------|----------|------------------|
| `SearchResultCard.tsx` | Card footer | Next to "Visit site" |
| `SearchResultDetail.tsx` | Dialog footer | Next to "Open in New Tab" |
| `ExtractResultCard.tsx` | Actions area | Next to copy/visit buttons |
| `CrawlResultCard.tsx` | Actions area | Next to copy/visit buttons |
| `MapResultsList.tsx` | Header or per-URL | "Save All" button or individual |

### 4. Mapper Functions (`frontend/src/lib/mappers/tavilyToItem.ts`)

```typescript
import { ItemCreate, SearchResult, ExtractResult, CrawlResult } from "@/client"

export function searchResultToItem(result: SearchResult, query: string): ItemCreate {
  return {
    title: result.title,
    description: result.content?.slice(0, 255),
    source_url: result.url,
    content: result.raw_content ?? result.content,
    content_type: "search",
    metadata: { score: result.score, query },
  }
}

export function extractResultToItem(result: ExtractResult): ItemCreate {
  const domain = new URL(result.url).hostname
  return {
    title: `Extract: ${domain}`,
    description: `Extracted content from ${result.url}`.slice(0, 255),
    source_url: result.url,
    content: result.raw_content,
    content_type: "extract",
    metadata: { images: result.images },
  }
}

export function crawlResultToItem(result: CrawlResult, baseUrl: string, index: number): ItemCreate {
  const path = new URL(result.url).pathname
  return {
    title: `Crawl: ${path || "/"}`,
    description: `Crawled page ${index + 1} from ${baseUrl}`.slice(0, 255),
    source_url: result.url,
    content: result.raw_content,
    content_type: "crawl",
    metadata: { base_url: baseUrl, index },
  }
}

export function mapResultToItem(baseUrl: string, urls: string[]): ItemCreate {
  const domain = new URL(baseUrl).hostname
  return {
    title: `Map: ${domain}`,
    description: `${urls.length} URLs discovered from ${baseUrl}`.slice(0, 255),
    source_url: baseUrl,
    content: JSON.stringify(urls, null, 2),
    content_type: "map",
    metadata: { total_urls: urls.length },
  }
}
```

---

## Items Page Updates (Optional Enhancement)

### Display Enhancements

Update `frontend/src/components/Items/columns.tsx` to show:
- **Type badge** - Visual indicator for content_type (search/extract/crawl/map)
- **Source link** - Clickable source_url
- **Content preview** - Expandable content field

### Filter by Type

Add filter dropdown to Items page to filter by `content_type`.

---

## Implementation Checklist

### Backend
- [ ] Add fields to `ItemBase` model (source_url, content, content_type, metadata)
- [ ] Import `Text`, `JSON` from sqlalchemy for field types
- [ ] Update `ItemUpdate` schema with new optional fields
- [ ] Generate Alembic migration
- [ ] Run migration
- [ ] Test API with new fields via `/docs`

### Frontend
- [ ] Regenerate client (`npm run generate-client`)
- [ ] Create `useSaveToItems` hook
- [ ] Create mapper functions in `lib/mappers/tavilyToItem.ts`
- [ ] Add Save button to `SearchResultCard`
- [ ] Add Save button to `SearchResultDetail`
- [ ] Add Save button to `ExtractResultCard`
- [ ] Add Save button to `CrawlResultCard`
- [ ] Add Save All button to `MapResultsList`
- [ ] (Optional) Update Items table columns to show new fields
- [ ] (Optional) Add content_type filter to Items page

---

## File Changes Summary

| File | Change |
|------|--------|
| `backend/app/models.py` | Add 4 fields to ItemBase, update ItemUpdate |
| `backend/alembic/versions/xxx.py` | Auto-generated migration |
| `frontend/src/hooks/useSaveToItems.ts` | New file |
| `frontend/src/lib/mappers/tavilyToItem.ts` | New file |
| `frontend/src/components/Tavily/SearchResultCard.tsx` | Add Save button |
| `frontend/src/components/Tavily/SearchResultDetail.tsx` | Add Save button |
| `frontend/src/components/Tavily/ExtractResultCard.tsx` | Add Save button |
| `frontend/src/components/Tavily/CrawlResultCard.tsx` | Add Save button |
| `frontend/src/components/Tavily/MapResultsList.tsx` | Add Save All button |
| `frontend/src/components/Items/columns.tsx` | (Optional) Show new fields |

---

## Estimated Effort

| Phase | Tasks | Time |
|-------|-------|------|
| Backend | Model + migration + test | 1-2 hours |
| Frontend Hook + Mappers | useSaveToItems + mapper functions | 1 hour |
| Save Buttons | 5 components | 2-3 hours |
| Items Page Enhancements | Columns + filters (optional) | 1-2 hours |
| **Total** | | **5-8 hours** |
