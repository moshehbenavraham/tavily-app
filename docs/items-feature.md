# Items Feature

Generic CRUD management feature for user-owned items. Serves as a reference implementation for building similar features.

---

## Data Model

### Database Schema

```
Item (table=true)
├── id: UUID (primary key, auto-generated)
├── title: str (required, 1-255 chars)
├── description: str | None (optional, max 255 chars)
├── owner_id: UUID (foreign key → user.id, CASCADE delete)
└── owner: User (relationship)
```

### Pydantic Schemas

| Schema | Purpose | Fields |
|--------|---------|--------|
| `ItemBase` | Shared properties | title, description |
| `ItemCreate` | POST body | title (required), description |
| `ItemUpdate` | PUT body | title (optional), description (optional) |
| `ItemPublic` | Response | id, title, description, owner_id |
| `ItemsPublic` | List response | data (list), count (int) |

---

## API Endpoints

**Base:** `/api/v1/items`

| Method | Path | Description | Auth |
|--------|------|-------------|------|
| GET | `/` | List items (paginated) | Required |
| POST | `/` | Create item | Required |
| GET | `/{id}` | Get single item | Required |
| PUT | `/{id}` | Update item | Required |
| DELETE | `/{id}` | Delete item | Required |

### Permissions

- **Regular users:** Can only access/modify their own items
- **Superusers:** Can access/modify all items
- **Unauthorized access:** Returns 400 "Not enough permissions"

### Pagination

```
GET /api/v1/items/?skip=0&limit=100
```

- `skip`: Number of items to skip (default: 0)
- `limit`: Max items to return (default: 100)

---

## Frontend

### Route

- **Path:** `/items`
- **File:** `frontend/src/routes/_layout/items.tsx`

### UI Components

| Component | File | Purpose |
|-----------|------|---------|
| Items Page | `routes/_layout/items.tsx` | Main table view |
| AddItem | `components/Items/AddItem.tsx` | Create dialog |
| EditItem | `components/Items/EditItem.tsx` | Edit dialog |
| DeleteItem | `components/Items/DeleteItem.tsx` | Delete confirmation |
| ItemActionsMenu | `components/Items/ItemActionsMenu.tsx` | Row actions dropdown |
| columns | `components/Items/columns.tsx` | Table column definitions |
| PendingItems | `components/Pending/PendingItems.tsx` | Loading skeleton |

### Table Columns

1. **ID** - UUID with copy-to-clipboard button
2. **Title** - Item title (bold)
3. **Description** - Description or "No description" (gray)
4. **Actions** - Edit/Delete dropdown menu

### State Management

- Uses TanStack Query with key `["items"]`
- Auto-invalidates on create/update/delete mutations
- Toast notifications via Sonner

---

## File Structure

```
backend/
├── app/
│   ├── models.py          # Item, ItemCreate, ItemUpdate, ItemPublic, ItemsPublic
│   ├── crud.py            # create_item()
│   └── api/routes/items.py # CRUD endpoints
└── tests/api/routes/test_items.py

frontend/
├── src/
│   ├── routes/_layout/items.tsx
│   ├── components/Items/
│   │   ├── AddItem.tsx
│   │   ├── EditItem.tsx
│   │   ├── DeleteItem.tsx
│   │   ├── ItemActionsMenu.tsx
│   │   └── columns.tsx
│   └── components/Pending/PendingItems.tsx
```

---

## Database Operations

### Create

```python
item = Item.model_validate(item_in, update={"owner_id": current_user.id})
session.add(item)
session.commit()
session.refresh(item)
```

### Read (with ownership filter)

```python
# Regular user - only their items
statement = select(Item).where(Item.owner_id == current_user.id)

# Superuser - all items
statement = select(Item)
```

### Update

```python
update_dict = item_in.model_dump(exclude_unset=True)
item.sqlmodel_update(update_dict)
session.add(item)
session.commit()
```

### Delete

```python
session.delete(item)
session.commit()
```

---

## Extending This Pattern

To create a similar feature:

1. **Backend:**
   - Define models in `models.py` (Base, Create, Update, Public schemas)
   - Add CRUD functions in `crud.py`
   - Create router in `api/routes/`
   - Register router in `api/main.py`

2. **Frontend:**
   - Create page in `routes/_layout/`
   - Add components in `components/YourFeature/`
   - Add navigation item in `components/Sidebar/AppSidebar.tsx`

3. **Testing:**
   - Add tests in `tests/api/routes/`
