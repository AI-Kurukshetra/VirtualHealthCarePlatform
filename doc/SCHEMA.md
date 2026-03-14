# Database Schema Documentation

Canonical migration file: `supabase/migrations/202603140001_initial_schema.sql`

## Core Tables
- organizations
- users
- patients
- providers
- appointments
- medical_records
- clinical_notes
- care_plans
- prescriptions
- medications
- allergies
- lab_orders
- lab_results
- messages
- notifications
- billing
- claims
- audit_logs

## Tenant Isolation
- Organization-scoped tables include `organization_id`.
- RLS is enabled with policies mapped to authenticated user organization membership.

## Indexed Fields
- patient_id
- provider_id
- organization_id
- appointment_date
- created_at
