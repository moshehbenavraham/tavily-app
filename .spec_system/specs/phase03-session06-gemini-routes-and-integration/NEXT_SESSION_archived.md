# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-27
**Project State**: Phase 03 - Deep Research Backend
**Completed Sessions**: 20

---

## Recommended Next Session

**Session ID**: `phase03-session06-gemini-routes-and-integration`
**Session Name**: Gemini Routes and Integration
**Estimated Duration**: 2-4 hours
**Estimated Tasks**: ~25

---

## Why This Session Next?

### Prerequisites Met
- [x] Session 05 complete (GeminiService implementation)
- [x] All previous Phase 03 sessions complete (01-05)
- [x] Understanding of existing route patterns (established in Phase 00-01)

### Dependencies
- **Builds on**: phase03-session05-gemini-service-implementation (GeminiService class)
- **Enables**: Phase 04 - Deep Research Frontend (frontend can call Gemini endpoints)

### Project Progression
This is the **final session of Phase 03** and completes the Deep Research Backend. All prerequisite services, schemas, and exceptions are implemented:
- PerplexitySettings and GeminiSettings configured (Session 01)
- Perplexity schemas and exceptions implemented (Session 02)
- Gemini schemas and exceptions implemented (Session 03)
- PerplexityService and route implemented (Session 04)
- GeminiService implemented (Session 05)

Session 06 creates the FastAPI routes to expose GeminiService, adds the exception handler, and performs final validation to ensure Phase 03 is complete.

---

## Session Overview

### Objective
Create all Gemini FastAPI routes, add exception handler, register router, and complete final integration and validation.

### Key Deliverables
1. `backend/app/api/routes/gemini.py` with all 4 routes:
   - POST /api/v1/gemini/deep-research (start research job)
   - GET /api/v1/gemini/deep-research/{interaction_id} (poll status)
   - DELETE /api/v1/gemini/deep-research/{interaction_id} (cancel research)
   - POST /api/v1/gemini/deep-research/sync (blocking wait)
2. Updated `backend/app/main.py` with gemini_exception_handler
3. Updated `backend/app/api/main.py` with gemini router registration
4. Verified lint and type checks pass
5. Verified application starts without errors

### Scope Summary
- **In Scope (MVP)**: Gemini routes, exception handler, router registration, lint/type validation, startup verification
- **Out of Scope**: Automated integration tests, frontend implementation (Phase 04)

---

## Technical Considerations

### Technologies/Patterns
- FastAPI route decorators with proper typing
- Pydantic models for request/response validation
- JWT authentication via CurrentUser dependency
- Exception handler pattern (matches Perplexity handler from Session 04)
- Router registration pattern (matches existing routers)

### Potential Challenges
- Ensuring all 4 route signatures correctly map to GeminiService methods
- Handling optional last_event_id query parameter for reconnection support
- Proper async/await patterns for long-polling sync endpoint

### Implementation Notes
- Follow existing route patterns from `backend/app/api/routes/perplexity.py`
- Use GeminiDep for dependency injection
- All routes require CurrentUser authentication
- Exception handler returns structured ErrorResponse

---

## Alternative Sessions

If this session is blocked:
1. **None** - This is the only remaining session in Phase 03
2. **Phase 04 prep** - Could start scaffolding Phase 04 sessions with `/phasebuild` while waiting

---

## Next Steps

Run `/sessionspec` to generate the formal specification.
