# Virtual Healthcare Platform

Production-ready API-first telehealth platform initialized with the required architecture, stack, and schema.

## Stack
- Next.js (App Router)
- Supabase (PostgreSQL + RLS + Auth)
- Tailwind CSS + shadcn-style UI patterns + Headless UI
- React Hook Form + Zod
- TanStack Query + Redux Toolkit
- Vitest + Playwright

## Modules
- Authentication
- Patients
- Providers
- Appointments
- Video consultations (integration scaffolding)
- Medical records and clinical notes
- Prescriptions
- Messaging + notifications
- Billing + claims
- Analytics

## API Pattern
Every module follows:
- `controller.js`
- `service.js`
- `repository.js`
- `schema.js`

## Key Paths
- App routes: `app/`
- API routes: `app/api/`
- Services: `services/`
- Global state: `store/`
- Shared components: `components/`
- Database schema: `supabase/migrations/`
- Project context docs: `doc/`

## Quick Start
```bash
cp .env.example .env.local
npm install
npm run dev
```

Open: `http://localhost:3000`
