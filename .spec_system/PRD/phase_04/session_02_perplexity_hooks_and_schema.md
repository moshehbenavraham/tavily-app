# Session 02: Perplexity Hooks and Schema

**Session ID**: `phase04-session02-perplexity-hooks-and-schema`
**Status**: Not Started
**Estimated Tasks**: ~20
**Estimated Duration**: 2-3 hours

---

## Objective

Create the Zod validation schema and TanStack Query hook for Perplexity deep research, handling the synchronous API pattern with proper loading states and error handling.

---

## Scope

### In Scope (MVP)
- Create frontend/src/lib/schemas/perplexity.ts with Zod schema
- Define perplexityDeepResearchSchema with all form fields
- Create frontend/src/hooks/usePerplexityDeepResearch.ts
- Implement useMutation for synchronous deep research call
- Handle loading states (isPending, isSuccess, isError)
- Handle error responses with proper typing
- Export hook with proper TypeScript types

### Out of Scope
- Form component UI (Session 04)
- Result display components (Session 04)
- Save to Items functionality (Session 06)

---

## Prerequisites

- [ ] Session 01 complete (SDK client regenerated)
- [ ] PerplexityService available in SDK
- [ ] TypeScript types for Perplexity schemas generated

---

## Deliverables

1. Zod schema file with perplexityDeepResearchSchema
2. usePerplexityDeepResearch hook with useMutation
3. Proper TypeScript types for form data and responses
4. Error handling for API failures

---

## Success Criteria

- [ ] Zod schema validates all Perplexity form fields
- [ ] Hook successfully calls PerplexityService.deepResearch
- [ ] Loading state properly tracks 30-60 second API calls
- [ ] Error responses typed and accessible
- [ ] Response data properly typed with citations and content
- [ ] No TypeScript or lint errors
