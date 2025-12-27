# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-27
**Project State**: Phase 04 - Deep Research Frontend
**Completed Sessions**: 21

---

## Recommended Next Session

**Session ID**: `phase04-session01-sdk-client-and-navigation`
**Session Name**: SDK Client and Navigation
**Estimated Duration**: 2-3 hours
**Estimated Tasks**: ~20

---

## Why This Session Next?

### Prerequisites Met
- [x] Phase 03 Deep Research Backend complete (all 6 sessions)
- [x] Backend server with Perplexity and Gemini routes implemented
- [x] OpenAPI spec updated with new endpoints

### Dependencies
- **Builds on**: phase03-session06-gemini-routes-and-integration (final backend session)
- **Enables**: phase04-session02-perplexity-hooks-and-schema, phase04-session03-gemini-hooks-and-schema

### Project Progression
This is the first session of Phase 04 and the natural entry point for frontend development. The backend for Perplexity and Gemini deep research is complete - now the frontend needs to consume these APIs. Regenerating the SDK client is the foundational step that enables all subsequent frontend work (hooks, forms, components). Without the updated SDK types, TypeScript cannot provide type safety for the new API services.

---

## Session Overview

### Objective
Regenerate the frontend SDK client to include Perplexity and Gemini services, verify type generation, and add navigation items to the sidebar for the new deep research pages.

### Key Deliverables
1. Regenerated SDK client with PerplexityService and GeminiService classes
2. TypeScript types for all request/response schemas (PerplexityDeepResearchRequest, GeminiDeepResearchJobResponse, etc.)
3. Updated sidebar navigation with "Perplexity Research" and "Gemini Research" items
4. Placeholder route files at /perplexity-research and /gemini-research

### Scope Summary
- **In Scope (MVP)**: SDK regeneration, type verification, navigation updates, placeholder routes
- **Out of Scope**: Forms (Session 04-05), hooks (Session 02-03), result components (Session 04-05)

---

## Technical Considerations

### Technologies/Patterns
- `npm run generate-client` - uses openapi-ts to generate SDK from backend OpenAPI spec
- TanStack Router file-based routing for placeholder pages
- Existing sidebar navigation pattern (follow Search, Extract, Crawl, Map structure)

### Potential Challenges
- Backend server must be running to regenerate SDK from OpenAPI spec
- Verify all Perplexity/Gemini endpoints exported correctly (deepResearch, startResearch, pollResearch, cancelResearch, syncResearch)
- Ensure request/response types match backend Pydantic schemas

### Relevant Considerations
- [P03] **Sync vs async API patterns**: Perplexity uses synchronous POST, Gemini uses async polling. Frontend must handle both patterns differently - SDK will generate separate methods.
- [P01] **TanStack Router + Query**: File-based routing with TanStack Router provides the foundation for new pages.
- [P01] **shadcn/ui components**: Placeholder pages should use existing layout patterns from other Tavily pages.

---

## Alternative Sessions

If this session is blocked:
1. **phase04-session02-perplexity-hooks-and-schema** - Could start hook implementation with manual types, but not recommended (defeats type safety)
2. **None practical** - SDK regeneration is required before any meaningful frontend work

---

## Next Steps

Run `/sessionspec` to generate the formal specification.
