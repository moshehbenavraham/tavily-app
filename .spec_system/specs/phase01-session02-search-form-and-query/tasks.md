# Task Checklist

**Session ID**: `phase01-session02-search-form-and-query`
**Total Tasks**: 22
**Estimated Duration**: 6-8 hours
**Created**: 2025-12-21

---

## Legend

- `[x]` = Completed
- `[ ]` = Pending
- `[P]` = Parallelizable (can run with other [P] tasks)
- `[S0102]` = Session reference (Phase 01, Session 02)
- `TNNN` = Task ID

---

## Progress Summary

| Category | Total | Done | Remaining |
|----------|-------|------|-----------|
| Setup | 3 | 3 | 0 |
| Foundation | 5 | 5 | 0 |
| Implementation | 10 | 10 | 0 |
| Testing | 4 | 4 | 0 |
| **Total** | **22** | **22** | **0** |

---

## Setup (3 tasks)

Initial configuration and environment preparation.

- [x] T001 [S0102] Verify prerequisites: frontend dependencies installed, dev server runs
- [x] T002 [S0102] Create Tavily component directory (`frontend/src/components/Tavily/`)
- [x] T003 [S0102] Create lib/schemas directory if not exists (`frontend/src/lib/schemas/`)

---

## Foundation (5 tasks)

Zod schema definition for search form validation.

- [x] T004 [S0102] Create tavily.ts schema file with base query validation (`frontend/src/lib/schemas/tavily.ts`)
- [x] T005 [S0102] Add SearchDepth and SearchTopic literal type arrays for Select options
- [x] T006 [S0102] Add domain list schema with comma-separated string transform to array
- [x] T007 [S0102] Add optional boolean fields (include_answer, include_images)
- [x] T008 [S0102] Export complete tavilySearchSchema and SearchFormData type

---

## Implementation (10 tasks)

Main feature implementation: mutation hook and form component.

- [x] T009 [S0102] Create useTavilySearch mutation hook shell (`frontend/src/hooks/useTavilySearch.ts`)
- [x] T010 [S0102] Implement mutation with TavilyService.search and error handling
- [x] T011 [S0102] Create SearchForm component shell with React Hook Form (`frontend/src/components/Tavily/SearchForm.tsx`)
- [x] T012 [S0102] Add query input field with required validation
- [x] T013 [S0102] [P] Add search_depth Select field with basic/advanced options
- [x] T014 [S0102] [P] Add topic Select field with general/news options
- [x] T015 [S0102] [P] Add max_results number Input field (1-20)
- [x] T016 [S0102] [P] Add include_domains and exclude_domains text Input fields
- [x] T017 [S0102] [P] Add include_answer and include_images Checkbox fields
- [x] T018 [S0102] Implement onSubmit handler with domain string-to-array transform

---

## Route Integration (2 tasks)

Wire up SearchForm to the /search route.

- [x] T019 [S0102] Update search.tsx to import and render SearchForm component (`frontend/src/routes/_layout/search.tsx`)
- [x] T020 [S0102] Add searchResults state and onSearchComplete callback for Session 03

---

## Testing (2 tasks)

Verification and quality assurance.

- [x] T021 [S0102] Manual testing: verify form fields, validation, loading state, error toast
- [x] T022 [S0102] Run TypeScript check (npx tsc --noEmit) and ESLint (npm run lint)

---

## Completion Checklist

Before marking session complete:

- [x] All tasks marked `[x]`
- [x] All tests passing
- [x] All files ASCII-encoded
- [x] implementation-notes.md updated
- [x] Ready for `/validate`

---

## Notes

### Parallelization
Tasks T013-T017 can be worked on simultaneously as they add independent form fields.

### Task Timing
Target ~20-25 minutes per task.

### Dependencies
- T009-T010 (mutation hook) should complete before T018 (submit handler)
- T011 (form shell) must complete before T012-T017 (field tasks)
- T019-T020 (route integration) depend on T011-T018 (form component)

### Key Implementation Details

**Zod Schema Transform:**
```typescript
// Domain input: comma-separated string -> array or null
include_domains: z.string().optional().transform((val) =>
  val?.trim() ? val.split(',').map(d => d.trim()) : null
)
```

**Form Default Values:**
```typescript
{
  query: "",
  search_depth: "basic",
  topic: "general",
  max_results: 5,
  include_domains: "",
  exclude_domains: "",
  include_answer: false,
  include_images: false,
}
```

**Mutation Hook Pattern:**
```typescript
const mutation = useMutation({
  mutationFn: (data: SearchRequest) =>
    TavilyService.search({ requestBody: data }),
  onError: handleError.bind(showErrorToast),
})
```

---

## Next Steps

Run `/implement` to begin AI-led implementation.
