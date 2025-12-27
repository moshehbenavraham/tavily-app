# Session Specification

**Session ID**: `phase04-session01-sdk-client-and-navigation`
**Phase**: 04 - Deep Research Frontend
**Status**: Not Started
**Created**: 2025-12-27

---

## 1. Session Overview

This session establishes the foundation for Phase 04 by regenerating the frontend SDK client to include the newly implemented Perplexity and Gemini deep research backend services. With Phase 03 complete, the backend now exposes endpoints for synchronous Perplexity deep research and asynchronous Gemini research workflows - the frontend SDK must be updated to consume these APIs with full type safety.

The session also adds navigation infrastructure for the new deep research pages. Following the established pattern of the Tavily nav group (Search, Extract, Crawl, Map), a new "Deep Research" navigation group will be added to the sidebar with entries for Perplexity Research and Gemini Research. Placeholder route files will be created to enable navigation and provide scaffolding for subsequent sessions.

This is a foundational session - without regenerated SDK types, TypeScript cannot provide type safety for the new API services. All subsequent Phase 04 sessions (hooks, forms, components) depend on the types generated here.

---

## 2. Objectives

1. Regenerate the frontend SDK client from the updated backend OpenAPI specification to include PerplexityService and GeminiService classes
2. Verify all TypeScript types are correctly generated for Perplexity and Gemini request/response schemas
3. Add a "Deep Research" navigation group to the sidebar with Perplexity Research and Gemini Research items
4. Create placeholder route files for /perplexity-research and /gemini-research pages

---

## 3. Prerequisites

### Required Sessions
- [x] `phase03-session01-configuration-and-environment` - Perplexity/Gemini API configuration
- [x] `phase03-session02-perplexity-schemas-and-exceptions` - Perplexity Pydantic schemas
- [x] `phase03-session03-gemini-schemas-and-exceptions` - Gemini Pydantic schemas
- [x] `phase03-session04-perplexity-service-and-route` - Perplexity deep research endpoint
- [x] `phase03-session05-gemini-service-implementation` - Gemini service logic
- [x] `phase03-session06-gemini-routes-and-integration` - Gemini research endpoints

### Required Tools/Knowledge
- Node.js and npm for running SDK generation
- Understanding of TanStack Router file-based routing
- Familiarity with existing sidebar navigation patterns

### Environment Requirements
- Backend server must be running at localhost:8000 to serve OpenAPI spec
- Frontend development environment configured with npm dependencies installed

---

## 4. Scope

### In Scope (MVP)
- Regenerate SDK client using `npm run generate-client` command
- Verify PerplexityService class generated with deepResearch method
- Verify GeminiService class generated with startResearch, pollResearch, cancelResearch, syncResearch methods
- Verify TypeScript types generated for all request/response schemas
- Add "Deep Research" SidebarGroup with SidebarGroupLabel
- Add "Perplexity Research" navigation item with appropriate icon
- Add "Gemini Research" navigation item with appropriate icon
- Create placeholder route file at /perplexity-research
- Create placeholder route file at /gemini-research
- Ensure no TypeScript or lint errors after changes

### Out of Scope (Deferred)
- Perplexity form implementation - *Reason: Session 04-05*
- Gemini form implementation - *Reason: Session 04-05*
- React Query hooks for API calls - *Reason: Session 02-03*
- Result display components - *Reason: Session 04-05*
- Loading states and progress indicators - *Reason: Session 04-05*
- Save to Items integration - *Reason: Session 06*

---

## 5. Technical Approach

### Architecture
The SDK client is auto-generated from the backend's OpenAPI specification using openapi-ts. The generation script fetches the OpenAPI JSON from the running backend server and produces TypeScript classes (sdk.gen.ts) and type definitions (types.gen.ts) in the frontend/src/client/ directory.

Navigation follows the established pattern: sidebar items are defined as arrays of objects with icon, title, and path properties. A new TavilyNav-style component or additional item array will add the Deep Research group.

Placeholder routes use TanStack Router's file-based routing - creating a file at routes/_layout/perplexity-research.tsx automatically creates the /perplexity-research route.

### Design Patterns
- **Code Generation**: Auto-generate SDK from OpenAPI spec to ensure backend/frontend type synchronization
- **File-based Routing**: TanStack Router convention for route definition
- **Grouped Navigation**: Logical grouping of related pages under labeled sidebar sections

### Technology Stack
- openapi-ts (SDK generation)
- TanStack Router (routing)
- Lucide React (icons)
- shadcn/ui Sidebar components

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `frontend/src/routes/_layout/perplexity-research.tsx` | Placeholder page for Perplexity deep research | ~40 |
| `frontend/src/routes/_layout/gemini-research.tsx` | Placeholder page for Gemini deep research | ~40 |

### Files to Modify
| File | Changes | Est. Lines |
|------|---------|------------|
| `frontend/src/client/sdk.gen.ts` | Regenerated - adds PerplexityService, GeminiService | ~200+ |
| `frontend/src/client/types.gen.ts` | Regenerated - adds request/response types | ~300+ |
| `frontend/src/components/Sidebar/AppSidebar.tsx` | Add Deep Research nav group with 2 items | ~30 |

---

## 7. Success Criteria

### Functional Requirements
- [ ] SDK regeneration completes without errors
- [ ] PerplexityService.deepResearch method exists and is typed correctly
- [ ] GeminiService.startResearch method exists and is typed correctly
- [ ] GeminiService.pollResearch method exists and is typed correctly
- [ ] GeminiService.cancelResearch method exists and is typed correctly
- [ ] GeminiService.syncResearch method exists and is typed correctly
- [ ] PerplexityDeepResearchRequest type is generated
- [ ] PerplexityDeepResearchResponse type is generated
- [ ] GeminiDeepResearchRequest type is generated
- [ ] GeminiDeepResearchJobResponse type is generated
- [ ] GeminiDeepResearchStatusResponse type is generated
- [ ] "Deep Research" group visible in sidebar
- [ ] "Perplexity Research" item navigates to /perplexity-research
- [ ] "Gemini Research" item navigates to /gemini-research
- [ ] Placeholder pages render without errors

### Testing Requirements
- [ ] Manual navigation testing completed
- [ ] SDK types import without TypeScript errors
- [ ] Page routes load correctly in browser

### Quality Gates
- [ ] All files ASCII-encoded
- [ ] Unix LF line endings
- [ ] Code follows project conventions (biome lint passes)
- [ ] No TypeScript errors in strict mode
- [ ] Route files follow existing page patterns

---

## 8. Implementation Notes

### Key Considerations
- Backend server must be running before SDK regeneration - the generation script fetches from http://localhost:8000/api/v1/openapi.json
- Use icons that semantically relate to deep research (e.g., Sparkles, Brain, Telescope, BookOpen)
- Placeholder pages should follow the structure of existing pages (Card wrapper, page header, description)
- Navigation items should be ordered logically (Perplexity before Gemini, matching sidebar Tavily order)

### Potential Challenges
- **Backend not running**: SDK generation will fail - ensure `uv run uvicorn app.main:app` is running
- **OpenAPI spec missing endpoints**: Verify all Perplexity/Gemini routes are registered in main.py router
- **Type mismatches**: If generated types don't match expectations, check backend Pydantic schemas

### Relevant Considerations
- [P03] **Sync vs async API patterns**: PerplexityService has single deepResearch method (sync), GeminiService has multiple methods (async workflow). SDK will reflect this difference - frontend hooks (Session 02-03) will handle differently.
- [P01] **TanStack Router + Query**: File-based routing convention - file name determines route path. Use createFileRoute for route definition.
- [P01] **shadcn/ui components**: Placeholder pages should use Card, CardHeader, CardTitle, CardDescription components for consistency.

### ASCII Reminder
All output files must use ASCII-only characters (0-127).

---

## 9. Testing Strategy

### Unit Tests
- N/A - SDK generation is tested by successful compilation

### Integration Tests
- N/A - deferred to hook implementation sessions

### Manual Testing
- Start backend server and run SDK generation
- Verify no TypeScript errors after generation
- Run `npm run dev` and navigate to /perplexity-research
- Run `npm run dev` and navigate to /gemini-research
- Verify sidebar shows Deep Research group with both items
- Verify active state highlights correctly when on each page
- Test sidebar collapse/expand behavior with new items

### Edge Cases
- Backend server not running (should fail gracefully with clear error)
- Route conflict with existing routes (verify no conflicts)
- Mobile sidebar behavior with new group

---

## 10. Dependencies

### External Libraries
- @hey-api/openapi-ts: SDK generation
- @tanstack/react-router: routing
- lucide-react: icons

### Other Sessions
- **Depends on**: phase03-session06-gemini-routes-and-integration (backend complete)
- **Depended by**: phase04-session02-perplexity-hooks-and-schema, phase04-session03-gemini-hooks-and-schema

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
