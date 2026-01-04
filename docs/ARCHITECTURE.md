# Architecture

## System Overview

ai-search is a full-stack application that integrates multiple AI-powered research APIs:
- **Tavily** - Web search, extraction, crawling, and sitemap generation
- **Perplexity Sonar** - Synchronous deep research with citations
- **Google Gemini** - Asynchronous deep research with polling

The FastAPI backend provides authenticated REST endpoints, while the React frontend offers a user interface for all research operations.

## Dependency Graph

```
                        +-------------------+
                        |   React Frontend  |
                        |   (TanStack Query)|
                        +---------+---------+
                                  |
                                  | HTTP/REST
                                  v
+------------------+    +---------+---------+    +------------------+
|   PostgreSQL     |<---|   FastAPI Backend |<---|   Tavily API     |
|   (User/Items)   |    |   (JWT Auth)      |    |   (AI Search)    |
+------------------+    +---+-----+-----+---+    +------------------+
                            |     |     |
              +-------------+     |     +-------------+
              v                   v                   v
    +------------------+  +------------------+  +------------------+
    |  Perplexity API  |  |   Gemini API     |  |   External       |
    |  (Sync Research) |  |  (Async Research)|  |   Websites       |
    +------------------+  +------------------+  +------------------+
```

## Components

### Backend (`/backend`)

#### Services

| Service | File | Pattern | Purpose |
|---------|------|---------|---------|
| TavilyService | `app/services/tavily.py` | SDK wrapper | Search, extract, crawl, map |
| PerplexityService | `app/services/perplexity.py` | HTTP client | Synchronous deep research |
| GeminiService | `app/services/gemini.py` | HTTP client | Async research with polling |

#### Routes

| Router | File | Endpoints |
|--------|------|-----------|
| Tavily | `app/api/routes/tavily.py` | search, extract, crawl, map |
| Perplexity | `app/api/routes/perplexity.py` | deep-research |
| Gemini | `app/api/routes/gemini.py` | deep-research (start, poll, cancel, sync) |

#### Schemas

| Module | Purpose |
|--------|---------|
| `app/schemas/tavily.py` | Tavily request/response models |
| `app/schemas/perplexity.py` | Perplexity deep research models |
| `app/schemas/gemini.py` | Gemini job and result models |

#### Exceptions

| Exception | File | Handles |
|-----------|------|---------|
| TavilyAPIError | `app/core/exceptions.py` | SDK errors, rate limits |
| PerplexityAPIError | `app/core/exceptions.py` | HTTP errors, auth, timeouts |
| GeminiAPIError | `app/core/exceptions.py` | Polling errors, job failures |

### Frontend (`/frontend`)

#### Routes

| Route | File | Purpose |
|-------|------|---------|
| `/search` | `search.tsx` | Tavily web search |
| `/extract` | `extract.tsx` | URL content extraction |
| `/crawl` | `crawl.tsx` | Website crawling |
| `/map` | `map.tsx` | Sitemap generation |
| `/perplexity-research` | `perplexity-research.tsx` | Perplexity deep research |
| `/gemini-research` | `gemini-research.tsx` | Gemini deep research |

#### Component Groups

| Group | Directory | Components |
|-------|-----------|------------|
| Tavily | `src/components/Tavily/` | Forms, ResultCards for search/extract/crawl/map |
| Perplexity | `src/components/Perplexity/` | DeepResearchForm, ResultView, CitationsList |
| Gemini | `src/components/Gemini/` | DeepResearchForm, ResultView, ProgressIndicator |
| Items | `src/components/Items/` | ContentTypeBadge, ContentTypeFilter |

#### Hooks

| Hook | File | Purpose |
|------|------|---------|
| useSaveToItems | `hooks/useSaveToItems.ts` | Save results to Items |
| usePerplexityDeepResearch | `hooks/usePerplexityDeepResearch.ts` | Mutation for Perplexity |
| useGeminiDeepResearch | `hooks/useGeminiDeepResearch.ts` | Start, poll, cancel Gemini jobs |

## Tech Stack Rationale

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| FastAPI | Backend framework | Async support, automatic OpenAPI |
| tavily-python | Tavily SDK | Official SDK with async client |
| httpx | HTTP client | Async support for Perplexity/Gemini |
| Pydantic | Validation | Native FastAPI integration |
| SQLModel | ORM | SQLAlchemy + Pydantic unified models |
| React 19 | Frontend | Modern hooks, concurrent features |
| TanStack Query | Data fetching | Caching, polling, optimistic UI |
| TanStack Router | Routing | Type-safe, file-based |
| shadcn/ui | Components | Accessible, customizable |

## Data Flow

### Tavily Search Flow

```
1. User submits search form
2. TanStack Query mutation calls /api/v1/tavily/search
3. FastAPI validates via SearchRequest schema
4. CurrentUser dependency verifies JWT
5. TavilyService.search() calls AsyncTavilyClient
6. Response validated, cached, UI updated
```

### Perplexity Research Flow (Synchronous)

```
1. User submits research query
2. useMutation calls /api/v1/perplexity/deep-research
3. PerplexityService sends POST to Perplexity API
4. Waits for response (up to 300s timeout)
5. Returns report with citations
6. Frontend displays markdown with source links
```

### Gemini Research Flow (Asynchronous)

```
1. User submits research query
2. useGeminiStartResearch calls /api/v1/gemini/deep-research
3. GeminiService starts background job, returns interaction_id
4. Frontend starts polling via useGeminiPollResearch
5. TanStack Query refetches at 10s intervals
6. GeminiService polls Gemini API for status
7. On completion, returns final report
8. Frontend displays results, stops polling
```

### Save to Items Flow

```
1. User clicks Save button on result
2. Mapper function converts result to ItemCreate
3. useSaveToItems mutation calls /api/v1/items
4. Backend stores in PostgreSQL with content_type
5. Items page displays with type badge filter
```

## Error Handling

### Backend Exception Flow

```
1. API raises exception (rate limit, auth, timeout)
2. Service _handle_error() maps to typed exception
3. Exception handler returns structured JSON:
   { "error_code": "...", "message": "...", "details": {...} }
4. Frontend displays toast via Sonner
```

### Error Codes

| API | Error Codes |
|-----|-------------|
| Tavily | RATE_LIMIT_EXCEEDED, INVALID_API_KEY, REQUEST_TIMEOUT |
| Perplexity | RATE_LIMIT_EXCEEDED, INVALID_API_KEY, CONTENT_FILTER |
| Gemini | MAX_POLLS_EXCEEDED, RESEARCH_FAILED, INTERACTION_NOT_FOUND |

## Key Decisions

### Why httpx for Perplexity/Gemini
- Official SDKs not available or incomplete
- Full control over request/response handling
- Consistent async pattern with existing code

### Why Async Polling for Gemini
- Deep research can take 20-60 minutes
- Long-polling prevents connection timeouts
- Enables progress tracking and cancellation

### Why Content Type on Items
- Unified storage for all research results
- Enables filtering and type-specific display
- Preserves metadata (citations, usage, etc.)

See [Architecture Decision Records](adr/) for detailed decision history.
