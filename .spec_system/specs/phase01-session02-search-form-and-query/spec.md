# Session Specification

**Session ID**: `phase01-session02-search-form-and-query`
**Phase**: 01 - Frontend Integration
**Status**: Not Started
**Created**: 2025-12-21

---

## 1. Session Overview

This session implements the core search functionality UI for the Tavily integration. Users will interact with a form to submit search queries with various configuration options, and the form will communicate with the backend API to execute searches.

The search form is the primary entry point for Tavily features. It builds directly on Session 01 which established the API client and navigation infrastructure. This session creates the Zod validation schemas that will be reused across other Tavily pages, establishes the mutation hook pattern for API calls, and integrates React Hook Form with shadcn/ui components.

Session 03 (Search Results Display) depends on this session's mutation hook and form state to display results. The patterns established here will be replicated for Extract, Crawl, and Map pages in subsequent sessions.

---

## 2. Objectives

1. Create Zod validation schema matching backend SearchRequest Pydantic model
2. Build SearchForm component with all search configuration fields using React Hook Form
3. Implement useTavilySearch mutation hook with TanStack Query for API calls
4. Integrate form into /search route with loading states and error handling

---

## 3. Prerequisites

### Required Sessions
- [x] `phase01-session01-api-client-and-navigation` - Provides regenerated API client with TavilyService and types

### Required Tools/Knowledge
- React Hook Form with zodResolver
- TanStack Query useMutation
- shadcn/ui form components (Form, FormField, Input, Select, Button)
- Zod schema definition

### Environment Requirements
- Frontend dev server running (`npm run dev`)
- Backend server running with Tavily endpoints available
- Valid authentication token

---

## 4. Scope

### In Scope (MVP)
- Zod schema for search form validation (tavilySearchSchema)
- SearchForm component with React Hook Form integration
- Query input field (required, min 1 character)
- Search depth selector (basic/advanced dropdown)
- Topic filter (general/news dropdown)
- Max results number input (1-20)
- Include domains text input (comma-separated)
- Exclude domains text input (comma-separated)
- Include answer checkbox
- Include images checkbox
- useTavilySearch mutation hook wrapping TavilyService.search
- Loading state (button spinner) during form submission
- Error toast on API failure using existing useCustomToast
- Form state management and submission handling

### Out of Scope (Deferred)
- Search results display components - *Reason: Session 03*
- Result cards, lists, or detail views - *Reason: Session 03*
- Pagination or infinite scroll - *Reason: Session 03*
- Search history storage - *Reason: Phase 02 or later*
- Advanced raw content inclusion - *Reason: Low priority for MVP*

---

## 5. Technical Approach

### Architecture
The form follows the established React Hook Form + Zod + TanStack Query pattern used throughout the boilerplate. The SearchForm component manages its own form state and calls the mutation hook on submit. Results are passed up to the parent route component via callback or stored in mutation state for Session 03 to consume.

```
/search route
    |
    +-- SearchForm (React Hook Form)
    |       |
    |       +-- useTavilySearch (mutation hook)
    |               |
    |               +-- TavilyService.search (API client)
    |
    +-- [Results placeholder for Session 03]
```

### Design Patterns
- **Form State Pattern**: React Hook Form with zodResolver for validation
- **Mutation Pattern**: TanStack Query useMutation for API calls with loading/error states
- **Schema-First**: Zod schema defines form shape, type inference via z.infer
- **Controlled Inputs**: Form fields controlled via React Hook Form's Controller/register

### Technology Stack
- React 19
- React Hook Form ^7.x
- Zod ^3.x
- TanStack Query ^5.x
- shadcn/ui (Form, Input, Select, Button, Checkbox, Label)
- Sonner (toast notifications via useCustomToast)

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `frontend/src/lib/schemas/tavily.ts` | Zod validation schemas for Tavily forms | ~60 |
| `frontend/src/hooks/useTavilySearch.ts` | TanStack Query mutation hook for search | ~40 |
| `frontend/src/components/Tavily/SearchForm.tsx` | Search form component | ~200 |

### Files to Modify
| File | Changes | Est. Lines |
|------|---------|------------|
| `frontend/src/routes/_layout/search.tsx` | Integrate SearchForm, manage results state | ~50 |

---

## 7. Success Criteria

### Functional Requirements
- [ ] Form renders with all input fields (query, depth, topic, max_results, domains, checkboxes)
- [ ] Query field validates as required with minimum 1 character
- [ ] Form submits successfully to backend /api/v1/tavily/search endpoint
- [ ] Mutation returns SearchResponse data on success
- [ ] Loading spinner shows on submit button during API call
- [ ] Error toast displays on API failure
- [ ] Form fields match SearchRequest backend schema types

### Testing Requirements
- [ ] Manual testing: submit form with valid query, verify API call
- [ ] Manual testing: submit empty query, verify validation error
- [ ] Manual testing: submit with invalid backend state, verify error toast
- [ ] Manual testing: verify loading state during submission

### Quality Gates
- [ ] All files ASCII-encoded (no special characters)
- [ ] Unix LF line endings
- [ ] No TypeScript errors (npx tsc --noEmit passes)
- [ ] No ESLint warnings (npm run lint passes)
- [ ] Code follows existing project conventions

---

## 8. Implementation Notes

### Key Considerations
- SearchDepth and SearchTopic are string literals from types.gen.ts, use literal arrays for Select options
- include_domains and exclude_domains are comma-separated strings in form, convert to arrays for API
- useMutation onError should use handleError pattern from existing code
- Form should NOT reset on successful submit (user may want to refine query)
- Store mutation result in state for Session 03 to access

### Potential Challenges
- **Domain input parsing**: Users enter comma-separated domains; need to split and trim before API call
- **Type alignment**: Ensure Zod schema inference matches SearchRequest type exactly
- **Optional array handling**: Backend expects null or array, form uses empty string; transform on submit

### ASCII Reminder
All output files must use ASCII-only characters (0-127). No curly quotes, em-dashes, or other special characters.

---

## 9. Testing Strategy

### Unit Tests
- None required for MVP (form component testing deferred)

### Integration Tests
- None required for MVP (E2E testing deferred)

### Manual Testing
1. Navigate to /search route
2. Verify form renders with all fields
3. Submit empty query - verify validation message appears
4. Enter valid query, click Search - verify loading state
5. Verify successful response (console.log or React Query devtools)
6. Simulate error (disconnect backend) - verify error toast

### Edge Cases
- Empty domain fields should send null, not empty array
- Very long query strings (test backend limit handling)
- Rapid form resubmission (mutation should handle)

---

## 10. Dependencies

### External Libraries
- react-hook-form: ^7.54.x (existing)
- @hookform/resolvers: ^3.9.x (existing)
- zod: ^3.24.x (existing)
- @tanstack/react-query: ^5.x (existing)

### Internal Dependencies
- TavilyService from @/client (generated API client)
- SearchRequest, SearchResponse, SearchDepth, SearchTopic from @/client/types.gen
- useCustomToast from @/hooks/useCustomToast
- handleError from @/utils
- shadcn/ui components from @/components/ui/*

### Other Sessions
- **Depends on**: `phase01-session01-api-client-and-navigation`
- **Depended by**: `phase01-session03-search-results-display`

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
