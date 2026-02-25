# Referral Dashboard

A minimal SaaS referral/affiliate management dashboard — a portfolio project inspired by [Tolt](https://tolt.com).

## Architecture

| Layer | Tech |
|-------|------|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS |
| **Backend** | Node.js, Express 4, TypeScript |
| **Database** | PostgreSQL 16, Prisma ORM |
| **Auth** | JWT (email + password, bcrypt hashing) |
| **AI** | OpenAI API (with mock fallback) |

### Folder Structure

```
backend/
├── prisma/           # Schema, migrations, seed
└── src/
    ├── controllers/  # Request handling
    ├── services/     # Business logic
    ├── routes/       # Route definitions
    ├── schemas/      # Zod validation
    ├── middleware/    # Auth, validation, error handling
    └── lib/          # JWT, logger utilities

frontend/
└── src/
    ├── app/          # Next.js App Router pages
    ├── components/   # Reusable React components
    └── lib/          # API client, auth helpers
```

## Quick Start

### Option 1: Docker (recommended)

```bash
# Clone and start everything
cp .env.example .env
docker-compose up --build

# In another terminal, seed the database
docker-compose exec backend npx prisma db seed

# Start the frontend
cd frontend && npm install && npm run dev
```

### Option 2: Local Development

**Prerequisites**: Node.js 20+, PostgreSQL running locally.

```bash
# 1. Start Postgres (or use docker-compose for just the DB)
docker-compose up postgres

# 2. Backend
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev                 # → http://localhost:4000

# 3. Frontend
cd frontend
npm install
npm run dev                 # → http://localhost:3000
```

### Demo Credentials

| Field    | Value              |
|----------|--------------------|
| Email    | demo@example.com   |
| Password | password123        |

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|:----:|-------------|
| POST | `/api/auth/signup` | ✗ | Create account |
| POST | `/api/auth/login` | ✗ | Login, get JWT |
| GET | `/api/auth/me` | ✓ | Current user |
| GET | `/api/campaigns` | ✓ | List campaigns + stats |
| POST | `/api/campaigns` | ✓ | Create campaign |
| GET | `/api/campaigns/:id` | ✓ | Campaign detail |
| PUT | `/api/campaigns/:id` | ✓ | Update campaign |
| DELETE | `/api/campaigns/:id` | ✓ | Delete campaign |
| GET | `/api/campaigns/:id/events` | ✓ | Recent events |
| GET | `/api/campaigns/:id/insights` | ✓ | AI insight |
| GET | `/r/:campaignId/:token` | ✗ | Record click |
| POST | `/api/convert` | ✗ | Record conversion (idempotent) |

## Design Decisions

- **Three-layer backend**: Routes → Controllers → Services. Controllers are thin; all business logic lives in services.
- **Zod validation**: Every endpoint validates input via Zod middleware, returning structured 400 errors.
- **Idempotent conversions**: The `/api/convert` endpoint uses a unique `referenceId` — calling twice with the same ID is a no-op.
- **Stats on-demand**: Click/conversion counts are computed via aggregate queries, not denormalised counters. Correct and simple at this scale.
- **AI fallback**: If `OPENAI_API_KEY` is `sk-mock`, the insight endpoint returns a deterministic mock response derived from the stats.
