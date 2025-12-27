# Task Checklist

**Session ID**: `phase03-session01-configuration-and-environment`
**Total Tasks**: 20
**Estimated Duration**: 6-8 hours
**Created**: 2025-12-27

---

## Legend

- `[x]` = Completed
- `[ ]` = Pending
- `[P]` = Parallelizable (can run with other [P] tasks)
- `[S0301]` = Session reference (Phase 03, Session 01)
- `TNNN` = Task ID

---

## Progress Summary

| Category | Total | Done | Remaining |
|----------|-------|------|-----------|
| Setup | 3 | 3 | 0 |
| Foundation | 6 | 6 | 0 |
| Implementation | 7 | 7 | 0 |
| Testing | 4 | 4 | 0 |
| **Total** | **20** | **20** | **0** |

---

## Setup (3 tasks)

Initial configuration and environment preparation.

- [x] T001 [S0301] Verify pydantic-settings and httpx are installed in backend dependencies
- [x] T002 [S0301] Review TavilySettings pattern in `backend/app/core/config.py` for reference
- [x] T003 [S0301] Verify Python 3.11+ for StrEnum support

---

## Foundation (6 tasks)

Core structures and base implementations.

- [x] T004 [S0301] [P] Create PerplexityModel StrEnum with model values (`backend/app/core/config.py`)
- [x] T005 [S0301] [P] Create PerplexitySearchMode StrEnum with search mode values (`backend/app/core/config.py`)
- [x] T006 [S0301] [P] Create PerplexityReasoningEffort StrEnum with effort levels (`backend/app/core/config.py`)
- [x] T007 [S0301] [P] Create GeminiAgent StrEnum with agent selection values (`backend/app/core/config.py`)
- [x] T008 [S0301] Create `backend/app/core/http_utils.py` with timeout utilities
- [x] T009 [S0301] Add header builder helper function to http_utils.py (`backend/app/core/http_utils.py`)

---

## Implementation (7 tasks)

Main feature implementation.

- [x] T010 [S0301] Create PerplexitySettings class with model_config (`backend/app/core/config.py`)
- [x] T011 [S0301] Add api_key field to PerplexitySettings (optional, str | None) (`backend/app/core/config.py`)
- [x] T012 [S0301] Add timeout, default_model, search_mode, reasoning_effort to PerplexitySettings (`backend/app/core/config.py`)
- [x] T013 [S0301] Create GeminiSettings class with model_config (`backend/app/core/config.py`)
- [x] T014 [S0301] Add api_key, timeout, poll_interval, max_poll_attempts, agent to GeminiSettings (`backend/app/core/config.py`)
- [x] T015 [S0301] Nest PerplexitySettings and GeminiSettings in main Settings class (`backend/app/core/config.py`)
- [x] T016 [S0301] Update `.env.example` with PERPLEXITY_* and GEMINI_* variables (`.env.example`)

---

## Testing (4 tasks)

Verification and quality assurance.

- [x] T017 [S0301] Run ruff check on modified files and fix any lint warnings
- [x] T018 [S0301] Run mypy on modified files and fix any type errors
- [x] T019 [S0301] Manual startup test - verify application starts without API keys
- [x] T020 [S0301] Verify settings accessible via settings.perplexity and settings.gemini

---

## Completion Checklist

Before marking session complete:

- [x] All tasks marked `[x]`
- [x] All files ASCII-encoded
- [x] No ruff lint warnings
- [x] No mypy type errors
- [x] Application starts successfully
- [x] implementation-notes.md updated
- [x] Ready for `/validate`

---

## Notes

### Parallelization
Tasks T004-T007 (StrEnum creation) can be worked on simultaneously as they are independent definitions.

### Task Timing
Target ~20-25 minutes per task.

### Dependencies
- T004-T007 must complete before T010-T014 (enums used by settings)
- T010-T014 must complete before T015 (nesting in main Settings)
- T015 must complete before T019-T020 (manual testing)

### Key Files
- Primary: `backend/app/core/config.py` (~80 lines added)
- New: `backend/app/core/http_utils.py` (~40 lines)
- Config: `.env.example` (~15 lines added)

### StrEnum Values Reference
**PerplexityModel**: sonar, sonar-pro, sonar-reasoning, sonar-reasoning-pro
**PerplexitySearchMode**: auto, news, academic, social
**PerplexityReasoningEffort**: low, medium, high
**GeminiAgent**: default (extensible for future agents)

---

## Next Steps

Run `/validate` to verify session completeness.
