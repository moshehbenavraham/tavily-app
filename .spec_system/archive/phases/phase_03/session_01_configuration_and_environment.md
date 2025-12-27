# Session 01: Configuration and Environment

**Session ID**: `phase03-session01-configuration-and-environment`
**Status**: Not Started
**Estimated Tasks**: ~20
**Estimated Duration**: 2-3 hours

---

## Objective

Establish core configuration infrastructure for Perplexity and Gemini APIs including settings classes, environment variables, and base dependencies.

---

## Scope

### In Scope (MVP)
- Create PerplexitySettings class with api_key, timeout (300s), default_model, search_mode, reasoning_effort
- Create GeminiSettings class with api_key, timeout (120s), poll_interval (10s), max_poll_attempts (360), agent
- Update .env.example with PERPLEXITY_* and GEMINI_* environment variables
- Add settings instances to core/config.py
- Create base httpx client configuration utilities
- Validate settings are loaded correctly at application startup

### Out of Scope
- Service layer implementation (Session 04-05)
- Route definitions (Session 04, 06)
- Pydantic request/response schemas (Session 02-03)

---

## Prerequisites

- [ ] Phase 02 complete
- [ ] Understanding of existing Settings pattern in backend/app/core/config.py
- [ ] Review of Perplexity and Gemini API authentication requirements

---

## Deliverables

1. `backend/app/core/config.py` updated with PerplexitySettings and GeminiSettings
2. `.env.example` updated with new environment variables
3. Settings validation on startup
4. Base httpx client configuration (timeouts, headers)

---

## Success Criteria

- [ ] PerplexitySettings loads api_key from PERPLEXITY_API_KEY env var
- [ ] GeminiSettings loads api_key from GEMINI_API_KEY env var
- [ ] All default values correctly applied when env vars not set
- [ ] Settings accessible via app.core.config.settings
- [ ] .env.example documents all new variables with descriptions
- [ ] No type errors or lint warnings
- [ ] Application starts successfully with new settings
