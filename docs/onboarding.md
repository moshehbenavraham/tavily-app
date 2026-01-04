# Onboarding

Zero-to-hero checklist for new developers.

## Prerequisites

- [ ] Docker and Docker Compose installed
- [ ] Python 3.12+ installed
- [ ] [uv](https://docs.astral.sh/uv/) installed (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- [ ] Node.js 20+ installed (via nvm or fnm)
- [ ] Git configured with SSH key
- [ ] Tavily API key from https://tavily.com
- [ ] Perplexity API key from https://perplexity.ai (optional, for deep research)
- [ ] Gemini API key from https://ai.google.dev (optional, for deep research)

## Setup Steps

### 1. Clone Repository

```bash
git clone git@github.com:moshehbenavraham/ai-search.git
cd ai-search
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

| Variable | Where to Get | Description |
|----------|--------------|-------------|
| `TAVILY_API_KEY` | https://tavily.com | Tavily API access |
| `PERPLEXITY_API_KEY` | https://perplexity.ai | Deep research (optional) |
| `GEMINI_API_KEY` | https://ai.google.dev | Deep research (optional) |
| `SECRET_KEY` | Generate with Python | JWT signing key |
| `POSTGRES_PASSWORD` | Create your own | Database password |
| `FIRST_SUPERUSER_PASSWORD` | Create your own | Initial admin account |

Generate a secret key:
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3. Start with Docker (Recommended)

```bash
docker compose up -d
```

This starts:
- PostgreSQL database on port 5439
- Backend API on http://localhost:8009
- Frontend on http://localhost:5179
- Mailcatcher on http://localhost:1080

### 4. Or Start Manually

**Backend:**
```bash
cd backend
uv sync
source .venv/bin/activate
fastapi dev app/main.py
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Database:**
```bash
docker compose up -d db
```

### 5. Run Database Migrations

```bash
# If using Docker
docker compose exec backend alembic upgrade head

# If running locally
cd backend && alembic upgrade head
```

### 6. Verify Setup

- [ ] App runs at http://localhost:5179
- [ ] Can log in with `admin@example.com` / your superuser password
- [ ] API docs available at http://localhost:8009/docs
- [ ] Backend tests pass: `cd backend && bash scripts/test.sh`

## Development Workflow

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes
3. Run tests: `cd backend && bash scripts/test.sh`
4. Run linting: `cd backend && uv run ruff check && uv run mypy app`
5. Commit with conventional format: `git commit -m "feat: add feature"`
6. Push and create PR

## Common Issues

### Port Already in Use
**Solution**: Check for existing containers or processes:
```bash
docker compose down
lsof -i :5179  # Check frontend port
lsof -i :8009  # Check backend port
```

### Database Connection Refused
**Solution**: Ensure PostgreSQL container is running:
```bash
docker compose up -d db
docker compose logs db
```

### Tavily API Errors
**Solution**: Verify your API key in `.env`:
```bash
grep TAVILY_API_KEY .env
```

### Frontend Client Out of Sync
**Solution**: Regenerate the OpenAPI client:
```bash
./scripts/generate-client.sh
```

## Next Steps

- Read [ARCHITECTURE.md](ARCHITECTURE.md) to understand the system
- Review [development.md](../development.md) for Docker workflow
- Check [PRD](../.spec_system/PRD/PRD.md) for project roadmap
