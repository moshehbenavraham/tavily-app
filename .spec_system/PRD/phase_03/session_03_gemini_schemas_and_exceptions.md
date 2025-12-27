# Session 03: Gemini Schemas and Exceptions

**Session ID**: `phase03-session03-gemini-schemas-and-exceptions`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 2-4 hours

---

## Objective

Implement all Pydantic schemas and custom exception class for the Google Gemini Deep Research API async workflow.

---

## Scope

### In Scope (MVP)
- Create GeminiInteractionStatus enum (pending, running, completed, failed, cancelled)
- Create GeminiStreamEventType enum (thinking_update, research_update, final_result, error)
- Create GeminiDeltaType enum (text, tool_call, status)
- Create GeminiDeepResearchRequest schema with:
  - query, enable_thinking_summaries, file_search_store_names, previous_interaction_id
- Create GeminiDeepResearchPollRequest schema with:
  - interaction_id, last_event_id
- Create GeminiUsage schema (input_tokens, output_tokens, total_tokens)
- Create GeminiOutput schema (type, content, metadata)
- Create GeminiDeepResearchJobResponse schema (interaction_id, status, created_at)
- Create GeminiDeepResearchResultResponse schema (status, outputs, usage, completed_at)
- Create GeminiErrorCode enum
- Create GeminiAPIError exception class with factory methods
- Export schemas in backend/app/schemas/__init__.py

### Out of Scope
- Perplexity schemas (Session 02)
- Service implementation (Session 05)
- Route definitions (Session 06)

---

## Prerequisites

- [ ] Session 01 complete (configuration)
- [ ] Session 02 complete (Perplexity schemas pattern established)
- [ ] Review of Gemini Deep Research API documentation
- [ ] Understanding of async polling workflow

---

## Deliverables

1. `backend/app/schemas/gemini.py` with all schemas and enums
2. `backend/app/exceptions/gemini.py` with GeminiAPIError class
3. Updated `backend/app/schemas/__init__.py` exports
4. Updated `backend/app/exceptions/__init__.py` exports (if exists)

---

## Success Criteria

- [ ] All enums defined with correct string values matching API
- [ ] GeminiDeepResearchRequest validates query and optional parameters
- [ ] GeminiDeepResearchPollRequest handles interaction_id and optional last_event_id
- [ ] Response schemas support both job creation and polling responses
- [ ] GeminiAPIError has factory methods: rate_limit_exceeded, invalid_api_key, request_timeout, invalid_request, research_failed, interaction_not_found, max_polls_exceeded, polling_timeout, api_error
- [ ] All schemas have proper type hints
- [ ] No type errors or lint warnings
