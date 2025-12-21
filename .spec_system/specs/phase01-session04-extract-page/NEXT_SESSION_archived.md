# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-21
**Project State**: Phase 01 - Frontend Integration
**Completed Sessions**: 9 (6 Phase 00 + 3 Phase 01)

---

## Recommended Next Session

**Session ID**: `phase01-session04-extract-page`
**Session Name**: Extract Page
**Estimated Duration**: 3-4 hours
**Estimated Tasks**: ~25

---

## Why This Session Next?

### Prerequisites Met
- [x] Session 01 completed (API client with extract types)
- [x] Understanding of ExtractRequest/ExtractResponse schemas (generated in Session 01)

### Dependencies
- **Builds on**: Session 01 (API client provides `TavilyService.tavilyExtract` method and types)
- **Enables**: Session 06 (Map Page and Polish) which requires all feature pages complete

### Project Progression

This session is the logical next step because:

1. **Sequential Order**: Sessions 01-03 are complete; Session 04 is the natural continuation
2. **Pattern Reuse**: Extract page follows the same form + results pattern established in Search (Sessions 02-03)
3. **Prerequisite Chain**: Session 06 explicitly depends on Sessions 01-05 being complete
4. **Skill Building**: Extract introduces batch URL handling, preparing for similar patterns in Crawl/Map

---

## Session Overview

### Objective
Build the complete extract page with URL input form supporting single and batch extraction, results display showing extracted content, and proper loading/error handling.

### Key Deliverables
1. `ExtractForm.tsx` - URL input with single/batch support and Zod validation
2. `ExtractResultCard.tsx` - Display component for extracted content
3. `useExtract.ts` - TanStack Query mutation hook
4. Updated `/extract` route with complete functionality

### Scope Summary
- **In Scope (MVP)**: Single URL extraction, batch URL extraction (comma/newline separated), URL validation, result cards with extracted text/content, partial success handling, loading skeletons, error toasts
- **Out of Scope**: File upload for URL lists, export extracted content

---

## Technical Considerations

### Technologies/Patterns
- React Hook Form + Zod for form validation
- TanStack Query `useMutation` for extract API calls
- shadcn/ui components (Card, Button, Textarea, Form)
- Sonner for toast notifications
- URL parsing and validation utilities

### Potential Challenges
- **Batch URL Parsing**: Must handle comma-separated, newline-separated, and mixed inputs
- **Partial Success**: Tavily returns individual success/failure per URL - need to display both
- **Large Content Display**: Extracted content can be lengthy; consider truncation with expand

---

## Alternative Sessions

If this session is blocked:
1. **phase01-session05-crawl-page** - Also has Session 01 as prerequisite (met), can be done in parallel with Extract if needed
2. **No other alternatives** - Session 06 requires Sessions 01-05 complete

---

## Next Steps

Run `/sessionspec` to generate the formal specification with detailed task breakdown.
