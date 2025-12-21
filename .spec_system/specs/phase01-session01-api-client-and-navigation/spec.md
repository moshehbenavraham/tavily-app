# Session Specification

**Session ID**: `phase01-session01-api-client-and-navigation`
**Phase**: 01 - Frontend Integration
**Status**: Not Started
**Created**: 2025-12-21

---

## 1. Session Overview

This session establishes the foundation for all frontend Tavily integration by regenerating the TypeScript API client to include Tavily types, adding navigation structure, and creating route scaffolding. It is the critical first step of Phase 01 that unblocks all subsequent frontend sessions.

The session bridges the completed backend API (Phase 00) to the React frontend. By regenerating the OpenAPI client, we ensure type-safe access to all Tavily endpoints. The navigation updates make Tavily features discoverable to users, while the placeholder routes provide the file structure that Sessions 02-06 will populate with forms and functionality.

This is a low-risk, high-impact session focused on infrastructure rather than business logic. Success here means developers can immediately begin building Tavily UI components with full type safety and a clear navigation structure.

---

## 2. Objectives

1. Regenerate the OpenAPI TypeScript client to include all Tavily request/response types
2. Add a Tavily navigation section to the sidebar with four navigation items (Search, Extract, Crawl, Map)
3. Create placeholder route files for all four Tavily pages following existing route patterns
4. Ensure TanStack Router's route tree is updated and all navigation links function correctly

---

## 3. Prerequisites

### Required Sessions
- [x] `phase00-session01-dependency-and-configuration` - Tavily SDK configured
- [x] `phase00-session02-service-layer-implementation` - TavilyService class
- [x] `phase00-session03-pydantic-schemas` - Request/response schemas
- [x] `phase00-session04-search-and-extract-routes` - Search and extract endpoints
- [x] `phase00-session05-crawl-map-and-error-handling` - Crawl and map endpoints
- [x] `phase00-session06-testing-suite` - All endpoints tested and working

### Required Tools/Knowledge
- Node.js and npm for frontend development
- Understanding of TanStack Router file-based routing
- Familiarity with @hey-api/openapi-ts client generation
- Knowledge of Lucide React icons

### Environment Requirements
- Backend server must be running to serve OpenAPI spec at `/api/v1/openapi.json`
- Frontend development environment configured (`npm install` completed)
- Valid authentication credentials for testing navigation

---

## 4. Scope

### In Scope (MVP)
- Run `npm run generate-client` to regenerate API client from backend OpenAPI spec
- Verify Tavily types are present in `frontend/src/client/types.gen.ts`
- Add Tavily section to `AppSidebar.tsx` with 4 navigation items
- Create route file `frontend/src/routes/_layout/search.tsx` with placeholder
- Create route file `frontend/src/routes/_layout/extract.tsx` with placeholder
- Create route file `frontend/src/routes/_layout/crawl.tsx` with placeholder
- Create route file `frontend/src/routes/_layout/map.tsx` with placeholder
- Add appropriate Lucide icons for each navigation item
- Ensure route tree regenerates with new routes

### Out of Scope (Deferred)
- Search form implementation - *Reason: Session 02*
- Results display components - *Reason: Session 03*
- Extract page forms and functionality - *Reason: Session 04*
- Crawl page forms and functionality - *Reason: Session 05*
- Map page forms and functionality - *Reason: Session 06*
- API mutation hooks (useMutation) - *Reason: Sessions 02-06*
- Loading states and error handling UI - *Reason: Sessions 02-06*

---

## 5. Technical Approach

### Architecture
The session follows the existing frontend architecture patterns established in the boilerplate:

1. **API Client Layer**: The `@hey-api/openapi-ts` generator reads the OpenAPI spec from the running backend and generates typed client code in `frontend/src/client/`. This provides `TavilyService` with methods matching each endpoint.

2. **Navigation Layer**: The sidebar uses a data-driven approach where `AppSidebar.tsx` defines an array of navigation items. We will add a new array for Tavily items and render them in a separate `SidebarGroup`.

3. **Routing Layer**: TanStack Router uses file-based routing where files in `frontend/src/routes/_layout/` become routes under the authenticated layout. Each route exports a `Route` created via `createFileRoute()`.

### Design Patterns
- **Code Generation**: Use OpenAPI-to-TypeScript generation for type-safe API access
- **Data-Driven UI**: Navigation defined as data arrays, not hardcoded JSX
- **File-Based Routing**: Routes derived from file system structure
- **Consistent Placeholders**: All new routes follow the same structure as existing routes

### Technology Stack
- @hey-api/openapi-ts v0.73.0 - OpenAPI client generation
- @tanstack/react-router v1.141.2 - File-based routing
- lucide-react v0.556.0 - Icon library
- shadcn/ui sidebar components - Navigation UI

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `frontend/src/routes/_layout/search.tsx` | Search page route placeholder | ~35 |
| `frontend/src/routes/_layout/extract.tsx` | Extract page route placeholder | ~35 |
| `frontend/src/routes/_layout/crawl.tsx` | Crawl page route placeholder | ~35 |
| `frontend/src/routes/_layout/map.tsx` | Map page route placeholder | ~35 |

### Files to Modify
| File | Changes | Est. Lines Changed |
|------|---------|------------|
| `frontend/src/client/types.gen.ts` | Auto-regenerated with Tavily types | ~200+ (generated) |
| `frontend/src/client/sdk.gen.ts` | Auto-regenerated with TavilyService | ~100+ (generated) |
| `frontend/src/client/schemas.gen.ts` | Auto-regenerated with Tavily schemas | ~100+ (generated) |
| `frontend/src/components/Sidebar/AppSidebar.tsx` | Add Tavily navigation section | ~20 |
| `frontend/src/routeTree.gen.ts` | Auto-regenerated with new routes | ~50 (generated) |

---

## 7. Success Criteria

### Functional Requirements
- [ ] `npm run generate-client` executes without errors
- [ ] `TavilyService` class exists in regenerated client with search, extract, crawl, map methods
- [ ] Type definitions include: `TavilySearchRequest`, `TavilySearchResponse`, `TavilyExtractRequest`, `TavilyExtractResponse`, `TavilyCrawlRequest`, `TavilyCrawlResponse`, `TavilyMapRequest`, `TavilyMapResponse`
- [ ] Sidebar displays Tavily section with 4 items: Search, Extract, Crawl, Map
- [ ] Each navigation item has an appropriate Lucide icon
- [ ] Clicking "Search" navigates to `/search` route
- [ ] Clicking "Extract" navigates to `/extract` route
- [ ] Clicking "Crawl" navigates to `/crawl` route
- [ ] Clicking "Map" navigates to `/map` route
- [ ] Each route renders a placeholder page with title and description

### Testing Requirements
- [ ] Manual testing: verify all 4 navigation links work
- [ ] Manual testing: verify routes render without errors
- [ ] Manual testing: verify route tree includes new routes

### Quality Gates
- [ ] All files ASCII-encoded (0-127 characters only)
- [ ] Unix LF line endings
- [ ] Code follows project conventions (Biome linting)
- [ ] No TypeScript errors (`npm run build` succeeds)
- [ ] No console errors in browser

---

## 8. Implementation Notes

### Key Considerations
- The backend server must be running when regenerating the client so it can fetch `/api/v1/openapi.json`
- TanStack Router auto-generates `routeTree.gen.ts` when route files are created/modified
- Placeholder routes should follow the exact pattern used by `items.tsx` for consistency
- Navigation icons should be intuitive: Search (magnifying glass), Extract (file-text), Crawl (spider/globe), Map (map/sitemap)

### Potential Challenges
- **Backend not running**: Ensure backend is started before client generation
- **Stale route tree**: If routes don't appear, run `npm run dev` to trigger regeneration
- **Type naming conflicts**: Verify generated type names match expected patterns

### Suggested Lucide Icons
- Search: `Search` icon (already used elsewhere, appropriate for web search)
- Extract: `FileText` or `FileOutput` (represents content extraction)
- Crawl: `Globe` or `Network` (represents web crawling)
- Map: `Map` or `Sitemap` (represents URL mapping)

### ASCII Reminder
All output files must use ASCII-only characters (0-127). Avoid Unicode characters, emojis, or special symbols in code and comments.

---

## 9. Testing Strategy

### Unit Tests
- No new unit tests required (this session is infrastructure/scaffolding only)
- Existing tests should continue to pass

### Integration Tests
- No new integration tests required for this session

### Manual Testing
1. Start backend: `cd backend && uv run uvicorn app.main:app --reload`
2. Regenerate client: `cd frontend && npm run generate-client`
3. Start frontend: `npm run dev`
4. Log in with valid credentials
5. Verify Tavily section appears in sidebar
6. Click each of the 4 Tavily navigation items
7. Verify each route renders its placeholder content
8. Check browser console for errors

### Edge Cases
- Verify navigation works on mobile (sidebar collapses)
- Verify icon tooltips display when sidebar is collapsed
- Verify active state highlights correctly on each route

---

## 10. Dependencies

### External Libraries
- @hey-api/openapi-ts: v0.73.0 (existing)
- @tanstack/react-router: v1.141.2 (existing)
- lucide-react: v0.556.0 (existing)

### Other Sessions
- **Depends on**: Phase 00 complete (all 6 sessions)
- **Depended by**:
  - Session 02 (Search Form) - needs routes and types
  - Session 03 (Search Results) - needs routes and types
  - Session 04 (Extract Page) - needs routes and types
  - Session 05 (Crawl Page) - needs routes and types
  - Session 06 (Map Page) - needs routes and types

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
