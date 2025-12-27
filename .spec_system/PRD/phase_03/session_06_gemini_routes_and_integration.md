# Session 06: Gemini Routes and Integration

**Session ID**: `phase03-session06-gemini-routes-and-integration`
**Status**: Not Started
**Estimated Tasks**: ~25
**Estimated Duration**: 2-4 hours

---

## Objective

Create all Gemini FastAPI routes, add exception handler, register router, and complete final integration and validation.

---

## Scope

### In Scope (MVP)
- Create backend/app/api/routes/gemini.py with all routes:
  - POST /api/v1/gemini/deep-research (start research job, returns interaction_id)
  - GET /api/v1/gemini/deep-research/{interaction_id} (poll status with optional last_event_id query param)
  - DELETE /api/v1/gemini/deep-research/{interaction_id} (cancel research)
  - POST /api/v1/gemini/deep-research/sync (blocking wait for completion)
- All routes require CurrentUser authentication
- Add gemini_exception_handler to backend/app/main.py
- Register gemini router in backend/app/api/main.py
- Final validation of all Phase 03 components:
  - Lint check (ruff)
  - Type check (mypy/pyright)
  - Application startup verification
  - Manual endpoint testing (if API keys available)

### Out of Scope
- Automated integration tests (can be added separately)
- Frontend implementation (Phase 04)

---

## Prerequisites

- [ ] Session 05 complete (GeminiService implementation)
- [ ] All previous sessions complete (01-05)
- [ ] Understanding of existing route patterns
- [ ] Valid Gemini API key for testing (optional but recommended)

---

## Deliverables

1. `backend/app/api/routes/gemini.py` with all 4 routes
2. Updated `backend/app/main.py` with gemini_exception_handler
3. Updated `backend/app/api/main.py` with gemini router registration
4. Verified lint and type checks pass
5. Verified application starts without errors

---

## Success Criteria

- [ ] POST /api/v1/gemini/deep-research starts job and returns interaction_id
- [ ] GET /api/v1/gemini/deep-research/{id} returns current status and outputs
- [ ] GET /api/v1/gemini/deep-research/{id}?last_event_id=X supports reconnection
- [ ] DELETE /api/v1/gemini/deep-research/{id} cancels running jobs
- [ ] POST /api/v1/gemini/deep-research/sync blocks until completion
- [ ] All routes require JWT authentication
- [ ] GeminiAPIError handled and returns structured ErrorResponse
- [ ] Router registered at /api/v1/gemini prefix
- [ ] No lint errors (ruff check passes)
- [ ] No type errors (type check passes)
- [ ] Application starts successfully
- [ ] All Phase 03 success criteria from PRD satisfied
