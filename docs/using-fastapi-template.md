# Using the FastAPI Full-Stack Template

A guide for bootstrapping new applications using the [FastAPI Full-Stack Template](https://github.com/fastapi/full-stack-fastapi-template).

## Prerequisites

- Python 3.11+
- Node.js 18+ (for frontend)
- Docker and Docker Compose
- Git
- GitHub CLI (optional)
- pipx (for Copier method)

---

## Choosing Your Setup Method

### Option 1: Copier (Official Recommended Method)

The template uses [Copier](https://copier.readthedocs.io/) to generate a customized project with interactive prompts.

**Install Copier:**
```bash
pipx install copier
```

**Generate your project:**
```bash
copier copy https://github.com/fastapi/full-stack-fastapi-template my-app
cd my-app
```

Copier will prompt you for:
- Project name
- Database settings
- Email configuration
- First superuser credentials
- And more...

**Initialize git and push:**
```bash
git init
git add -A
git commit -m "Initial project from FastAPI template"
gh repo create my-app --private --source=. --push
```

**To update from template later:**
```bash
copier update
```

**Pros:**
- Official recommended method
- Interactive configuration (no manual .env editing)
- Built-in update mechanism
- Customizes files based on your answers

**Cons:**
- Requires pipx/Copier installation
- More steps than a simple clone

---

### Option 2: Degit (Fastest)

Downloads the template without git history. Quick and simple.

```bash
npx degit fastapi/full-stack-fastapi-template my-app
cd my-app
git init
git add -A
git commit -m "Initial scaffold from FastAPI template"
```

Then create a GitHub repo and push:
```bash
gh repo create my-app --private --source=. --push
```

**Pros:**
- Single command download
- No git history clutter
- No extra tools beyond npx

**Cons:**
- No interactive configuration (manual .env setup)
- No built-in update mechanism
- Requires Node.js for npx

---

### Option 3: Clone with Upstream Tracking

Use this if you want to pull future template updates (security patches, new features).

```bash
# Clone the template
git clone https://github.com/fastapi/full-stack-fastapi-template.git my-app
cd my-app

# Remove original origin, set up your own
git remote rename origin upstream

# Create your own repo on GitHub first, then:
git remote add origin git@github.com:YOUR_USERNAME/my-app.git
git push -u origin master
```

**Verify remotes:**
```bash
git remote -v
# origin    git@github.com:YOUR_USERNAME/my-app.git (fetch)
# origin    git@github.com:YOUR_USERNAME/my-app.git (push)
# upstream  https://github.com/fastapi/full-stack-fastapi-template.git (fetch)
# upstream  https://github.com/fastapi/full-stack-fastapi-template.git (push)
```

**To pull upstream updates later:**
```bash
git fetch upstream
git pull --no-commit upstream master
# Resolve any conflicts in your editor
git merge --continue
```

**Pros:**
- Can pull security updates and new features
- Maintains connection to original template
- No extra tools required

**Cons:**
- Merge conflicts when pulling updates
- Git history includes template commits
- More complex workflow

---

### Option 4: Simple Fork

If you want a public repo and don't mind the fork relationship:

1. Go to https://github.com/fastapi/full-stack-fastapi-template
2. Click **Fork** (top right)
3. Clone your fork:
   ```bash
   git clone git@github.com:YOUR_USERNAME/full-stack-fastapi-template.git my-app
   cd my-app
   ```

**Note:** GitHub doesn't allow changing fork visibility, so this only works for public repos.

---

## Initial Configuration

After cloning (for non-Copier methods), configure the template:

### 1. Copy environment template

```bash
cp .env.example .env
```

### 2. Generate a secret key

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3. Edit `.env` with your settings

```env
# Project
PROJECT_NAME="My Application"
DOMAIN=localhost

# Security
SECRET_KEY=your-generated-secret-key-here

# Database
POSTGRES_SERVER=db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=change-this-password
POSTGRES_DB=app

# Email (optional)
SMTP_HOST=
SMTP_USER=
SMTP_PASSWORD=

# First superuser
FIRST_SUPERUSER=admin@example.com
FIRST_SUPERUSER_PASSWORD=change-this-password
```

---

## Running the Application

### Development with Docker (Recommended)

```bash
docker compose up -d
```

Access points:
| Service | URL |
|---------|-----|
| API | http://localhost:8009 |
| API Docs (Swagger) | http://localhost:8009/docs |
| API Docs (ReDoc) | http://localhost:8009/redoc |
| Frontend | http://localhost:5181 |
| Database | localhost:5441 |

**View logs:**
```bash
docker compose logs -f backend
docker compose logs -f frontend
```

**Stop services:**
```bash
docker compose down
```

### Local Development (without Docker)

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8009
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## Project Structure

```
my-app/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/          # API endpoints
│   │   │   ├── deps.py          # Dependencies (auth, db)
│   │   │   └── main.py          # Router aggregation
│   │   ├── core/
│   │   │   ├── config.py        # Settings from .env
│   │   │   ├── db.py            # Database connection
│   │   │   └── security.py      # Auth utilities
│   │   ├── models/              # SQLModel database models
│   │   ├── schemas/             # Pydantic request/response models
│   │   ├── crud/                # Database operations
│   │   └── main.py              # FastAPI app entry point
│   ├── alembic/                 # Database migrations
│   ├── tests/                   # Backend tests
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── routes/              # Page components
│   │   ├── client/              # Auto-generated API client
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── .env                         # Environment variables
├── .env.example                 # Template for .env
├── docker-compose.yml           # Docker services
└── README.md
```

---

## Common Tasks

### Adding a new API endpoint

1. Create route in `backend/app/api/routes/myroute.py`
2. Register in `backend/app/api/main.py`:
   ```python
   from app.api.routes import myroute
   api_router.include_router(myroute.router, prefix="/myroute", tags=["myroute"])
   ```

### Adding a database model

1. Create model in `backend/app/models/`
2. Import in `backend/app/models/__init__.py`
3. Create migration:
   ```bash
   cd backend
   alembic revision --autogenerate -m "Add my model"
   alembic upgrade head
   ```

### Regenerating the frontend API client

The template uses auto-generated TypeScript clients from OpenAPI:

```bash
cd frontend
npm run generate-client
```

### Running tests

```bash
# Backend
cd backend
pytest

# With coverage
pytest --cov=app
```

---

## Deployment

### Production Docker Build

```bash
docker compose -f docker-compose.yml up -d --build
```

### Environment Variables for Production

Key variables to change for production:

```env
# Required changes
SECRET_KEY=long-random-production-secret
POSTGRES_PASSWORD=strong-production-password
FIRST_SUPERUSER_PASSWORD=strong-admin-password

# Domain
DOMAIN=yourdomain.com
FRONTEND_HOST=https://yourdomain.com

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
```

---

## When to Use Each Setup Method

| Scenario | Recommended Method |
|----------|-------------------|
| New project, want guided setup | Copier |
| Quick prototype, minimal setup | Degit |
| Want upstream updates via git | Clone + Upstream |
| Public repo, simple fork | Fork |
| Private repo, no updates needed | Degit or Copier |
| Production project | Copier |

---

## Resources

- [FastAPI Template Repository](https://github.com/fastapi/full-stack-fastapi-template)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Copier Documentation](https://copier.readthedocs.io/)
- [SQLModel Documentation](https://sqlmodel.tiangolo.com/)
- [Alembic Migrations](https://alembic.sqlalchemy.org/)
