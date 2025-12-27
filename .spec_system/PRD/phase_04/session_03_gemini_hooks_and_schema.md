# Session 03: Gemini Hooks and Schema

**Session ID**: `phase04-session03-gemini-hooks-and-schema`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 3-4 hours

---

## Objective

Create the Zod validation schema and TanStack Query hooks for Gemini deep research, implementing the asynchronous workflow with start, poll, cancel, and sync operations.

---

## Scope

### In Scope (MVP)
- Create frontend/src/lib/schemas/gemini.ts with Zod schema
- Define geminiDeepResearchSchema with all form fields
- Create frontend/src/hooks/useGeminiDeepResearch.ts
- Implement useGeminiStartResearch mutation (start job, returns interaction_id)
- Implement useGeminiPollResearch query with refetchInterval for polling
- Implement useGeminiCancelResearch mutation (cancel in-progress job)
- Implement useGeminiSyncResearch mutation (blocking wait for completion)
- Handle terminal status detection to stop polling
- Support last_event_id for reconnection

### Out of Scope
- Form component UI (Session 05)
- Result display components (Session 05)
- Progress indicator component (Session 05)
- Save to Items functionality (Session 06)

---

## Prerequisites

- [ ] Session 01 complete (SDK client regenerated)
- [ ] GeminiService available in SDK
- [ ] TypeScript types for Gemini schemas generated

---

## Deliverables

1. Zod schema file with geminiDeepResearchSchema
2. useGeminiStartResearch hook (mutation)
3. useGeminiPollResearch hook (query with automatic refetch)
4. useGeminiCancelResearch hook (mutation)
5. useGeminiSyncResearch hook (mutation)
6. Proper TypeScript types for all operations
7. Polling logic with terminal status detection

---

## Success Criteria

- [ ] Zod schema validates all Gemini form fields
- [ ] Start hook returns interaction_id for tracking
- [ ] Poll hook automatically refetches at configured interval
- [ ] Poll hook stops when status is terminal (COMPLETED, FAILED, CANCELLED)
- [ ] Cancel hook successfully stops in-progress research
- [ ] Sync hook blocks until completion (for simpler use cases)
- [ ] last_event_id parameter supported for reconnection
- [ ] All hooks properly typed with TypeScript
- [ ] No TypeScript or lint errors
