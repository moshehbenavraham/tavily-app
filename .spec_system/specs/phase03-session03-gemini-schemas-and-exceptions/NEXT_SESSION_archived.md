# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-27
**Project State**: Phase 03 - Deep Research Backend
**Completed Sessions**: 17

---

## Recommended Next Session

**Session ID**: `phase03-session03-gemini-schemas-and-exceptions`
**Session Name**: Gemini Schemas and Exceptions
**Estimated Duration**: 2-4 hours
**Estimated Tasks**: ~25

---

## Why This Session Next?

### Prerequisites Met
- [x] Session 01 complete (Configuration and Environment)
- [x] Session 02 complete (Perplexity Schemas and Exceptions - pattern established)

### Dependencies
- **Builds on**: phase03-session02-perplexity-schemas-and-exceptions (follows same schema/exception pattern)
- **Enables**: phase03-session05-gemini-service-implementation (requires schemas)
- **Enables**: phase03-session06-gemini-routes-and-integration (requires schemas and exceptions)

### Project Progression
This is the natural next step in Phase 03. With Perplexity schemas complete, we now need Gemini schemas before implementing the Gemini service and routes. The async polling workflow requires more complex status and event type enums compared to Perplexity's synchronous pattern. Completing this session will unblock both Gemini sessions (05 and 06) while following the established schema pattern from Session 02.

---

## Session Overview

### Objective
Implement all Pydantic schemas and custom exception class for the Google Gemini Deep Research API async workflow.

### Key Deliverables
1. `backend/app/schemas/gemini.py` - All Gemini request/response schemas and enums
2. `backend/app/exceptions/gemini.py` - GeminiAPIError with factory methods
3. Updated `backend/app/schemas/__init__.py` - Export new schemas
4. Updated `backend/app/exceptions/__init__.py` - Export new exception class

### Scope Summary
- **In Scope (MVP)**:
  - GeminiInteractionStatus enum (pending, running, completed, failed, cancelled)
  - GeminiStreamEventType enum (thinking_update, research_update, final_result, error)
  - GeminiDeltaType enum (text, tool_call, status)
  - GeminiDeepResearchRequest schema (query, enable_thinking_summaries, file_search_store_names, previous_interaction_id)
  - GeminiDeepResearchPollRequest schema (interaction_id, last_event_id)
  - GeminiUsage, GeminiOutput, GeminiDeepResearchJobResponse, GeminiDeepResearchResultResponse schemas
  - GeminiErrorCode enum and GeminiAPIError exception class with factory methods
- **Out of Scope**:
  - Perplexity schemas (Session 02 - complete)
  - Service implementation (Session 05)
  - Route definitions (Session 06)

---

## Technical Considerations

### Technologies/Patterns
- Pydantic v2 BaseModel for all schemas
- StrEnum for enum types (Python 3.11+ compatible)
- Factory method pattern for exception class (matching Perplexity pattern)
- Optional fields with proper defaults for API flexibility

### Potential Challenges
- Gemini async workflow requires more status states than Perplexity sync
- Poll request needs to handle reconnection via last_event_id
- Response schemas must support both job creation and polling responses
- Error factory methods need to cover polling-specific errors (max_polls_exceeded, polling_timeout)

---

## Alternative Sessions

If this session is blocked:
1. **phase03-session04-perplexity-service-and-route** - Can be done in parallel since Perplexity schemas are complete
2. **(none)** - Gemini sessions 05-06 depend on this session's schemas

---

## Next Steps

Run `/sessionspec` to generate the formal specification.
