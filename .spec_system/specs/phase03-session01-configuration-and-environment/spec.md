# Session Specification

**Session ID**: `phase03-session01-configuration-and-environment`
**Phase**: 03 - Deep Research Backend
**Status**: Not Started
**Created**: 2025-12-27

---

## 1. Session Overview

This session establishes the foundational configuration infrastructure for Phase 03's deep research capabilities. It introduces settings classes for two new external APIs: Perplexity Sonar (for AI-powered deep research with citations) and Google Gemini (for long-running research tasks with polling).

The configuration layer is intentionally isolated from service and route implementations to ensure a clean separation of concerns. By establishing environment variables, settings validation, and HTTP client utilities first, all subsequent Phase 03 sessions can build upon a stable foundation without configuration-related blockers.

This session follows the same pattern established in Phase 00 Session 01, where TavilySettings was created before any Tavily service or route work could begin. The PerplexitySettings and GeminiSettings classes will mirror this proven pattern, integrating seamlessly with the existing Settings model.

---

## 2. Objectives

1. Create `PerplexitySettings` class following the established `TavilySettings` pattern with API key, timeout, model defaults, and search mode configuration
2. Create `GeminiSettings` class with API key, timeout, polling configuration (interval, max attempts), and agent selection
3. Update `.env.example` with all new environment variables and descriptive comments
4. Validate that settings load correctly and application starts without errors

---

## 3. Prerequisites

### Required Sessions
- [x] `phase02-session03-items-page-enhancements` - Phase 02 complete

### Required Tools/Knowledge
- Understanding of `pydantic-settings` BaseSettings pattern
- Perplexity Sonar API authentication requirements (Bearer token)
- Google Gemini API authentication requirements (API key)
- Python StrEnum for type-safe enum constants

### Environment Requirements
- Python 3.11+ development environment
- Access to Perplexity and Gemini API documentation (for reference)

---

## 4. Scope

### In Scope (MVP)
- `PerplexitySettings` class with: api_key, timeout (300s), default_model, search_mode, reasoning_effort
- `GeminiSettings` class with: api_key, timeout (120s), poll_interval (10s), max_poll_attempts (360), agent
- StrEnum classes for Perplexity models, search modes, and reasoning effort levels
- StrEnum classes for Gemini agent selection
- Updated `.env.example` with PERPLEXITY_* and GEMINI_* variables
- Settings nested in main `Settings` class following `tavily` pattern
- Base httpx client configuration utilities (timeout, headers helpers)

### Out of Scope (Deferred)
- Perplexity service implementation - *Reason: Session 04 scope*
- Gemini service implementation - *Reason: Session 05 scope*
- Pydantic request/response schemas - *Reason: Sessions 02-03 scope*
- Route definitions - *Reason: Sessions 04, 06 scope*
- Unit tests for settings - *Reason: Startup validation is sufficient for config*

---

## 5. Technical Approach

### Architecture
The settings classes will be added to `backend/app/core/config.py` following the existing `TavilySettings` nested model pattern. Each API gets its own settings class with:
- `model_config` using `SettingsConfigDict` with appropriate `env_prefix`
- Type-hinted fields with sensible defaults
- StrEnum types for constrained string values

A new utility module `backend/app/core/http_utils.py` will provide reusable httpx configuration helpers for timeout and header construction, avoiding duplication across future service implementations.

### Design Patterns
- **Nested Settings Model**: Settings classes nested in main Settings via `Field(default_factory=...)` for lazy initialization
- **StrEnum for Constants**: Type-safe string enums for API options (models, modes, agents)
- **Factory Functions**: Utility functions to construct httpx clients with consistent configuration

### Technology Stack
- pydantic-settings 2.x for environment variable management
- Python 3.11+ StrEnum for type-safe enumerations
- httpx for async HTTP client (utilities only, not full client)

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `backend/app/core/http_utils.py` | Reusable httpx timeout/header utilities | ~40 |

### Files to Modify
| File | Changes | Est. Lines Changed |
|------|---------|------------|
| `backend/app/core/config.py` | Add PerplexitySettings, GeminiSettings, StrEnums, nest in Settings | ~80 |
| `.env.example` | Add PERPLEXITY_* and GEMINI_* environment variables | ~15 |

---

## 7. Success Criteria

### Functional Requirements
- [ ] `PerplexitySettings` loads `api_key` from `PERPLEXITY_API_KEY` environment variable
- [ ] `PerplexitySettings` provides defaults: timeout=300, default_model="sonar-pro", search_mode="auto", reasoning_effort="medium"
- [ ] `GeminiSettings` loads `api_key` from `GEMINI_API_KEY` environment variable
- [ ] `GeminiSettings` provides defaults: timeout=120, poll_interval=10, max_poll_attempts=360, agent="default"
- [ ] Settings accessible via `settings.perplexity` and `settings.gemini`
- [ ] Application starts successfully with missing API keys (optional keys)

### Testing Requirements
- [ ] Manual startup test with new settings
- [ ] Verify settings values via debugger or print statements

### Quality Gates
- [ ] All files ASCII-encoded (no unicode characters)
- [ ] Unix LF line endings
- [ ] Code follows project conventions (CONVENTIONS.md)
- [ ] No type errors from mypy
- [ ] No lint warnings from ruff
- [ ] StrEnum used instead of (str, Enum)

---

## 8. Implementation Notes

### Key Considerations
- API keys should be optional (not required at startup) to allow development without credentials
- Default timeouts chosen based on API characteristics: Perplexity (300s for deep research), Gemini (120s per poll request)
- Gemini polling config: 10s interval x 360 attempts = 1 hour max wait time
- StrEnum values should match API documentation exactly (lowercase with hyphens for Perplexity models)

### Potential Challenges
- **Optional API Keys**: Pydantic Settings requires careful handling of optional fields; use `str | None = None` pattern
- **Enum Value Consistency**: Ensure StrEnum values match what the actual APIs expect (verify against docs)
- **Import Ordering**: New StrEnum imports need to be at top of file before Settings class

### Conventions to Apply
- Classes: `PascalCase` (PerplexitySettings, GeminiSettings, PerplexityModel)
- Variables: `snake_case` (api_key, poll_interval, max_poll_attempts)
- Constants in StrEnum: `UPPER_SNAKE_CASE` values but lowercase string representations
- Use `Field()` with descriptions for all settings fields

### ASCII Reminder
All output files must use ASCII-only characters (0-127). No smart quotes, em dashes, or special symbols.

---

## 9. Testing Strategy

### Unit Tests
- Not required for this session; settings validation at startup is sufficient

### Integration Tests
- Not required for this session

### Manual Testing
- Start application with no PERPLEXITY_API_KEY or GEMINI_API_KEY set; verify startup succeeds
- Start application with valid keys set; verify settings load correctly
- Import settings in Python REPL and verify default values

### Edge Cases
- Empty string API keys should be treated as None/unset
- Verify timeout values are integers, not strings
- Verify StrEnum fields reject invalid values

---

## 10. Dependencies

### External Libraries
- pydantic-settings: 2.x (already installed)
- httpx: 0.27.x (already installed)

### Other Sessions
- **Depends on**: Phase 02 complete (no code dependencies, just project progression)
- **Depended by**: All Phase 03 sessions (02-06) require configuration to be in place

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
