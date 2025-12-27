# Session 01: SDK Client and Navigation

**Session ID**: `phase04-session01-sdk-client-and-navigation`
**Status**: Not Started
**Estimated Tasks**: ~20
**Estimated Duration**: 2-3 hours

---

## Objective

Regenerate the frontend SDK client to include Perplexity and Gemini services, verify type generation, and add navigation items to the sidebar for the new deep research pages.

---

## Scope

### In Scope (MVP)
- Regenerate frontend SDK client from updated OpenAPI spec
- Verify PerplexityService class generated in sdk.gen.ts
- Verify GeminiService class generated in sdk.gen.ts
- Verify TypeScript types generated in types.gen.ts
- Add "Perplexity Research" navigation item to sidebar
- Add "Gemini Research" navigation item to sidebar
- Create placeholder route files for both pages

### Out of Scope
- Form implementation (Session 04-05)
- Hook implementation (Session 02-03)
- Result display components (Session 04-05)

---

## Prerequisites

- [ ] Phase 03 Deep Research Backend complete
- [ ] Backend server running with updated OpenAPI spec
- [ ] Node.js development environment configured

---

## Deliverables

1. Regenerated SDK client with Perplexity and Gemini services
2. TypeScript types for all request/response schemas
3. Updated sidebar navigation with new items
4. Placeholder route files for perplexity-research and gemini-research pages
5. Verified type safety with no TypeScript errors

---

## Success Criteria

- [ ] `npm run generate-client` completes without errors
- [ ] PerplexityService exports deepResearch method
- [ ] GeminiService exports startResearch, pollResearch, cancelResearch, syncResearch methods
- [ ] All request/response types properly generated
- [ ] Navigation items visible in sidebar
- [ ] Routes accessible at /perplexity-research and /gemini-research
- [ ] No TypeScript or lint errors
