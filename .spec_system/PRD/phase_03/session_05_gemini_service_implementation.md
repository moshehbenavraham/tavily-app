# Session 05: Gemini Service Implementation

**Session ID**: `phase03-session05-gemini-service-implementation`
**Status**: Not Started
**Estimated Tasks**: ~20
**Estimated Duration**: 2-3 hours

---

## Objective

Implement GeminiService class with full async research workflow support including start, poll, wait, and cancel operations.

---

## Scope

### In Scope (MVP)
- Create GeminiService class in backend/app/services/gemini.py:
  - BASE_URL = "https://generativelanguage.googleapis.com/v1beta"
  - _build_headers() for x-goog-api-key header authentication
  - _build_payload() creating interaction request with agent_config
  - _handle_error() converting HTTP errors to GeminiAPIError
  - async start_research(request: GeminiDeepResearchRequest) -> GeminiDeepResearchJobResponse
    - POST to /interactions with background=True, store=True
    - agent_config.type="deep-research", agent_config.agent="deep-research-pro-preview-12-2025"
  - async poll_research(interaction_id: str, last_event_id: str | None) -> GeminiDeepResearchResultResponse
    - GET /interactions/{interaction_id} with optional last_event_id for reconnection
  - async wait_for_completion(interaction_id: str, poll_interval: float | None, max_attempts: int | None) -> GeminiDeepResearchResultResponse
    - Loop polling until completion or max attempts
    - Handle completed, failed, cancelled statuses
  - async cancel_research(interaction_id: str) -> bool
    - DELETE /interactions/{interaction_id}
- Add get_gemini_service() factory function to deps.py
- Add GeminiDep type alias to deps.py

### Out of Scope
- Route definitions (Session 06)
- Exception handler integration (Session 06)
- Integration tests

---

## Prerequisites

- [ ] Session 01 complete (configuration with GeminiSettings)
- [ ] Session 03 complete (Gemini schemas and exceptions)
- [ ] Understanding of Gemini async polling workflow
- [ ] Review of existing service patterns

---

## Deliverables

1. `backend/app/services/gemini.py` with GeminiService class
2. Updated `backend/app/api/deps.py` with GeminiDep

---

## Success Criteria

- [ ] GeminiService instantiates with settings from config
- [ ] start_research() creates background job and returns interaction_id
- [ ] poll_research() retrieves current status and outputs
- [ ] poll_research() supports last_event_id for reconnection after network issues
- [ ] wait_for_completion() polls until terminal status reached
- [ ] wait_for_completion() respects configurable poll_interval and max_attempts
- [ ] wait_for_completion() raises GeminiAPIError.max_polls_exceeded when limit hit
- [ ] cancel_research() successfully terminates running jobs
- [ ] All HTTP errors properly converted to GeminiAPIError
- [ ] No type errors or lint warnings
