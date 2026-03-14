-- Virtual Healthcare Platform: initial production schema
-- PostgreSQL / Supabase

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null check (role in ('patient', 'provider', 'admin', 'system_admin')),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.patients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete restrict,
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  gender text not null,
  phone text,
  address text,
  insurance_id text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references public.users(id) on delete cascade,
  organization_id uuid not null references public.organizations(id) on delete restrict,
  specialization text not null,
  license_number text not null,
  years_of_experience integer check (years_of_experience >= 0),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  patient_id uuid not null references public.patients(id) on delete restrict,
  provider_id uuid not null references public.providers(id) on delete restrict,
  appointment_date timestamptz not null,
  status text not null check (status in ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.medical_records (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  patient_id uuid not null references public.patients(id) on delete cascade,
  record_type text not null,
  summary text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.clinical_notes (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  patient_id uuid not null references public.patients(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  appointment_id uuid references public.appointments(id) on delete set null,
  note_type text not null,
  content text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.care_plans (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  patient_id uuid not null references public.patients(id) on delete cascade,
  provider_id uuid references public.providers(id) on delete set null,
  title text not null,
  goals text not null,
  interventions text not null,
  status text not null,
  start_date date,
  end_date date,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.prescriptions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  patient_id uuid not null references public.patients(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  medication_name text not null,
  dosage text not null,
  frequency text not null,
  duration text not null,
  status text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.medications (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  side_effects text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.allergies (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  allergy_name text not null,
  severity text,
  reaction text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lab_orders (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  patient_id uuid not null references public.patients(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  test_type text not null,
  status text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.lab_results (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  lab_order_id uuid not null references public.lab_orders(id) on delete cascade,
  result_data jsonb not null,
  result_date timestamptz not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  sender_id uuid not null references public.users(id) on delete cascade,
  receiver_id uuid not null references public.users(id) on delete cascade,
  message text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null,
  content text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.billing (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete restrict,
  patient_id uuid not null references public.patients(id) on delete cascade,
  appointment_id uuid references public.appointments(id) on delete set null,
  amount numeric(12,2) not null check (amount >= 0),
  status text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  billing_id uuid not null references public.billing(id) on delete cascade,
  insurance_provider text not null,
  claim_status text not null,
  submitted_at timestamptz,
  processed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  timestamp timestamptz not null default timezone('utc', now()),
  metadata jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

-- Indexing strategy
create index if not exists idx_users_organization_id on public.users(organization_id);
create index if not exists idx_patients_organization_id on public.patients(organization_id);
create index if not exists idx_patients_created_at on public.patients(created_at desc);
create index if not exists idx_providers_organization_id on public.providers(organization_id);
create index if not exists idx_appointments_patient_id on public.appointments(patient_id);
create index if not exists idx_appointments_provider_id on public.appointments(provider_id);
create index if not exists idx_appointments_organization_id on public.appointments(organization_id);
create index if not exists idx_appointments_appointment_date on public.appointments(appointment_date desc);
create index if not exists idx_appointments_created_at on public.appointments(created_at desc);
create index if not exists idx_medical_records_patient_id on public.medical_records(patient_id);
create index if not exists idx_medical_records_organization_id on public.medical_records(organization_id);
create index if not exists idx_clinical_notes_patient_id on public.clinical_notes(patient_id);
create index if not exists idx_clinical_notes_provider_id on public.clinical_notes(provider_id);
create index if not exists idx_clinical_notes_organization_id on public.clinical_notes(organization_id);
create index if not exists idx_care_plans_patient_id on public.care_plans(patient_id);
create index if not exists idx_care_plans_provider_id on public.care_plans(provider_id);
create index if not exists idx_care_plans_organization_id on public.care_plans(organization_id);
create index if not exists idx_prescriptions_patient_id on public.prescriptions(patient_id);
create index if not exists idx_prescriptions_provider_id on public.prescriptions(provider_id);
create index if not exists idx_prescriptions_organization_id on public.prescriptions(organization_id);
create index if not exists idx_lab_orders_patient_id on public.lab_orders(patient_id);
create index if not exists idx_lab_orders_provider_id on public.lab_orders(provider_id);
create index if not exists idx_lab_orders_organization_id on public.lab_orders(organization_id);
create index if not exists idx_messages_organization_id on public.messages(organization_id);
create index if not exists idx_messages_created_at on public.messages(created_at desc);
create index if not exists idx_notifications_user_id on public.notifications(user_id);
create index if not exists idx_billing_organization_id on public.billing(organization_id);
create index if not exists idx_billing_patient_id on public.billing(patient_id);
create index if not exists idx_claims_billing_id on public.claims(billing_id);
create index if not exists idx_audit_logs_user_id on public.audit_logs(user_id);
create index if not exists idx_audit_logs_timestamp on public.audit_logs(timestamp desc);

-- Update triggers
create trigger set_updated_at_organizations before update on public.organizations for each row execute function public.set_updated_at();
create trigger set_updated_at_users before update on public.users for each row execute function public.set_updated_at();
create trigger set_updated_at_patients before update on public.patients for each row execute function public.set_updated_at();
create trigger set_updated_at_providers before update on public.providers for each row execute function public.set_updated_at();
create trigger set_updated_at_appointments before update on public.appointments for each row execute function public.set_updated_at();
create trigger set_updated_at_medical_records before update on public.medical_records for each row execute function public.set_updated_at();
create trigger set_updated_at_clinical_notes before update on public.clinical_notes for each row execute function public.set_updated_at();
create trigger set_updated_at_care_plans before update on public.care_plans for each row execute function public.set_updated_at();
create trigger set_updated_at_prescriptions before update on public.prescriptions for each row execute function public.set_updated_at();
create trigger set_updated_at_medications before update on public.medications for each row execute function public.set_updated_at();
create trigger set_updated_at_allergies before update on public.allergies for each row execute function public.set_updated_at();
create trigger set_updated_at_lab_orders before update on public.lab_orders for each row execute function public.set_updated_at();
create trigger set_updated_at_lab_results before update on public.lab_results for each row execute function public.set_updated_at();
create trigger set_updated_at_messages before update on public.messages for each row execute function public.set_updated_at();
create trigger set_updated_at_notifications before update on public.notifications for each row execute function public.set_updated_at();
create trigger set_updated_at_billing before update on public.billing for each row execute function public.set_updated_at();
create trigger set_updated_at_claims before update on public.claims for each row execute function public.set_updated_at();

-- RLS helper
create or replace function public.user_organization_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select u.organization_id from public.users u where u.id = auth.uid();
$$;

-- Enable RLS
alter table public.organizations enable row level security;
alter table public.users enable row level security;
alter table public.patients enable row level security;
alter table public.providers enable row level security;
alter table public.appointments enable row level security;
alter table public.medical_records enable row level security;
alter table public.clinical_notes enable row level security;
alter table public.care_plans enable row level security;
alter table public.prescriptions enable row level security;
alter table public.lab_orders enable row level security;
alter table public.lab_results enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.billing enable row level security;
alter table public.claims enable row level security;
alter table public.audit_logs enable row level security;

-- Generic organization-level policies
create policy organizations_select on public.organizations
for select to authenticated
using (id = public.user_organization_id());

create policy users_org_policy on public.users
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy patients_org_policy on public.patients
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy providers_org_policy on public.providers
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy appointments_org_policy on public.appointments
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy medical_records_org_policy on public.medical_records
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy clinical_notes_org_policy on public.clinical_notes
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy care_plans_org_policy on public.care_plans
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy prescriptions_org_policy on public.prescriptions
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy lab_orders_org_policy on public.lab_orders
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy lab_results_org_policy on public.lab_results
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy messages_org_policy on public.messages
for all to authenticated
using (
  organization_id = public.user_organization_id() and
  (sender_id = auth.uid() or receiver_id = auth.uid())
)
with check (organization_id = public.user_organization_id());

create policy billing_org_policy on public.billing
for all to authenticated
using (organization_id = public.user_organization_id())
with check (organization_id = public.user_organization_id());

create policy claims_org_policy on public.claims
for all to authenticated
using (
  exists (
    select 1
    from public.billing b
    where b.id = claims.billing_id
      and b.organization_id = public.user_organization_id()
  )
)
with check (
  exists (
    select 1
    from public.billing b
    where b.id = claims.billing_id
      and b.organization_id = public.user_organization_id()
  )
);

create policy notifications_owner_policy on public.notifications
for all to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy audit_logs_org_policy on public.audit_logs
for select to authenticated
using (
  exists (
    select 1
    from public.users u
    where u.id = audit_logs.user_id
      and u.organization_id = public.user_organization_id()
  )
);

-- Medications and allergies can be organization-independent references
alter table public.medications enable row level security;
alter table public.allergies enable row level security;

create policy medications_read_policy on public.medications
for select to authenticated
using (true);

create policy allergies_patient_org_policy on public.allergies
for all to authenticated
using (
  exists (
    select 1
    from public.patients p
    where p.id = allergies.patient_id
      and p.organization_id = public.user_organization_id()
  )
)
with check (
  exists (
    select 1
    from public.patients p
    where p.id = allergies.patient_id
      and p.organization_id = public.user_organization_id()
  )
);
