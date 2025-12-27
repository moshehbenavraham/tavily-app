# Session Specification

**Session ID**: `phase04-session02-perplexity-hooks-and-schema`
**Phase**: 04 - Deep Research Frontend
**Status**: Not Started
**Created**: 2025-12-27

---

## 1. Session Overview

This session creates the frontend data layer for Perplexity deep research functionality. The primary deliverables are a Zod validation schema for form input and a TanStack Query mutation hook that wraps the PerplexityService.deepResearch API call.

Perplexity uses a synchronous API pattern where the request blocks until the research is complete (typically 30-60 seconds). This differs from Gemini's async polling pattern and requires careful handling of extended loading states. The hook must provide clear isPending, isSuccess, and isError states that the UI components (Session 04) will consume.

This session follows established patterns from Phase 01, where tavily.ts schema and useTavilySearch.ts hook demonstrate the project's conventions for form validation and API integration. The generated SDK types (PerplexityDeepResearchRequest, PerplexityDeepResearchResponse) provide type safety for the data layer.

---

## 2. Objectives

1. Create Zod schema that validates all Perplexity deep research form fields with sensible defaults
2. Implement useMutation hook that calls PerplexityService.deepResearch with proper error handling
3. Export TypeScript types for form data and API responses that downstream components can consume
4. Handle extended API latency (30-60 seconds) with appropriate loading state management

---

## 3. Prerequisites

### Required Sessions
- [x] `phase04-session01-sdk-client-and-navigation` - Provides regenerated SDK with PerplexityService and TypeScript types

### Required Tools/Knowledge
- Zod schema validation patterns (see frontend/src/lib/schemas/tavily.ts)
- TanStack Query v5 useMutation patterns (see frontend/src/hooks/useTavilySearch.ts)
- React Hook Form + zodResolver integration

### Environment Requirements
- Frontend dev server running (npm run dev)
- Backend API accessible at configured URL
- Valid authentication token for API calls

---

## 4. Scope

### In Scope (MVP)
- Zod schema with all PerplexityDeepResearchRequest fields
- Form validation rules matching backend schema constraints
- Default values for optional fields
- useMutation hook with PerplexityService.deepResearch call
- Error handling with useCustomToast integration
- TypeScript types exported for form and response data
- Enum constants for search_mode, reasoning_effort, search_context_size, recency_filter

### Out of Scope (Deferred)
- Form UI components - *Reason: Session 04 scope*
- Result display components - *Reason: Session 04 scope*
- Save to Items functionality - *Reason: Session 06 scope*
- Streaming response handling - *Reason: Not required for MVP; stream defaults to false*

---

## 5. Technical Approach

### Architecture
The data layer follows the existing frontend architecture:
1. Zod schema in `lib/schemas/` validates form input and infers TypeScript types
2. Custom hook in `hooks/` wraps TanStack Query mutation with service call
3. SDK types from `client/types.gen.ts` used for API request/response typing
4. Hook consumers (future UI components) receive typed mutation state

### Design Patterns
- **Zod schema inference**: Use `z.infer<>` to derive TypeScript types from schema, ensuring form data and validation stay in sync
- **useMutation wrapper**: Follow useTavilySearch pattern with options object for onSuccess callback
- **Error boundary**: Use handleError utility with useCustomToast for consistent error display
- **Enum constants**: Export arrays of valid options for UI select components

### Technology Stack
- Zod 3.x for schema validation
- TanStack Query v5 for mutation state management
- TypeScript strict mode for type safety
- SDK-generated types for API contracts

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `frontend/src/lib/schemas/perplexity.ts` | Zod schema, types, defaults, enum constants | ~120 |
| `frontend/src/hooks/usePerplexityDeepResearch.ts` | useMutation hook wrapper | ~35 |

### Files to Modify
| File | Changes | Est. Lines |
|------|---------|------------|
| None | N/A | N/A |

---

## 7. Success Criteria

### Functional Requirements
- [ ] Zod schema validates query field (required, 1-10000 chars)
- [ ] Schema provides defaults for all optional fields
- [ ] Hook calls PerplexityService.deepResearch with correct payload
- [ ] Hook returns useMutation result (mutate, isPending, isSuccess, isError, data, error)
- [ ] Error responses trigger toast notification
- [ ] onSuccess callback option works correctly

### Testing Requirements
- [ ] Manual test: Import schema and validate sample data
- [ ] Manual test: Import hook and verify TypeScript types resolve
- [ ] Manual test: Call mutation and verify loading state during 30-60 second API call

### Quality Gates
- [ ] All files ASCII-encoded
- [ ] Unix LF line endings
- [ ] No TypeScript errors in strict mode
- [ ] No biome lint errors
- [ ] Code follows project conventions (CONVENTIONS.md)

---

## 8. Implementation Notes

### Key Considerations
- Query field is required with 1-10000 character limit per backend schema
- Most fields are optional with null defaults; provide sensible form defaults
- search_domain_filter is string array, but form will use comma-separated string input
- Date filters use MM/DD/YYYY format per backend schema
- model defaults to "sonar" but UI should allow selection

### Potential Challenges
- **Extended loading states**: 30-60 second API calls require UI to handle long isPending duration without timeout. Ensure mutation doesn't have aggressive timeout that cancels valid requests.
- **Date format validation**: search_after_date_filter and search_before_date_filter require MM/DD/YYYY format. Use Zod regex or custom refinement.
- **Domain filter transformation**: Convert comma-separated string to array before API call, handle empty string as null.

### Relevant Considerations
- [P03] **Perplexity API latency**: Deep research takes 30-60 seconds; backend timeout is 300s. Hook must not add aggressive client-side timeout. UI components (Session 04) will need loading indicators.
- [P03] **API rate limits**: 429 errors handled in backend exceptions. Hook's error handling will display rate limit messages via toast.
- [P01] **React Hook Form + Zod**: Established pattern for type-safe forms. Schema exports FormData type for react-hook-form generic.

### ASCII Reminder
All output files must use ASCII-only characters (0-127).

---

## 9. Testing Strategy

### Unit Tests
- Schema validation: test required field enforcement, optional field defaults
- Schema validation: test enum field values (search_mode, reasoning_effort, etc.)
- Type inference: verify exported types match expected structure

### Integration Tests
- Not in scope for this session (data layer only)

### Manual Testing
1. Import perplexityDeepResearchSchema in console, validate sample data
2. Import usePerplexityDeepResearch in a test component
3. Execute mutation with valid query, observe loading state for 30-60 seconds
4. Verify response data structure matches PerplexityDeepResearchResponse
5. Test error case (invalid auth) and verify toast displays

### Edge Cases
- Empty query string - should fail validation
- Query exceeding 10000 characters - should fail validation
- Empty domain filter string - should transform to null
- Invalid date format - should fail validation if strict, or warn

---

## 10. Dependencies

### External Libraries
- zod: ^3.23.8 (existing)
- @tanstack/react-query: ^5.x (existing)
- @hey-api/client-fetch: (existing, for SDK)

### Other Sessions
- **Depends on**: phase04-session01-sdk-client-and-navigation (SDK types)
- **Depended by**: phase04-session04-perplexity-page-and-components (UI consumes hook)

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
