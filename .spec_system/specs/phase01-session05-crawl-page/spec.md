# Session Specification

**Session ID**: `phase01-session05-crawl-page`
**Phase**: 01 - Frontend Integration
**Status**: Not Started
**Created**: 2025-12-22

---

## 1. Session Overview

This session implements the complete Crawl page for the Tavily application, enabling users to recursively crawl websites starting from a root URL and extract content from discovered pages. Website crawling is a core Tavily capability that allows structured data gathering across multiple pages of a site, with configurable depth, breadth, and natural language instructions for content selection.

The implementation follows established patterns from Sessions 02-04 (SearchForm, ExtractForm), including React Hook Form with Zod validation, TanStack Query mutations, and shadcn/ui components. The Crawl page is more complex than Extract due to additional form parameters (max_depth, max_breadth, limit, instructions, select_paths, select_domains) and the potential for larger result sets requiring virtualization or pagination for smooth UX.

Crawl operations can take significantly longer than search or extract (30-150 seconds), so this session emphasizes clear loading feedback and timeout handling. The page transforms the placeholder Crawl route into a fully functional interface with comprehensive form controls and results display.

---

## 2. Objectives

1. Create CrawlForm component with URL input and all crawl configuration parameters (max_depth, max_breadth, limit, instructions, select_paths, select_domains)
2. Implement useCrawl mutation hook following useExtract pattern with appropriate timeout handling
3. Build CrawlResultCard and CrawlResultsList components to display crawled pages with content previews
4. Integrate all components into the Crawl route with loading, empty, and error states including progress indication for long-running operations

---

## 3. Prerequisites

### Required Sessions
- [x] `phase01-session01-api-client-and-navigation` - Provides TavilyService.crawl method and CrawlRequest/CrawlResponse types
- [x] `phase01-session02-search-form-and-query` - Establishes form validation and mutation hook patterns
- [x] `phase01-session03-search-results-display` - Establishes result card and loading state patterns
- [x] `phase01-session04-extract-page` - Establishes URL input and content display patterns

### Required Tools/Knowledge
- React Hook Form with Zod resolver
- TanStack Query useMutation
- shadcn/ui form components (Input, Textarea, Slider, Button, Card, Collapsible)
- Understanding of CrawlRequest/CrawlResponse schemas
- Virtualization concepts (react-window or native overflow handling)

### Environment Requirements
- Frontend development server running (`npm run dev`)
- Backend API running with Tavily endpoints
- Valid Tavily API key configured

---

## 4. Scope

### In Scope (MVP)
- CrawlForm component with URL input field
- max_depth numeric input (default 1, range 0-5)
- max_breadth numeric input (default 20, range 1-100)
- limit numeric input (default 10, range 1-100)
- instructions textarea for natural language crawl guidance
- select_paths comma-separated input for path filtering
- select_domains comma-separated input for domain expansion
- URL format validation using Zod
- useCrawl mutation hook with error handling
- CrawlResultCard component showing URL, content preview, expand option
- CrawlResultsList component with result count and scrollable container
- CrawlSkeleton loading component with pulse animation
- CrawlEmptyState component
- CrawlMetadata showing total pages and response time
- Proper handling of long crawl times (30-150s) with clear loading indication
- Error toasts for API failures and timeouts
- Integration with existing route structure

### Out of Scope (Deferred)
- Real-time crawl progress streaming - *Reason: Tavily API does not support WebSocket/SSE progress*
- Export crawl results to file - *Reason: Phase 02 feature*
- Virtualized list rendering - *Reason: Start with native scroll, add virtualization if performance issues*
- Visual sitemap/tree display of crawled pages - *Reason: Polish feature for Session 06*

---

## 5. Technical Approach

### Architecture

```
CrawlPage (route)
  |-- CrawlForm (form component)
  |     |-- URL Input (required)
  |     |-- Advanced Options (Collapsible)
  |     |     |-- max_depth, max_breadth, limit inputs
  |     |     |-- instructions textarea
  |     |     |-- select_paths, select_domains inputs
  |     |-- Submit button with loading state
  |     |-- Zod validation
  |
  |-- CrawlSkeleton (loading state - prominent for long operations)
  |-- CrawlEmptyState (no results state)
  |-- CrawlMetadata (total pages, response time)
  |-- CrawlResultsList (scrollable results container)
        |-- CrawlResultCard[] (individual crawled pages)
              |-- URL link
              |-- Content preview (truncated)
              |-- Expand/collapse for full content
```

### Design Patterns
- **Container/Presentational**: CrawlPage manages state, child components are presentational
- **Controlled Form**: React Hook Form manages all form fields with Zod validation
- **Mutation Pattern**: TanStack Query useMutation for POST requests with loading/error states
- **Progressive Disclosure**: Advanced options collapsed by default to reduce form complexity
- **Collapsible Content**: Long raw_content expandable per card to maintain scan-ability

### Technology Stack
- React 19 with TypeScript
- TanStack Query v5 for mutations
- React Hook Form with @hookform/resolvers/zod
- Zod for schema validation
- shadcn/ui components (Card, Button, Input, Textarea, Collapsible, Separator)
- Lucide React for icons (Globe, ChevronDown, ChevronUp, Loader2)
- Sonner for toast notifications

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `frontend/src/hooks/useCrawl.ts` | TanStack Query mutation hook | ~35 |
| `frontend/src/components/Tavily/CrawlForm.tsx` | Crawl configuration form with all parameters | ~200 |
| `frontend/src/components/Tavily/CrawlResultCard.tsx` | Individual crawled page display with expand/collapse | ~90 |
| `frontend/src/components/Tavily/CrawlResultsList.tsx` | Scrollable results container | ~50 |
| `frontend/src/components/Tavily/CrawlSkeleton.tsx` | Loading skeleton component | ~35 |
| `frontend/src/components/Tavily/CrawlEmptyState.tsx` | Empty state component | ~25 |
| `frontend/src/components/Tavily/CrawlMetadata.tsx` | Crawl stats display (total pages, time) | ~40 |
| `frontend/src/lib/schemas/crawl.ts` | Zod schema and form types | ~80 |

### Files to Modify
| File | Changes | Est. Lines |
|------|---------|------------|
| `frontend/src/routes/_layout/crawl.tsx` | Replace placeholder with full implementation | ~100 |

---

## 7. Success Criteria

### Functional Requirements
- [ ] Crawl form accepts URL and submits successfully
- [ ] max_depth field works with sensible defaults (1) and range (0-5)
- [ ] max_breadth field works with sensible defaults (20) and range (1-100)
- [ ] limit field works with sensible defaults (10) and range (1-100)
- [ ] instructions textarea accepts natural language guidance
- [ ] select_paths and select_domains accept comma-separated values
- [ ] Invalid URL shows validation error before submission
- [ ] Empty URL input shows validation error
- [ ] Crawl results display with URL and content preview
- [ ] Long content is expandable/collapsible per result card
- [ ] Total pages count displayed in metadata
- [ ] Loading state prominently shown during crawl (which may take 30-150s)
- [ ] Error toasts shown on API failures
- [ ] Timeout handled gracefully with user-friendly message

### Testing Requirements
- [ ] Manual testing of basic crawl (URL only)
- [ ] Manual testing of crawl with depth=2
- [ ] Manual testing of crawl with instructions
- [ ] Manual testing of crawl with path filters
- [ ] Manual testing of validation errors
- [ ] Manual testing of long-running crawl (verify loading state)
- [ ] Manual testing of API timeout handling

### Quality Gates
- [ ] All files use ASCII-only characters (0-127)
- [ ] Unix LF line endings
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code follows existing project patterns

---

## 8. Implementation Notes

### Key Considerations
- Crawl operations are slow (30-150s typical) - loading UI must be prominent and reassuring
- CrawlRequest.url is a single URL string (not batch like Extract)
- CrawlResponse.results is an array of CrawlResult with url and raw_content
- CrawlResponse.total_pages gives the count of successfully crawled pages
- Advanced options should be collapsed by default to keep form approachable
- select_paths and select_domains should parse comma-separated input into arrays

### Potential Challenges
- **Long Wait Times**: Crawls can take 2+ minutes; must prevent user confusion with clear loading indicator and optional elapsed time display
- **Large Result Sets**: Crawls with depth=2+ can return many pages; scrollable container with max-height needed
- **Complex Form State**: Many optional parameters require clean organization (collapsible sections)
- **Content Length**: raw_content can be very long; need truncation with expand/collapse
- **Timeout Handling**: Tavily has 150s max; must catch and display timeout errors gracefully

### ASCII Reminder
All output files must use ASCII-only characters (0-127). Avoid smart quotes, em-dashes, or other Unicode characters.

---

## 9. Testing Strategy

### Unit Tests
- Not required for MVP (Session 06 covers testing polish)

### Integration Tests
- Not required for MVP

### Manual Testing
1. Submit URL with defaults only - verify crawl returns results
2. Adjust max_depth to 2 - verify more pages returned
3. Set limit to 5 - verify at most 5 pages returned
4. Add instructions (e.g., "focus on blog posts") - verify crawl completes
5. Add select_paths (e.g., "/docs/,/api/") - verify path filtering works
6. Submit invalid URL - verify validation error appears
7. Submit empty form - verify validation error
8. Trigger API timeout - verify graceful error handling
9. Wait for long crawl (30s+) - verify loading state persists and is visible
10. Expand/collapse content on result cards - verify toggle works
11. Verify scrolling works for many results

### Edge Cases
- URL with query parameters and fragments
- Very deep crawl (depth=5) with many results
- Crawl that returns zero results (empty state)
- Crawl that times out (150s limit)
- Network disconnect during crawl
- select_paths with leading/trailing whitespace

---

## 10. Dependencies

### External Libraries
- `@tanstack/react-query`: ^5.x (existing)
- `react-hook-form`: ^7.x (existing)
- `@hookform/resolvers`: ^3.x (existing)
- `zod`: ^3.x (existing)
- `lucide-react`: ^0.x (existing)

### Other Sessions
- **Depends on**: phase01-session01-api-client-and-navigation (API client and types)
- **Depended by**: phase01-session06-map-page-and-polish (requires sessions 01-05)

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
