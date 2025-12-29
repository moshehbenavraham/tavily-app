# Considerations

> Institutional memory for AI assistants. Updated between phases via /carryforward.
> **Line budget**: 600 max | **Last updated**: Phase 04 (2025-12-28)

---

## Active Concerns

Items requiring attention in upcoming phases. Review before each session.

### Technical Debt

- [P03] **Test infrastructure unavailable**: Backend tests (89 total) require database connection. Tests skip when DB not available. Need docker-compose or test database setup before CI integration.

- [P01] **No frontend tests**: Playwright test infrastructure exists but no test files written. Frontend lacks automated testing coverage.

### External Dependencies

- [P03] **API rate limits**: Perplexity and Gemini have rate limits. 429 handling implemented in exception classes. Frontend provides toast feedback but could add retry mechanisms.

### Performance / Security

- [P00] **JWT authentication required**: All API routes require CurrentUser authentication. Ensure frontend properly handles auth token refresh and expiration.

### Architecture

- [P04] **Large response rendering**: Deep research reports can be extensive (Gemini especially). Consider virtualization or pagination for very long markdown content.

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

- [P04] **Frontend polling with refetchInterval**: TanStack Query's refetchInterval with enabled flag provides clean polling. Set `enabled: !!interactionId && !isTerminal` to auto-stop on completion.

- [P04] **Terminal status detection pattern**: Define `isTerminalStatus(status)` helper that checks for COMPLETED, FAILED, CANCELLED. Use in both polling logic and UI state.

- [P04] **Mapper functions for save integration**: Create dedicated functions like `mapPerplexityToItem()` and `mapGeminiToItem()` to transform API responses into Item format. Keeps save logic clean and testable.

- [P04] **SDK client regeneration workflow**: Use `npx openapi-typescript-codegen` after backend changes. Generates typed client from OpenAPI spec automatically.

- [P04] **Content type extension pattern**: When adding new types (perplexity, gemini), update: enum definitions, badge variants, filter dropdowns, and type-specific rendering in one coordinated change.

- [P04] **State machine pattern for async workflows**: Define explicit states (idle, polling, completed, failed, cancelled) for complex async operations. Separates UI state from data state, prevents race conditions during polling.

- [P04] **Query tracking via callback props**: Use onQuerySubmit callback to flow form data to result components without prop drilling. Maintains backward compatibility while enabling save functionality.

- [P04] **Elapsed time counter with cleanup**: Use useEffect with setInterval for real-time feedback during long API calls. Always return cleanup function to clear interval on unmount or state change.

### What to Avoid

- [P00] **Avoid monolithic service files**: Split complex services into focused modules. Keep services under 300 lines when possible.

- [P01] **Don't duplicate API logic**: Use shared apiClient with interceptors for auth headers, error handling. Don't repeat fetch configuration across pages.

- [P02] **Avoid nullable fields without defaults**: Pydantic schemas should use `Optional[Type] = None` pattern. Don't use `Optional[Type]` without default value assignment.

- [P03] **Don't hardcode timeouts**: Use settings classes with environment variable overrides. Deep research timeouts vary by use case; make configurable.

- [P04] **Avoid polling without terminal detection**: Always define when polling should stop. Infinite polling wastes resources and causes poor UX.

### Tool/Library Notes

- [P00] **httpx AsyncClient**: Use for all async HTTP calls. Create client per-request to avoid connection pool issues. Configure timeout per operation type.

- [P00] **ruff + mypy**: ruff for linting and formatting, mypy for type checking. Run both before committing. ruff auto-fixes most issues.

- [P01] **biome**: Replaced eslint/prettier for frontend. Single tool for linting and formatting TypeScript/React code.

- [P03] **Pydantic v2 StrEnum**: Use `StrEnum` from standard library with Pydantic for enum validation. Values serialize to strings in JSON.

- [P04] **react-markdown**: Used for rendering deep research reports. Supports GFM with remark-gfm plugin. Handles citations and formatting well.

---

## Resolved

Recently closed items (buffer - rotates out after 2 phases).

| Phase | Item | Resolution |
|-------|------|------------|
| P04 | Perplexity API latency handling | Loading states with elapsed time indicators implemented |
| P04 | Gemini polling duration | Progress indicators and reconnection via last_event_id implemented |
| P04 | Sync vs async API patterns | Frontend handles both - Perplexity as mutation, Gemini as start/poll/cancel |
| P04 | Item model for deep research | Added 'perplexity' and 'gemini' content_type values with proper save integration |
| P03 | Perplexity/Gemini backend integration | Fully implemented with services, routes, and exception handling |

---

*Auto-generated by /carryforward. Manual edits allowed but may be overwritten.*
