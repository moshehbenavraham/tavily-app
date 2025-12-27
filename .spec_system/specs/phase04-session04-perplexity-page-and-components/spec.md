# Session Specification

**Session ID**: `phase04-session04-perplexity-page-and-components`
**Phase**: 04 - Deep Research Frontend
**Status**: Not Started
**Created**: 2025-12-27

---

## 1. Session Overview

This session implements the complete Perplexity deep research page UI, transforming the current stub page into a fully functional research interface. The implementation follows the established patterns from existing Tavily pages (search, extract, crawl) while adapting for Perplexity's synchronous deep research workflow.

The core challenge is handling the 30-60 second API latency inherent to deep research queries. Users need clear feedback during long-running operations, including an elapsed time indicator and responsive loading states. The page will feature a form with progressive disclosure (basic query fields visible, advanced options hidden behind a toggle), markdown-rendered research results, clickable citations, and token usage statistics.

This session establishes component patterns that Session 05 (Gemini page) will follow, making the architecture decisions here particularly important. By completing Perplexity first, we validate the component structure with the simpler synchronous API before tackling Gemini's async polling workflow.

---

## 2. Objectives

1. Build PerplexityDeepResearchForm with React Hook Form, Zod validation, and advanced options toggle for progressive disclosure
2. Create result display components (PerplexityResultView, PerplexityCitationsList, PerplexityUsageStats) for structured research output
3. Implement loading state with elapsed time counter to provide feedback during 30-60 second API calls
4. Complete the perplexity-research.tsx route page with form, results, error handling, and responsive layout

---

## 3. Prerequisites

### Required Sessions
- [x] `phase04-session01-sdk-client-and-navigation` - SDK client regenerated with Perplexity/Gemini types, navigation links added
- [x] `phase04-session02-perplexity-hooks-and-schema` - usePerplexityDeepResearch hook, Zod schema, form defaults

### Required Tools/Knowledge
- React Hook Form with Zod resolver pattern
- TanStack Query useMutation for form submission
- shadcn/ui component library (Form, Input, Select, Card, Button, Badge, Collapsible)
- Markdown rendering library (react-markdown or similar)
- Tailwind CSS responsive utilities

### Environment Requirements
- Frontend dev server running (`npm run dev`)
- Backend API running with Perplexity routes available
- Valid PERPLEXITY_API_KEY configured in backend

---

## 4. Scope

### In Scope (MVP)
- PerplexityDeepResearchForm.tsx with query, model, search_mode, reasoning_effort fields
- Advanced options toggle (Collapsible) for max_tokens, temperature, domain filters, date filters
- PerplexityResultView.tsx with markdown rendering for research content
- PerplexityCitationsList.tsx displaying source URLs with titles and snippets
- PerplexityUsageStats.tsx showing prompt_tokens, completion_tokens, total_tokens
- Loading indicator with elapsed time counter (updates every second)
- Toast notifications for error handling
- Responsive layout (mobile/desktop)

### Out of Scope (Deferred)
- PerplexityVideos.tsx component - *Reason: Optional feature, lower priority than core functionality*
- Save to Items button - *Reason: Planned for Session 06 with shared save infrastructure*
- Streaming responses - *Reason: Backend does not support streaming in MVP*
- Related questions display - *Reason: Nice-to-have, can add later if time permits*

---

## 5. Technical Approach

### Architecture
The page follows a container/presentational pattern where the route page (perplexity-research.tsx) manages state and the components handle rendering. State flows down via props; mutations are triggered from the form component.

```
perplexity-research.tsx (route page)
  |-- PerplexityDeepResearchForm.tsx (form with mutation)
  |-- LoadingIndicator (inline, with elapsed time)
  |-- PerplexityResultView.tsx (markdown content)
      |-- PerplexityCitationsList.tsx (sources)
      |-- PerplexityUsageStats.tsx (token counts)
```

### Design Patterns
- **Container/Presentational**: Route page holds state, components are mostly presentational
- **Controlled Forms**: React Hook Form controls all form state with Zod validation
- **Progressive Disclosure**: Advanced options hidden by default, revealed via Collapsible toggle
- **Elapsed Time Pattern**: useEffect with setInterval for updating elapsed seconds during loading

### Technology Stack
- React 19 with TypeScript strict mode
- React Hook Form 7.x with @hookform/resolvers/zod
- TanStack Query 5.x (useMutation)
- shadcn/ui components (Form, Card, Button, Badge, Select, Input, Checkbox, Collapsible)
- react-markdown for rendering research content
- Tailwind CSS for responsive styling

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `frontend/src/components/Perplexity/PerplexityDeepResearchForm.tsx` | Form component with RHF, Zod, advanced options toggle | ~250 |
| `frontend/src/components/Perplexity/PerplexityResultView.tsx` | Markdown renderer for research content with citations/usage | ~120 |
| `frontend/src/components/Perplexity/PerplexityCitationsList.tsx` | List of source citations with links | ~80 |
| `frontend/src/components/Perplexity/PerplexityUsageStats.tsx` | Token usage display (prompt, completion, total) | ~50 |
| `frontend/src/components/Perplexity/index.ts` | Barrel export for Perplexity components | ~5 |

### Files to Modify
| File | Changes | Est. Lines |
|------|---------|------------|
| `frontend/src/routes/_layout/perplexity-research.tsx` | Replace stub with full page implementation | ~150 |

---

## 7. Success Criteria

### Functional Requirements
- [ ] Form validates all fields using perplexityDeepResearchSchema
- [ ] Query submission triggers usePerplexityDeepResearch mutation
- [ ] Loading indicator displays during API call with elapsed time (e.g., "Researching... 45s")
- [ ] Research report renders as properly formatted markdown
- [ ] Citations display as clickable links with title and snippet when available
- [ ] Token usage (prompt, completion, total) visible after successful query
- [ ] Errors display via toast notification with clear message

### Testing Requirements
- [ ] Manual testing of form validation (empty query, invalid values)
- [ ] Manual testing of successful query flow end-to-end
- [ ] Manual testing of error handling (network error, API error)
- [ ] Manual testing on mobile viewport (responsive layout)

### Quality Gates
- [ ] All files ASCII-encoded (no unicode characters in source)
- [ ] Unix LF line endings
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No lint errors (`npm run lint`)
- [ ] Code follows project conventions (PascalCase components, camelCase functions)
- [ ] Components use shadcn/ui as base with Tailwind styling

---

## 8. Implementation Notes

### Key Considerations
- Use existing SearchForm.tsx as reference for form structure and patterns
- The usePerplexityDeepResearch hook is already implemented with error handling
- Form defaults are defined in perplexityFormDefaults (lib/schemas/perplexity.ts)
- parseDomainList helper available for converting domain string to array

### Potential Challenges
- **Long API latency (30-60s)**: Implement useEffect with setInterval to update elapsed time counter. Clear interval on mutation completion.
- **Markdown rendering**: Install react-markdown if not present. Handle code blocks with syntax highlighting if time permits.
- **Form complexity**: Use Collapsible component to hide advanced options. Group related fields logically.
- **Response structure**: choices[0].message.content contains the research text. Citations array contains URLs. search_results contains detailed source info.

### Relevant Considerations
- [P03] **Perplexity API latency**: Deep research takes 30-60 seconds. Elapsed time counter provides feedback during long waits.
- [P03] **Sync vs async patterns**: Perplexity uses synchronous POST - single mutation call without polling, simpler than Gemini.
- [P01] **TanStack Router + Query**: Follow patterns from existing search/extract/crawl pages.
- [P01] **React Hook Form + Zod**: Use established pattern with zodResolver, onBlur validation, disabled submit during loading.

### ASCII Reminder
All output files must use ASCII-only characters (0-127). Avoid curly quotes, em-dashes, and other unicode in string literals.

---

## 9. Testing Strategy

### Unit Tests
- Form validation rejects empty query
- Form validation rejects invalid temperature (< 0 or > 2)
- parseDomainList correctly parses comma-separated strings

### Integration Tests
- Form submission triggers mutation with correct payload
- Successful response updates UI with results
- Error response shows toast notification

### Manual Testing
- Submit research query and verify results display
- Test advanced options toggle (expand/collapse)
- Test form validation error messages
- Test loading indicator with elapsed time
- Test on mobile viewport for responsive layout
- Test error handling by disconnecting network

### Edge Cases
- Empty citations array (display "No sources" message)
- Very long research content (verify scrolling works)
- Missing usage data (handle null/undefined gracefully)
- Model change affects available options (reasoning_effort only for sonar-reasoning)

---

## 10. Dependencies

### External Libraries
- react-markdown: ^9.0.0 (for rendering research content)
- @radix-ui/react-collapsible: (via shadcn/ui for advanced options toggle)

### Other Sessions
- **Depends on**: phase04-session01-sdk-client-and-navigation, phase04-session02-perplexity-hooks-and-schema
- **Depended by**: phase04-session05-gemini-page-and-components (will follow similar patterns), phase04-session06-save-integration-and-polish (adds Save to Items)

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
