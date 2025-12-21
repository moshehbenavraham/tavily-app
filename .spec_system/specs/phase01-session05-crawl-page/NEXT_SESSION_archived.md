# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-22
**Project State**: Phase 01 - Frontend Integration
**Completed Sessions**: 10 (6 Phase 00 + 4 Phase 01)

---

## Recommended Next Session

**Session ID**: `phase01-session05-crawl-page`
**Session Name**: Crawl Page
**Estimated Duration**: 3-4 hours
**Estimated Tasks**: ~25

---

## Why This Session Next?

### Prerequisites Met
- [x] Session 01 completed (API client with crawl types)
- [x] Understanding of CrawlRequest/CrawlResponse schemas (from Phase 00)
- [x] Extract page patterns established (similar URL input + results pattern)

### Dependencies
- **Builds on**: Session 04 (Extract Page) - shares similar URL input and results display patterns
- **Enables**: Session 06 (Map Page and Polish) - which requires all prior sessions complete

### Project Progression
This is the natural next step in the Phase 01 Frontend Integration sequence. Sessions 01-04 have established:
- API client infrastructure (Session 01)
- Form patterns with React Hook Form + Zod (Session 02)
- Results display patterns (Session 03)
- URL-based input forms with batch handling (Session 04)

The Crawl page extends these patterns with additional complexity:
- Multi-parameter forms (depth, breadth, instructions, path filters)
- Potentially large result sets requiring virtualization
- Longer-running operations requiring progress indication

---

## Session Overview

### Objective
Build the complete crawl page with form supporting URL input, depth/breadth controls, natural language instructions, and results display for potentially large crawl outputs.

### Key Deliverables
1. `components/Tavily/CrawlForm.tsx` - crawl configuration form with all parameters
2. `components/Tavily/CrawlResultCard.tsx` - individual crawled page display
3. `components/Tavily/CrawlResultsList.tsx` - results container with virtualization
4. `hooks/useCrawl.ts` - TanStack Query mutation hook
5. Updated `/crawl` route with complete functionality

### Scope Summary
- **In Scope (MVP)**: URL input, max_depth/max_breadth controls, instructions textarea, limit field, include/exclude paths, Zod validation, mutation hook, result cards with content preview, large result set handling, crawl metadata display, progress indicator
- **Out of Scope**: Real-time crawl progress streaming, export functionality

---

## Technical Considerations

### Technologies/Patterns
- React Hook Form + Zod for form validation
- TanStack Query mutation for API calls
- shadcn/ui components (Input, Textarea, Button, Card)
- React-window or similar for large result virtualization
- Existing patterns from ExtractForm and SearchResultsDisplay

### Potential Challenges
- **Large Result Sets**: Crawls can return many pages; need virtualization or pagination
- **Long-Running Operations**: Crawls may take 30-150 seconds; need clear loading/progress feedback
- **Timeout Handling**: Must gracefully handle Tavily's 150s max timeout
- **Complex Form State**: Many optional parameters require clean UX organization

---

## Alternative Sessions

If this session is blocked:
1. **None available** - Session 06 requires Session 05 completion
2. **If blocked by external issue** - Review and polish existing Sessions 01-04 components

---

## Next Steps

Run `/sessionspec` to generate the formal specification.
