# FastAPI SaaS Platform - Product Requirements Document

## Overview

This project is a **modified FastAPI boilerplate** enhanced with AI search tools (Tavily, Perplexity, Gemini). The goal is to evolve it into a full-featured SaaS platform by adding features from the Open SaaS template while maintaining the existing FastAPI/React architecture.

### Current State

**Existing Features:**
- JWT authentication (email/password, password recovery/reset with email tokens)
- User management with admin capabilities (CRUD, role-based access)
- AI search integrations (Tavily search/extract/crawl/map, Perplexity deep research, Gemini deep research)
- Items/saved results system with content type filtering and metadata storage
- PostgreSQL database with SQLModel ORM (UUID primary keys)
- React 19/TypeScript frontend with TanStack Router & Query
- shadcn/ui component library with dark/light theme switching
- SMTP email system with Jinja2 templates
- Docker containerization with Docker Compose
- Sentry error tracking integration

**What Open SaaS Has That We're Missing:**
- Payment processing (Stripe/Lemon Squeezy/Polar)
- Subscription and credits system
- Social authentication (Google, GitHub, Discord OAuth)
- Email verification workflow
- Analytics dashboard with daily stats collection
- File storage (S3 with presigned URLs)
- Background job queue (PgBoss)
- Marketing landing page with hero, features, testimonials, FAQ
- Cookie consent and GDPR compliance
- Contact form system
- E2E testing with Playwright
- Blog and documentation system

**Target State:**
Add all missing SaaS features from Open SaaS to create a production-ready platform.

## Goals

1. **Monetization Ready**: Implement billing, subscriptions, and credit systems to enable revenue generation
2. **Growth Enabled**: Add analytics, marketing pages, and SEO optimization for user acquisition
3. **Enterprise Features**: File storage, background jobs, and enhanced admin capabilities
4. **User Trust**: Social auth, email verification, GDPR compliance, and polished UX

## Phases

| Phase | Name | Sessions | Status |
|-------|------|----------|--------|
| 00 | Billing & Subscriptions | 6 | Not Started |
| 01 | Enhanced Authentication | 4 | Not Started |
| 02 | Analytics & Metrics | 5 | Not Started |
| 03 | File Storage System | 4 | Not Started |
| 04 | Background Jobs | 3 | Not Started |
| 05 | Marketing & Content | 6 | Not Started |
| 06 | Enhanced UX & Compliance | 5 | Not Started |

---

## Phase 00: Billing & Subscriptions

> **Reference Implementation:** `EXAMPLE_CODE/app/src/payment/`
> - Stripe: `payment/stripe/` (stripeClient.ts, checkoutUtils.ts, webhook.ts, paymentProcessor.ts)
> - Lemon Squeezy: `payment/lemonSqueezy/`
> - Polar: `payment/polar/`
> - Plans config: `payment/plans.ts`
> - Operations: `payment/operations.ts`

### Objectives

1. Integrate Stripe for payment processing
2. Implement subscription management with multiple plans
3. Add a credit system for usage-based features
4. Create checkout and customer portal flows

### Features

#### Payment Processor Architecture
Open SaaS uses a **pluggable payment processor design** supporting multiple providers through a unified interface:
- **Stripe** (primary) - Full checkout, subscriptions, webhooks, customer portal
- **Polar** (alternative) - Checkout, subscriptions, webhooks, customer portal
- **LemonSqueezy** (alternative) - Checkout, subscriptions, webhooks, customer portal

Each processor implements the same interface:
- `paymentProcessor.ts` - Core payment operations
- `checkoutUtils.ts` - Checkout session creation
- `webhook.ts` - Webhook event handling

This project will implement Stripe as the primary processor with the architecture designed for future provider additions.

#### Stripe Integration
- Stripe SDK client setup (`stripe` Python package)
- Webhook endpoint for payment events
- Checkout session creation
- Customer portal URL generation
- Webhook signature verification (raw request body required)

#### Subscription Plans
- **Free Tier**: Limited credits (default 3), no subscription required
- **Hobby Plan**: Monthly subscription with enhanced limits
- **Pro Plan**: Monthly subscription with higher/unlimited access
- **Credits Pack**: One-time purchase for additional credits (10 credits)

#### Plan Configuration
Plans are defined with two key properties:
- `payment_processor_plan_id` - The provider-specific ID (e.g., Stripe price ID)
- `effect` - Either `{"kind": "subscription"}` or `{"kind": "credits", "amount": 10}`

This allows the system to handle both recurring subscriptions and one-time credit purchases uniformly.

#### Subscription Statuses (enum values)
- `active` - Subscription is current and paid
- `past_due` - Payment failed, grace period
- `cancel_at_period_end` - Will cancel at end of billing period
- `deleted` - Subscription has been canceled

#### Database Models
```
User (extend existing model):
  - payment_processor_user_id (string, nullable) - Customer ID from payment processor
  - subscription_status (enum: active, past_due, cancel_at_period_end, deleted, null)
  - subscription_plan (enum: hobby, pro, null)
  - credits (integer, default 3)
  - date_paid (timestamp, nullable)
```

Note: Open SaaS extends the User model directly rather than creating separate subscription tables. This simplifies queries and reduces joins. Customer portal URLs are generated dynamically via API rather than stored.

#### API Endpoints
- `POST /billing/checkout` - Create checkout session for authenticated user
- `POST /billing/webhook` - Handle payment webhooks (no auth, signature verification only)
- `GET /billing/portal` - Get customer portal URL (generated dynamically)
- `GET /billing/subscription` - Get current subscription status
- `GET /billing/usage` - Get credit usage stats

#### Webhook Events to Handle (Stripe)
- `invoice.paid` - Payment successful, update subscription status and credits
- `customer.subscription.updated` - Plan changes, status updates
- `customer.subscription.deleted` - Subscription canceled (trigger cancellation email)
- `checkout.session.completed` - One-time credit purchase completed

#### Frontend Pages
- `/pricing` - Pricing page with plan comparison (public, no auth required)
- `/checkout/success` - Checkout success handler
- `/checkout/cancel` - Checkout canceled handler

#### Account Page Subscription Section
- Current subscription plan display (Free/Hobby/Pro)
- Credits balance display with "Buy More Credits" button
- "Manage Subscription" button (links to Stripe customer portal)
- "Upgrade" button for free users (links to pricing page)
- Status-specific messaging:
  - Active: "Your subscription is active"
  - Past Due: "Your payment is past due. Please update payment method."
  - Cancel at Period End: "Your subscription will end on {date}"
  - Deleted/Canceled: "Your subscription has been canceled"

#### Credit Deduction Logic
- Credits are deducted when users make AI API calls (Tavily, Perplexity, Gemini)
- Subscribers with active plans have unlimited access (no credit deduction)
- Non-subscribers consume 1 credit per API call
- Check credit balance before API call; reject with 402 Payment Required if insufficient
- Default 3 credits for new users

### Sessions

1. **Stripe Configuration & Models** - SDK setup, database models, environment config
2. **Webhook Handler** - Implement webhook processing for subscription events
3. **Checkout Flow** - Create checkout sessions and handle redirects
4. **Customer Portal** - Integrate Stripe customer portal
5. **Credit System** - Implement credit tracking and deduction
6. **Pricing Page & UI** - Build frontend pricing and account subscription UI

---

## Phase 01: Enhanced Authentication

> **Reference Implementation:** `EXAMPLE_CODE/app/src/auth/`
> - Email/password: `auth/email-and-pass/`
> - User signup fields: `auth/userSignupFields.ts`
> - Auth pages: `auth/LoginPage.tsx`, `auth/SignupPage.tsx`, `auth/EmailVerificationPage.tsx`
> - Password reset: `auth/RequestPasswordResetPage.tsx`, `auth/PasswordResetPage.tsx`
> - Layout: `auth/AuthPageLayout.tsx`

### Objectives

1. Add social login providers (Google, GitHub, Discord)
2. Implement email verification workflow
3. Add OAuth2 authorization code flow

### Features

#### Social Login Providers
- Google OAuth2 integration
- GitHub OAuth2 integration
- Discord OAuth2 integration (optional)
- Configurable provider enabling via environment variables

#### Email Verification
- Send verification email on registration
- Verification token generation and storage
- Email confirmation endpoint
- Resend verification email option
- Block login until email verified (configurable)

#### Database Models
```
OAuthAccount:
  - id, user_id, provider (google, github, discord)
  - provider_account_id, access_token, refresh_token
  - expires_at

User (extend):
  - email_verified, email_verified_at
  - verification_token, verification_token_expires
```

#### API Endpoints
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/github` - Initiate GitHub OAuth
- `GET /auth/github/callback` - GitHub OAuth callback
- `POST /auth/verify-email` - Verify email with token
- `POST /auth/resend-verification` - Resend verification email

#### Environment Variables
```
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET
EMAIL_VERIFICATION_REQUIRED=true/false
ADMIN_EMAILS=admin@example.com,admin2@example.com  # Auto-promote to superuser
```

#### Admin Auto-Promotion
- Users with emails in ADMIN_EMAILS are automatically set as superusers on signup
- Useful for bootstrapping admin access without manual database edits

### Sessions

1. **OAuth Infrastructure** - Database models, OAuth flow utilities
2. **Google OAuth** - Google login implementation
3. **GitHub OAuth** - GitHub login implementation
4. **Email Verification** - Verification workflow and UI

---

## Phase 02: Analytics & Metrics

> **Reference Implementation:** `EXAMPLE_CODE/app/src/analytics/`
> - Stats job: `analytics/stats.ts` (calculateDailyStats function)
> - Providers: `analytics/providers/` (plausibleAnalyticsUtils.ts, googleAnalyticsUtils.ts)
> - Admin dashboard: `admin/dashboards/analytics/` (AnalyticsDashboardPage.tsx)

### Objectives

1. Build admin analytics dashboard with key metrics
2. Implement daily stats collection
3. Integrate external analytics providers (Plausible/Google Analytics)
4. Track revenue, users, and engagement metrics

### Features

#### Analytics Dashboard
Admin-only dashboard with the following cards/widgets:

**Metric Cards:**
- Total Page Views (with % change from yesterday)
- Total Signups (with delta from yesterday)
- Total Paying Users (with delta)
- Total Revenue (with weekly comparison)

**Charts:**
- Revenue and Profit Chart (7-day trend line)

**Tables:**
- Traffic Sources Table (referrer breakdown with visitor counts)

#### Daily Stats Collection
- Scheduled job to calculate daily metrics (runs hourly for near-real-time data)
- Store historical data for trend analysis
- Calculate deltas and period-over-period change percentages
- **Cross-processor revenue aggregation** - Aggregate revenue from all payment processors (Stripe, LemonSqueezy, Polar) for unified reporting

#### Database Models
```
DailyStats:
  - id, date (unique)
  - total_views, prev_day_views_change_percent
  - user_count, user_delta
  - paid_user_count, paid_user_delta
  - total_revenue

PageViewSource:
  - id, daily_stats_id, source_name
  - visitor_count, date

AnalyticsEvent:
  - id, event_type, event_data (JSON)
  - user_id (nullable), session_id
  - created_at

Logs (for job error tracking):
  - id, message, level
  - created_at
```

#### API Endpoints
- `GET /admin/analytics/dashboard` - Get dashboard metrics
- `GET /admin/analytics/revenue` - Get revenue data
- `GET /admin/analytics/users` - Get user growth data
- `GET /admin/analytics/sources` - Get traffic sources

#### External Integrations
- Plausible Analytics API integration
- Google Analytics Data API integration
- Frontend tracking script injection

### Sessions

1. **Analytics Models & Infrastructure** - Database models, base services
2. **Stats Collection Job** - Scheduled job implementation
3. **Dashboard API** - Backend endpoints for metrics
4. **Dashboard UI** - Admin analytics dashboard components
5. **External Analytics** - Plausible/GA integration

---

## Phase 03: File Storage System

> **Reference Implementation:** `EXAMPLE_CODE/app/src/file-upload/`
> - S3 utilities: `file-upload/s3Utils.ts` (getUploadFileSignedURLFromS3, getDownloadFileSignedURLFromS3, deleteFileFromS3)
> - Operations: `file-upload/operations.ts`
> - Validation: `file-upload/validation.ts`
> - Upload page: `file-upload/FileUploadPage.tsx`
> - Client upload: `file-upload/fileUploading.ts`

### Objectives

1. Implement S3-compatible file storage
2. Create presigned URL system for secure uploads/downloads
3. Build file management UI
4. Associate files with users

### Features

#### S3 Integration
- AWS S3 or compatible storage (MinIO for local dev)
- Presigned URL generation for uploads
- Presigned URL generation for downloads
- File existence verification
- File deletion from storage

#### File Management
- Upload files directly from browser to S3 (presigned PUT URL)
- List user's uploaded files
- Download files via presigned URLs (time-limited)
- Delete files with storage cleanup (DB + S3)
- File type validation with allowed types:
  - Images: JPEG, PNG
  - Documents: PDF
  - Text: All text/* MIME types
  - Video: MP4, QuickTime (optional)
- File size limit: 5MB default (configurable via environment variable)

#### Database Models
```
File:
  - id, user_id, filename, file_type
  - s3_key, size_bytes
  - created_at, updated_at
```

#### API Endpoints
- `POST /files/upload-url` - Get presigned upload URL
- `POST /files/` - Register uploaded file in database
- `GET /files/` - List user's files
- `GET /files/{id}/download-url` - Get presigned download URL
- `DELETE /files/{id}` - Delete file from DB and S3

#### Environment Variables
```
AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY
AWS_S3_BUCKET, AWS_S3_REGION
AWS_S3_ENDPOINT_URL (for MinIO/compatible)
```

### Sessions

1. **S3 Client & Configuration** - S3 utilities and environment setup
2. **Upload Flow** - Presigned upload URLs and file registration
3. **Download & Delete** - Download URLs and file deletion
4. **File Management UI** - Frontend file upload page and components

---

## Phase 04: Background Jobs

> **Reference Implementation:** `EXAMPLE_CODE/app/src/analytics/stats.ts`
> - Job definition in `main.wasp` (job dailyStatsJob)
> - PgBoss executor with hourly cron schedule
> - Note: Open SaaS uses PgBoss (PostgreSQL-based); this project uses Celery/ARQ with Redis

### Objectives

1. Set up background job queue system
2. Implement scheduled tasks
3. Create job monitoring capabilities

### Features

#### Job Queue System
- Celery with Redis backend (or ARQ for async)
- Task definition and registration
- Retry policies and error handling
- Job status tracking

#### Scheduled Tasks
- Analytics calculation (cron: `0 * * * *` hourly, matching Open SaaS)
- Subscription status sync (cron: `0 */6 * * *`)
- Cleanup expired tokens (cron: `0 2 * * *`)
- Usage report generation

Note: Open SaaS runs analytics hourly for near-real-time dashboard updates. Adjust frequency based on needs.

#### Database Models
```
JobLog:
  - id, job_name, status (pending, running, completed, failed)
  - started_at, completed_at
  - result (JSON), error_message
```

#### Monitoring
- Job status endpoint
- Failed job alerts
- Job history in admin

### Sessions

1. **Job Queue Setup** - Celery/ARQ configuration with Redis
2. **Scheduled Tasks** - Cron job implementations
3. **Monitoring & Admin** - Job logs and admin UI

---

## Phase 05: Marketing & Content

> **Reference Implementation:**
> - Landing page: `EXAMPLE_CODE/app/src/landing-page/` (Hero.tsx, FeaturesGrid.tsx, Testimonials.tsx, FAQ.tsx, Footer.tsx, Clients.tsx, ExamplesCarousel.tsx)
> - Content config: `landing-page/contentSections.ts`
> - Pricing page: `EXAMPLE_CODE/app/src/payment/PricingPage.tsx`
> - Blog (Astro): `EXAMPLE_CODE/blog/` (Starlight-based static site)
> - Documentation: `EXAMPLE_CODE/docs/`

### Objectives

1. Create marketing landing page
2. Build pricing comparison page
3. Add blog/content system
4. Implement documentation site

### Features

#### Landing Page Components
- **Announcement Bar**: Dismissible banner for promotions/news at top of page
- **Navigation**: Navbar with links to features, pricing, docs, login (responsive mobile/desktop)
- **Hero Section**: Headline, subheadline, CTA buttons, hero image/graphic
- **Features Grid**: Icon/emoji + title + description cards with **size variants** (small, medium, large)
- **Highlighted Feature**: Detailed feature showcase with image
- **Examples Carousel**: Slider showcasing use cases with images
- **Testimonials**: Customer quotes with avatars, names, roles, social links
- **Clients/Logos**: Logo grid of notable users/partners (SVG components)
- **FAQ Accordion**: Expandable Q&A section with optional links
- **Footer**: Navigation links organized by category (app, company), social links, copyright

#### Landing Page Content Management
All landing page content is configurable via a single content file (`contentSections.ts`) for easy updates:
```typescript
// Feature structure with size variants for grid layout
features: [{ name, description, emoji, href, size: "small"|"medium"|"large" }]
// Testimonials with social proof
testimonials: [{ name, role, avatarSrc, socialUrl, quote }]
// FAQs with optional external links
faqs: [{ id, question, answer, href? }]
// Footer navigation by category
footerNavigation: { app: [...], company: [...] }
// Examples for carousel
examples: [{ name, description, imageSrc, href }]
```

#### Pricing Page
- Plan comparison table (Free vs Hobby vs Pro)
- Feature checklist per plan (checkmarks/X marks)
- CTA buttons to checkout (or customer portal for existing subscribers)
- "Best Deal" highlighting on recommended plan
- FAQ section specific to pricing/billing

#### Blog System
Note: Open SaaS uses **Astro Starlight** for the blog (separate static site). For this FastAPI project, options include:
- Separate Astro/Next.js static blog site, or
- FastAPI serving markdown with a template engine

**Features:**
- Markdown-based blog posts in `content/docs/blog/` structure
- Post metadata (title, date, author, tags)
- Blog listing page with post previews
- Individual post pages
- RSS feed generation
- Guides section for tutorials

#### Documentation
- Markdown documentation pages
- Sidebar navigation with sections
- Search functionality
- Code syntax highlighting

### Sessions

1. **Landing Page Structure** - Layout and hero components
2. **Landing Page Content** - Features, testimonials, FAQ
3. **Pricing Page** - Plan comparison and checkout CTAs
4. **Blog Infrastructure** - Blog models and markdown processing
5. **Blog UI** - Blog listing and post pages
6. **Documentation System** - Docs pages and navigation

---

## Phase 06: Enhanced UX & Compliance

> **Reference Implementation:**
> - Cookie consent: `EXAMPLE_CODE/app/src/client/components/cookie-consent/` (Banner.tsx, Config.ts)
> - Admin pages: `EXAMPLE_CODE/app/src/admin/` (dashboards/, elements/, layout/)
> - User management: `admin/dashboards/users/` (UsersDashboardPage.tsx, UsersTable.tsx)
> - Account page: `EXAMPLE_CODE/app/src/user/AccountPage.tsx`
> - E2E tests: `EXAMPLE_CODE/e2e-tests/tests/` (landingPageTests.spec.ts, pricingPageTests.spec.ts, demoAppTests.spec.ts)
> - Test utils: `e2e-tests/tests/utils.ts`

### Objectives

1. Add cookie consent and GDPR compliance
2. Implement contact form system
3. Enhance admin dashboard
4. Add E2E testing suite

### Features

#### Cookie Consent
- Cookie consent banner using `vanilla-cookieconsent` library
- **Configuration:**
  - Mode: `opt-in` (scripts blocked until consent given)
  - Layout: `box` with `bottom right` positioning
  - Cookie name: `cc_cookie`
  - Cookie duration: 365 days
  - SameSite: `Lax`
  - Hide from bots: enabled in production (disabled for E2E tests)
- **Consent Categories:**
  - `necessary` - Always enabled, read-only (cannot disable)
  - `analytics` - Optional, controls analytics scripts
- **Service Integration (analytics category):**
  - Google Analytics service with `onAccept`/`onReject` handlers
  - Dynamic script injection on acceptance
  - Auto-clear GA cookies (`_ga*`, `_gid`) on rejection
- **UI Elements:**
  - "Accept All" and "Reject All" buttons
  - Privacy Policy and Terms links in footer
  - Optional "Manage Preferences" modal (can be enabled)

#### Contact Form
- Public contact form
- Message storage in database
- Admin message management
- Read/unread status
- Reply tracking

#### Admin Dashboard Enhancements
- Messages management page
- Settings configuration page
- UI components showcase
- Calendar component
- Enhanced user table with:
  - Email search filter (case-insensitive)
  - Subscription status multi-select filter
  - Admin role toggle switch per user
  - Pagination (10 items per page)
  - Active filter chips display
  - Edit/delete dropdown actions per user

#### E2E Testing
- Playwright test setup with Chrome browser
- Test server configuration (use dev server or production build)

**Test Coverage:**
- Landing page tests (title, navigation, cookie consent acceptance/rejection, CTAs, headings)
- Pricing page tests (plan display, unauthenticated redirect, purchase flow)
- Auth flow tests (signup, login, logout, session handling)
- AI feature tests (search, extract functionality, credit exhaustion handling)
- Payment flow tests:
  - Stripe test mode with test card (4242 4242 4242 4242)
  - Credit purchase flow
  - Subscription management button visibility
  - Customer portal redirect

**Test Utilities:** (in `e2e-tests/tests/utils.ts`)
- `logUserIn(page, email, password)` - Login automation helper
- `signUserUp(page, email, password)` - Registration automation helper
- `createRandomUser()` - Test user generation with random credentials
- `makeStripePayment(page)` - Payment flow testing with Stripe test card (4242 4242 4242 4242)
- `acceptAllCookies(page)` - Cookie consent banner acceptance
- `page.waitForResponse()` - Wait for specific status codes (e.g., 402 Payment Required)
- LocalStorage clearing for session reset between tests

#### Database Models
```
ContactMessage:
  - id, user_id (nullable), email, name
  - subject, content
  - is_read, replied_at
  - created_at
```

### Sessions

1. **Cookie Consent** - Banner component and preference management
2. **Contact Form** - Form UI and backend storage
3. **Admin Messages** - Admin message management
4. **Admin Enhancements** - Settings, calendar, UI showcase
5. **E2E Testing Suite** - Playwright setup and test cases

---

## Technical Stack

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL with SQLModel/SQLAlchemy
- **Migrations**: Alembic
- **Authentication**: JWT + OAuth2
- **Payments**: Stripe Python SDK
- **Jobs**: Celery + Redis (or ARQ)
- **Email**: SMTP / SendGrid
- **Storage**: AWS S3 / MinIO
- **Testing**: pytest

### Frontend
- **Framework**: React 19 with TypeScript
- **Routing**: TanStack Router
- **State**: TanStack Query
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Forms**: React Hook Form + Zod
- **Testing**: Playwright

### External Services
- **Payments**: Stripe (primary), Lemon Squeezy or Polar (alternatives)
- **Analytics**: Plausible (privacy-focused, no cookies) / Google Analytics
- **Storage**: AWS S3
- **Email**: SendGrid / SMTP
- **AI APIs**: Tavily, Perplexity, Gemini
- **Cookie Consent**: vanilla-cookieconsent

### Infrastructure
- **Containers**: Docker + Docker Compose
- **Job Queue**: Redis
- **Local Storage**: MinIO (S3-compatible)

---

## Success Criteria

### Phase 00: Billing
- [ ] Users can subscribe to Hobby/Pro plans via Stripe
- [ ] Webhooks correctly update subscription status
- [ ] Credit system deducts on AI feature usage
- [ ] Customer portal accessible for plan management

### Phase 01: Authentication
- [ ] Users can sign in with Google and GitHub
- [ ] Email verification required before full access
- [ ] OAuth accounts linked to existing users by email

### Phase 02: Analytics
- [ ] Admin dashboard shows real-time metrics
- [ ] Daily stats job runs reliably
- [ ] Revenue and user growth trends visible

### Phase 03: File Storage
- [ ] Users can upload files up to 5MB (configurable limit)
- [ ] Files stored securely in S3 with user association
- [ ] Download links work with proper expiration (presigned URLs)

### Phase 04: Background Jobs
- [ ] Analytics job runs daily without errors
- [ ] Failed jobs are logged and retried
- [ ] Job status visible in admin

### Phase 05: Marketing
- [ ] Landing page converts visitors
- [ ] Pricing page clearly shows plan differences
- [ ] Blog posts indexed by search engines

### Phase 06: UX & Compliance
- [ ] Cookie consent meets GDPR requirements
- [ ] Contact form messages reach admin
- [ ] E2E tests cover critical user flows

---

## Architecture Notes

### Open SaaS Reference Structure

The `EXAMPLE_CODE/` directory contains the Open SaaS template for reference during implementation:

```
EXAMPLE_CODE/
├── app/src/                    # Main application source
│   ├── auth/                   # Authentication (login, signup, email verification)
│   ├── payment/                # Billing (Stripe, Lemon Squeezy, Polar)
│   │   └── stripe/             # Stripe-specific implementation
│   ├── analytics/              # Stats collection and providers
│   │   └── providers/          # Plausible, Google Analytics
│   ├── file-upload/            # S3 file storage
│   ├── admin/                  # Admin dashboard pages
│   │   ├── dashboards/         # Analytics, users dashboards
│   │   ├── elements/           # UI element demos
│   │   └── layout/             # Admin layout components
│   ├── landing-page/           # Marketing landing page components
│   ├── user/                   # User account pages
│   └── client/components/      # Shared components (cookie consent, etc.)
├── e2e-tests/                  # Playwright E2E tests
│   └── tests/                  # Test specs and utilities
├── blog/                       # Astro-based blog (Starlight)
└── docs/                       # Documentation files
```

Key files to reference:
- `app/main.wasp` - Route definitions, job schedules, auth config
- `app/src/payment/plans.ts` - Subscription plan definitions
- `app/src/landing-page/contentSections.ts` - Landing page content config
- `app/src/analytics/stats.ts` - Background job implementation

### Feature Parity Considerations

The Open SaaS template uses **Wasp** (full-stack DSL framework) while this project uses **FastAPI + React**. Key adaptations:

| Open SaaS (Wasp) | This Project (FastAPI) |
|------------------|------------------------|
| Wasp auth system | python-jose JWT + OAuth libraries (authlib) |
| Prisma ORM | SQLModel/SQLAlchemy with Alembic migrations |
| PgBoss jobs | Celery + Redis (or ARQ for async-native) |
| Wasp queries/actions | FastAPI endpoints + TanStack Query hooks |
| Astro blog | FastAPI serving markdown or separate Astro site |
| React (custom) | React 19 with TanStack Router (file-based) |
| shadcn/ui | shadcn/ui (same library, compatible) |

### API Versioning
Current API base path: `/api/v1/`. All new billing, auth, and analytics endpoints should follow this pattern.

### Security Considerations

- All payment webhooks must verify Stripe signatures (use raw request body)
- OAuth state parameters to prevent CSRF attacks
- File uploads validated for type and size before S3 upload
- Rate limiting on auth and payment endpoints (consider slowapi)
- Secrets in environment variables, never in code
- CORS configuration for API security
- Webhook endpoints exempt from CSRF/auth middleware

### Performance Considerations

- Background jobs for heavy operations (analytics calculation, email sending)
- Presigned URLs to offload file transfers directly to/from S3
- Query optimization with proper indexes (especially on user_id foreign keys)
- Caching layer for analytics data (Redis or in-memory)
- Pagination on all list endpoints (already implemented for users/items)

### Environment Variables Summary

New environment variables required for all phases:
```
# Billing (Phase 00)
# Note: Open SaaS uses generic PAYMENTS_* prefixes to support multiple processors
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
PAYMENTS_HOBBY_SUBSCRIPTION_PLAN_ID  # Stripe price ID for Hobby plan
PAYMENTS_PRO_SUBSCRIPTION_PLAN_ID    # Stripe price ID for Pro plan
PAYMENTS_CREDITS_10_PLAN_ID          # Stripe price ID for 10 credits pack

# OAuth (Phase 01)
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
ADMIN_EMAILS  # Comma-separated list of emails to auto-promote to admin

# Analytics (Phase 02)
PLAUSIBLE_API_KEY, PLAUSIBLE_SITE_ID, PLAUSIBLE_BASE_URL
# or
GOOGLE_ANALYTICS_ID
REACT_APP_GOOGLE_ANALYTICS_ID  # Frontend GA tracking ID

# File Storage (Phase 03)
AWS_S3_ACCESS_KEY, AWS_S3_SECRET_KEY
AWS_S3_BUCKET, AWS_S3_REGION
AWS_S3_ENDPOINT_URL  # For MinIO in development

# Background Jobs (Phase 04)
REDIS_URL
CELERY_BROKER_URL
```
