# Session 02: Search Form and Query

**Session ID**: `phase01-session02-search-form-and-query`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 3-4 hours

---

## Objective

Build the search page form with React Hook Form, implement Zod validation schemas, and create the TanStack Query mutation for executing searches.

---

## Scope

### In Scope (MVP)
- Create Zod schema for search form validation
- Build SearchForm component with React Hook Form
- Add query input field with validation (required, min length)
- Add search depth selector (basic/advanced)
- Add topic filter (general/news/finance)
- Add optional fields: include_domains, exclude_domains, max_results
- Create useTavilySearch mutation hook with TanStack Query
- Handle form submission and mutation state
- Display basic loading state during submission
- Show error toast on mutation failure

### Out of Scope
- Full results display (Session 03)
- Result cards or detail views (Session 03)
- Pagination (Session 03)

---

## Prerequisites

- [ ] Session 01 completed (API client regenerated)
- [ ] Tavily types available in frontend client

---

## Deliverables

1. `components/Tavily/SearchForm.tsx` - search form component
2. `lib/schemas/tavily.ts` - Zod validation schemas
3. `hooks/useTavilySearch.ts` - TanStack Query mutation hook
4. Updated `/search` route integrating the form
5. Loading state during search execution

---

## Success Criteria

- [ ] Form validates required query field
- [ ] Form submits successfully to backend API
- [ ] Loading spinner shown during submission
- [ ] Error toast shown on API failure
- [ ] All form fields match backend schema options
- [ ] Form resets or retains values appropriately after submit
- [ ] No TypeScript errors or lint warnings
