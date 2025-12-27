# Session 04: Perplexity Page and Components

**Session ID**: `phase04-session04-perplexity-page-and-components`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 3-4 hours

---

## Objective

Build the Perplexity deep research page with form component, result display, citations list, and usage statistics, creating a complete UI for synchronous research queries.

---

## Scope

### In Scope (MVP)
- Create PerplexityDeepResearchForm.tsx with React Hook Form integration
- Implement form fields: query (required), search_mode, reasoning_effort, max_tokens, temperature
- Add advanced options toggle for less common parameters
- Create PerplexityResultView.tsx for markdown research report display
- Create PerplexityCitationsList.tsx to render sources with links
- Create PerplexityUsageStats.tsx for token usage display
- Create frontend/src/routes/_layout/perplexity-research.tsx page
- Implement loading state with elapsed time indicator
- Handle and display API errors with toast notifications
- Responsive layout for desktop and mobile

### Out of Scope
- PerplexityVideos.tsx component (optional, defer if time constrained)
- Save to Items functionality (Session 06)
- Streaming responses (not supported in MVP)

---

## Prerequisites

- [ ] Session 02 complete (usePerplexityDeepResearch hook)
- [ ] Zod schema for form validation available
- [ ] Navigation items in place (Session 01)

---

## Deliverables

1. PerplexityDeepResearchForm.tsx component
2. PerplexityResultView.tsx component with markdown rendering
3. PerplexityCitationsList.tsx component
4. PerplexityUsageStats.tsx component
5. Complete perplexity-research.tsx route page
6. Loading state with elapsed time during long queries
7. Error handling with user-friendly messages

---

## Success Criteria

- [ ] Form validates input with Zod schema
- [ ] Query submission triggers usePerplexityDeepResearch mutation
- [ ] Loading indicator shows during 30-60 second API calls
- [ ] Research report renders as formatted markdown
- [ ] Citations display with clickable source links
- [ ] Token usage visible after successful query
- [ ] Errors display via toast notifications
- [ ] UI responsive on desktop and mobile
- [ ] No TypeScript or lint errors
