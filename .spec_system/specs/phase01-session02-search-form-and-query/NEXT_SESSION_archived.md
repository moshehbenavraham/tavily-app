# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-21
**Project State**: Phase 01 - Frontend Integration
**Completed Sessions**: 7

---

## Recommended Next Session

**Session ID**: `phase01-session02-search-form-and-query`
**Session Name**: Search Form and Query
**Estimated Duration**: 3-4 hours
**Estimated Tasks**: ~25

---

## Why This Session Next?

### Prerequisites Met
- [x] Session 01 completed (API client regenerated)
- [x] Tavily types available in frontend client
- [x] Navigation scaffolding in place

### Dependencies
- **Builds on**: `phase01-session01-api-client-and-navigation` (API client, routes, navigation)
- **Enables**: `phase01-session03-search-results-display` (requires working search mutation)

### Project Progression
This session is the natural next step in the frontend integration phase. With the API client regenerated and navigation in place from Session 01, we now need to build the actual search form UI that users will interact with. The search form is the primary entry point for the Tavily features - users must be able to submit queries before results can be displayed. Session 03 (Search Results Display) directly depends on this session's mutation hook and form submission logic.

---

## Session Overview

### Objective
Build the search page form with React Hook Form, implement Zod validation schemas, and create the TanStack Query mutation for executing searches.

### Key Deliverables
1. `components/Tavily/SearchForm.tsx` - Search form component with all input fields
2. `lib/schemas/tavily.ts` - Zod validation schemas for form data
3. `hooks/useTavilySearch.ts` - TanStack Query mutation hook
4. Updated `/search` route integrating the form
5. Loading state and error handling during search execution

### Scope Summary
- **In Scope (MVP)**:
  - Zod schema for search validation
  - SearchForm component with React Hook Form
  - Query input (required, min length)
  - Search depth selector (basic/advanced)
  - Topic filter (general/news/finance)
  - Optional fields: include_domains, exclude_domains, max_results
  - useTavilySearch mutation hook
  - Form submission handling
  - Loading state and error toasts

- **Out of Scope**:
  - Full results display (Session 03)
  - Result cards or detail views (Session 03)
  - Pagination (Session 03)

---

## Technical Considerations

### Technologies/Patterns
- React Hook Form - form state management
- Zod - schema validation
- TanStack Query (useMutation) - API mutation handling
- shadcn/ui form components (Input, Select, Button)
- Sonner - toast notifications for errors

### Potential Challenges
- Mapping Zod schema to match backend Pydantic schema exactly
- Handling optional array fields (include_domains, exclude_domains) in form state
- Ensuring proper type inference between form values and API request types

---

## Alternative Sessions

If this session is blocked:
1. **phase01-session04-extract-page** - Independent page, no search dependency
2. **phase01-session05-crawl-page** - Independent page, no search dependency

Note: Sessions 04 and 05 could theoretically be implemented in parallel with sessions 02-03 since they're independent features, but sequential implementation maintains focus and consistent patterns.

---

## Next Steps

Run `/sessionspec` to generate the formal specification with the detailed task checklist.
