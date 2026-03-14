# Project Setup

## Prerequisites
- Node.js 20+
- npm 10+
- Supabase project (URL + anon key + service role key)

## Environment
Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Update with valid Supabase credentials.

## Install and Run
```bash
npm install
npm run dev
```

## Tests
```bash
npm test
npm run test:e2e
```

## Database Migration
Apply SQL under:

`supabase/migrations/202603140001_initial_schema.sql`

Then seed medication reference data:

`supabase/seed.sql`
