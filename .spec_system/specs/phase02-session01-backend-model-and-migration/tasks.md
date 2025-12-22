# Task Checklist

**Session ID**: `phase02-session01-backend-model-and-migration`
**Total Tasks**: 22
**Estimated Duration**: 7-9 hours
**Created**: 2025-12-22

---

## Legend

- `[x]` = Completed
- `[ ]` = Pending
- `[P]` = Parallelizable (can run with other [P] tasks)
- `[S0201]` = Session reference (Phase 02, Session 01)
- `TNNN` = Task ID

---

## Progress Summary

| Category | Total | Done | Remaining |
|----------|-------|------|-----------|
| Setup | 3 | 3 | 0 |
| Foundation | 5 | 5 | 0 |
| Implementation | 6 | 6 | 0 |
| Testing | 8 | 8 | 0 |
| **Total** | **22** | **22** | **0** |

---

## Setup (3 tasks)

Initial configuration and environment verification.

- [x] T001 [S0201] Verify backend Python environment and dependencies installed
- [x] T002 [S0201] Verify PostgreSQL database accessible with current migrations applied
- [x] T003 [S0201] Verify frontend Node.js environment ready for client regeneration

---

## Foundation (5 tasks)

Core type definitions and model infrastructure.

- [x] T004 [S0201] Add required imports to models.py (Text, JSON from sqlalchemy, Literal from typing)
- [x] T005 [S0201] Define ContentType Literal type for "search", "extract", "crawl", "map" (`backend/app/models.py`)
- [x] T006 [S0201] Add source_url field to ItemBase (str | None, max 2048 chars) (`backend/app/models.py`)
- [x] T007 [S0201] Add content field to ItemBase (str | None, Text type) (`backend/app/models.py`)
- [x] T008 [S0201] [P] Add content_type field to ItemBase (ContentType | None, max 50 chars) (`backend/app/models.py`)

---

## Implementation (6 tasks)

Migration creation and schema updates.

- [x] T009 [S0201] Add metadata field to ItemBase (dict | None, JSON type) with sa_type annotation (`backend/app/models.py`) - named `item_metadata` to avoid Pydantic conflict
- [x] T010 [S0201] Update Item model to inherit new fields with proper SQLAlchemy column types (`backend/app/models.py`) - inherits from ItemBase
- [x] T011 [S0201] Update ItemCreate schema to include new optional fields (`backend/app/models.py`) - inherits from ItemBase
- [x] T012 [S0201] Update ItemUpdate schema to include new optional fields (`backend/app/models.py`) - inherits from ItemBase
- [x] T013 [S0201] Update ItemPublic schema to include new fields for API responses (`backend/app/models.py`) - inherits from ItemBase
- [x] T014 [S0201] Generate Alembic migration for new Item columns (`backend/app/alembic/versions/4ac9cd0948d7_add_item_content_fields.py`)

---

## Testing (8 tasks)

Verification, migration application, and quality assurance.

- [x] T015 [S0201] Review generated migration file for correctness (nullable columns, proper types)
- [x] T016 [S0201] Apply Alembic migration to database (alembic upgrade head)
- [x] T017 [S0201] Verify migration reversibility (alembic downgrade then upgrade)
- [x] T018 [S0201] Start backend server and verify OpenAPI spec includes new fields
- [x] T019 [S0201] Regenerate frontend TypeScript client from OpenAPI spec
- [x] T020 [S0201] Verify frontend TypeScript compilation succeeds with new types
- [x] T021 [S0201] Run existing backend test suite and verify all tests pass (89 tests, 90% coverage)
- [x] T022 [S0201] [P] Manual API testing via curl (create item with/without content fields, update, verify responses, validation)

---

## Completion Checklist

Before marking session complete:

- [x] All tasks marked `[x]`
- [x] All backend tests passing (89 tests, 90% coverage)
- [x] All frontend TypeScript compiles (build successful)
- [x] Migration applied and reversible
- [x] OpenAPI spec reflects new fields
- [x] implementation-notes.md updated
- [x] Ready for `/validate`

---

## Notes

### Parallelization
Tasks marked `[P]` can be worked on simultaneously. T008 can be done in parallel with T006/T007. T022 can run alongside verification tasks.

### Task Timing
Target ~20-25 minutes per task.

### Dependencies
- T004-T005 must complete before T006-T013 (imports and types needed)
- T006-T013 must complete before T014 (model complete before migration)
- T014 must complete before T015-T017 (migration file needed)
- T016 must complete before T018-T22 (database updated before testing)

### Key Technical Notes
- `metadata` field may require aliasing if Pydantic conflicts - watch for warnings
- Use `sa_type=JSON` for the metadata field in SQLModel
- Use `sa_type=Text` for the content field to ensure unlimited length
- ContentType validation happens at Pydantic level, stored as plain string in DB
- Backend server must be running for frontend client regeneration

### Quality Gates
- All Python files must pass ruff linting
- All TypeScript files must pass biome lint
- No runtime warnings in backend logs
- All files ASCII-encoded (0-127 characters only)

---

## Next Steps

Run `/implement` to begin AI-led implementation.
