# Task Checklist

**Session ID**: `phase01-session06-map-page-and-polish`
**Total Tasks**: 22
**Estimated Duration**: 7-9 hours
**Created**: 2025-12-22

---

## Legend

- `[x]` = Completed
- `[ ]` = Pending
- `[P]` = Parallelizable (can run with other [P] tasks)
- `[S0106]` = Session reference (Phase 01, Session 06)
- `TNNN` = Task ID

---

## Progress Summary

| Category | Total | Done | Remaining |
|----------|-------|------|-----------|
| Setup | 2 | 2 | 0 |
| Foundation | 4 | 4 | 0 |
| Implementation | 12 | 12 | 0 |
| Testing | 4 | 4 | 0 |
| **Total** | **22** | **22** | **0** |

---

## Setup (2 tasks)

Initial configuration and environment preparation.

- [x] T001 [S0106] Verify prerequisites: dev servers running, TavilyService.map exists, MapRequest/MapResponse types available
- [x] T002 [S0106] Review existing CrawlForm and useCrawl patterns to establish baseline for Map implementation

---

## Foundation (4 tasks)

Core structures and base implementations.

- [x] T003 [S0106] Create Zod schema for map form validation (`frontend/src/lib/schemas/map.ts`)
- [x] T004 [S0106] Create useMap mutation hook (`frontend/src/hooks/useMap.ts`)
- [x] T005 [S0106] [P] Create MapSkeleton loading component (`frontend/src/components/Tavily/MapSkeleton.tsx`)
- [x] T006 [S0106] [P] Create MapEmptyState component (`frontend/src/components/Tavily/MapEmptyState.tsx`)

---

## Implementation (12 tasks)

Main feature implementation.

- [x] T007 [S0106] Create MapMetadata component for base URL and total count (`frontend/src/components/Tavily/MapMetadata.tsx`)
- [x] T008 [S0106] Create MapForm: URL input with validation (`frontend/src/components/Tavily/MapForm.tsx`)
- [x] T009 [S0106] Add MapForm: advanced options collapsible with max_depth, max_breadth, limit (`frontend/src/components/Tavily/MapForm.tsx`)
- [x] T010 [S0106] Add MapForm: instructions textarea, select_paths and select_domains inputs (`frontend/src/components/Tavily/MapForm.tsx`)
- [x] T011 [S0106] Add MapForm: submit button with loading state and form submission handler (`frontend/src/components/Tavily/MapForm.tsx`)
- [x] T012 [S0106] Create MapResultsList: scrollable URL container with individual URL rows (`frontend/src/components/Tavily/MapResultsList.tsx`)
- [x] T013 [S0106] Add MapResultsList: copy single URL and copy all functionality with toast notifications (`frontend/src/components/Tavily/MapResultsList.tsx`)
- [x] T014 [S0106] Wire up Map page with all components and state management (`frontend/src/routes/_layout/map.tsx`)
- [x] T015 [S0106] Polish: Audit and standardize toast error messages across all Tavily pages
- [x] T016 [S0106] Polish: Audit and standardize loading skeletons across all Tavily pages
- [x] T017 [S0106] [P] Polish: Audit and standardize SearchEmptyState (`frontend/src/components/Tavily/SearchEmptyState.tsx`)
- [x] T018 [S0106] [P] Polish: Audit and standardize ExtractEmptyState and CrawlEmptyState for consistency

---

## Testing (4 tasks)

Verification and quality assurance.

- [x] T019 [S0106] Run typecheck and lint, fix any errors (`npm run typecheck && npm run lint`)
- [x] T020 [S0106] Run build to verify production readiness (`npm run build`)
- [x] T021 [S0106] Manual testing: Map form submission, copy functionality, edge cases
- [x] T022 [S0106] Validate ASCII encoding on all created/modified files and verify responsive design

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
Tasks marked `[P]` can be worked on simultaneously:
- T005 + T006: MapSkeleton and MapEmptyState are independent
- T017 + T018: Empty state audits are independent

### Task Timing
Target ~20-25 minutes per task.

### Dependencies
- T003 must complete before T008-T011 (form needs schema)
- T004 must complete before T014 (page needs mutation hook)
- T005-T007 must complete before T014 (page needs all components)
- T008-T013 must complete before T014 (page needs form and results list)

### Key Patterns to Follow
- MapForm structure mirrors CrawlForm from session 05
- useMap hook mirrors useCrawl from session 05
- Copy functionality uses existing useCopyToClipboard hook

---

## Next Steps

Run `/validate` to verify session completeness.
