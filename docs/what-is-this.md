# Tavily App: A Full-Stack Application Built in Two Afternoons

## The Experiment

What happens when you combine a structured planning system with AI-assisted development? This project is the answer: a production-ready full-stack application built in **two afternoons** using the **Apex Spec System**—a custom Claude Code plugin designed to guide AI through complex, multi-phase software projects.

## What We Built

A complete **Tavily AI Search Platform** featuring:

- **4 Core Operations**: Web Search, Content Extraction, Website Crawling, and URL Mapping
- **Full Authentication**: JWT-based auth with user management
- **Results Persistence**: Save any search result with rich metadata
- **Professional UI**: Modern React interface with dark mode, loading states, and responsive design

### Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | FastAPI (Python 3.12, async) |
| Frontend | React 19, TypeScript, TanStack Router/Query |
| Database | PostgreSQL with SQLModel ORM |
| UI | shadcn/ui (Radix + Tailwind CSS) |
| Validation | Pydantic (backend) + Zod (frontend) |
| Testing | pytest with comprehensive mocking |

## The Numbers

| Metric | Value |
|--------|-------|
| Development Time | 2 afternoons |
| Planning Sessions | 15 |
| Development Phases | 3 |
| Backend Test Coverage | 27KB+ of test code |
| API Endpoints | 20+ |
| React Components | 40+ |
| Lines of Code | ~15,000+ |

## Key Accomplishments

### 1. Production-Ready Architecture

This isn't a prototype—it's built with patterns you'd use in production:

- **Service Layer Pattern**: `TavilyService` encapsulates all SDK interactions with proper async support
- **Dependency Injection**: Testable, decoupled components via FastAPI's DI system
- **Comprehensive Error Handling**: Rate limits (429), auth failures (401), timeouts (504), validation errors (400)—all mapped to structured JSON responses
- **Database Migrations**: Alembic versioning for safe schema evolution

### 2. End-to-End Type Safety

Zero type gaps from database to UI:

```
SQLModel (DB) → Pydantic (API) → OpenAPI Spec → Generated TypeScript Client → Zod (Forms)
```

Every layer validates. Every type flows through. No `any` escape hatches.

### 3. Comprehensive Validation

The Pydantic schemas include:
- Domain normalization (case-insensitive filtering)
- URL scheme validation (must be http/https)
- Unicode surrogate pair removal (UTF-8 encoding safety)
- Strict mode (`extra="forbid"`) to reject unknown fields

### 4. Modern Frontend Patterns

- **TanStack Query**: Server state management with cache invalidation
- **TanStack Router**: File-based routing with type-safe params
- **React Hook Form + Zod**: Declarative form validation
- **Custom Hooks**: `useTavilySearch()`, `useSaveToItems()`, `useExtract()`, etc.
- **Result Mappers**: Clean transformation from API responses to unified Item format

### 5. Testing Culture

The backend includes:
- Mock response factories for all 4 Tavily operations
- Unit tests with fully mocked services
- Integration test markers for real API validation
- Error scenario coverage (rate limits, invalid keys, timeouts, partial failures)

### 6. Developer Experience

- Hot reload on both frontend and backend
- Auto-generated API client from OpenAPI spec
- Docker Compose for full-stack local development
- Pre-commit hooks (Ruff, Biome, mypy)

## The Secret: Apex Spec System

The real innovation isn't the app—it's **how** it was built.

The **Apex Spec System** is a Claude Code plugin that structures AI-assisted development into:

- **Phases**: Major feature groups (Core Setup → Frontend Integration → Saving Results)
- **Sessions**: Focused implementation units with clear scope
- **Specifications**: Detailed requirements per session
- **Task Checklists**: 15-30 actionable items per session
- **Validation Criteria**: Acceptance tests before moving forward
- **State Tracking**: JSON-based progress across the entire project

### Project Structure

```
.spec_system/
├── PRD/PRD.md              # Master requirements document
├── specs/                   # 15 session specifications
│   ├── phase00-session01-*/
│   ├── phase01-session05-*/
│   └── phase02-session03-*/
├── audit/                   # Code quality reports
└── state.json              # Progress tracking
```

### What This Proves

When AI has:
1. **Clear scope** (what to build this session)
2. **Explicit constraints** (what NOT to touch)
3. **Traceable progress** (what's done, what's next)
4. **Quality gates** (validation before proceeding)

...it can produce coherent, architecturally-sound code across multiple sessions without drift.

## Phase Breakdown

### Phase 0: Core Backend Setup (6 sessions)
- Tavily SDK integration with async client
- Pydantic schemas for all operations
- Service layer implementation
- Error handling framework
- API routes (search, extract, crawl, map)
- Comprehensive test suite

### Phase 1: Frontend Integration (6 sessions)
- OpenAPI client generation
- Search page with forms, results, detail modals
- Extract page with batch URL support
- Crawl page with depth/breadth controls
- Map page with URL discovery
- UI polish and navigation

### Phase 2: Saving Results (3 sessions)
- Extended Item model (source_url, content, content_type, metadata)
- Database migration
- Save functionality with `useSaveToItems()` hook
- Result mapping functions
- Items page enhancements (filtering, badges, preview)

## Why This Matters

### For Developers
This demonstrates that AI-assisted development can scale beyond single-file scripts to real applications—if you structure the process correctly.

### For Teams
The spec system creates artifacts (specs, task lists, validation criteria) that could enable asynchronous AI-assisted development with human review gates.

### For AI Tooling
This is a proof-of-concept for **agentic software development**: AI following a plan, maintaining context across sessions, and producing coherent output over time.

## Try It Yourself

```bash
# Clone and setup
git clone <repo>
cd tavily-app

# Backend
cd backend && uv sync && source .venv/bin/activate
cp .env.example .env  # Add your TAVILY_API_KEY
fastapi dev app/main.py

# Frontend (new terminal)
cd frontend && npm install && npm run dev

# Or use Docker
docker compose up -d
```

## What's Next

This project validates the approach. Future possibilities:

- **Open-source the Apex Spec System** as a standalone Claude Code plugin
- **Multi-agent workflows**: Separate agents for planning, implementation, review
- **Automated validation**: Run tests as quality gates between sessions
- **Project templates**: Pre-built specs for common application types

---

**Built with Claude Code + Apex Spec System**

*Two afternoons. Fifteen sessions. One production app.*
