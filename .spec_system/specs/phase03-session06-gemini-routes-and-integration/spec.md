# Session Specification

**Session ID**: `phase03-session06-gemini-routes-and-integration`
**Phase**: 03 - Deep Research Backend
**Status**: Not Started
**Created**: 2025-12-27

---

## 1. Session Overview

This session completes Phase 03 (Deep Research Backend) by creating the FastAPI routes that expose the GeminiService to frontend clients. The routes follow the async polling pattern required by Gemini's long-running deep research jobs, providing endpoints to start a job, poll for status, cancel a job, and synchronously wait for completion.

The session builds directly on Session 05 (GeminiService implementation) and mirrors the established patterns from Session 04 (Perplexity routes). All routes require JWT authentication via the CurrentUser dependency, use the GeminiDep for service injection, and leverage the existing Gemini schemas and exceptions infrastructure.

Successful completion of this session marks the end of Phase 03, enabling Phase 04 (Deep Research Frontend) to begin implementation of the user interface for Gemini deep research capabilities.

---

## 2. Objectives

1. Create all 4 Gemini FastAPI routes exposing the async polling workflow
2. Register the Gemini exception handler in the application for structured error responses
3. Register the Gemini router in the API router registry
4. Validate all Phase 03 components pass lint and type checks
5. Verify the application starts without errors

---

## 3. Prerequisites

### Required Sessions
- [x] `phase03-session01-configuration-and-environment` - GeminiSettings configured
- [x] `phase03-session02-perplexity-schemas-and-exceptions` - Exception handler pattern established
- [x] `phase03-session03-gemini-schemas-and-exceptions` - GeminiAPIError and schemas
- [x] `phase03-session04-perplexity-service-and-route` - Route pattern established
- [x] `phase03-session05-gemini-service-implementation` - GeminiService class

### Required Tools/Knowledge
- FastAPI route decorators and dependency injection
- Pydantic model validation for request/response
- Async/await patterns in Python

### Environment Requirements
- Python 3.11+ with project dependencies installed
- Valid Gemini API key in .env (optional for manual testing)

---

## 4. Scope

### In Scope (MVP)
- Create `backend/app/api/routes/gemini.py` with 4 routes:
  - POST `/api/v1/gemini/deep-research` (start research job)
  - GET `/api/v1/gemini/deep-research/{interaction_id}` (poll status)
  - DELETE `/api/v1/gemini/deep-research/{interaction_id}` (cancel research)
  - POST `/api/v1/gemini/deep-research/sync` (blocking wait for completion)
- Add `gemini_exception_handler` to `backend/app/main.py`
- Register gemini router in `backend/app/api/main.py`
- Lint validation (ruff check passes)
- Type check validation (mypy/pyright passes)
- Application startup verification

### Out of Scope (Deferred)
- Automated integration tests - *Reason: Can be added separately; manual validation sufficient for MVP*
- Frontend implementation - *Reason: Phase 04 scope*
- WebSocket/SSE streaming - *Reason: HTTP polling sufficient for MVP*

---

## 5. Technical Approach

### Architecture
The routes follow the existing REST API pattern with FastAPI. Each route handler receives dependencies via injection (CurrentUser for auth, GeminiDep for service) and delegates to GeminiService methods. The exception handler catches GeminiAPIError and converts it to a structured JSON response.

### Design Patterns
- **Dependency Injection**: GeminiDep provides service instance via factory function
- **Exception Handler**: Centralized error handling converts domain exceptions to HTTP responses
- **Router Registry**: Modular router registration enables clean separation of concerns

### Technology Stack
- FastAPI 0.115.x (route decorators, exception handlers)
- Pydantic 2.x (request/response validation)
- httpx (async HTTP client in GeminiService)

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `backend/app/api/routes/gemini.py` | FastAPI routes for Gemini deep research | ~120 |

### Files to Modify
| File | Changes | Est. Lines |
|------|---------|------------|
| `backend/app/main.py` | Add gemini_exception_handler import and registration | ~20 |
| `backend/app/api/main.py` | Add gemini router import and registration | ~2 |

---

## 7. Success Criteria

### Functional Requirements
- [ ] POST /api/v1/gemini/deep-research starts job and returns interaction_id
- [ ] GET /api/v1/gemini/deep-research/{id} returns current status and outputs
- [ ] GET /api/v1/gemini/deep-research/{id}?last_event_id=X supports reconnection
- [ ] DELETE /api/v1/gemini/deep-research/{id} cancels running jobs
- [ ] POST /api/v1/gemini/deep-research/sync blocks until completion
- [ ] All routes require JWT authentication (401 without token)
- [ ] GeminiAPIError handled and returns structured ErrorResponse

### Testing Requirements
- [ ] Manual endpoint testing via Swagger UI or curl
- [ ] Verify error responses match expected format

### Quality Gates
- [ ] All files ASCII-encoded
- [ ] Unix LF line endings
- [ ] Code follows project conventions (CONVENTIONS.md)
- [ ] No lint errors (ruff check backend/app/api/routes/gemini.py)
- [ ] No type errors in modified files
- [ ] Application starts successfully (`uvicorn app.main:app`)

---

## 8. Implementation Notes

### Key Considerations
- Follow exact patterns from `backend/app/api/routes/perplexity.py`
- Use `_current_user: CurrentUser` (prefixed underscore) since user is for auth only
- Use `Any` return type to allow FastAPI response model validation
- Poll endpoint needs `last_event_id: str | None = Query(default=None)` for reconnection
- Sync endpoint calls `wait_for_completion()` which may run for extended periods

### Potential Challenges
- **Long-running sync endpoint**: The sync route may take 20-60 minutes; ensure timeout settings are appropriate
- **Query parameter handling**: last_event_id must be properly passed to poll_research method
- **Route path collisions**: Ensure /sync route is defined before /{interaction_id} to avoid path matching issues

### ASCII Reminder
All output files must use ASCII-only characters (0-127).

---

## 9. Testing Strategy

### Unit Tests
- Not in scope for this session (deferred to separate testing session)

### Integration Tests
- Not in scope for this session

### Manual Testing
- Start application and access /docs Swagger UI
- Verify all 4 Gemini routes appear in API documentation
- Test authentication requirement (401 without valid token)
- Test error handling (invalid requests return proper error format)
- If Gemini API key available:
  - Start a research job via POST
  - Poll status via GET
  - Test cancellation via DELETE
  - Test sync endpoint with short query

### Edge Cases
- Missing authentication token (should return 401)
- Invalid interaction_id (should return 404 via exception handler)
- Empty query string (should fail Pydantic validation)

---

## 10. Dependencies

### External Libraries
- fastapi: 0.115.x
- pydantic: 2.x
- httpx: 0.27.x (used by GeminiService)

### Other Sessions
- **Depends on**: phase03-session05-gemini-service-implementation
- **Depended by**: Phase 04 frontend sessions (frontend can call these routes)

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
