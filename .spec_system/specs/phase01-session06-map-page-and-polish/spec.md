# Session Specification

**Session ID**: `phase01-session06-map-page-and-polish`
**Phase**: 01 - Frontend Integration
**Status**: Not Started
**Created**: 2025-12-22

---

## 1. Session Overview

This session completes Phase 01 and the MVP by implementing the Map (sitemap generation) page and performing a comprehensive polish pass across all Tavily pages. The Map feature allows users to discover URLs from a website without extracting content, useful for understanding site structure before crawling or for generating sitemaps.

The Map page follows established patterns from Sessions 02-05, using React Hook Form with Zod validation, TanStack Query mutations, and shadcn/ui components. The API schema is nearly identical to Crawl (url, max_depth, max_breadth, limit, instructions, select_paths, select_domains) but returns a simple list of discovered URLs rather than content. This makes the implementation straightforward with existing patterns.

The polish phase ensures all four Tavily pages (Search, Extract, Crawl, Map) have consistent user experience: uniform toast notifications for errors, consistent loading skeletons, coherent empty states, proper keyboard accessibility, and responsive layouts verified on mobile/tablet/desktop. This session transforms the application from functional to production-ready.

---

## 2. Objectives

1. Implement complete Map page with MapForm component supporting all configuration parameters (url, max_depth, max_breadth, limit, instructions, select_paths, select_domains)
2. Create MapResultsList component displaying discovered URLs with copy-to-clipboard functionality for individual URLs and the full list
3. Conduct cross-page polish audit ensuring consistent toast messages, loading states, empty states, and error handling across Search, Extract, Crawl, and Map pages
4. Verify responsive design on mobile (320px), tablet (768px), and desktop (1280px) viewports and fix any layout issues

---

## 3. Prerequisites

### Required Sessions
- [x] `phase01-session01-api-client-and-navigation` - Provides TavilyService.map method and MapRequest/MapResponse types
- [x] `phase01-session02-search-form-and-query` - Establishes form validation and mutation hook patterns
- [x] `phase01-session03-search-results-display` - Establishes result display and loading state patterns
- [x] `phase01-session04-extract-page` - Establishes URL input and copy-to-clipboard patterns
- [x] `phase01-session05-crawl-page` - Establishes advanced options UI pattern (nearly identical form structure)

### Required Tools/Knowledge
- React Hook Form with Zod resolver
- TanStack Query useMutation
- shadcn/ui components (Input, Button, Card, Collapsible)
- useCopyToClipboard hook (existing)
- Understanding of MapRequest/MapResponse schemas

### Environment Requirements
- Frontend development server running (`npm run dev`)
- Backend API running with Tavily endpoints
- Valid Tavily API key configured

---

## 4. Scope

### In Scope (MVP)
- MapForm component with URL input field (required)
- max_depth, max_breadth, limit numeric inputs (optional, collapsed by default)
- instructions textarea for natural language guidance (optional)
- select_paths, select_domains comma-separated inputs (optional)
- URL format validation using Zod
- useMap mutation hook following useCrawl pattern
- MapResultsList displaying discovered URLs as a scrollable list
- MapMetadata showing total URLs and base URL
- MapEmptyState for no results
- MapSkeleton for loading state
- Copy single URL to clipboard (click icon next to URL)
- Copy all URLs to clipboard (bulk action button)
- Total URL count display
- Toast notifications for copy success and API errors
- Polish: Consistent loading skeletons across all pages
- Polish: Consistent empty state messaging
- Polish: Consistent toast error messages
- Polish: Responsive layout verification and fixes
- Polish: Keyboard navigation accessibility check

### Out of Scope (Deferred)
- Visual sitemap tree rendering - *Reason: Simple URL list is MVP; tree view is enhancement*
- Export to sitemap.xml format - *Reason: Phase 02 feature*
- URL filtering/search within results - *Reason: Enhancement for later*
- Pagination for very large URL lists - *Reason: Start with scrollable container; add if needed*

---

## 5. Technical Approach

### Architecture

```
MapPage (route)
  |-- MapForm (form component)
  |     |-- URL Input (required)
  |     |-- Advanced Options (Collapsible)
  |     |     |-- max_depth, max_breadth, limit inputs
  |     |     |-- instructions textarea
  |     |     |-- select_paths, select_domains inputs
  |     |-- Submit button with loading state
  |     |-- Zod validation
  |
  |-- MapSkeleton (loading state)
  |-- MapEmptyState (no URLs discovered)
  |-- MapMetadata (base URL, total count)
  |-- MapResultsList (scrollable URL container)
        |-- URL rows with copy button
        |-- Copy all button
```

### Design Patterns
- **Container/Presentational**: MapPage manages state, child components are presentational
- **Controlled Form**: React Hook Form manages all form fields with Zod validation
- **Mutation Pattern**: TanStack Query useMutation for POST requests
- **Progressive Disclosure**: Advanced options collapsed by default
- **Reuse**: MapForm structure nearly identical to CrawlForm (same parameters)

### Technology Stack
- React 19 with TypeScript
- TanStack Query v5 for mutations
- React Hook Form with @hookform/resolvers/zod
- Zod for schema validation
- shadcn/ui components (Card, Button, Input, Collapsible)
- Lucide React for icons (Map, Copy, Check, ExternalLink)
- Sonner for toast notifications
- useCopyToClipboard hook (existing)

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `frontend/src/hooks/useMap.ts` | TanStack Query mutation hook | ~35 |
| `frontend/src/components/Tavily/MapForm.tsx` | Map configuration form | ~200 |
| `frontend/src/components/Tavily/MapResultsList.tsx` | URL list with copy actions | ~100 |
| `frontend/src/components/Tavily/MapMetadata.tsx` | Base URL and total count display | ~40 |
| `frontend/src/components/Tavily/MapSkeleton.tsx` | Loading skeleton | ~30 |
| `frontend/src/components/Tavily/MapEmptyState.tsx` | Empty state component | ~25 |
| `frontend/src/lib/schemas/map.ts` | Zod schema and form types | ~70 |

### Files to Modify
| File | Changes | Est. Lines |
|------|---------|------------|
| `frontend/src/routes/_layout/map.tsx` | Replace placeholder with full implementation | ~100 |
| `frontend/src/components/Tavily/SearchEmptyState.tsx` | Consistency check/minor updates | ~5 |
| `frontend/src/components/Tavily/ExtractEmptyState.tsx` | Consistency check/minor updates | ~5 |
| `frontend/src/components/Tavily/CrawlEmptyState.tsx` | Consistency check/minor updates | ~5 |

---

## 7. Success Criteria

### Functional Requirements
- [ ] Map form accepts URL and submits successfully
- [ ] max_depth, max_breadth, limit fields work with proper defaults and ranges
- [ ] instructions textarea accepts natural language guidance
- [ ] select_paths and select_domains accept comma-separated values
- [ ] Invalid URL shows validation error before submission
- [ ] Map results display as scrollable URL list
- [ ] Click copy icon next to URL copies that URL to clipboard
- [ ] "Copy All" button copies all URLs (newline-separated) to clipboard
- [ ] Toast confirms successful copy action
- [ ] Total URL count displayed in metadata
- [ ] Loading skeleton shown during map operation
- [ ] Empty state shown when zero URLs discovered
- [ ] Error toasts shown on API failures

### Polish Requirements
- [ ] All four pages use consistent toast messages for errors
- [ ] All loading skeletons have consistent styling
- [ ] All empty states have consistent layout and messaging
- [ ] Keyboard navigation works on all interactive elements
- [ ] Forms are usable on mobile (320px width)
- [ ] Results display properly on tablet and desktop

### Quality Gates
- [ ] All files use ASCII-only characters (0-127)
- [ ] Unix LF line endings
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code follows existing project patterns
- [ ] Build succeeds (`npm run build`)

---

## 8. Implementation Notes

### Key Considerations
- MapRequest is nearly identical to CrawlRequest - reuse patterns from crawl schema
- MapResponse returns `urls: string[]` not content objects - simpler display component
- Copy-to-clipboard uses existing useCopyToClipboard hook with toast integration
- Map operations are typically faster than Crawl (no content extraction) but can still take 10-60s
- Advanced options should match CrawlForm layout for visual consistency

### Potential Challenges
- **Large URL Lists**: Map can return 100+ URLs; use max-height container with scroll
- **Cross-Page Consistency**: Auditing 4 pages for consistency requires systematic review
- **Responsive Forms**: Advanced options grid layout on mobile needs careful testing

### ASCII Reminder
All output files must use ASCII-only characters (0-127). Avoid smart quotes, em-dashes, or other Unicode characters.

---

## 9. Testing Strategy

### Unit Tests
- Not required for MVP (existing test patterns sufficient)

### Integration Tests
- Not required for MVP

### Manual Testing
1. Submit URL with defaults only - verify map returns URLs
2. Adjust max_depth to 2 - verify more URLs discovered
3. Set limit to 5 - verify at most 5 URLs returned
4. Add select_paths filter - verify path filtering works
5. Submit invalid URL - verify validation error appears
6. Click copy icon next to URL - verify toast and clipboard
7. Click "Copy All" - verify all URLs copied
8. Trigger empty result (e.g., non-existent domain path) - verify empty state
9. Test all pages on mobile viewport (320px) - verify usability
10. Test all pages on tablet viewport (768px)
11. Test all pages on desktop viewport (1280px+)
12. Verify toast messages are consistent across Search, Extract, Crawl, Map

### Edge Cases
- URL returning zero discovered URLs
- Very large result set (100+ URLs)
- Map operation timeout
- Network disconnect during map
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
- **Depends on**: All Phase 01 sessions (01-05)
- **Depended by**: None (final session)

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
