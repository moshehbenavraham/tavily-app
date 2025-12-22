# Session 01: Backend Model and Migration

**Session ID**: `phase02-session01-backend-model-and-migration`
**Status**: Not Started
**Estimated Tasks**: ~20
**Estimated Duration**: 2-3 hours

---

## Objective

Extend the Item database model with new fields for storing Tavily results (source_url, content, content_type, metadata), create and apply the Alembic migration, update Pydantic schemas, and regenerate the frontend API client.

---

## Scope

### In Scope (MVP)

- Add source_url field (String, max 2048 chars, nullable) to Item model
- Add content field (Text, unlimited length, nullable) to Item model
- Add content_type field (String, max 50 chars, nullable) to Item model
- Add metadata field (JSON, nullable) to Item model
- Create Alembic migration for new fields
- Apply migration and verify no data loss for existing Items
- Update ItemBase, ItemCreate, ItemUpdate, ItemPublic Pydantic schemas
- Add ContentType literal type ("search" | "extract" | "crawl" | "map")
- Update ItemsPublic response schema if needed
- Regenerate frontend API client from updated OpenAPI spec
- Verify frontend TypeScript types include new fields
- Test that existing Item CRUD operations still work

### Out of Scope

- Frontend UI changes (Session 02)
- Items page enhancements (Session 03)
- Content validation beyond field types
- Full-text search on content field
- Content compression or optimization

---

## Prerequisites

- [ ] Phase 01 complete - all Tavily pages functional
- [ ] Backend development environment ready
- [ ] Database accessible and current migrations applied
- [ ] Frontend development environment ready for client regeneration

---

## Deliverables

1. **Updated Item Model** (`backend/app/models.py`)
   - Four new optional fields: source_url, content, content_type, metadata

2. **Alembic Migration** (`backend/app/alembic/versions/xxx_add_item_content_fields.py`)
   - Add columns with nullable=True
   - No default values required

3. **Updated Pydantic Schemas** (`backend/app/api/schemas/item.py` or equivalent)
   - ItemBase with new optional fields
   - ItemCreate with new optional fields
   - ItemUpdate with new optional fields
   - ItemPublic with new fields
   - ContentType literal type

4. **Regenerated Frontend Client** (`frontend/src/client/`)
   - Updated types reflecting new Item fields
   - Updated API service methods

5. **Verification Tests**
   - Existing Item tests pass
   - New Item with content fields can be created
   - Null content fields are valid

---

## Technical Details

### Item Model Changes

```python
# New fields in Item model
source_url: str | None = Field(default=None, max_length=2048)
content: str | None = Field(default=None, sa_type=Text)
content_type: str | None = Field(default=None, max_length=50)
metadata: dict | None = Field(default=None, sa_type=JSON)
```

### Schema Changes

```python
from typing import Literal

ContentType = Literal["search", "extract", "crawl", "map"]

class ItemBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    description: str | None = Field(default=None, max_length=255)
    source_url: str | None = Field(default=None, max_length=2048)
    content: str | None = Field(default=None)
    content_type: ContentType | None = Field(default=None)
    metadata: dict | None = Field(default=None)
```

### Migration Command

```bash
cd backend
alembic revision --autogenerate -m "Add content fields to Item model"
alembic upgrade head
```

### Client Regeneration

```bash
cd frontend
npm run generate-client
```

---

## Success Criteria

- [ ] Item model has source_url, content, content_type, metadata fields
- [ ] Alembic migration created and applied successfully
- [ ] Existing Items table data preserved (no data loss)
- [ ] Pydantic schemas updated with new optional fields
- [ ] OpenAPI spec reflects new fields
- [ ] Frontend client regenerated with new types
- [ ] TypeScript compilation succeeds
- [ ] Existing Item CRUD tests pass
- [ ] New Item with content fields can be created via API
- [ ] No lint errors or type check failures in backend or frontend
