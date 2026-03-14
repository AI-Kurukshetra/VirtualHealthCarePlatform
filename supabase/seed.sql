-- Virtual Healthcare Platform seed data
-- Inserts dummy data into all core tables in FK-safe order.
-- Idempotent: safe to run multiple times.

-- Fixed IDs to keep references stable across reruns.
-- org
--   00000000-0000-4000-8000-000000000001
-- users/auth.users
--   00000000-0000-4000-8000-000000000101 (admin)
--   00000000-0000-4000-8000-000000000102 (patient)
--   00000000-0000-4000-8000-000000000103 (provider)
-- patient/provider/etc.
--   00000000-0000-4000-8000-000000000201+ used below

insert into public.organizations (id, name, slug)
values (
  '00000000-0000-4000-8000-000000000001',
  'Hackathon Health Demo Org',
  'hackathon-health-demo'
)
on conflict (id) do update set
  name = excluded.name,
  slug = excluded.slug;

-- Seed corresponding auth identities so public.users FK is satisfied.
insert into auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
select
  '00000000-0000-4000-8000-000000000101'::uuid,
  'authenticated',
  'authenticated',
  'admin.demo@vhp.local',
  crypt('DemoPassword#123', gen_salt('bf')),
  timezone('utc', now()),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"name":"System Admin"}'::jsonb,
  timezone('utc', now()),
  timezone('utc', now())
where not exists (
  select 1 from auth.users where id = '00000000-0000-4000-8000-000000000101'::uuid or email = 'admin.demo@vhp.local'
);

insert into auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
select
  '00000000-0000-4000-8000-000000000102'::uuid,
  'authenticated',
  'authenticated',
  'patient.demo@vhp.local',
  crypt('DemoPassword#123', gen_salt('bf')),
  timezone('utc', now()),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"name":"Patient Demo"}'::jsonb,
  timezone('utc', now()),
  timezone('utc', now())
where not exists (
  select 1 from auth.users where id = '00000000-0000-4000-8000-000000000102'::uuid or email = 'patient.demo@vhp.local'
);

insert into auth.users (
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
)
select
  '00000000-0000-4000-8000-000000000103'::uuid,
  'authenticated',
  'authenticated',
  'provider.demo@vhp.local',
  crypt('DemoPassword#123', gen_salt('bf')),
  timezone('utc', now()),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"name":"Provider Demo"}'::jsonb,
  timezone('utc', now()),
  timezone('utc', now())
where not exists (
  select 1 from auth.users where id = '00000000-0000-4000-8000-000000000103'::uuid or email = 'provider.demo@vhp.local'
);

insert into public.users (id, email, role, organization_id)
values
  ('00000000-0000-4000-8000-000000000101', 'admin.demo@vhp.local', 'admin', '00000000-0000-4000-8000-000000000001'),
  ('00000000-0000-4000-8000-000000000102', 'patient.demo@vhp.local', 'patient', '00000000-0000-4000-8000-000000000001'),
  ('00000000-0000-4000-8000-000000000103', 'provider.demo@vhp.local', 'provider', '00000000-0000-4000-8000-000000000001')
on conflict (id) do update set
  email = excluded.email,
  role = excluded.role,
  organization_id = excluded.organization_id;

insert into public.patients (
  id,
  user_id,
  organization_id,
  first_name,
  last_name,
  date_of_birth,
  gender,
  phone,
  address,
  insurance_id
)
values (
  '00000000-0000-4000-8000-000000000201',
  '00000000-0000-4000-8000-000000000102',
  '00000000-0000-4000-8000-000000000001',
  'Alex',
  'Carter',
  '1993-08-14',
  'female',
  '+1-555-0101',
  '100 Demo Street, Austin, TX',
  'INS-DEM-1001'
)
on conflict (id) do update set
  user_id = excluded.user_id,
  organization_id = excluded.organization_id,
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  date_of_birth = excluded.date_of_birth,
  gender = excluded.gender,
  phone = excluded.phone,
  address = excluded.address,
  insurance_id = excluded.insurance_id;

insert into public.providers (
  id,
  user_id,
  organization_id,
  specialization,
  license_number,
  years_of_experience
)
values (
  '00000000-0000-4000-8000-000000000301',
  '00000000-0000-4000-8000-000000000103',
  '00000000-0000-4000-8000-000000000001',
  'Family Medicine',
  'TX-LIC-44521',
  9
)
on conflict (id) do update set
  user_id = excluded.user_id,
  organization_id = excluded.organization_id,
  specialization = excluded.specialization,
  license_number = excluded.license_number,
  years_of_experience = excluded.years_of_experience;

insert into public.appointments (
  id,
  organization_id,
  patient_id,
  provider_id,
  patient_name,
  appointment_date,
  status,
  notes
)
values (
  '00000000-0000-4000-8000-000000000401',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000201',
  '00000000-0000-4000-8000-000000000301',
  'Alex Carter',
  timezone('utc', now()) + interval '1 day',
  'scheduled',
  'Initial telehealth consultation'
)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  patient_id = excluded.patient_id,
  provider_id = excluded.provider_id,
  patient_name = excluded.patient_name,
  appointment_date = excluded.appointment_date,
  status = excluded.status,
  notes = excluded.notes;

insert into public.medical_records (id, organization_id, patient_id, record_type, summary)
values (
  '00000000-0000-4000-8000-000000000501',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000201',
  'history_and_physical',
  'Patient reports intermittent headaches for 2 weeks; no red flags.'
)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  patient_id = excluded.patient_id,
  record_type = excluded.record_type,
  summary = excluded.summary;

insert into public.clinical_notes (
  id,
  organization_id,
  patient_id,
  provider_id,
  appointment_id,
  note_type,
  content
)
values (
  '00000000-0000-4000-8000-000000000601',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000201',
  '00000000-0000-4000-8000-000000000301',
  '00000000-0000-4000-8000-000000000401',
  'SOAP',
  'S: mild headache. O: stable vitals. A: tension headache. P: hydration, rest, follow-up.'
)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  patient_id = excluded.patient_id,
  provider_id = excluded.provider_id,
  appointment_id = excluded.appointment_id,
  note_type = excluded.note_type,
  content = excluded.content;

insert into public.care_plans (
  id,
  organization_id,
  patient_id,
  provider_id,
  title,
  goals,
  interventions,
  status,
  start_date,
  end_date
)
values (
  '00000000-0000-4000-8000-000000000701',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000201',
  '00000000-0000-4000-8000-000000000301',
  'Headache Management Plan',
  'Reduce headache episodes to <=1 per week within 30 days',
  'Hydration tracking, sleep hygiene, stress management coaching',
  'active',
  current_date,
  current_date + 30
)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  patient_id = excluded.patient_id,
  provider_id = excluded.provider_id,
  title = excluded.title,
  goals = excluded.goals,
  interventions = excluded.interventions,
  status = excluded.status,
  start_date = excluded.start_date,
  end_date = excluded.end_date;

insert into public.prescriptions (
  id,
  organization_id,
  patient_id,
  provider_id,
  medication_name,
  dosage,
  frequency,
  duration,
  status
)
values (
  '00000000-0000-4000-8000-000000000801',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000201',
  '00000000-0000-4000-8000-000000000301',
  'Acetaminophen',
  '500 mg',
  'Every 8 hours as needed',
  '5 days',
  'active'
)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  patient_id = excluded.patient_id,
  provider_id = excluded.provider_id,
  medication_name = excluded.medication_name,
  dosage = excluded.dosage,
  frequency = excluded.frequency,
  duration = excluded.duration,
  status = excluded.status;

insert into public.medications (id, name, description, side_effects)
values
  (
    '00000000-0000-4000-8000-000000000901',
    'Acetaminophen',
    'Pain reliever and fever reducer',
    'Nausea, rash, headache'
  ),
  (
    '00000000-0000-4000-8000-000000000902',
    'Amoxicillin',
    'Broad-spectrum antibiotic',
    'Diarrhea, rash, nausea'
  ),
  (
    '00000000-0000-4000-8000-000000000903',
    'Lisinopril',
    'ACE inhibitor for hypertension',
    'Dry cough, dizziness, fatigue'
  )
on conflict (name) do update set
  description = excluded.description,
  side_effects = excluded.side_effects;

insert into public.allergies (id, patient_id, allergy_name, severity, reaction)
values (
  '00000000-0000-4000-8000-000000001001',
  '00000000-0000-4000-8000-000000000201',
  'Penicillin',
  'moderate',
  'Skin rash'
)
on conflict (id) do update set
  patient_id = excluded.patient_id,
  allergy_name = excluded.allergy_name,
  severity = excluded.severity,
  reaction = excluded.reaction;

insert into public.lab_orders (
  id,
  organization_id,
  patient_id,
  provider_id,
  test_type,
  status
)
values (
  '00000000-0000-4000-8000-000000001101',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000201',
  '00000000-0000-4000-8000-000000000301',
  'Complete Blood Count (CBC)',
  'ordered'
)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  patient_id = excluded.patient_id,
  provider_id = excluded.provider_id,
  test_type = excluded.test_type,
  status = excluded.status;

insert into public.lab_results (
  id,
  organization_id,
  lab_order_id,
  result_data,
  result_date
)
values (
  '00000000-0000-4000-8000-000000001201',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000001101',
  '{"hemoglobin":"13.4 g/dL","wbc":"7.1 x10^9/L","platelets":"250 x10^9/L"}'::jsonb,
  timezone('utc', now())
)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  lab_order_id = excluded.lab_order_id,
  result_data = excluded.result_data,
  result_date = excluded.result_date;

insert into public.messages (
  id,
  organization_id,
  sender_id,
  receiver_id,
  message
)
values (
  '00000000-0000-4000-8000-000000001301',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000103',
  '00000000-0000-4000-8000-000000000102',
  'Please complete your hydration log before tomorrow''s appointment.'
)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  sender_id = excluded.sender_id,
  receiver_id = excluded.receiver_id,
  message = excluded.message;

insert into public.notifications (id, user_id, type, content, is_read)
values (
  '00000000-0000-4000-8000-000000001401',
  '00000000-0000-4000-8000-000000000102',
  'appointment_reminder',
  'You have a scheduled consultation in 24 hours.',
  false
)
on conflict (id) do update set
  user_id = excluded.user_id,
  type = excluded.type,
  content = excluded.content,
  is_read = excluded.is_read;

insert into public.billing (
  id,
  organization_id,
  patient_id,
  appointment_id,
  amount,
  status
)
values (
  '00000000-0000-4000-8000-000000001501',
  '00000000-0000-4000-8000-000000000001',
  '00000000-0000-4000-8000-000000000201',
  '00000000-0000-4000-8000-000000000401',
  120.00,
  'pending'
)
on conflict (id) do update set
  organization_id = excluded.organization_id,
  patient_id = excluded.patient_id,
  appointment_id = excluded.appointment_id,
  amount = excluded.amount,
  status = excluded.status;

insert into public.claims (
  id,
  billing_id,
  insurance_provider,
  claim_status,
  submitted_at,
  processed_at
)
values (
  '00000000-0000-4000-8000-000000001601',
  '00000000-0000-4000-8000-000000001501',
  'Demo Insurance Co',
  'submitted',
  timezone('utc', now()),
  null
)
on conflict (id) do update set
  billing_id = excluded.billing_id,
  insurance_provider = excluded.insurance_provider,
  claim_status = excluded.claim_status,
  submitted_at = excluded.submitted_at,
  processed_at = excluded.processed_at;

insert into public.audit_logs (
  id,
  user_id,
  action,
  entity_type,
  entity_id,
  timestamp,
  metadata
)
values (
  '00000000-0000-4000-8000-000000001701',
  '00000000-0000-4000-8000-000000000101',
  'seed_insert',
  'system',
  '00000000-0000-4000-8000-000000000001',
  timezone('utc', now()),
  '{"source":"supabase/seed.sql","note":"Initial demo data"}'::jsonb
)
on conflict (id) do update set
  user_id = excluded.user_id,
  action = excluded.action,
  entity_type = excluded.entity_type,
  entity_id = excluded.entity_id,
  timestamp = excluded.timestamp,
  metadata = excluded.metadata;
