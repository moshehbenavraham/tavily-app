# Considerations

> Institutional memory for AI assistants. Updated between phases via /carryforward.
> **Line budget**: 600 max | **Last updated**: Phase 03 (2025-12-27)

---

## Active Concerns

Items requiring attention in upcoming phases. Review before each session.

### Technical Debt

- [P03] **Test infrastructure unavailable**: Backend tests (89 total) require database connection. Tests skip when DB not available. Need docker-compose or test database setup before CI integration.

- [P01] **No frontend tests**: Playwright test infrastructure exists but no test files written. Frontend lacks automated testing coverage.

### External Dependencies

- [P03] **Perplexity API latency**: Deep research queries take 30-60 seconds; timeout configured at 300s. Frontend must implement loading states for long operations.

- [P03] **Gemini polling duration**: Research jobs can run up to 60 minutes (typical ~20 min). Frontend needs progress indicators and reconnection support via last_event_id.

- [P03] **API rate limits**: Both Perplexity and Gemini have rate limits. 429 handling implemented in exception classes but frontend should provide user feedback.

### Performance / Security

- [P00] **JWT authentication required**: All API routes require CurrentUser authentication. Ensure frontend properly handles auth token refresh and expiration.

### Architecture

- [P03] **Sync vs async API patterns**: Perplexity uses synchronous POST, Gemini uses async polling. Frontend must handle both patterns differently.

- [P02] **Item model extended**: Item model now supports multiple source_types (search, extract, crawl, map). New types (perplexity, gemini) may need to be added for deep research results.

---

## Lessons Learned

Proven patterns and anti-patterns. Reference during implementation.

### What Worked

- [P00] **Service layer pattern**: TavilyService established the pattern - class with settings injection, private helper methods (_build_headers, _build_payload, _parse_response, _handle_error), and public async methods. Follow this pattern for all API integrations.

- [P00] **Dependency injection via deps.py**: Factory functions (get_tavily_service) and type aliases (TavilyDep) enable clean route dependencies. Pattern used consistently across Tavily, Perplexity, and Gemini services.

- [P00] **Exception factory methods**: Custom exception classes with static factory methods (e.g., `PerplexityAPIError.rate_limit_exceeded()`) provide clean, consistent error creation with appropriate error codes and messages.

- [P01] **TanStack Router + Query**: File-based routing with TanStack Router and data fetching with TanStack Query provide excellent DX. Use queryOptions pattern for reusable query configurations.

- [P01] **React Hook Form + Zod**: Form handling with react-hook-form and schema validation with zod provides type-safe form handling with good UX.

- [P01] **shadcn/ui components**: Copy-paste component library integrates well with Tailwind. Use for consistent UI without heavy dependencies.

- [P02] **Enum for type safety**: StrEnum classes for API options (models, modes, agents) provide type safety and autocomplete. Use for any fixed set of string values.

- [P03] **Async polling pattern**: GeminiService.wait_for_completion() with configurable poll_interval and max_attempts handles long-running jobs gracefully. Polling loop checks terminal status before returning.

- [P03] **Exception handlers in main.py**: Registering exception handlers (`@app.exception_handler(PerplexityAPIError)`) ensures all API errors return structured ErrorResponse. Add handler for each custom exception class.

- [P03] **Separate schemas from exceptions**: Keeping schemas (perplexity.py, gemini.py) and exceptions (perplexity.py, gemini.py) in separate modules with proper __init__.py exports maintains clean organization.

- [P03] **Progressive session structure**: Config -> Schemas -> Service -> Routes progression ensures each session builds on validated previous work. Dependencies are always satisfied.

### What to Avoid

- [P00] **Avoid monolithic service files**: Split complex services into focused modules. Keep services under 300 lines when possible.

- [P01] **Don't duplicate API logic**: Use shared apiClient with interceptors for auth headers, error handling. Don't repeat fetch configuration across pages.

- [P02] **Avoid nullable fields without defaults**: Pydantic schemas should use `Optional[Type] = None` pattern. Don't use `Optional[Type]` without default value assignment.

- [P03] **Don't hardcode timeouts**: Use settings classes with environment variable overrides. Deep research timeouts vary by use case; make configurable.

### Tool/Library Notes

- [P00] **httpx AsyncClient**: Use for all async HTTP calls. Create client per-request to avoid connection pool issues. Configure timeout per operation type.

- [P00] **ruff + mypy**: ruff for linting and formatting, mypy for type checking. Run both before committing. ruff auto-fixes most issues.

- [P01] **biome**: Replaced eslint/prettier for frontend. Single tool for linting and formatting TypeScript/React code.

- [P03] **Pydantic v2 StrEnum**: Use `StrEnum` from standard library with Pydantic for enum validation. Values serialize to strings in JSON.

---

## Resolved

Recently closed items (buffer - rotates out after 2 phases).

| Phase | Item | Resolution |
|-------|------|------------|
| P03 | Perplexity/Gemini backend integration | Fully implemented with services, routes, and exception handling |
| P02 | Item model needs source type flexibility | Extended Item model with source_type enum and relevant_data JSON field |
| P01 | Frontend architecture decisions | Settled on TanStack Router/Query, React Hook Form, shadcn/ui stack |
| P00 | Backend API structure | Established service layer pattern with FastAPI routes and deps.py injection |

---

*Auto-generated by /carryforward. Manual edits allowed but may be overwritten.*
