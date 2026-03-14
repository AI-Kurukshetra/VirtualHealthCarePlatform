# Architecture Decisions

## ADR-001: Framework and Platform
- Decision: Next.js App Router + Supabase backend.
- Reason: Aligns with required stack and enables API-first, server/client hybrid architecture.

## ADR-002: API Layer Pattern
- Decision: All modules follow controller/service/repository/schema structure.
- Reason: Enforces consistency, validation boundaries, and testability.

## ADR-003: Multi-Tenant Isolation
- Decision: Organization-scoped data with `organization_id` and Postgres RLS policies.
- Reason: Ensures tenant isolation and secure healthcare data access.

## ADR-004: State Management
- Decision: Redux Toolkit for global session/UI state and TanStack Query for server state.
- Reason: Separates deterministic local UI state from async server cache concerns.
