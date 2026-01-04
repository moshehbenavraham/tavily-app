# API Documentation

## Overview

ai-search exposes REST API endpoints for three AI-powered research services:

1. **Tavily** - Web search, extraction, crawling, sitemap
2. **Perplexity Sonar** - Synchronous deep research with citations
3. **Google Gemini** - Asynchronous deep research with polling

All endpoints require JWT authentication via Bearer token.

## OpenAPI Specification

Interactive API documentation is available at:
- **Swagger UI**: http://localhost:8009/docs
- **ReDoc**: http://localhost:8009/redoc
- **OpenAPI JSON**: http://localhost:8009/api/v1/openapi.json

## Authentication

All endpoints require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Obtain a token via POST `/api/v1/login/access-token`.

## Endpoints

### Tavily

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/tavily/search` | POST | Web search with topic filtering |
| `/api/v1/tavily/extract` | POST | Extract content from URLs |
| `/api/v1/tavily/crawl` | POST | Crawl website with instructions |
| `/api/v1/tavily/map` | POST | Generate sitemap from URL |

### Perplexity

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/perplexity/deep-research` | POST | AI research with citations |

### Gemini

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/gemini/deep-research` | POST | Start async research job |
| `/api/v1/gemini/deep-research/{interaction_id}` | GET | Poll research status |
| `/api/v1/gemini/deep-research/{interaction_id}` | DELETE | Cancel research |
| `/api/v1/gemini/deep-research/sync` | POST | Blocking wait for completion |

## Error Responses

All API errors follow the structure:

```json
{
  "error_code": "ERROR_CODE",
  "message": "Human-readable message",
  "details": {}
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `RATE_LIMIT_EXCEEDED` | 429 | API rate limit hit |
| `INVALID_API_KEY` | 401 | Invalid or missing API key |
| `REQUEST_TIMEOUT` | 504 | Request timed out |
| `INVALID_REQUEST` | 400 | Invalid request parameters |

### Gemini-Specific Errors

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INTERACTION_NOT_FOUND` | 404 | Research job not found |
| `RESEARCH_FAILED` | 500 | Research job failed |
| `MAX_POLLS_EXCEEDED` | 504 | Polling timeout |

## Client Generation

Frontend TypeScript client is auto-generated from OpenAPI spec:

```bash
# From project root
./scripts/generate-client.sh

# Or manually
cd frontend && npm run generate-client
```

Generated files:
- `frontend/src/client/sdk.gen.ts` - Service methods
- `frontend/src/client/types.gen.ts` - TypeScript types
