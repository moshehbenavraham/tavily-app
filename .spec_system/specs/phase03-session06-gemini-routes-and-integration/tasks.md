# Task Checklist

**Session ID**: `phase03-session06-gemini-routes-and-integration`
**Total Tasks**: 22
**Estimated Duration**: 7-9 hours
**Created**: 2025-12-27

---

## Legend

- `[x]` = Completed
- `[ ]` = Pending
- `[P]` = Parallelizable (can run with other [P] tasks)
- `[S0306]` = Session reference (Phase 03, Session 06)
- `TNNN` = Task ID

---

## Progress Summary

| Category | Total | Done | Remaining |
|----------|-------|------|-----------|
| Setup | 3 | 3 | 0 |
| Foundation | 5 | 5 | 0 |
| Implementation | 9 | 9 | 0 |
| Testing | 5 | 5 | 0 |
| **Total** | **22** | **22** | **0** |

---

## Setup (3 tasks)

Initial verification and preparation.

- [x] T001 [S0306] Verify GeminiService exists and methods are available (`backend/app/services/gemini.py`)
- [x] T002 [S0306] Verify GeminiDep is exported from deps module (`backend/app/api/deps.py`)
- [x] T003 [S0306] Verify Gemini schemas and exceptions are importable (`backend/app/schemas/gemini.py`, `backend/app/exceptions/gemini.py`)

---

## Foundation (5 tasks)

Route file creation and base structure.

- [x] T004 [S0306] Create gemini.py route file with module docstring and imports (`backend/app/api/routes/gemini.py`)
- [x] T005 [S0306] Define router with prefix "/gemini" and tags ["gemini"] (`backend/app/api/routes/gemini.py`)
- [x] T006 [S0306] Add GeminiAPIError import to main.py (`backend/app/main.py`)
- [x] T007 [S0306] Add gemini router import to api/main.py (`backend/app/api/main.py`)
- [x] T008 [S0306] Register gemini router with api_router.include_router (`backend/app/api/main.py`)

---

## Implementation (9 tasks)

Route handlers and exception handler implementation.

- [x] T009 [S0306] Implement POST /deep-research/sync route handler - define before path params (`backend/app/api/routes/gemini.py`)
- [x] T010 [S0306] Add docstring for sync route with Args/Returns/Raises (`backend/app/api/routes/gemini.py`)
- [x] T011 [S0306] Implement POST /deep-research route handler for starting jobs (`backend/app/api/routes/gemini.py`)
- [x] T012 [S0306] Add docstring for start job route with Args/Returns/Raises (`backend/app/api/routes/gemini.py`)
- [x] T013 [S0306] Implement GET /deep-research/{interaction_id} route handler with Query param (`backend/app/api/routes/gemini.py`)
- [x] T014 [S0306] Add docstring for poll route with Args/Returns/Raises (`backend/app/api/routes/gemini.py`)
- [x] T015 [S0306] Implement DELETE /deep-research/{interaction_id} route handler (`backend/app/api/routes/gemini.py`)
- [x] T016 [S0306] Add docstring for cancel route with Args/Returns/Raises (`backend/app/api/routes/gemini.py`)
- [x] T017 [S0306] Add gemini_exception_handler function to main.py following perplexity pattern (`backend/app/main.py`)

---

## Testing (5 tasks)

Verification and quality assurance.

- [x] T018 [S0306] Run ruff check on gemini.py route file (`backend/app/api/routes/gemini.py`)
- [x] T019 [S0306] Run ruff check on modified main.py and api/main.py files
- [x] T020 [S0306] Verify application starts without errors using uvicorn
- [x] T021 [S0306] Verify all 4 Gemini routes appear in Swagger UI at /docs
- [x] T022 [S0306] Validate ASCII encoding on all created/modified files

---

## Completion Checklist

Before marking session complete:

- [x] All tasks marked `[x]`
- [x] All lint checks passing (ruff check)
- [x] All files ASCII-encoded
- [x] Application starts successfully
- [x] Routes visible in Swagger UI
- [x] implementation-notes.md updated
- [x] Ready for `/validate`

---

## Notes

### Route Order Critical
The `/deep-research/sync` route MUST be defined BEFORE `/deep-research/{interaction_id}` to avoid path collision. FastAPI matches routes in definition order.

### Query Parameter Pattern
The poll route uses `Query(default=None)` for optional `last_event_id`:
```python
last_event_id: str | None = Query(default=None)
```

### Underscore Prefix Convention
Use `_current_user: CurrentUser` with underscore prefix since the user object is only for auth validation, not used in the handler body.

### Exception Handler Pattern
Follow the exact pattern from perplexity_exception_handler in main.py.

### Response Models
- Start job: `GeminiDeepResearchJobResponse`
- Poll status: `GeminiDeepResearchResultResponse`
- Sync wait: `GeminiDeepResearchResultResponse`
- Cancel: No response body (204 style, but return success message)

### GeminiService Methods
- `start_research(request)` - Start a new job
- `poll_research(interaction_id, last_event_id)` - Poll for status
- `wait_for_completion(interaction_id)` - Block until done
- `cancel_research(interaction_id)` - Cancel running job

---

## Next Steps

Run `/validate` to verify session completeness.
