# Contributing

## Branch Conventions

- `main` - Production-ready code
- `master` - Legacy default branch (synced with main)
- `feature/*` - New features
- `fix/*` - Bug fixes

## Commit Style

Use conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add Tavily search endpoint with topic filtering
```

## Pull Request Process

1. Create feature branch from `main`
2. Make changes with clear commits
3. Run tests: `cd backend && bash scripts/test.sh`
4. Run linting: `cd backend && uv run ruff check && uv run mypy app`
5. Update documentation if needed
6. Open PR with description
7. Address review feedback
8. Squash and merge

## Development Setup

```bash
# Backend
cd backend
uv sync
source .venv/bin/activate
fastapi dev app/main.py

# Frontend
cd frontend
npm install
npm run dev
```

## Running Tests

```bash
# Backend unit tests
cd backend && bash scripts/test.sh

# Frontend e2e tests
cd frontend && npx playwright test
```

## Code Review Norms

- Review within 24 hours
- Be constructive and specific
- Approve when ready, request changes when not
- Use suggestions for minor changes
