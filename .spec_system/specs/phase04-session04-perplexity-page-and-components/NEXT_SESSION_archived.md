# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-27
**Project State**: Phase 04 - Deep Research Frontend
**Completed Sessions**: 24 (3 of 6 in current phase)

---

## Recommended Next Session

**Session ID**: `phase04-session04-perplexity-page-and-components`
**Session Name**: Perplexity Page and Components
**Estimated Duration**: 3-4 hours
**Estimated Tasks**: ~25

---

## Why This Session Next?

### Prerequisites Met
- [x] Session 02 complete (usePerplexityDeepResearch hook)
- [x] Zod schema for form validation available (perplexity.ts)
- [x] Navigation items in place (Session 01)

### Dependencies
- **Builds on**: phase04-session02-perplexity-hooks-and-schema (hooks and Zod validation)
- **Enables**: phase04-session06-save-integration-and-polish (Save to Items)

### Project Progression
Session 04 is the natural next step for Phase 04. The SDK client, navigation, hooks, and Zod schemas are all in place from Sessions 01-03. Session 04 implements the Perplexity page UI using the synchronous deep research pattern, which is simpler than Gemini's async polling workflow. Completing Perplexity first establishes component patterns (form, result view, citations, usage stats) that Session 05 can follow for the similar but more complex Gemini implementation.

---

## Session Overview

### Objective
Build the Perplexity deep research page with form component, result display, citations list, and usage statistics, creating a complete UI for synchronous research queries.

### Key Deliverables
1. PerplexityDeepResearchForm.tsx with React Hook Form and Zod validation
2. PerplexityResultView.tsx for markdown research report display
3. PerplexityCitationsList.tsx to render sources with clickable links
4. PerplexityUsageStats.tsx for token usage display
5. Complete perplexity-research.tsx route page with loading states
6. Error handling with toast notifications

### Scope Summary
- **In Scope (MVP)**: Form component with query/search_mode/reasoning_effort fields, advanced options toggle, markdown result display, citations list, usage stats, loading indicator with elapsed time, error handling, responsive layout
- **Out of Scope**: PerplexityVideos.tsx (optional), Save to Items (Session 06), streaming responses

---

## Technical Considerations

### Technologies/Patterns
- React Hook Form with Zod validation (perplexityDeepResearchSchema)
- TanStack Query useMutation via usePerplexityDeepResearch hook
- shadcn/ui components (Form, Input, Select, Card, Button, Badge)
- Markdown rendering for research reports
- Tailwind CSS for responsive layout

### Potential Challenges
- **Long API latency**: Perplexity deep research takes 30-60 seconds; need clear loading state with elapsed time indicator
- **Markdown rendering**: Research reports are formatted markdown; need proper renderer with code highlighting
- **Form complexity**: Multiple optional parameters require progressive disclosure (advanced options toggle)

### Relevant Considerations
- [P03] **Perplexity API latency**: Deep research queries take 30-60 seconds. Implement loading state with elapsed time counter.
- [P03] **Sync vs async patterns**: Perplexity uses synchronous POST - simpler single mutation call without polling.
- [P01] **TanStack Router + Query**: Use established patterns from existing Tavily pages.
- [P01] **React Hook Form + Zod**: Follow form handling patterns from search/extract/crawl pages.

---

## Alternative Sessions

If this session is blocked:
1. **phase04-session05-gemini-page-and-components** - Also has all prerequisites met; can be implemented in parallel if needed
2. **Technical debt cleanup** - Address frontend testing infrastructure if Perplexity API is unavailable

---

## Next Steps

Run `/sessionspec` to generate the formal specification.
