# Session 02: Perplexity Schemas and Exceptions

**Session ID**: `phase03-session02-perplexity-schemas-and-exceptions`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 2-4 hours

---

## Objective

Implement all Pydantic schemas and custom exception class for the Perplexity Sonar Deep Research API.

---

## Scope

### In Scope (MVP)
- Create PerplexitySearchMode enum (web, scholar, news, code)
- Create PerplexityReasoningEffort enum (low, medium, high)
- Create PerplexitySearchContextSize enum (low, medium, high)
- Create PerplexityRecencyFilter enum (day, week, month, year)
- Create PerplexityDeepResearchRequest schema with all parameters:
  - query, system_prompt, search_mode, reasoning_effort, search_context_size
  - user_location, max_tokens, temperature, top_p, top_k
  - presence_penalty, frequency_penalty, return_images, return_related_questions
  - stream, disable_search, enable_search_classifier, response_format
  - search_recency_filter, search_domain_filter, search_after_date_filter, search_before_date_filter
- Create PerplexitySearchResult, PerplexityVideo, PerplexityUsage, PerplexityChoice schemas
- Create PerplexityDeepResearchResponse schema
- Create PerplexityErrorCode enum
- Create PerplexityAPIError exception class with factory methods
- Export schemas in backend/app/schemas/__init__.py

### Out of Scope
- Gemini schemas (Session 03)
- Service implementation (Session 04)
- Route definitions (Session 04)

---

## Prerequisites

- [ ] Session 01 complete (configuration)
- [ ] Review of Perplexity API documentation for exact field names and types
- [ ] Understanding of existing schema patterns in backend/app/schemas/

---

## Deliverables

1. `backend/app/schemas/perplexity.py` with all schemas and enums
2. `backend/app/exceptions/perplexity.py` with PerplexityAPIError class
3. Updated `backend/app/schemas/__init__.py` exports
4. Updated `backend/app/exceptions/__init__.py` exports (if exists)

---

## Success Criteria

- [ ] All enums defined with correct string values
- [ ] PerplexityDeepResearchRequest validates all optional and required fields
- [ ] Response schemas properly parse Perplexity API responses
- [ ] PerplexityAPIError has factory methods: rate_limit_exceeded, invalid_api_key, request_timeout, invalid_request, content_filter, api_error
- [ ] All schemas have proper type hints and field validators where needed
- [ ] No type errors or lint warnings
- [ ] Schemas can serialize/deserialize correctly (unit tests optional)
