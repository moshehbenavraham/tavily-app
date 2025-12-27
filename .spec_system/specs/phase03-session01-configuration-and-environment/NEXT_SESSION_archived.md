# NEXT_SESSION.md

## Session Recommendation

**Generated**: 2025-12-27
**Project State**: Phase 03 - Deep Research Backend
**Completed Sessions**: 15

---

## Recommended Next Session

**Session ID**: `phase03-session01-configuration-and-environment`
**Session Name**: Configuration and Environment
**Estimated Duration**: 2-3 hours
**Estimated Tasks**: ~20

---

## Why This Session Next?

### Prerequisites Met
- [x] Phase 02 complete (all 3 sessions)
- [x] Existing Settings pattern available in backend/app/core/config.py
- [x] Perplexity and Gemini API documentation reviewed (PRD contains requirements)

### Dependencies
- **Builds on**: Phase 02 completion (Items saving functionality)
- **Enables**: All subsequent Phase 03 sessions (02-06 depend on configuration)

### Project Progression
This is the foundational session for Phase 03. It establishes the configuration infrastructure that all Perplexity and Gemini integrations will use. Without the settings classes and environment variables, no service or route implementation can proceed. This follows the same pattern as Phase 00 Session 01, which established Tavily configuration before other work could begin.

---

## Session Overview

### Objective
Establish core configuration infrastructure for Perplexity and Gemini APIs including settings classes, environment variables, and base dependencies.

### Key Deliverables
1. `PerplexitySettings` class with api_key, timeout (300s), default_model, search_mode, reasoning_effort
2. `GeminiSettings` class with api_key, timeout (120s), poll_interval (10s), max_poll_attempts (360), agent
3. Updated `.env.example` with PERPLEXITY_* and GEMINI_* environment variables
4. Settings validation on application startup
5. Base httpx client configuration utilities (timeouts, headers)

### Scope Summary
- **In Scope (MVP)**: Settings classes, environment variables, startup validation, httpx utilities
- **Out of Scope**: Service layer, route definitions, Pydantic request/response schemas

---

## Technical Considerations

### Technologies/Patterns
- Pydantic Settings (existing pattern in backend/app/core/config.py)
- httpx async client configuration
- Environment variable management
- Python StrEnum for type-safe constants

### Potential Challenges
- Ensuring API key validation doesn't block startup when keys aren't needed
- Balancing between strict validation and development flexibility
- Maintaining consistency with existing TavilySettings pattern

### Relevant Considerations
No CONSIDERATIONS.md exists yet for this project.

---

## Alternative Sessions

If this session is blocked:
1. **None available** - Session 01 is required before all other Phase 03 sessions
2. **Phase 04 planning** - Could run `/phasebuild` for Phase 04 frontend sessions (not recommended - complete backend first)

---

## Next Steps

Run `/sessionspec` to generate the formal specification.
