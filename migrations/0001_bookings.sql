create table if not exists bookings (
  id bigint generated always as identity primary key,
  service text not null,
  booking_date date not null,
  start_minute integer not null,
  end_minute integer not null,
  name text not null,
  email text not null,
  phone text not null,
  instagram text not null default '',
  placement text not null default '',
  size text not null default '',
  description text not null,
  first_tattoo boolean not null default false,
  allergies text not null default '',
  reference_url text not null default '',
  locale text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  check (start_minute >= 0 and end_minute > start_minute and end_minute <= 1440),
  check (status in ('pending', 'confirmed', 'cancelled'))
);

create table if not exists booking_slot_quarters (
  booking_id bigint not null references bookings(id) on delete cascade,
  booking_date date not null,
  slot_minute integer not null,
  primary key (booking_date, slot_minute),
  check (slot_minute >= 0 and slot_minute < 1440 and slot_minute % 15 = 0)
);

create index if not exists bookings_date_idx on bookings (booking_date, start_minute);
