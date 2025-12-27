# Session 06: Save Integration and Polish

**Session ID**: `phase04-session06-save-integration-and-polish`
**Status**: Not Started
**Estimated Tasks**: ~20
**Estimated Duration**: 2-3 hours

---

## Objective

Add save to Items functionality for Perplexity and Gemini research results, update the Items page to display and filter new content types, and polish the overall deep research UI.

---

## Scope

### In Scope (MVP)
- Add Save button to PerplexityResultView component
- Create mapper function for Perplexity results to Item format
- Add Save button to GeminiResultView component
- Create mapper function for Gemini results to Item format
- Update Items table columns to display perplexity/gemini content types
- Add type badge variants for 'perplexity' and 'gemini'
- Update content_type filter dropdown with new options
- Display source metadata (citations, usage) in Items detail view
- Polish loading states across both research pages
- Ensure consistent error handling and toast messages
- Final responsiveness testing and fixes
- Accessibility review (keyboard navigation, ARIA labels)

### Out of Scope
- SearchHistory database model (deferred)
- Rate limiting per user (deferred)
- Combined "Research Hub" page (deferred)

---

## Prerequisites

- [ ] Sessions 04-05 complete (Perplexity and Gemini pages)
- [ ] useSaveToItems hook available from Phase 02
- [ ] Items page with content_type filtering

---

## Deliverables

1. Save button on PerplexityResultView
2. Save button on GeminiResultView
3. Mapper functions for both result types
4. Updated Items page with new content type support
5. New type badge variants for perplexity/gemini
6. Updated content_type filter options
7. Polished, accessible UI for both research pages

---

## Success Criteria

- [ ] Save button functional on Perplexity results
- [ ] Save button functional on Gemini results
- [ ] Saved items appear in Items page with correct data
- [ ] 'perplexity' and 'gemini' type badges display correctly
- [ ] Content type filter includes new options
- [ ] Metadata (citations, usage) visible in Items detail
- [ ] Toast notifications confirm save success/failure
- [ ] Loading states consistent across pages
- [ ] Error messages user-friendly
- [ ] Keyboard navigation works throughout
- [ ] UI passes accessibility spot check
- [ ] No TypeScript or lint errors
