# Session 04: Perplexity Service and Route

**Session ID**: `phase03-session04-perplexity-service-and-route`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 2-4 hours

---

## Objective

Implement PerplexityService class and FastAPI route for executing deep research queries with proper error handling.

---

## Scope

### In Scope (MVP)
- Create PerplexityService class in backend/app/services/perplexity.py:
  - BASE_URL = "https://api.perplexity.ai"
  - _build_headers() for Bearer token authentication
  - _build_payload() mapping request fields to API format (including web_search_options)
  - _parse_response() extracting content from choices[0].message.content
  - _handle_error() converting HTTP errors to PerplexityAPIError
  - async deep_research(request: PerplexityDeepResearchRequest) method
- Add get_perplexity_service() factory function to deps.py
- Add PerplexityDep type alias to deps.py
- Create backend/app/api/routes/perplexity.py:
  - POST /api/v1/perplexity/deep-research endpoint
  - Require CurrentUser authentication
- Add perplexity_exception_handler to backend/app/main.py
- Register perplexity router in backend/app/api/main.py

### Out of Scope
- Gemini service implementation (Session 05)
- Gemini routes (Session 06)
- Integration tests (can be added later)

---

## Prerequisites

- [ ] Session 01 complete (configuration with PerplexitySettings)
- [ ] Session 02 complete (Perplexity schemas and exceptions)
- [ ] Understanding of existing service pattern (TavilyService)
- [ ] Understanding of existing route patterns in backend/app/api/routes/

---

## Deliverables

1. `backend/app/services/perplexity.py` with PerplexityService class
2. Updated `backend/app/api/deps.py` with PerplexityDep
3. `backend/app/api/routes/perplexity.py` with POST endpoint
4. Updated `backend/app/main.py` with exception handler
5. Updated `backend/app/api/main.py` with router registration

---

## Success Criteria

- [ ] PerplexityService instantiates with settings from config
- [ ] deep_research() makes POST request to Perplexity API
- [ ] Headers include Bearer token authentication
- [ ] Request payload properly formatted with web_search_options nested
- [ ] Response parsed and returned as PerplexityDeepResearchResponse
- [ ] HTTP errors converted to appropriate PerplexityAPIError subtype
- [ ] Route requires JWT authentication
- [ ] Exception handler returns structured ErrorResponse
- [ ] No type errors or lint warnings
- [ ] Endpoint accessible at /api/v1/perplexity/deep-research
