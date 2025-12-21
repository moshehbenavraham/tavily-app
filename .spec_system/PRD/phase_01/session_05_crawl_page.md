# Session 05: Crawl Page

**Session ID**: `phase01-session05-crawl-page`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 3-4 hours

---

## Objective

Build the complete crawl page with form supporting URL input, depth/breadth controls, natural language instructions, and results display for potentially large crawl outputs.

---

## Scope

### In Scope (MVP)
- Create CrawlForm component with URL input
- Add max_depth field (numeric, default 1)
- Add max_breadth field (numeric, default 20)
- Add instructions textarea for natural language crawl guidance
- Add limit field for max pages to crawl
- Add optional include_paths, exclude_paths fields
- Validate URL format using Zod
- Create useCrawl mutation hook
- Build CrawlResultCard component for individual crawled pages
- Display crawled content with URL, title, and content preview
- Handle large result sets (consider virtualization or pagination)
- Show crawl metadata (total pages, response time)
- Add progress indicator for long-running crawls

### Out of Scope
- Real-time crawl progress streaming (Tavily doesn't support)
- Export crawl results (deferred)

---

## Prerequisites

- [ ] Session 01 completed (API client with crawl types)
- [ ] Understanding of CrawlRequest/CrawlResponse schemas

---

## Deliverables

1. `components/Tavily/CrawlForm.tsx` - crawl configuration form
2. `components/Tavily/CrawlResultCard.tsx` - crawled page display
3. `components/Tavily/CrawlResultsList.tsx` - results container with virtualization
4. `hooks/useCrawl.ts` - TanStack Query mutation hook
5. Updated `/crawl` route with complete functionality

---

## Success Criteria

- [ ] Crawl form accepts URL and optional parameters
- [ ] Crawl executes and returns results
- [ ] Results display with URL, title, and content preview
- [ ] Large result sets handled without performance issues
- [ ] Loading state shows during crawl (may be long)
- [ ] Timeout handled gracefully with user feedback
- [ ] Error toasts shown on failures
- [ ] No TypeScript errors or lint warnings
