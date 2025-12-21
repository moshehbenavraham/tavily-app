# Session 01: API Client and Navigation

**Session ID**: `phase01-session01-api-client-and-navigation`
**Status**: Not Started
**Estimated Tasks**: ~20
**Estimated Duration**: 2-3 hours

---

## Objective

Regenerate the OpenAPI client to include Tavily API types, add Tavily navigation items to the sidebar, and create placeholder route files for all Tavily pages.

---

## Scope

### In Scope (MVP)
- Regenerate frontend API client from updated OpenAPI spec
- Verify Tavily types are correctly generated (SearchRequest, SearchResponse, etc.)
- Add Tavily navigation section to AppSidebar component
- Create route files: `_layout/search.tsx`, `_layout/extract.tsx`, `_layout/crawl.tsx`, `_layout/map.tsx`
- Add basic placeholder content to each route
- Update routeTree.gen.ts with new routes
- Add Lucide icons for Tavily navigation items

### Out of Scope
- Form implementations (Session 02+)
- Results display components (Session 03+)
- API mutation hooks (Session 02+)

---

## Prerequisites

- [ ] Backend server running with Tavily endpoints
- [ ] OpenAPI spec includes all Tavily schemas
- [ ] Frontend development environment ready

---

## Deliverables

1. Regenerated `frontend/src/client/` with Tavily types
2. Updated `AppSidebar.tsx` with Tavily navigation items
3. Route files for search, extract, crawl, map pages
4. Updated route tree with new routes

---

## Success Criteria

- [ ] `npm run generate-client` succeeds without errors
- [ ] Tavily types visible in `types.gen.ts` (SearchRequest, SearchResponse, etc.)
- [ ] Sidebar shows Tavily section with 4 navigation items
- [ ] Clicking each nav item navigates to correct route
- [ ] All placeholder pages render without errors
- [ ] No TypeScript errors or lint warnings
