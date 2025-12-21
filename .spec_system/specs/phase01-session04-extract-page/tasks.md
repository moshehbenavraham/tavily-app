# Task Checklist

**Session ID**: `phase01-session04-extract-page`
**Total Tasks**: 22
**Estimated Duration**: 7-9 hours
**Created**: 2025-12-21

---

## Legend

- `[x]` = Completed
- `[ ]` = Pending
- `[P]` = Parallelizable (can run with other [P] tasks)
- `[S0104]` = Session reference (Phase 01, Session 04)
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

Initial verification and environment preparation.

- [x] T001 [S0104] Verify backend API running and extract endpoint available
- [x] T002 [S0104] Verify TavilyService.extract method and types exist from session 01
- [x] T003 [S0104] Review existing SearchForm and SearchResultCard patterns for consistency

---

## Foundation (5 tasks)

Core types, schemas, and base hooks.

- [x] T004 [S0104] Create extract Zod schema with URL parsing logic (`frontend/src/lib/schemas/extract.ts`)
- [x] T005 [S0104] Add URL validation refinement for single and batch URLs (`frontend/src/lib/schemas/extract.ts`)
- [x] T006 [S0104] Define ExtractFormValues and ExtractFormProps types (`frontend/src/lib/schemas/extract.ts`)
- [x] T007 [S0104] Create useExtract mutation hook (`frontend/src/hooks/useExtract.ts`)
- [x] T008 [S0104] Add error handling and toast notifications to useExtract (`frontend/src/hooks/useExtract.ts`)

---

## Implementation (10 tasks)

Main component and page implementation.

- [x] T009 [S0104] [P] Create ExtractSkeleton loading component (`frontend/src/components/Tavily/ExtractSkeleton.tsx`)
- [x] T010 [S0104] [P] Create ExtractEmptyState component (`frontend/src/components/Tavily/ExtractEmptyState.tsx`)
- [x] T011 [S0104] Create ExtractResultCard base structure and props (`frontend/src/components/Tavily/ExtractResultCard.tsx`)
- [x] T012 [S0104] Add success state rendering to ExtractResultCard with content preview (`frontend/src/components/Tavily/ExtractResultCard.tsx`)
- [x] T013 [S0104] Add expand/collapse functionality for long content in ExtractResultCard (`frontend/src/components/Tavily/ExtractResultCard.tsx`)
- [x] T014 [S0104] Add failure state rendering to ExtractResultCard (`frontend/src/components/Tavily/ExtractResultCard.tsx`)
- [x] T015 [S0104] Create ExtractResultsList container with success/failure sections (`frontend/src/components/Tavily/ExtractResultsList.tsx`)
- [x] T016 [S0104] Create ExtractForm with textarea and submit button (`frontend/src/components/Tavily/ExtractForm.tsx`)
- [x] T017 [S0104] Integrate React Hook Form and Zod validation in ExtractForm (`frontend/src/components/Tavily/ExtractForm.tsx`)
- [x] T018 [S0104] Wire up ExtractPage route with all components (`frontend/src/routes/_layout/extract.tsx`)

---

## Testing (4 tasks)

Verification and quality assurance.

- [x] T019 [S0104] Run typecheck and lint - fix any errors (`npm run typecheck && npm run lint`)
- [x] T020 [S0104] Manual test: single URL extraction and batch URL extraction
- [x] T021 [S0104] Manual test: validation errors, partial failures, and API errors
- [x] T022 [S0104] Validate ASCII encoding on all created files

---

## Completion Checklist

Before marking session complete:

- [x] All tasks marked `[x]`
- [x] All TypeScript errors resolved
- [x] All ESLint warnings resolved
- [x] All files ASCII-encoded (0-127)
- [x] Unix LF line endings on all files
- [x] implementation-notes.md updated
- [x] Ready for `/validate`

---

## Notes

### Parallelization
Tasks T009 and T010 can be worked on simultaneously (skeleton and empty state are independent).

### Task Timing
Target ~20-25 minutes per task.

### Dependencies
- T004-T006 must complete before T007-T008 (schema before hook)
- T007-T008 must complete before T016-T017 (hook before form)
- T011-T014 must complete before T015 (card before list)
- T009-T017 must complete before T018 (components before page)

### Key Implementation Details
1. URL parsing: split on commas and newlines, trim, filter empties
2. Zod validation: custom refinement to validate each URL
3. Partial success: separate `results` (success) from `failed_results` (failure)
4. Content truncation: show preview with expand/collapse for long text

---

## Next Steps

Run `/implement` to begin AI-led implementation.
