alter table public.appointments
  add column if not exists patient_name text;

update public.appointments
set patient_name = coalesce(patient_name, 'Unknown Patient')
where patient_name is null;

alter table public.appointments
  alter column patient_name set not null,
  alter column patient_id drop not null,
  alter column provider_id drop not null;
