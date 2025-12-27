# Session Specification

**Session ID**: `phase03-session03-gemini-schemas-and-exceptions`
**Phase**: 03 - Deep Research Backend
**Status**: Not Started
**Created**: 2025-12-27

---

## 1. Session Overview

This session implements all Pydantic schemas and custom exception classes for the Google Gemini Deep Research API async polling workflow. Unlike Perplexity's synchronous request/response pattern, Gemini uses an async workflow where clients submit a job, receive an interaction ID, and then poll for status updates and results.

The schemas defined here will support the complete Gemini integration lifecycle: initiating deep research jobs, polling for progress with streaming event types, and handling final results with usage tracking. This follows the established pattern from Session 02 (Perplexity schemas) but adapts it for Gemini's unique async polling model with additional status states and event types.

Completing this session unblocks Sessions 05 and 06 which implement the Gemini service layer and API routes respectively. The schemas and exceptions provide the foundation for type-safe request validation, response serialization, and structured error handling throughout the Gemini integration.

---

## 2. Objectives

1. Implement all Gemini-specific Pydantic enums for interaction status, stream events, and delta types
2. Create request schemas for job initiation and polling with proper validation
3. Create response schemas supporting both job creation and polling result formats
4. Implement GeminiAPIError exception class with factory methods covering async polling scenarios

---

## 3. Prerequisites

### Required Sessions
- [x] `phase03-session01-configuration-and-environment` - Gemini configuration settings
- [x] `phase03-session02-perplexity-schemas-and-exceptions` - Established schema/exception pattern

### Required Tools/Knowledge
- Pydantic v2 BaseModel and field validation patterns
- StrEnum usage for string-based enums
- Factory method pattern for exception classes
- Understanding of async polling workflow concepts

### Environment Requirements
- Python 3.11+ runtime
- Pydantic v2 installed (already in requirements.txt)

---

## 4. Scope

### In Scope (MVP)
- GeminiInteractionStatus enum (pending, running, completed, failed, cancelled)
- GeminiStreamEventType enum (thinking_update, research_update, final_result, error)
- GeminiDeltaType enum (text, tool_call, status)
- GeminiDeepResearchRequest schema with query, enable_thinking_summaries, file_search_store_names, previous_interaction_id
- GeminiDeepResearchPollRequest schema with interaction_id, last_event_id
- GeminiUsage, GeminiOutput, GeminiDeepResearchJobResponse, GeminiDeepResearchResultResponse schemas
- GeminiErrorCode enum and GeminiAPIError exception class with factory methods
- Export updates in __init__.py files

### Out of Scope (Deferred)
- Service implementation - *Reason: Session 05 scope*
- Route definitions - *Reason: Session 06 scope*
- Frontend components - *Reason: Future frontend phase*
- Streaming/SSE response handling - *Reason: Service layer concern*

---

## 5. Technical Approach

### Architecture
The schemas follow a layered structure mirroring the Perplexity implementation:
1. **Enums** define allowed values for status, event types, and delta types
2. **Nested models** handle reusable structures (usage, output)
3. **Request schemas** validate client input with strict mode
4. **Response schemas** serialize API responses with flexible parsing
5. **Exception class** provides structured error handling with factory methods

### Design Patterns
- **StrEnum**: Type-safe string enums compatible with JSON serialization
- **Factory Methods**: Create preconfigured exception instances for common error cases
- **ConfigDict**: Control serialization behavior (extra="forbid" for requests, extra="allow" for responses)
- **Field Descriptions**: Enable automatic OpenAPI documentation

### Technology Stack
- Python 3.11+
- Pydantic v2 (BaseModel, Field, ConfigDict, field_validator)
- enum.StrEnum for string enums

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `backend/app/schemas/gemini.py` | All Gemini request/response schemas and enums | ~250 |
| `backend/app/exceptions/gemini.py` | GeminiAPIError class with factory methods | ~180 |

### Files to Modify
| File | Changes | Est. Lines |
|------|---------|------------|
| `backend/app/schemas/__init__.py` | Add Gemini schema exports | ~25 |
| `backend/app/exceptions/__init__.py` | Add GeminiAPIError, GeminiErrorCode exports | ~5 |

---

## 7. Success Criteria

### Functional Requirements
- [ ] GeminiInteractionStatus enum contains: pending, running, completed, failed, cancelled
- [ ] GeminiStreamEventType enum contains: thinking_update, research_update, final_result, error
- [ ] GeminiDeltaType enum contains: text, tool_call, status
- [ ] GeminiDeepResearchRequest validates query (required) and optional parameters
- [ ] GeminiDeepResearchPollRequest validates interaction_id (required) and optional last_event_id
- [ ] GeminiDeepResearchJobResponse contains interaction_id, status, created_at
- [ ] GeminiDeepResearchResultResponse contains status, outputs, usage, completed_at
- [ ] GeminiErrorCode enum covers all error categories
- [ ] GeminiAPIError has all required factory methods

### Testing Requirements
- [ ] All schemas instantiate correctly with valid data
- [ ] Request schemas reject invalid/extra fields (extra="forbid")
- [ ] Response schemas accept additional fields gracefully (extra="allow")
- [ ] Exception factory methods return correctly configured instances

### Quality Gates
- [ ] All files ASCII-encoded (characters 0-127 only)
- [ ] Unix LF line endings
- [ ] No type errors from mypy
- [ ] No lint warnings from ruff
- [ ] Code follows project conventions (CONVENTIONS.md)
- [ ] Docstrings for all public classes and methods

---

## 8. Implementation Notes

### Key Considerations
- Follow exact pattern established in `perplexity.py` for consistency
- Use `StrEnum` not `str, Enum` per CONVENTIONS.md
- Request schemas use `ConfigDict(extra="forbid")` for strict validation
- Response schemas use `ConfigDict(extra="allow")` for API flexibility
- All Field() definitions must include `description` for OpenAPI docs

### Potential Challenges
- **More status states**: Gemini async workflow has 5 status states vs Perplexity's synchronous model. Must ensure enum values match actual API responses.
- **Poll reconnection**: last_event_id in poll request enables reconnection after disconnection. Must be optional with proper validation.
- **Dual response types**: Job creation returns minimal response, polling returns full result. May need separate response schemas or careful optional field handling.

### Error Factory Methods Required
Per PRD success criteria, implement these factory methods:
- `rate_limit_exceeded()` - 429
- `invalid_api_key()` - 401
- `request_timeout()` - 504
- `invalid_request()` - 400
- `research_failed()` - 500 (Gemini-specific: job failed)
- `interaction_not_found()` - 404 (Gemini-specific: invalid interaction_id)
- `max_polls_exceeded()` - 408 (Gemini-specific: polling limit reached)
- `polling_timeout()` - 504 (Gemini-specific: polling duration exceeded)
- `api_error()` - 500 (generic fallback)

### ASCII Reminder
All output files must use ASCII-only characters (0-127). Avoid smart quotes, em-dashes, and other unicode characters.

---

## 9. Testing Strategy

### Unit Tests
- Schema instantiation with valid data
- Schema rejection of invalid data types
- Enum value correctness
- Exception factory method return values

### Integration Tests
- Not applicable for this session (schemas/exceptions only)

### Manual Testing
- Import schemas in Python REPL and verify behavior
- Check mypy/ruff pass with no errors

### Edge Cases
- Empty optional fields (None handling)
- Extra fields in response data (should be allowed)
- Extra fields in request data (should raise ValidationError)
- Unicode in query strings (should be allowed)

---

## 10. Dependencies

### External Libraries
- pydantic: ^2.0.0 (already installed)

### Other Sessions
- **Depends on**: phase03-session01-configuration-and-environment (complete)
- **Depends on**: phase03-session02-perplexity-schemas-and-exceptions (pattern reference)
- **Depended by**: phase03-session05-gemini-service-implementation
- **Depended by**: phase03-session06-gemini-routes-and-integration

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
