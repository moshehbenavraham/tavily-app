# Session 03: Items Page Enhancements

**Session ID**: `phase02-session03-items-page-enhancements`
**Status**: Not Started
**Estimated Tasks**: ~20
**Estimated Duration**: 2-3 hours

---

## Objective

Enhance the Items page to display and filter saved Tavily results, including content type badges, clickable source links, content preview, and a content_type filter dropdown.

---

## Scope

### In Scope (MVP)

- Add content_type badge column to Items table
- Style badges by type (search=blue, extract=green, crawl=orange, map=purple)
- Add source_url column with clickable external links
- Truncate long source URLs with tooltip showing full URL
- Add content_type filter dropdown to Items page toolbar
- Filter Items by content_type ("all", "search", "extract", "crawl", "map")
- Update backend Items list endpoint to support content_type filter
- Show content preview in Item detail view (or expandable row)
- Display metadata in Item detail view (formatted JSON or key-value)
- Handle Items without content fields (legacy items)

### Out of Scope

- Full-text search on content
- Content editing
- Bulk operations on saved items
- Export functionality
- Content type statistics/analytics

---

## Prerequisites

- [ ] Session 01 complete - Item model has new fields
- [ ] Session 02 complete - Save buttons functional, Items being created
- [ ] Saved Items exist in database for testing
- [ ] Items page and table components exist

---

## Deliverables

1. **Updated Items Table Columns**
   - Type badge column with colored badges
   - Source URL column with external link icon

2. **Content Type Filter**
   - Dropdown in Items page toolbar
   - Options: All, Search, Extract, Crawl, Map
   - Filter applied to API query

3. **Backend Filter Support** (if not already present)
   - GET /items with content_type query parameter
   - Filter Items by content_type field

4. **Enhanced Item Detail View**
   - Content preview section (collapsible for long content)
   - Metadata display (formatted)
   - Source URL with external link

5. **Graceful Handling of Legacy Items**
   - Items without content_type show no badge (or "Manual" badge)
   - Items without source_url show no link

---

## Technical Details

### Content Type Badge Component

```typescript
import { Badge } from "@/components/ui/badge";

const typeColors = {
  search: "bg-blue-100 text-blue-800",
  extract: "bg-green-100 text-green-800",
  crawl: "bg-orange-100 text-orange-800",
  map: "bg-purple-100 text-purple-800",
} as const;

function ContentTypeBadge({ type }: { type: string | null }) {
  if (!type) return null;
  const color = typeColors[type as keyof typeof typeColors] ?? "bg-gray-100 text-gray-800";
  return (
    <Badge variant="outline" className={color}>
      {type}
    </Badge>
  );
}
```

### Source URL Column

```typescript
import { ExternalLink } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function SourceUrlCell({ url }: { url: string | null }) {
  if (!url) return <span className="text-muted-foreground">-</span>;

  const truncated = url.length > 40 ? url.slice(0, 40) + "..." : url;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-primary hover:underline"
        >
          <span>{truncated}</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-md break-all">{url}</p>
      </TooltipContent>
    </Tooltip>
  );
}
```

### Content Type Filter

```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function ContentTypeFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Filter by type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Types</SelectItem>
        <SelectItem value="search">Search</SelectItem>
        <SelectItem value="extract">Extract</SelectItem>
        <SelectItem value="crawl">Crawl</SelectItem>
        <SelectItem value="map">Map</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Backend Filter (if needed)

```python
# In items router
@router.get("/", response_model=ItemsPublic)
def read_items(
    session: SessionDep,
    current_user: CurrentUser,
    skip: int = 0,
    limit: int = 100,
    content_type: str | None = None,  # Add filter parameter
) -> Any:
    query = select(Item).where(Item.owner_id == current_user.id)
    if content_type:
        query = query.where(Item.content_type == content_type)
    # ... rest of implementation
```

### Content Preview in Detail View

```typescript
function ContentPreview({ content }: { content: string | null }) {
  const [expanded, setExpanded] = useState(false);

  if (!content) return null;

  const isLong = content.length > 500;
  const displayContent = expanded ? content : content.slice(0, 500);

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Content</h4>
      <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm">
        {displayContent}
        {isLong && !expanded && "..."}
      </pre>
      {isLong && (
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
}
```

---

## Success Criteria

- [ ] Content type badge column displays in Items table
- [ ] Badges are color-coded by type
- [ ] Source URL column displays with external link icon
- [ ] Long URLs are truncated with tooltip showing full URL
- [ ] Content type filter dropdown appears in toolbar
- [ ] Selecting a filter updates the displayed Items
- [ ] Backend filters Items by content_type correctly
- [ ] Item detail view shows content preview
- [ ] Item detail view shows formatted metadata
- [ ] Legacy Items (no content_type) display correctly without errors
- [ ] Items without source_url show dash or empty cell
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] Responsive design works on mobile
