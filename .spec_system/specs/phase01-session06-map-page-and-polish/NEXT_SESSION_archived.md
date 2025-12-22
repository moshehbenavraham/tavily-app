# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-22
**Project State**: Phase 01 - Frontend Integration
**Completed Sessions**: 11 of 12

---

## Recommended Next Session

**Session ID**: `phase01-session06-map-page-and-polish`
**Session Name**: Map Page and Polish
**Estimated Duration**: 2-3 hours
**Estimated Tasks**: ~20

---

## Why This Session Next?

### Prerequisites Met
- [x] Session 01 (API Client and Navigation) - complete
- [x] Session 02 (Search Form and Query) - complete
- [x] Session 03 (Search Results Display) - complete
- [x] Session 04 (Extract Page) - complete
- [x] Session 05 (Crawl Page) - complete
- [x] All other Tavily pages functional

### Dependencies
- **Builds on**: All previous Phase 01 sessions (search, extract, crawl pages)
- **Enables**: Phase 01 completion, MVP delivery

### Project Progression
This is the **final session** of Phase 01 and completes the MVP. It delivers the last Tavily feature (map/sitemap generation) and includes a comprehensive polish pass across all implemented pages. Completing this session means:

1. All four Tavily features (search, extract, crawl, map) are fully functional in the UI
2. Consistent error handling, loading states, and empty states across all pages
3. Responsive design verified on all screen sizes
4. Code cleanup and organization complete
5. **MVP is complete**

---

## Session Overview

### Objective
Build the map (sitemap generation) page and perform final polish across all Tavily pages including consistent error handling, responsive design testing, and code cleanup.

### Key Deliverables
1. **MapForm.tsx** - URL input with max_depth, limit, include_paths, exclude_paths fields
2. **MapResultsList.tsx** - URL list display with copy-to-clipboard functionality
3. **useMap.ts** - TanStack Query mutation hook for map API
4. **Complete `/map` route** - Full map page functionality
5. **Cross-page polish** - Consistent toasts, loading states, empty states
6. **Responsive verification** - Mobile/tablet/desktop tested

### Scope Summary
- **In Scope (MVP)**: Map form, map results display, URL copy functionality, toast consistency, responsive fixes, loading/empty state consistency, keyboard accessibility, code cleanup
- **Out of Scope**: Visual sitemap tree rendering (use simple list), export to sitemap.xml format

---

## Technical Considerations

### Technologies/Patterns
- React Hook Form + Zod for map form validation
- TanStack Query mutation for map API calls
- shadcn/ui components (Input, Button, Card, etc.)
- Sonner for toast notifications
- Lucide React for icons
- Existing patterns from search/extract/crawl pages

### Potential Challenges
- **Path filtering UX**: include_paths/exclude_paths array inputs need good UX
- **Large URL lists**: Map can return many URLs - may need virtualization or pagination
- **Cross-page consistency audit**: Need to review all pages systematically
- **Responsive edge cases**: Tables and forms on small screens

---

## Alternative Sessions

This is the only remaining session in Phase 01. No alternatives available.

If blocked on specific features:
1. **Implement map functionality first** - Core deliverable, highest priority
2. **Defer polish to follow-up** - If time constrained, map page is essential

---

## Next Steps

Run `/sessionspec` to generate the formal specification.
