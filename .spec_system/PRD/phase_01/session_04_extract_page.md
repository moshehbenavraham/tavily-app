# Session 04: Extract Page

**Session ID**: `phase01-session04-extract-page`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 3-4 hours

---

## Objective

Build the complete extract page with URL input form supporting single and batch extraction, results display showing extracted content, and proper loading/error handling.

---

## Scope

### In Scope (MVP)
- Create ExtractForm component with URL input
- Support single URL extraction
- Support batch URL extraction (multiple URLs, newline or comma separated)
- Validate URL format using Zod
- Create useExtract mutation hook
- Build ExtractResultCard component for individual results
- Display extracted content (text, raw_content when available)
- Show extraction metadata (URL, success/failure status)
- Handle partial success (some URLs succeed, others fail)
- Add skeleton loading state
- Display error toasts for failures

### Out of Scope
- File upload for URL lists (deferred)
- Export extracted content (deferred)

---

## Prerequisites

- [ ] Session 01 completed (API client with extract types)
- [ ] Understanding of ExtractRequest/ExtractResponse schemas

---

## Deliverables

1. `components/Tavily/ExtractForm.tsx` - URL input form
2. `components/Tavily/ExtractResultCard.tsx` - extraction result display
3. `hooks/useExtract.ts` - TanStack Query mutation hook
4. Updated `/extract` route with complete functionality
5. Batch URL input handling logic

---

## Success Criteria

- [ ] Single URL extraction works correctly
- [ ] Batch URL extraction (multiple URLs) works correctly
- [ ] Invalid URLs show validation errors
- [ ] Extracted content displays in readable format
- [ ] Partial failures handled gracefully (show which succeeded/failed)
- [ ] Loading skeleton shown during extraction
- [ ] Error toasts shown on failures
- [ ] No TypeScript errors or lint warnings
