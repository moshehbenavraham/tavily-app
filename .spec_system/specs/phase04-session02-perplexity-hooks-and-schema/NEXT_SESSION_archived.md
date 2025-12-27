# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-27
**Project State**: Phase 04 - Deep Research Frontend
**Completed Sessions**: 22

---

## Recommended Next Session

**Session ID**: `phase04-session02-perplexity-hooks-and-schema`
**Session Name**: Perplexity Hooks and Schema
**Estimated Duration**: 2-3 hours
**Estimated Tasks**: ~20

---

## Why This Session Next?

### Prerequisites Met
- [x] Session 01 complete (SDK client regenerated)
- [x] PerplexityService available in SDK (sdk.gen.ts)
- [x] TypeScript types for Perplexity schemas generated (types.gen.ts)
- [x] Navigation items added to sidebar

### Dependencies
- **Builds on**: phase04-session01-sdk-client-and-navigation
- **Enables**: phase04-session04-perplexity-page-and-components

### Project Progression
This is the natural next step in Phase 04. Session 01 regenerated the SDK client with Perplexity and Gemini services. Now we need to create the frontend data layer (Zod schemas and TanStack Query hooks) before building the UI components. Starting with Perplexity (synchronous pattern) before Gemini (async polling) follows the established pattern of implementing simpler patterns first.

---

## Session Overview

### Objective
Create the Zod validation schema and TanStack Query hook for Perplexity deep research, handling the synchronous API pattern with proper loading states and error handling.

### Key Deliverables
1. Zod schema file with perplexityDeepResearchSchema (`frontend/src/lib/schemas/perplexity.ts`)
2. usePerplexityDeepResearch hook with useMutation (`frontend/src/hooks/usePerplexityDeepResearch.ts`)
3. Proper TypeScript types for form data and responses
4. Error handling for API failures

### Scope Summary
- **In Scope (MVP)**: Zod schema, useMutation hook, loading states, error handling
- **Out of Scope**: Form UI components (Session 04), Result display (Session 04), Save to Items (Session 06)

---

## Technical Considerations

### Technologies/Patterns
- Zod for schema validation (following Phase 01 patterns)
- TanStack Query useMutation for synchronous API calls
- React Hook Form integration via zodResolver

### Potential Challenges
- **Long API latency**: Perplexity deep research takes 30-60 seconds. Hook must handle extended pending states gracefully.
- **Complex request schema**: Many optional fields need sensible defaults. Match backend PerplexityDeepResearchRequest schema.

### Relevant Considerations
- [P03] **Perplexity API latency**: Deep research queries take 30-60 seconds; timeout configured at 300s. Frontend must implement loading states for long operations.
- [P03] **API rate limits**: 429 handling implemented in backend; frontend should provide user feedback on rate limit errors.
- [P01] **React Hook Form + Zod**: Form handling with react-hook-form and schema validation with zod provides type-safe form handling with good UX.

---

## Alternative Sessions

If this session is blocked:
1. **phase04-session03-gemini-hooks-and-schema** - Could implement Gemini hooks first, though Perplexity's simpler sync pattern makes it a better starting point
2. **Documentation/testing** - If SDK types are incorrect, may need to revisit backend schemas first

---

## Next Steps

Run `/sessionspec` to generate the formal specification.
