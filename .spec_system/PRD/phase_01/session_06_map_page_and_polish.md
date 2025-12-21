# Session 06: Map Page and Polish

**Session ID**: `phase01-session06-map-page-and-polish`
**Status**: Not Started
**Estimated Tasks**: ~20
**Estimated Duration**: 2-3 hours

---

## Objective

Build the map (sitemap generation) page and perform final polish across all Tavily pages including consistent error handling, responsive design testing, and code cleanup.

---

## Scope

### In Scope (MVP)
- Create MapForm component with URL input
- Add max_depth and limit fields for map generation
- Add optional include_paths, exclude_paths fields
- Validate URL format using Zod
- Create useMap mutation hook
- Display map results as URL list (tree view optional)
- Show total URLs discovered
- Allow copying URL list to clipboard
- Final polish across all pages:
  - Consistent toast notifications for all errors
  - Responsive design testing and fixes
  - Keyboard navigation accessibility
  - Loading state consistency
  - Empty state consistency
- Code cleanup and component organization

### Out of Scope
- Visual sitemap tree rendering (use simple list)
- Export to sitemap.xml format (deferred)

---

## Prerequisites

- [ ] Sessions 01-05 completed
- [ ] All other Tavily pages functional

---

## Deliverables

1. `components/Tavily/MapForm.tsx` - map configuration form
2. `components/Tavily/MapResultsList.tsx` - URL list display
3. `hooks/useMap.ts` - TanStack Query mutation hook
4. Updated `/map` route with complete functionality
5. Polish updates across all Tavily components
6. Responsive design verified on mobile/tablet/desktop

---

## Success Criteria

- [ ] Map form accepts URL and generates sitemap
- [ ] Map results display as copyable URL list
- [ ] All Tavily pages have consistent error handling
- [ ] All pages responsive on mobile and desktop
- [ ] All loading states use consistent patterns
- [ ] All empty states have helpful messaging
- [ ] No TypeScript errors or lint warnings
- [ ] Code follows existing project patterns
- [ ] All Tavily features accessible via sidebar navigation
