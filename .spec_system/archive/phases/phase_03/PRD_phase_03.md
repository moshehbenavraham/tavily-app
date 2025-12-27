# PRD Phase 03: Deep Research Backend

**Status**: Complete
**Sessions**: 6
**Completed**: 2025-12-27

**Progress**: 6/6 sessions (100%)

---

## Overview

Phase 03 implements the backend infrastructure for two deep research APIs: Perplexity Sonar Deep Research (synchronous) and Google Gemini Deep Research (asynchronous with polling). This phase establishes configuration settings, Pydantic schemas, custom exceptions, service classes, and FastAPI routes for both APIs following the existing project patterns from Phases 00-02.

---

## Progress Tracker

| Session | Name | Status | Est. Tasks | Validated |
|---------|------|--------|------------|-----------|
| 01 | Configuration and Environment | Complete | 20 | 2025-12-27 |
| 02 | Perplexity Schemas and Exceptions | Complete | 22 | 2025-12-27 |
| 03 | Gemini Schemas and Exceptions | Complete | 22 | 2025-12-27 |
| 04 | Perplexity Service and Route | Complete | 22 | 2025-12-27 |
| 05 | Gemini Service Implementation | Complete | 22 | 2025-12-27 |
| 06 | Gemini Routes and Integration | Complete | 22 | 2025-12-27 |

---

## Completed Sessions

### Session 01: Configuration and Environment (2025-12-27)
- Created PerplexitySettings and GeminiSettings configuration classes
- Added 4 StrEnum classes for API options (models, modes, agents)
- Created http_utils.py with reusable timeout and header utilities
- Updated .env.example with all PERPLEXITY_* and GEMINI_* variables

### Session 02: Perplexity Schemas and Exceptions (2025-12-27)
- Created 4 enums: PerplexitySearchMode, PerplexityReasoningEffort, PerplexitySearchContextSize, PerplexityRecencyFilter
- Implemented PerplexityDeepResearchRequest schema with 19 parameters and validators
- Created response schemas: PerplexitySearchResult, PerplexityVideo, PerplexityUsage, PerplexityChoice, PerplexityMessage
- Implemented PerplexityAPIError exception with 6 factory methods and PerplexityErrorCode enum
- Updated schemas and exceptions __init__.py with proper exports

### Session 03: Gemini Schemas and Exceptions (2025-12-27)
- Created 3 enums: GeminiInteractionStatus, GeminiStreamEventType, GeminiDeltaType
- Implemented GeminiDeepResearchRequest and GeminiDeepResearchPollRequest schemas for async polling workflow
- Created response schemas: GeminiUsage, GeminiOutput, GeminiDeepResearchJobResponse, GeminiDeepResearchResultResponse
- Implemented GeminiAPIError exception with 9 factory methods and GeminiErrorCode enum
- Updated schemas and exceptions __init__.py with proper exports

### Session 04: Perplexity Service and Route (2025-12-27)
- Implemented PerplexityService class with async deep_research() method
- Created _build_headers(), _build_payload(), _parse_response(), _handle_error() methods
- Used httpx AsyncClient with 300-second timeout for deep research queries
- Added POST /api/v1/perplexity/deep-research route with JWT authentication
- Added get_perplexity_service() factory and PerplexityDep to deps.py
- Registered perplexity_exception_handler in main.py
- All 22 tasks completed, ruff and mypy verified

### Session 05: Gemini Service Implementation (2025-12-27)
- Implemented GeminiService class with async polling workflow pattern
- Created start_research(), poll_research(), wait_for_completion(), cancel_research() methods
- Built _build_headers() with x-goog-api-key authentication
- Built _build_payload() with agent_config structure for deep-research agent
- Implemented _parse_job_response() and _parse_poll_response() for response validation
- Added _is_terminal_status() helper for polling loop control
- Used httpx AsyncClient with configurable timeout, poll_interval, and max_poll_attempts
- Added get_gemini_service() factory and GeminiDep to deps.py
- All 22 tasks completed, ruff and mypy verified

### Session 06: Gemini Routes and Integration (2025-12-27)
- Created backend/app/api/routes/gemini.py with 4 route handlers
- Implemented POST /deep-research/sync for blocking completion wait
- Implemented POST /deep-research for async job start
- Implemented GET /deep-research/{interaction_id} for status polling with reconnection support
- Implemented DELETE /deep-research/{interaction_id} for job cancellation
- Added gemini_exception_handler to main.py following perplexity pattern
- Registered gemini router in api/main.py
- All 22 tasks completed, ruff verified, application starts successfully

---

## Phase Complete

All 6 sessions completed successfully on 2025-12-27.

---

## Objectives

1. Add configuration settings for Perplexity and Gemini APIs with environment variable support
2. Create comprehensive Pydantic schemas for all request/response types with proper validation
3. Implement custom exception classes with factory methods for consistent error handling
4. Build service classes for both APIs supporting sync (Perplexity) and async (Gemini) patterns
5. Create FastAPI routes with proper authentication and structured error responses
6. Add exception handlers to the main application for consistent API error responses

---

## Prerequisites

- Phase 02 completed (Saving Results to Items)
- Valid Perplexity API key for testing
- Valid Gemini API key for testing
- Understanding of existing backend patterns (TavilyService, deps.py, error handling)

---

## Technical Considerations

### Architecture
- Follow existing service layer pattern established in Phase 00 (TavilyService)
- Use httpx async client for both Perplexity and Gemini API calls
- Implement dependency injection via deps.py for service instantiation
- Maintain consistency with existing ErrorResponse schema for exception handlers

### Technologies
- httpx - async HTTP client for API calls
- Pydantic v2 - request/response validation with StrEnum
- FastAPI - route definitions with proper type hints
- Python 3.11+ - async/await patterns

### API Patterns
- **Perplexity**: Synchronous POST to `/chat/completions` with Bearer auth
- **Gemini**: Asynchronous background job with polling via `/interactions` endpoint

### Risks
- **Perplexity Latency**: Deep research can take 30-60s; 300s timeout configured
- **Gemini Long Running**: Research jobs can run up to 60 minutes; proper polling required
- **Rate Limiting**: Both APIs have rate limits; proper 429 handling essential
- **Schema Complexity**: Many optional fields; careful validation required

---

## Success Criteria

Phase complete when:
- [x] All 6 sessions completed
- [x] PerplexitySettings and GeminiSettings configured with all options
- [x] Environment variables documented in .env.example
- [x] All Pydantic schemas implemented with proper validation
- [x] PerplexityAPIError and GeminiAPIError with factory methods
- [x] PerplexityService executes synchronous deep research
- [x] GeminiService supports start, poll, wait, and cancel operations
- [x] All endpoints require JWT authentication
- [x] Exception handlers return structured ErrorResponse
- [x] No lint errors or type check failures

---

## Dependencies

### Depends On
- Phase 02: Saving Results to Items (complete)

### Enables
- Phase 04: Deep Research Frontend

---

## API Reference

### Perplexity Sonar Deep Research

| Attribute | Value |
|-----------|-------|
| Endpoint | POST https://api.perplexity.ai/chat/completions |
| Model | sonar-deep-research |
| Auth | Bearer token (Authorization: Bearer key) |
| Pattern | Synchronous - immediate response |
| Context Window | 128K tokens |
| Typical Latency | 30-60 seconds |

### Google Gemini Deep Research

| Attribute | Value |
|-----------|-------|
| Endpoint | POST https://generativelanguage.googleapis.com/v1beta/interactions |
| Agent | deep-research-pro-preview-12-2025 |
| Auth | API key header (x-goog-api-key: key) |
| Pattern | Asynchronous - background job with polling |
| Max Duration | 60 minutes (typical ~20 min) |

---

## Session Summary

### Session 01: Configuration and Environment
Core configuration infrastructure for both APIs including settings classes, environment variables, and base dependencies.

### Session 02: Perplexity Schemas and Exceptions
All Pydantic schemas for Perplexity API including enums, request/response models, and custom exception class.

### Session 03: Gemini Schemas and Exceptions
All Pydantic schemas for Gemini API including enums, request/response models for async workflow, and custom exception class.

### Session 04: Perplexity Service and Route
PerplexityService implementation with deep research method, FastAPI route, and exception handler integration.

### Session 05: Gemini Service Implementation
GeminiService class with start, poll, wait_for_completion, and cancel methods for async research workflow.

### Session 06: Gemini Routes and Integration
All Gemini FastAPI routes (start, poll, cancel, sync), exception handler, and final router registration.
