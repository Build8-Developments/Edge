# EDGE for Garments

A bilingual (English / Arabic) corporate website and lead-generation platform for **EDGE for Garments**, an Egyptian denim and ready-made garment manufacturer based in Port Said’s industrial free zone.

This document is the single source of truth for understanding the project: business context, architecture, features, APIs, security model, and resume/interview material. It is inferred from the codebase; where something is not explicit in code, assumptions are labeled.

---

# Project Overview

**EDGE for Garments** is a Next.js web application that serves as the company’s public digital presence and primary inbound sales funnel.

It solves three problems at once:

1. **Brand & trust** — Present manufacturing capabilities, certifications, production process, portfolio, and company story to international buyers in English and Arabic (with full RTL support).
2. **Lead capture** — Convert visitors into qualified manufacturing inquiries through a structured multi-step “AI Agent” quote form, a contact form, newsletter signup, and a multilingual AI chatbot that can run an order conversation and persist leads.
3. **Content operations** — Let company staff manage bilingual blog posts, product catalog entries, and inbound submissions from a protected admin dashboard backed by Supabase (PostgreSQL).

**Built for:**

- External buyers / brands seeking OEM, private-label, or denim manufacturing partners in Egypt
- EDGE sales and operations staff who need to review inquiries and update marketing content
- Marketing stakeholders who need SEO-friendly, localized pages (`/en`, `/ar`)

**Assumption:** Production deployment targets a Node-friendly host such as Vercel (suggested by `.vercel` in `.gitignore`, Next.js App Router patterns, and stock Vercel assets). There is no Docker or CI config in the repository.

---

# Business Domain

EDGE is a garment manufacturer specializing in denim and woven products (jeans, jackets, shirts, workwear, custom / private-label). The real-world workflow the product supports is a classic B2B manufacturing sales cycle:

1. A brand or buyer discovers EDGE (organic search, referral, or outbound link).
2. They explore products, factory capacity, certifications (Sedex, ISO 9001, OEKO-TEX, WRAP — presented as marketing content), and production steps (fabric inspection → cutting → sewing → washing → embroidery/printing → packaging/QC).
3. They request a quote via:
   - The interactive **AI Agent form** (structured Q&A: garment type, quantity, services, timeline, location, contact preference), or
   - The **chatbot** (conversational order flow that extracts phone/email and stores a submission), or
   - The **contact page** (free-form inquiry emailed to the team).
4. EDGE staff receive email notifications and/or see the lead in the **admin submissions** dashboard, then follow up via WhatsApp, phone, or email.
5. Staff maintain the public site by creating/editing bilingual **products** and **blog/news** posts (e.g. factory visits, openings).

The application does **not** implement ERP, inventory, production scheduling, quotations with pricing engines, payments, or order fulfillment. It is a marketing + CRM-lite lead system for manufacturing inquiries.

---

# Goals

- Present EDGE as a credible export-oriented denim manufacturer to global and regional buyers.
- Provide a fully bilingual EN/AR experience with correct LTR/RTL layout and SEO (`hreflang`, Open Graph, per-locale metadata).
- Capture structured manufacturing requirements before a human sales conversation.
- Persist leads in Supabase and notify staff by email (Gmail via Nodemailer).
- Offer an AI assistant that answers company FAQs and can guide users into an order/quote flow.
- Enable non-developers to manage products, blog content, and submission status through an admin UI.
- Remain resilient when the database is unavailable by falling back to static JSON for catalog/blog reads where implemented.

---

# Architecture

## Application architecture

The system is a **monolithic Next.js 16 App Router** application. UI pages, API route handlers, and middleware live in one deployable unit. There is no separate backend service.

```
Browser (EN/AR)
    │
    ▼
Next.js Middleware  ── locale redirect + admin cookie gate (page routes only)
    │
    ├── Server/Client React pages under app/[locale]/...
    │
    └── Route Handlers under app/api/...
            │
            ├── Supabase (PostgreSQL)  ← products, blog_posts, form_submissions, admin_users
            ├── OpenRouter (LLM)       ← chatbot completions
            ├── Gmail SMTP             ← contact, newsletter, AI form emails
            └── Local filesystem       ← public/uploads (image uploads)
```

## Module organization

| Area | Role |
|------|------|
| `app/[locale]/` | Canonical localized UI (home, about, products, blog, contact, production-process, admin) |
| `app/api/` | HTTP API: auth, CRUD, forms, chat, upload |
| `app/i18n/` | Locale config + dictionary-based translations |
| `lib/` | Supabase client, SQL schema/seed scripts |
| `data/` | JSON (and CSV) fallbacks / seed content |
| `middleware.ts` | Locale detection + admin page protection |
| Legacy `app/{about,blog,contact,...}` | Older non-locale pages; middleware typically redirects bare paths to `/{locale}/...` |

## Request flow

1. Request hits Next.js.
2. Middleware skips `/api`, static assets, and `_next`.
3. For page routes: if path lacks `/en` or `/ar`, redirect using `Accept-Language` (Arabic → `ar`, else default `en`).
4. Admin paths (except login) require cookie `admin_auth=authenticated`; otherwise redirect to `/{locale}/admin/login`.
5. Page components load dictionaries via `getDictionary(locale)` and optionally fetch Supabase (with JSON fallback for products).
6. Client interactions call `/api/*` route handlers, which talk to Supabase / OpenRouter / Nodemailer.

## Authentication flow

1. User posts username/password to `POST /api/auth/login` (body field is named `email` but treated as username).
2. Server checks `admin_users` in Supabase (`username` + `password_hash` equality). On DB failure, falls back to hardcoded `admin` / `admin123`.
3. On success, sets HttpOnly cookie `admin_auth=authenticated` (24h, `secure` in production, `SameSite=Lax`).
4. Middleware and admin client pages (`/api/auth/check`) gate the **admin UI**.
5. Logout deletes the cookie via `POST /api/auth/logout`.

**Important:** Mutating API routes (`POST/PUT/DELETE` for products/blog, upload, submission updates) do **not** re-validate the admin cookie server-side. Protection is UI/middleware-oriented. Treat this as a known security gap for production hardening.

## Authorization

There is **no RBAC**. A single admin identity model exists (`admin_users`). Anyone with valid credentials (or the fallback) gets full admin UI access. Submission statuses (`new`, `contacted`, `completed`, `cancelled`) are workflow labels, not permission roles.

## Database interactions

- Client: `@supabase/supabase-js` in `lib/supabase.ts`.
- Prefer `SUPABASE_SERVICE_KEY` on the server; fall back to `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Reads/writes use table APIs (`.from(...).select/insert/update/delete`).
- Products GET and product detail pages fall back to `data/products.json` if Supabase is empty/unreachable.
- Blog GET returns `[]` on error (no JSON fallback in the API route; UI may still use static data in places depending on page).
- Schema is maintained as SQL files (`lib/supabase-schema.sql`, `lib/seed-data.sql`) applied manually in the Supabase SQL Editor — not via Prisma/migrations tooling.

## Background jobs

**None implemented.** Emails are sent synchronously inside request handlers. There are no queues (Bull, Inngest, etc.), cron jobs, or workers.

## Caching

No Redis or application-level cache layer. Next.js defaults apply (static generation for locale params via `generateStaticParams` where used). Chat history is client-side `localStorage` (24h expiry).

## File storage

`POST /api/upload` writes images to `public/uploads/` with a timestamped filename. Valid types: JPEG, PNG, WebP, GIF; max 5MB. URLs are returned as `/uploads/{filename}`.

**Assumption / limitation:** Local disk uploads are unsuitable for ephemeral serverless filesystems unless the host provides persistent disk or the app is later moved to object storage (S3 / Supabase Storage). Not implemented today.

## External services

| Service | Purpose |
|---------|---------|
| **Supabase** | PostgreSQL + JS client for CMS and leads |
| **OpenRouter** | Chat completions for Edge Assistant (`OPENROUTER_API_KEY`, model default `openai/gpt-4o-mini`) |
| **Gmail SMTP (Nodemailer)** | Contact, newsletter, AI-agent form notifications & confirmations |
| **Remote images** | `next.config.ts` allows Unsplash, Clearbit, edgeforgarments.com, YouTube thumbs, Wikimedia |

---

# Tech Stack

### Backend / Runtime

- Next.js **16.0.10** (App Router, Route Handlers)
- TypeScript **5**
- Node.js (runtime assumed by Next; version not pinned in repo)

### Frontend

- React **19.2.1**
- Tailwind CSS **4** (`@tailwindcss/postcss`)
- Custom UI components (Button, Card, SectionHeader, motion helpers: ScrollReveal, TypewriterTitle, Parallax, etc.)
- Fonts via `next/font`: **Manrope** (Latin), **Cairo** (Arabic)

### Database

- **Supabase** (hosted PostgreSQL)
- Tables defined in SQL (not Prisma)

### ORM

- None. Direct Supabase JS client queries.

### Authentication

- Custom cookie-based admin session (`admin_auth`)
- Credentials stored/compared against `admin_users` (see security notes)

### Storage

- Local filesystem under `public/uploads/`
- Static assets under `public/` and `public/assets/`

### AI / Messaging

- OpenRouter Chat Completions API
- Nodemailer → Gmail

### Infrastructure / Deployment

- **Assumption:** Vercel or similar Next.js host
- No Docker, docker-compose, Terraform, or Kubernetes manifests in repo
- Env vars for secrets (see Deployment)

### DevOps

- `npm` scripts: `dev`, `build`, `start`, `lint`
- ESLint 9 + `eslint-config-next`
- No CI/CD workflows found in the repository

### Testing

- No automated test suite (no Jest/Vitest/Playwright config or test files found)

### Internationalization

- Custom dictionary i18n (`app/i18n/dictionaries.ts`) for `en` and `ar`
- Middleware locale prefixing and `dir="rtl"|"ltr"` on `<html>`

---

# Features

Organized by module. Only features present in code are listed.

## Public marketing site (`app/[locale]/`)

- **Home** — Hero, quote, services, partners, products teaser, portfolio/process, AI Agent form, factory video, testimonials, AI guide, locations map, FAQ, footer, floating chatbot
- **About** — Company story, timeline, team carousel, certifications, partners, map, FAQ
- **Products** — Category listing + dynamic `[slug]` detail (features, specs, gallery) with Supabase → JSON fallback
- **Production process** — Step-by-step manufacturing journey, capacity sections, differentiators
- **Blog** — Listing + `[slug]` article pages (bilingual fields)
- **Contact** — Inquiry form → email pipeline
- **Language switcher** — EN ↔ AR
- **SEO** — Per-page metadata, canonical URLs, `hreflang`, Open Graph / Twitter cards
- **UI polish** — Animated stats, scroll reveals, typewriter titles, page transitions/loader patterns

## Lead generation

- **AI Agent form** — Multi-step bilingual questionnaire (garment types, quantity bands, services, timeline, country, contact method, phone with country codes / email); saves to `form_submissions`; emails admin + optional customer confirmation
- **Contact API** — Validates name/email/message; emails admin + customer confirmation
- **Newsletter** — Email validation; notifies admin; confirmation to subscriber (not stored in a dedicated DB table in schema)
- **Chatbot (Edge Assistant)** — OpenRouter-powered, multilingual system prompt with company knowledge; order conversation flow; phone/email extraction → `form_submissions`; optional UI scroll command `[SCROLL_TO:ai-agent]`; chat history in `localStorage` (24h)

## Admin dashboard (`/{locale}/admin`)

- Login / logout / session check
- Dashboard tabs for **blog posts** and **products** (list, search, delete, navigate to create/edit)
- Create / edit blog posts (bilingual fields, image, gallery, featured)
- Create / edit products (bilingual titles/descriptions/features/specs, category, featured, gallery)
- Image upload helper for admin content
- **Submissions** board — list leads, filter by status, view Q&A detail, update status/notes, delete

## Data resilience

- Product catalog readable from JSON when Supabase fails or returns empty
- Auth fallback credentials if Supabase auth lookup fails
- SQL seed scripts for bootstrap content

---

# Database

PostgreSQL via Supabase. Schema is applied manually from SQL files.

## Entities

### `admin_users`

| Column | Notes |
|--------|--------|
| `id` | UUID PK |
| `username` | Unique |
| `password_hash` | Stored as plain comparison value in current demo setup (not bcrypt despite the column name) |
| `created_at` | timestamptz |

### `blog_posts`

Bilingual CMS article: `slug` (unique), `title_en/ar`, `excerpt_en/ar`, `content_en/ar`, `category_en/ar`, `image`, `gallery` (text[]), `featured`, `created_at`.

### `products`

Bilingual catalog item: `slug` (unique), titles/descriptions (`title_*`, `description_*`, `long_description_*`), `image`, `gallery`, `features_en/ar` (text[]), `specifications_en/ar` (JSONB), `category`, `featured`, `created_at`.

### `form_submissions`

Lead record from AI form and chatbot: contact fields (`name`, `email`, `phone`, `whatsapp`, `contact_method`), qualification fields (`garment_type`, `quantity`, `services`, `timeline`, `location`, `consultation`), `answers` (JSONB Q&A), `status` (default `new`), `notes`, `source` (default `website`), `created_at`.

## Relationships

There are **no foreign keys** between entities. Submissions, products, and posts are independent. Admins are not linked to content rows (no `created_by`).

## Indexing / performance

- Uniqueness on `username`, `blog_posts.slug`, `products.slug` (implicit unique indexes).
- No additional composite indexes or full-text search defined in the provided SQL.
- RLS is enabled on tables with permissive policies (`USING (true)` / insert allowed publicly for submissions). Combined with a service key on the server, RLS is not the primary security boundary for this app.

---

# API

Base path: `/api`. All handlers are Next.js Route Handlers returning JSON.

## Endpoint organization

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/auth/login` | Authenticate; set admin cookie |
| POST | `/api/auth/logout` | Clear admin cookie |
| GET | `/api/auth/check` | Session probe |
| GET/POST | `/api/products` | List / create products |
| GET/PUT/DELETE | `/api/products/[id]` | Read / update / delete by id |
| GET/POST | `/api/blog` | List / create posts |
| GET/PUT/DELETE | `/api/blog/[id]` | Read / update / delete by id |
| POST | `/api/contact` | Contact form → email |
| POST | `/api/newsletter` | Newsletter signup → email |
| POST | `/api/upload` | Image upload → `public/uploads` |
| POST | `/api/chat` | Chatbot completion + optional lead save |
| GET/POST | `/api/ai-agent-form` | List submissions / submit form |
| PATCH/DELETE | `/api/ai-agent-form/[id]` | Update status/notes / delete |

## Authentication on APIs

- Login sets an HttpOnly cookie.
- **Page** admin routes are gated by middleware.
- **API** write endpoints generally do **not** verify the cookie. Public reads for products/blog are intentional; write endpoints should be treated as needing hardening.

## Validation

- Contact: requires `name`, `email`, `message`.
- Newsletter: requires email containing `@`.
- Upload: MIME allowlist + 5MB size cap.
- Chat: requires `messages` array; requires `OPENROUTER_API_KEY`.
- Product/blog create/update: trust JSON body shape (TypeScript interfaces on client; no Zod/Yup schema layer).
- AI form: soft handling of missing fields; DB insert may log errors without always failing the HTTP response path for email.

## Error handling

- Pattern: `try/catch`, `console.error`, JSON `{ error: string }` with HTTP 400/401/404/500.
- Some GETs degrade gracefully (empty arrays or JSON fallback) rather than hard-failing.
- OpenRouter non-OK responses surface as 500 with a generic AI error message.

---

# Authentication & Authorization

## Strategy

Custom **cookie session** for a single-admin model. Not Supabase Auth, not NextAuth, not JWT access tokens.

Credentials:

1. Primary: row in `admin_users` where `password_hash` equals the submitted password (plaintext compare in current code).
2. Fallback: hardcoded `admin` / `admin123` if DB check fails or does not match.

Cookie flags: `httpOnly`, `sameSite: lax`, `maxAge: 86400`, `secure` when `NODE_ENV === production`.

## Authorization

- Binary: authenticated admin vs anonymous visitor.
- No roles, permissions matrix, or multi-tenant isolation.
- RLS policies in SQL are permissive; do not rely on them as authorization for admin mutations.

## Security notes (accurate to current code)

- Password hashing is not production-grade (schema comments acknowledge bcrypt should be used).
- Fallback credentials and permissive RLS are demo-oriented.
- Admin API mutations lack server-side session checks.
- Contact/AI emails interpolate user content into HTML without a dedicated sanitization library (XSS-to-email risk if HTML is rendered unsafely by clients).

---

# Background Processing

**Not present.**

Email delivery, chatbot completions, and DB writes all run **inline** in the HTTP request lifecycle. There are no workers, queues, scheduled tasks, webhooks consumers, or event buses.

Implication: slow SMTP or OpenRouter latency directly affects API response time; transient failures are not retried via a job system.

---

# Deployment

## How to run locally

```bash
npm install
# create .env.local with required variables (see below)
npm run dev
```

Production-style:

```bash
npm run build
npm start
```

## Environment variables

Inferred from code (no `.env.example` committed; `.env*` is gitignored):

| Variable | Used for |
|----------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key fallback |
| `SUPABASE_SERVICE_KEY` | Preferred server key |
| `NEXT_PUBLIC_SITE_URL` | Canonical site base (default `https://edgeforgarments.com`) |
| `GMAIL_USER` | SMTP sender |
| `GMAIL_APP_PASSWORD` | Gmail app password |
| `CONTACT_EMAIL` | Admin inbox (defaults to `info@edgeforgarments.com` in some routes) |
| `OPENROUTER_API_KEY` | Chatbot |
| `OPENROUTER_MODEL` | Optional model override (default `openai/gpt-4o-mini`) |
| `NODE_ENV` | Cookie `secure` flag |

## Database setup

1. Create a Supabase project.
2. Run `lib/supabase-schema.sql` and/or `lib/seed-data.sql` in the SQL Editor.
3. Point env vars at the project.

## Hosting assumptions

- **Assumption:** Deployed as a Next.js app on Vercel (or similar).
- No reverse-proxy configs (nginx/Caddy), Dockerfiles, or cloud IaC in-repo.
- No GitHub Actions / CI pipelines found.
- Image remote hosts must remain listed in `next.config.ts` `images.remotePatterns`.

## Operational caveats

- `public/uploads` persistence depends on host filesystem behavior.
- Seed admin password in SQL is for bootstrap only and should be rotated in any real environment.

---

# Challenges Solved

### Bilingual EN/AR with true RTL

**Problem:** Marketing sites often bolt on translation without layout direction.  
**Solution:** Locale-prefixed routes, middleware language detection, dictionary system, `dir` on `<html>`, Cairo font for Arabic, and bilingual DB columns so CMS content is first-class in both languages.

### Lead qualification without a heavy CRM

**Problem:** Free-text contact forms produce low-quality manufacturing leads.  
**Solution:** Guided AI Agent form with multi-select constraints and structured fields mapped into `form_submissions`, plus status workflow in admin (`new` → `contacted` → `completed` / `cancelled`).

### Conversational sales assist + structured CRM rows

**Problem:** Chatbots answer FAQs but lose commercial intent.  
**Solution:** Large grounded system prompt for EDGE; scripted order Q&A; regex extraction of Egyptian/international phones and emails; heuristic extraction of garment type/quantity/location; insert into the same `form_submissions` table used by the form.

### CMS resilience when backend is down

**Problem:** Marketing site should not blank the catalog if Supabase blips.  
**Solution:** Products API and product pages fall back to `data/products.json`.

### Admin UX without a separate CMS product

**Problem:** Non-technical staff need to edit bilingual content.  
**Solution:** Cookie-gated admin UI for CRUD on posts/products and submission management, with local image upload for media.

### Multilingual chatbot UX

**Problem:** International buyers may write in languages beyond EN/AR.  
**Solution:** System prompt forces language mirroring; client persists chat 24h; special tokens trigger UI scroll to the quote form.

### Email dual-path notifications

**Problem:** Staff and customers both need acknowledgment.  
**Solution:** Nodemailer sends branded HTML to `CONTACT_EMAIL` and confirmation messages to the submitter where an email exists.

---

# Engineering Decisions

### Next.js monolith vs separate API

**Decision:** Keep UI + API in one Next.js app.  
**Trade-off:** Faster delivery and shared types/env; weaker isolation and harder independent scaling of AI/email workloads.

### Custom i18n dictionaries vs next-intl

**Decision:** Hand-rolled `dictionaries.ts` + middleware.  
**Trade-off:** Full control and no extra dependency; larger manual maintenance cost and duplicated translation objects in some admin pages.

### Supabase without Prisma

**Decision:** SQL files + Supabase client.  
**Trade-off:** Quick to stand up; weaker compile-time schema guarantees and no migration history in-repo.

### Cookie flag auth vs full auth provider

**Decision:** Simple `admin_auth` cookie for a tiny admin surface.  
**Trade-off:** Minimal complexity for one operator; insufficient for multi-user orgs, audit trails, or secure API authorization.

### OpenRouter instead of a single vendor SDK

**Decision:** Call OpenRouter’s OpenAI-compatible API.  
**Trade-off:** Model flexibility via env; adds a proxy dependency and requires careful prompt size/cost control (`max_tokens: 300`).

### Synchronous email in request handlers

**Decision:** Send mail during the request.  
**Trade-off:** Simple and immediate; no retry/backoff; vulnerable to SMTP timeouts.

### JSONB `answers` plus denormalized columns

**Decision:** Store full Q&A JSON and extract key fields for filtering.  
**Trade-off:** Flexible form evolution; some duplication and string-matching when mapping answers to columns.

### Permissive RLS + service key

**Decision:** Enable RLS with open policies; use service key server-side.  
**Trade-off:** Unblocks development; must not be mistaken for strong multi-tenant security.

---

# Folder Structure

```
Edge/
├── app/
│   ├── [locale]/          # Primary localized site + admin
│   │   ├── admin/         # Dashboard, login, blog/product editors, submissions
│   │   ├── about|blog|contact|products|production-process/
│   │   ├── components/    # Shared localized UI (Navbar, Chatbot, animations)
│   │   └── sections/      # Home page sections (Hero, AI form, FAQ, …)
│   ├── api/               # Route handlers (auth, CMS, forms, chat, upload)
│   ├── i18n/              # Locale config + dictionaries
│   ├── components|sections|...  # Legacy / non-locale leftovers
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Redirects `/` → `/en`
├── data/                  # products.json, blog-posts.json/csv fallbacks
├── lib/                   # supabase client, schema.sql, seed-data.sql
├── public/                # Static assets, logos, uploads/
├── middleware.ts          # Locale + admin gate
├── next.config.ts         # Remote image patterns
├── package.json
├── GEMINI.md              # Internal project notes for AI tooling
└── README.md              # This document
```

---

# Resume Highlights

- Built a bilingual **Next.js 16 / React 19** corporate platform with full **EN/AR RTL** support, locale middleware, and SEO metadata (`hreflang`, Open Graph) for an export-oriented garment manufacturer.
- Designed a **lead-qualification funnel** combining a multi-step quote form, contact/newsletter email pipelines, and an AI chatbot that writes structured rows into PostgreSQL via Supabase.
- Implemented an **OpenRouter-powered multilingual assistant** with grounded company knowledge, order-flow prompting, and automated phone/email extraction into a shared CRM-lite submissions table.
- Delivered a **cookie-authenticated admin CMS** for bilingual products and blog posts, including image upload, featured flags, and submission status/notes workflows.
- Modeled a **PostgreSQL schema** (admins, products, blog posts, form submissions with JSONB answers) and shipped SQL seed/schema scripts for reproducible Supabase setup.
- Engineered **graceful degradation** for the product catalog by falling back to static JSON when Supabase is unavailable, keeping the marketing site readable during backend outages.
- Integrated **Nodemailer/Gmail** for dual admin notification and customer confirmation emails across contact, newsletter, and AI-agent form flows.
- Organized a scalable **App Router module structure** (locale pages, section components, typed dictionaries, centralized API routes) suitable for ongoing content and funnel iteration.
- Applied **Next.js image optimization** with explicit remote allowlists for CDN/marketing assets while serving local factory and brand media from `public/`.
- Documented and operated the stack with TypeScript, Tailwind CSS 4, ESLint, and environment-driven configuration for Supabase, SMTP, and LLM providers.

---

# Interview Talking Points

**Q: Why App Router Route Handlers instead of a standalone Express/Nest API?**  
**A:** The product is a content + lead site, not a high-throughput domain service. Colocating UI and API reduced deployment surface area and shared env/config. The trade-off is that long-running AI/email work shares the web request path and would later need extraction to a queue.

**Q: How does internationalization work, and why not a library?**  
**A:** Locales are first-class URL segments. Middleware enforces prefixes and detects Arabic from `Accept-Language`. Copy lives in typed dictionaries; CMS fields are duplicated `_en`/`_ar` in Postgres so editors control both languages. A custom system avoided dependency lock-in at the cost of manual string management.

**Q: Walk through the chatbot → CRM pipeline.**  
**A:** The client posts message history to `/api/chat`. The server optionally extracts phone/email with regex, heuristically derives order fields, inserts into `form_submissions`, then calls OpenRouter with a large system prompt. The response may include a UI directive stripped before display. Persistence of chat UX state is client `localStorage`, not server sessions.

**Q: How is admin auth secured today, and what would you change?**  
**A:** Today: HttpOnly cookie set after username/password check, middleware on admin pages. Gaps: plaintext password compare, hardcoded fallback, and unauthenticated API mutations. Hardening: bcrypt/argon2, remove fallback, verify session on every mutating route, rotate cookies, tighten Supabase RLS, move uploads to signed object storage.

**Q: Why JSONB `answers` plus denormalized columns?**  
**A:** Forms change; JSONB preserves the full transcript for sales review. Denormalized fields support dashboard filtering (garment type, quantity, status) without parsing JSON in every query. Duplication is acceptable at this lead volume.

**Q: How do you handle failure of Supabase on the public site?**  
**A:** Product listing/detail prefer Supabase then fall back to committed JSON. Blog API returns an empty list on error. Auth falls back to local credentials. This keeps marketing up; it does not sync writes back to JSON.

**Q: Where are the scalability bottlenecks?**  
**A:** Synchronous OpenRouter + SMTP in request handlers; large system prompt tokens; local disk uploads on serverless; single admin cookie model; permissive DB policies. Horizontal scale of the Next app is easy; reliability of side effects needs queues and object storage.

**Q: Is there multi-tenancy?**  
**A:** No. Single company, single admin model, shared tables.

**Q: How would you add proper authorization to write APIs quickly?**  
**A:** Shared helper reading `admin_auth` (or better, a signed session/JWT) at the top of POST/PUT/PATCH/DELETE handlers; return 401 otherwise. Optionally migrate to Supabase Auth and use user JWT with RLS policies that only allow authenticated service roles to mutate CMS tables.

**Q: What is intentionally out of scope?**  
**A:** Pricing engines, inventory, production planning, payments, customer accounts, and automated quote PDFs. The system stops at qualified lead capture and content management.

---

# Future Improvements

- Server-side auth checks on all mutating `/api` routes; remove hardcoded fallback credentials.
- Replace plaintext `password_hash` with bcrypt/argon2; consider Supabase Auth or NextAuth.
- Move uploads to Supabase Storage or S3 with signed URLs; do not rely on ephemeral disk.
- Introduce an email/AI job queue (e.g. Inngest, BullMQ) with retries and dead-letter handling.
- Add Zod (or similar) request validation and consistent error envelopes.
- Tighten Supabase RLS: public insert/select only where required; deny anonymous CMS writes.
- Persist newsletter subscribers in a table; currently email-only.
- Automated tests: API route tests, middleware locale/auth tests, critical form E2E.
- CI/CD pipeline (lint, typecheck, build) and environment-specific configs.
- Rate limiting on `/api/chat`, `/api/contact`, and `/api/ai-agent-form` to control cost/abuse.
- Structured logging/observability (request IDs, OpenRouter latency, SMTP failures).
- Optional: stream chatbot responses; trim system prompt or move FAQs to retrieval (RAG) to reduce tokens.
- Deprecate leftover non-locale `app/*` pages once fully unused.

---

# Keywords

Next.js, React, TypeScript, App Router, Tailwind CSS, Supabase, PostgreSQL, REST API, Route Handlers, Nodemailer, Gmail SMTP, OpenRouter, LLM integration, chatbot, bilingual i18n, RTL, Arabic localization, SEO, Open Graph, CMS, admin dashboard, lead generation, B2B manufacturing, denim OEM, private label, form submissions, JSONB, cookie authentication, middleware, file upload, serverless, Vercel, Node.js, Edge for Garments, Port Said, Egypt export manufacturing, CRM-lite, content management, AI agent form, multilingual NLP heuristics

---

# Executive Summary

**EDGE for Garments** is a Next.js 16 + React 19 + TypeScript marketing and lead-generation platform for an Egyptian denim/woven garment manufacturer. It delivers a fully bilingual English/Arabic public site (locale-prefixed routes, RTL, SEO metadata) covering company story, products, production process, blog/news, certifications, and contact.

The commercial core is inbound qualification: a multi-step AI Agent quote form, contact and newsletter email flows (Nodemailer/Gmail), and a multilingual OpenRouter-powered chatbot that can run an order conversation and persist extracted contact and requirement data into Supabase PostgreSQL (`form_submissions`). Staff use a cookie-authenticated admin dashboard to manage bilingual products and blog posts, upload images to `public/uploads`, and triage submission status/notes.

Data access uses the Supabase JS client against SQL-defined tables (`admin_users`, `blog_posts`, `products`, `form_submissions`) with seed/schema scripts checked into `lib/`. Product reads degrade to static JSON when the database is unavailable. There is no Prisma, no Docker, no background job system, no RBAC, and no automated test suite in the repository. Authentication is a simple HttpOnly admin cookie; API write routes are not uniformly session-protected—important context for production hardening discussions.

For resumes and interviews, emphasize: bilingual App Router architecture, structured B2B lead capture, LLM-assisted sales chatbot grounded in company knowledge, Supabase-backed CMS, and pragmatic resilience patterns—while being candid that auth, RLS, uploads, and async side effects remain intentionally simple and are clear next-step engineering work.

---

## Quick Start (developers)

```bash
npm install
# Configure .env.local (Supabase, Gmail, OpenRouter, site URL)
# Apply lib/supabase-schema.sql in Supabase SQL Editor
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — root redirects to `/en`. Admin: `/{locale}/admin/login`.
`)
