# Task Checklist

**Session ID**: `phase04-session01-sdk-client-and-navigation`
**Total Tasks**: 20
**Estimated Duration**: 1.5-2.5 hours
**Created**: 2025-12-27

---

## Legend

- `[x]` = Completed
- `[ ]` = Pending
- `[P]` = Parallelizable (can run with other [P] tasks)
- `[S0401]` = Session reference (Phase 04, Session 01)
- `TNNN` = Task ID

---

## Progress Summary

| Category | Total | Done | Remaining |
|----------|-------|------|-----------|
| Setup | 3 | 3 | 0 |
| Foundation | 5 | 5 | 0 |
| Implementation | 8 | 8 | 0 |
| Testing | 4 | 4 | 0 |
| **Total** | **20** | **20** | **0** |

---

## Setup (3 tasks)

Initial configuration and environment preparation.

- [x] T001 [S0401] Verify backend server is running at localhost:8000
- [x] T002 [S0401] Verify OpenAPI spec accessible at /api/v1/openapi.json
- [x] T003 [S0401] Verify frontend dependencies installed (npm install if needed)

---

## Foundation (5 tasks)

SDK regeneration and type verification.

- [x] T004 [S0401] Run SDK regeneration script (`npm run generate-client`)
- [x] T005 [S0401] Verify PerplexityService class generated in sdk.gen.ts (`frontend/src/client/sdk.gen.ts`)
- [x] T006 [S0401] Verify GeminiService class generated with all methods in sdk.gen.ts (`frontend/src/client/sdk.gen.ts`)
- [x] T007 [S0401] Verify Perplexity request/response types generated in types.gen.ts (`frontend/src/client/types.gen.ts`)
- [x] T008 [S0401] Verify Gemini request/response types generated in types.gen.ts (`frontend/src/client/types.gen.ts`)

---

## Implementation (8 tasks)

Navigation and placeholder page implementation.

- [x] T009 [S0401] Review existing sidebar navigation structure (`frontend/src/components/Sidebar/AppSidebar.tsx`)
- [x] T010 [S0401] Review existing page structure for placeholder pattern (`frontend/src/routes/_layout/search.tsx`)
- [x] T011 [S0401] [P] Create perplexity-research placeholder route (`frontend/src/routes/_layout/perplexity-research.tsx`)
- [x] T012 [S0401] [P] Create gemini-research placeholder route (`frontend/src/routes/_layout/gemini-research.tsx`)
- [x] T013 [S0401] Define Deep Research navigation items array (`frontend/src/components/Sidebar/AppSidebar.tsx`)
- [x] T014 [S0401] Add SidebarGroup for Deep Research with SidebarGroupLabel (`frontend/src/components/Sidebar/AppSidebar.tsx`)
- [x] T015 [S0401] Add Perplexity Research navigation item with icon (`frontend/src/components/Sidebar/AppSidebar.tsx`)
- [x] T016 [S0401] Add Gemini Research navigation item with icon (`frontend/src/components/Sidebar/AppSidebar.tsx`)

---

## Testing (4 tasks)

Verification and quality assurance.

- [x] T017 [S0401] Run TypeScript compilation to verify no type errors
- [x] T018 [S0401] Run biome lint to verify code quality (`npm run lint`)
- [x] T019 [S0401] Manual testing - verify navigation and page rendering in browser
- [x] T020 [S0401] Validate ASCII encoding on all created/modified files

---

## Completion Checklist

Before marking session complete:

- [x] All tasks marked `[x]`
- [x] All files ASCII-encoded
- [x] Unix LF line endings
- [x] No TypeScript errors
- [x] Biome lint passes
- [x] implementation-notes.md updated
- [x] Ready for `/validate`

---

## Notes

### Parallelization
Tasks T011 and T012 can be worked on simultaneously as they create independent placeholder route files.

### Task Timing
Target ~5-10 minutes per task for this foundational session.

### Dependencies
- T001-T003 must complete before T004 (SDK generation)
- T004 must complete before T005-T008 (type verification)
- T009-T010 are research tasks before implementation
- T011-T012 are parallelizable placeholder pages
- T013-T016 must be done sequentially (building the sidebar)
- T017-T020 are final verification tasks

### Critical Path
1. Backend running -> SDK generation -> Type verification
2. Sidebar review -> Nav items definition -> SidebarGroup addition
3. Page structure review -> Placeholder pages creation
4. Final lint/type checks -> Manual testing

---

## Next Steps

Run `/validate` to verify session completeness.
