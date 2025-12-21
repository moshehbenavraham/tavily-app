# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-21
**Project State**: Phase 01 - Frontend Integration
**Completed Sessions**: 6 (Phase 00 Complete)

---

## Recommended Next Session

**Session ID**: `phase01-session01-api-client-and-navigation`
**Session Name**: API Client and Navigation
**Estimated Duration**: 2-3 hours
**Estimated Tasks**: ~20

---

## Why This Session Next?

### Prerequisites Met
- [x] Backend server with Tavily endpoints (Phase 00 complete)
- [x] OpenAPI spec includes all Tavily schemas
- [x] Frontend development environment ready
- [x] All Phase 00 sessions completed (6/6)

### Dependencies
- **Builds on**: Phase 00 - Complete backend API with search, extract, crawl, and map endpoints
- **Enables**: Session 02 (Search Form), Session 03 (Results Display), and all subsequent frontend sessions

### Project Progression
This is the foundational session for Phase 01 (Frontend Integration). It bridges the completed backend API to the React frontend by:
1. Regenerating the TypeScript client to include Tavily types
2. Setting up navigation structure for all Tavily features
3. Creating route scaffolding that subsequent sessions will build upon

Without this session, no other frontend work can proceed - it's the critical path.

---

## Session Overview

### Objective
Regenerate the OpenAPI client to include Tavily API types, add Tavily navigation items to the sidebar, and create placeholder route files for all Tavily pages.

### Key Deliverables
1. Regenerated `frontend/src/client/` with Tavily types (SearchRequest, SearchResponse, etc.)
2. Updated `AppSidebar.tsx` with Tavily navigation section (4 items)
3. Route files: `_layout/search.tsx`, `_layout/extract.tsx`, `_layout/crawl.tsx`, `_layout/map.tsx`
4. Updated `routeTree.gen.ts` with new routes

### Scope Summary
- **In Scope (MVP)**: API client regeneration, sidebar navigation, route placeholders, Lucide icons
- **Out of Scope**: Form implementations, results display, API mutation hooks

---

## Technical Considerations

### Technologies/Patterns
- TanStack Router (file-based routing)
- OpenAPI TypeScript code generation
- shadcn/ui navigation components
- Lucide React icons

### Potential Challenges
- OpenAPI spec may need backend running for regeneration
- Route tree auto-generation timing
- Ensuring generated types match backend schemas exactly

---

## Alternative Sessions

If this session is blocked:
1. **None available** - Session 01 is required before any other Phase 01 session
2. **Investigate blockers** - If OpenAPI generation fails, debug backend spec first

---

## Next Steps

Run `/sessionspec` to generate the formal specification.
