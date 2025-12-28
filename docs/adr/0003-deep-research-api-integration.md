# 3. Deep Research API Integration

**Status:** Accepted
**Date:** 2025-12-27

## Context

The application needed to expand beyond Tavily web search to support deep research capabilities for complex topics requiring comprehensive analysis with citations.

Two APIs were evaluated:
- **Perplexity Sonar** - Synchronous deep research with citations
- **Google Gemini Deep Research** - Asynchronous agentic research

## Decision

We integrated both APIs to provide different research patterns:

### Perplexity Sonar (Synchronous)
- Direct HTTP client using httpx
- Single POST request, immediate response
- 300 second timeout for long research queries
- Returns markdown report with inline citations

### Google Gemini (Asynchronous)
- Background job pattern with polling
- Start job returns interaction_id
- Poll every 10 seconds for status
- Research can take 20-60 minutes
- Supports cancellation mid-research

### Implementation Choices

1. **httpx over SDK** - No official Python SDKs available; httpx provides consistent async patterns matching existing Tavily integration.

2. **Separate service classes** - PerplexityService and GeminiService follow TavilyService pattern for consistency.

3. **Polling in frontend** - TanStack Query's refetchInterval handles Gemini polling cleanly, avoiding WebSocket complexity.

4. **Unified Items storage** - Both result types saved to Items with content_type field for filtering.

## Consequences

### Positive
- Users have choice of fast (Perplexity) vs thorough (Gemini) research
- Consistent error handling across all APIs
- Results can be saved and filtered by type
- No WebSocket infrastructure needed

### Negative
- Two API keys required for full functionality
- Gemini polling consumes more frontend resources
- Different response schemas require separate component sets

### Trade-offs
- Synchronous Perplexity is faster but may miss depth
- Asynchronous Gemini is thorough but requires patience
- Optional API keys mean features gracefully degrade
