# Session Specification

**Session ID**: `phase01-session04-extract-page`
**Phase**: 01 - Frontend Integration
**Status**: Not Started
**Created**: 2025-12-21

---

## 1. Session Overview

This session implements the complete Extract page for the Tavily application, enabling users to extract clean content from one or more web pages. The Extract feature is a core Tavily capability that retrieves structured text content from URLs, useful for content analysis, research, and data gathering.

The implementation follows the established patterns from the Search page (Sessions 02-03), including React Hook Form with Zod validation, TanStack Query mutations, shadcn/ui components, and proper loading/error state handling. A key differentiator is batch URL support, allowing users to submit multiple URLs in a single request.

This session transforms the placeholder Extract route into a fully functional page with form input, results display, and graceful handling of partial successes (where some URLs extract successfully while others fail).

---

## 2. Objectives

1. Create ExtractForm component with URL input supporting single and batch (comma/newline separated) extraction
2. Implement useExtract mutation hook following useTavilySearch pattern
3. Build ExtractResultCard component to display extracted content with metadata
4. Integrate all components into the Extract route with loading, empty, and error states

---

## 3. Prerequisites

### Required Sessions
- [x] `phase01-session01-api-client-and-navigation` - Provides TavilyService.extract method and ExtractRequest/ExtractResponse types
- [x] `phase01-session02-search-form-and-query` - Establishes form validation and mutation hook patterns
- [x] `phase01-session03-search-results-display` - Establishes result card and loading state patterns

### Required Tools/Knowledge
- React Hook Form with Zod resolver
- TanStack Query useMutation
- shadcn/ui form and card components
- URL validation patterns

### Environment Requirements
- Frontend development server running (`npm run dev`)
- Backend API running with Tavily endpoints
- Valid Tavily API key configured

---

## 4. Scope

### In Scope (MVP)
- ExtractForm component with textarea for URL input
- Single URL extraction
- Batch URL extraction (comma-separated, newline-separated, or mixed)
- URL format validation using Zod
- useExtract mutation hook with error handling
- ExtractResultCard component showing URL, status, and content
- ExtractSkeleton loading component
- ExtractEmptyState component
- Partial success handling (display both successful and failed extractions)
- Error toasts for API failures
- Integration with existing route structure

### Out of Scope (Deferred)
- File upload for URL lists - *Reason: Additional complexity, not in MVP*
- Export extracted content - *Reason: Phase 02 feature*
- Content highlighting or search within extracted text - *Reason: Polish feature*
- Pagination for very long extracted content - *Reason: Edge case optimization*

---

## 5. Technical Approach

### Architecture

```
ExtractPage (route)
  |-- ExtractForm (form component)
  |     |-- Textarea for URLs
  |     |-- Submit button with loading state
  |     |-- Zod validation (URL format)
  |
  |-- ExtractSkeleton (loading state)
  |-- ExtractEmptyState (no results state)
  |-- ExtractResultsList (results container)
        |-- ExtractResultCard[] (individual results)
              |-- Success: URL, content preview, expand option
              |-- Failure: URL, error message
```

### Design Patterns
- **Container/Presentational**: ExtractPage manages state, child components are presentational
- **Controlled Form**: React Hook Form manages form state with Zod validation
- **Mutation Pattern**: TanStack Query useMutation for POST requests with loading/error states
- **Partial Success Display**: Separate rendering for successful results vs failed URLs

### Technology Stack
- React 19 with TypeScript
- TanStack Query v5 for mutations
- React Hook Form with @hookform/resolvers/zod
- Zod for schema validation
- shadcn/ui components (Card, Button, Textarea, Form, Badge)
- Lucide React for icons
- Sonner for toast notifications

---

## 6. Deliverables

### Files to Create
| File | Purpose | Est. Lines |
|------|---------|------------|
| `frontend/src/hooks/useExtract.ts` | TanStack Query mutation hook | ~30 |
| `frontend/src/components/Tavily/ExtractForm.tsx` | URL input form with validation | ~120 |
| `frontend/src/components/Tavily/ExtractResultCard.tsx` | Individual extraction result display | ~100 |
| `frontend/src/components/Tavily/ExtractResultsList.tsx` | Results container with success/failure sections | ~60 |
| `frontend/src/components/Tavily/ExtractSkeleton.tsx` | Loading skeleton component | ~30 |
| `frontend/src/components/Tavily/ExtractEmptyState.tsx` | Empty state component | ~25 |
| `frontend/src/lib/schemas/extract.ts` | Zod schema and form types | ~40 |

### Files to Modify
| File | Changes | Est. Lines |
|------|---------|------------|
| `frontend/src/routes/_layout/extract.tsx` | Replace placeholder with full implementation | ~80 |

---

## 7. Success Criteria

### Functional Requirements
- [ ] Single URL extraction works correctly
- [ ] Batch URL extraction (multiple URLs) works correctly
- [ ] Invalid URLs show validation errors before submission
- [ ] Empty URL input shows validation error
- [ ] Extracted content displays URL source and text content
- [ ] Partial failures handled gracefully (show which succeeded/failed)
- [ ] Loading skeleton shown during extraction
- [ ] Error toasts shown on API failures
- [ ] Extracted content is scrollable for long text

### Testing Requirements
- [ ] Manual testing of single URL extraction
- [ ] Manual testing of batch URL extraction (2+ URLs)
- [ ] Manual testing of mixed success/failure results
- [ ] Manual testing of validation errors
- [ ] Manual testing of API error handling

### Quality Gates
- [ ] All files use ASCII-only characters (0-127)
- [ ] Unix LF line endings
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] No ESLint warnings (`npm run lint`)
- [ ] Code follows existing project patterns

---

## 8. Implementation Notes

### Key Considerations
- URL parsing must handle multiple formats: comma-separated, newline-separated, and mixed
- Tavily extract API returns `results` array (successes) and `failed_results` array (failures)
- Content can be very long - provide expand/collapse or scrollable area
- Empty URL strings after parsing should be filtered out

### Potential Challenges
- **URL Validation**: Must validate each URL individually in batch mode; Zod custom refinement needed
- **Content Truncation**: Extracted content can be thousands of characters; need readable preview with expand
- **Partial Success UX**: Clear visual distinction between successful and failed extractions

### ASCII Reminder
All output files must use ASCII-only characters (0-127). Avoid smart quotes, em-dashes, or other Unicode characters.

---

## 9. Testing Strategy

### Unit Tests
- Not required for MVP (Session 06 covers testing polish)

### Integration Tests
- Not required for MVP

### Manual Testing
1. Submit single valid URL - verify extraction displays
2. Submit multiple URLs (comma-separated) - verify all extract
3. Submit multiple URLs (newline-separated) - verify all extract
4. Submit mix of valid/invalid URLs - verify partial success display
5. Submit invalid URL format - verify validation error
6. Submit empty form - verify validation error
7. Trigger API error (e.g., network disconnect) - verify error toast
8. Verify loading skeleton appears during extraction
9. Test with very long extracted content - verify scrollable/expandable

### Edge Cases
- URL with query parameters and fragments
- URL without protocol (should fail validation or auto-prepend https://)
- Duplicate URLs in batch
- Very long URL list (10+ URLs)
- Slow network response (verify loading state persists)

---

## 10. Dependencies

### External Libraries
- `@tanstack/react-query`: ^5.x (existing)
- `react-hook-form`: ^7.x (existing)
- `@hookform/resolvers`: ^3.x (existing)
- `zod`: ^3.x (existing)
- `lucide-react`: ^0.x (existing)

### Other Sessions
- **Depends on**: phase01-session01-api-client-and-navigation (API client and types)
- **Depended by**: phase01-session06-map-page-and-polish (requires sessions 01-05)

---

## Next Steps

Run `/tasks` to generate the implementation task checklist.
