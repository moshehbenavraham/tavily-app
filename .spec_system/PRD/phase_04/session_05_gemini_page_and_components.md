# Session 05: Gemini Page and Components

**Session ID**: `phase04-session05-gemini-page-and-components`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 3-4 hours

---

## Objective

Build the Gemini deep research page with form component, async workflow management, progress tracking, result display, and cancel functionality for long-running research jobs.

---

## Scope

### In Scope (MVP)
- Create GeminiDeepResearchForm.tsx with React Hook Form integration
- Implement form fields: query (required), enable_thinking_summaries
- Create GeminiProgressIndicator.tsx showing polling status and elapsed time
- Create GeminiCancelButton.tsx for cancelling in-progress research
- Create GeminiResultView.tsx for markdown research report display
- Create GeminiUsageStats.tsx for token usage display
- Create GeminiErrorDisplay.tsx with error state and retry option
- Create frontend/src/routes/_layout/gemini-research.tsx page
- Implement state management for async workflow (idle -> polling -> complete/error)
- Display thinking summaries if enabled
- Handle reconnection scenario (store interaction_id, last_event_id)
- Responsive layout for desktop and mobile

### Out of Scope
- File search with private stores (deferred)
- Follow-up questions with previous_interaction_id (deferred)
- Save to Items functionality (Session 06)

---

## Prerequisites

- [ ] Session 03 complete (Gemini hooks)
- [ ] Zod schema for form validation available
- [ ] Navigation items in place (Session 01)

---

## Deliverables

1. GeminiDeepResearchForm.tsx component
2. GeminiProgressIndicator.tsx component with elapsed time
3. GeminiCancelButton.tsx component
4. GeminiResultView.tsx component with markdown rendering
5. GeminiUsageStats.tsx component
6. GeminiErrorDisplay.tsx component with retry
7. Complete gemini-research.tsx route page with state management
8. Proper handling of async workflow states

---

## Success Criteria

- [ ] Form validates input with Zod schema
- [ ] Start button initiates research and shows progress
- [ ] Progress indicator shows polling status and elapsed time
- [ ] Polling automatically stops on COMPLETED, FAILED, or CANCELLED status
- [ ] Cancel button stops in-progress research
- [ ] Research report renders as formatted markdown
- [ ] Thinking summaries display if enabled
- [ ] Token usage visible after completion
- [ ] Errors display with retry option
- [ ] UI handles jobs running up to 60 minutes
- [ ] Responsive on desktop and mobile
- [ ] No TypeScript or lint errors
