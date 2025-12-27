# Task Checklist

**Session ID**: `phase04-session02-perplexity-hooks-and-schema`
**Total Tasks**: 18
**Estimated Duration**: 6-8 hours
**Created**: 2025-12-27

---

## Legend

- `[x]` = Completed
- `[ ]` = Pending
- `[P]` = Parallelizable (can run with other [P] tasks)
- `[S0402]` = Session reference (Phase 04, Session 02)
- `TNNN` = Task ID

---

## Progress Summary

| Category | Total | Done | Remaining |
|----------|-------|------|-----------|
| Setup | 2 | 2 | 0 |
| Foundation | 5 | 5 | 0 |
| Implementation | 7 | 7 | 0 |
| Testing | 4 | 4 | 0 |
| **Total** | **18** | **18** | **0** |

---

## Setup (2 tasks)

Initial configuration and environment preparation.

- [x] T001 [S0402] Verify prerequisites: SDK regenerated, PerplexityService available in `frontend/src/client/sdk.gen.ts`
- [x] T002 [S0402] Verify existing patterns: Review `tavily.ts` schema and `useTavilySearch.ts` hook for conventions

---

## Foundation (5 tasks)

Core structures and base implementations.

- [x] T003 [S0402] Create schema file skeleton (`frontend/src/lib/schemas/perplexity.ts`)
- [x] T004 [S0402] [P] Define search mode enum constant array and type (`frontend/src/lib/schemas/perplexity.ts`)
- [x] T005 [S0402] [P] Define reasoning effort enum constant array and type (`frontend/src/lib/schemas/perplexity.ts`)
- [x] T006 [S0402] [P] Define search context size enum constant array and type (`frontend/src/lib/schemas/perplexity.ts`)
- [x] T007 [S0402] [P] Define recency filter enum constant array and type (`frontend/src/lib/schemas/perplexity.ts`)

---

## Implementation (7 tasks)

Main feature implementation.

- [x] T008 [S0402] Implement Zod schema with query field validation (1-10000 chars) (`frontend/src/lib/schemas/perplexity.ts`)
- [x] T009 [S0402] Add optional fields to schema: model, system_prompt, search_mode, reasoning_effort (`frontend/src/lib/schemas/perplexity.ts`)
- [x] T010 [S0402] Add optional fields to schema: search_context_size, max_tokens, temperature, top_p, top_k (`frontend/src/lib/schemas/perplexity.ts`)
- [x] T011 [S0402] Add optional fields to schema: presence_penalty, frequency_penalty, recency_filter, domain_filter, date filters (`frontend/src/lib/schemas/perplexity.ts`)
- [x] T012 [S0402] Export form defaults, FormData type, and parseDomainList helper (`frontend/src/lib/schemas/perplexity.ts`)
- [x] T013 [S0402] Create hook file with imports and interface (`frontend/src/hooks/usePerplexityDeepResearch.ts`)
- [x] T014 [S0402] Implement useMutation wrapper with PerplexityService.deepResearch call and error handling (`frontend/src/hooks/usePerplexityDeepResearch.ts`)

---

## Testing (4 tasks)

Verification and quality assurance.

- [x] T015 [S0402] Run TypeScript compiler to verify no type errors (`npm run type-check` or equivalent)
- [x] T016 [S0402] Run biome lint to verify code quality (`npm run lint`)
- [x] T017 [S0402] Validate ASCII encoding on all created files
- [x] T018 [S0402] Manual testing: Import schema and hook in console, verify types resolve correctly

---

## Completion Checklist

Before marking session complete:

- [x] All tasks marked `[x]`
- [x] All files ASCII-encoded
- [x] No TypeScript errors
- [x] No biome lint errors
- [x] implementation-notes.md updated
- [x] Ready for `/validate`

---

## Notes

### Parallelization
Tasks T004-T007 can be worked on simultaneously as they define independent enum constants.

### Task Timing
Target ~20-25 minutes per task.

### Dependencies
- T003 must complete before T004-T007
- T004-T007 must complete before T008
- T008-T012 must complete in sequence (building up the schema)
- T013 must complete before T014
- T015-T018 can run after all implementation tasks

### Key Implementation Details
- Query field: required, 1-10000 characters
- Date filters: MM/DD/YYYY format with regex validation
- Domain filter: comma-separated string to array conversion (same pattern as tavily.ts)
- Extended API latency (30-60s): No aggressive client-side timeout in mutation

---

## Next Steps

Run `/implement` to begin AI-led implementation.
