alter table bookings
  add column if not exists privacy_consent boolean not null default false,
  add column if not exists health_consent boolean not null default false,
  add column if not exists policy_version text not null default 'pre-2026-09-04';

create index if not exists bookings_created_at_idx on bookings (created_at);
