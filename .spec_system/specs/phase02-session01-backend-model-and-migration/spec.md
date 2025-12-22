# Session Specification

**Session ID**: `phase02-session01-backend-model-and-migration`
**Phase**: 02 - Saving Results to Items
**Status**: Not Started
**Created**: 2025-12-22

---

## 1. Session Overview

This session extends the Item database model to support storing Tavily search, extract, crawl, and map results. Currently, Items only have `title` and `description` fields. After this session, Items will be able to store rich content from any Tavily operation, including the source URL, full content text, content type classification, and arbitrary metadata.

This is the foundational session for Phase 02, enabling the subsequent sessions to build save functionality (Session 02) and enhance the Items page display (Session 03). Without these model changes, there would be no backend support for storing Tavily results - making this the critical path for the entire phase.

The work involves SQLModel schema modifications, Alembic migration generation/application, Pydantic schema updates for API validation, and frontend TypeScript client regeneration to ensure type safety across the full stack.

---

## 2. Objectives

1. Extend the Item SQLModel with four new optional fields: `source_url`, `content`, `content_type`, and `metadata`
2. Create and apply an Alembic migration that adds these columns without data loss to existing Items
3. Update all Pydantic schemas (ItemBase, ItemCreate, ItemUpdate, ItemPublic) to include the new fields
4. Regenerate the frontend API client with updated TypeScript types reflecting the schema changes

---

## 3. Prerequisites

### Required Sessions
- [x] `phase00-session01` through `phase00-session06` - Backend API complete
- [x] `phase01-session01` through `phase01-session06` - All Tavily pages functional

### Required Tools/Knowledge
- SQLModel/SQLAlchemy for database models
- Alembic for migrations
- Python type annotations (Union types, Literal)
- OpenAPI client generation tooling

### Environment Requirements
- Backend Python environment with all dependencies installed
- PostgreSQL database accessible and current migrations applied
- Frontend Node.js environment for client regeneration
- Backend server must be running for OpenAPI spec generation

---

## 4. Scope

### In Scope (MVP)
- Add `source_url` field (String, max 2048 chars, nullable) to Item model
- Add `content` field (Text type, unlimited length, nullable) to Item model
- Add `content_type` field (String, max 50 chars, nullable) to Item model
- Add `metadata` field (JSON type, nullable) to Item model
- Create Alembic migration for the four new columns
- Apply migration with zero data loss for existing Items
- Update ItemBase with new optional fields
- Update ItemCreate with new optional fields
- Update ItemUpdate with new optional fields
- Update ItemPublic with new fields
- Add ContentType literal type for validation
- Regenerate frontend TypeScript client
- Verify existing Item CRUD operations still work

### Out of Scope (Deferred)
- Frontend Save buttons - *Reason: Session 02 scope*
- Items page UI changes - *Reason: Session 03 scope*
- Content validation beyond basic types - *Reason: Keep session focused*
- Full-text search on content field - *Reason: Performance optimization, future phase*
- Content compression/optimization - *Reason: Premature optimization*

---

## 5. Technical Approach

### Architecture
The Item model in `backend/app/models.py` will be extended with four new fields using SQLModel's Field configuration. The fields are designed to be nullable to maintain backward compatibility with existing Items and to allow partial saves (not all Tavily operations populate all fields).

The `content` field uses SQLAlchemy's `Text` type for unlimited length storage, while `metadata` uses the `JSON` type for flexible structured data. The `content_type` field is constrained via a Pydantic Literal type for validation while remaining a simple string in the database.

### Design Patterns
- **Nullable by default**: All new fields are nullable to ensure backward compatibility
- **Literal types for validation**: ContentType uses Literal for compile-time and runtime validation
- **Schema inheritance**: ItemBase defines shared fields, ItemCreate/Update/Public inherit appropriately

### Technology Stack
- SQLModel 0.0.22+ (SQLAlchemy 2.x integration)
- Alembic for database migrations
- Pydantic v2 for schema validation
- openapi-ts for frontend client generation

---

## 6. Deliverables

### Files to Modify
| File | Changes | Est. Lines Changed |
|------|---------|-------------------|
| `backend/app/models.py` | Add 4 fields to ItemBase, Item; add ContentType Literal | ~25 |
| `backend/app/api/routes/items.py` | No changes needed (schemas handle new fields) | 0 |

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `backend/app/alembic/versions/xxx_add_item_content_fields.py` | Migration for new columns | ~35 |

### Files to Regenerate
| File | Purpose |
|------|---------|
| `frontend/src/client/types.gen.ts` | Updated TypeScript types |
| `frontend/src/client/sdk.gen.ts` | Updated service methods |
| `frontend/src/client/schemas.gen.ts` | Updated schemas |

---

## 7. Success Criteria

### Functional Requirements
- [ ] Item model has `source_url: str | None` field (max 2048 chars)
- [ ] Item model has `content: str | None` field (Text type, unlimited)
- [ ] Item model has `content_type: str | None` field (max 50 chars)
- [ ] Item model has `metadata: dict | None` field (JSON type)
- [ ] Alembic migration creates all four columns as nullable
- [ ] Existing Items in database are preserved (no data loss)
- [ ] New Item can be created with all content fields via API
- [ ] New Item can be created with null content fields via API
- [ ] GET /items returns Items with new fields (null for legacy items)
- [ ] PUT /items/{id} can update content fields
- [ ] ContentType literal restricts to: "search", "extract", "crawl", "map"

### Testing Requirements
- [ ] Existing backend tests pass without modification
- [ ] Manual API test: Create item with content fields
- [ ] Manual API test: Create item without content fields (backward compat)
- [ ] Manual API test: Update existing item to add content fields
- [ ] Frontend TypeScript compilation succeeds

### Quality Gates
- [ ] All Python files pass ruff/mypy checks
- [ ] All TypeScript files pass biome lint
- [ ] OpenAPI spec reflects new fields
- [ ] Migration is reversible (downgrade tested)
- [ ] No runtime warnings in backend logs

---

## 8. Implementation Notes

### Key Considerations
- The `metadata` field name may conflict with Pydantic's internal `metadata` - use `model_config` if needed
- SQLAlchemy JSON type behavior varies by database - PostgreSQL uses native JSONB
- Frontend client regeneration requires backend server running to fetch OpenAPI spec
- ContentType should be `str | None` in the database but validated as Literal in Pydantic

### Potential Challenges
- **JSON field typing**: SQLModel's JSON support may require explicit `sa_type` annotation
- **Metadata field name**: May need aliasing if Pydantic complains about reserved name
- **Large content storage**: Text field has no length limit, but need to consider API response size
- **Migration timing**: Must run migration before testing new fields

### ASCII Reminder
All output files must use ASCII-only characters (0-127). No Unicode characters in code comments or strings.

---

## 9. Testing Strategy

### Unit Tests
- No new unit tests required (existing CRUD tests cover the model)
- Verify existing tests pass with schema changes

### Integration Tests
- Create Item with all four new fields populated
- Create Item with only title/description (legacy format)
- Update existing Item to add content fields
- Verify null fields serialize correctly in API responses

### Manual Testing
1. Start backend server with new migration applied
2. Use Swagger UI to create Item with content fields
3. Verify Item appears in GET /items with all fields
4. Verify legacy Items show null for new fields
5. Check frontend TypeScript types include new fields

### Edge Cases
- Empty string vs null for source_url
- Empty dict `{}` vs null for metadata
- Very long content (>100KB) for content field
- Invalid content_type value rejected by API

---

## 10. Dependencies

### External Libraries
- SQLModel: existing (provides Text, JSON types)
- Alembic: existing (migration generation)
- openapi-ts: existing (client generation)

### Internal Dependencies
- `backend/app/models.py`: Item, ItemBase, ItemCreate, ItemUpdate, ItemPublic
- `backend/app/api/routes/items.py`: CRUD endpoints (no changes needed)
- `frontend/src/client/`: Generated client files

### Other Sessions
- **Depends on**: Phase 00 and Phase 01 (all complete)
- **Depended by**:
  - `phase02-session02-frontend-hooks-and-save-buttons` (needs new Item types)
  - `phase02-session03-items-page-enhancements` (needs content_type for filtering)

---

## Implementation Order

1. Update `backend/app/models.py` with new fields and ContentType
2. Generate Alembic migration
3. Review and apply migration
4. Start backend server and verify OpenAPI spec
5. Regenerate frontend client
6. Verify TypeScript compilation
7. Run existing tests
8. Manual API testing

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
