-- Run once in the Supabase SQL editor. No browser access to guest information.
create table if not exists public.rsvp (
 id uuid primary key default gen_random_uuid(),
 guest_name text not null check(char_length(guest_name) between 2 and 120),
 attendance boolean not null,
 guest_count integer not null check(guest_count between 0 and 6),
 message text not null default '' check(char_length(message)<=1000),
 dietary_restrictions text not null default '' check(char_length(dietary_restrictions)<=500),
 created_at timestamptz not null default now(),
 constraint attendance_count check((attendance and guest_count>=1) or (not attendance and guest_count=0))
);
-- Basic deduplication. Namesakes must contact hosts; this is not guest identity verification.
create unique index if not exists rsvp_guest_name_unique on public.rsvp (lower(regexp_replace(btrim(guest_name),'\s+',' ','g')));
alter table public.rsvp enable row level security;
revoke all on public.rsvp from anon, authenticated;
-- Only the server service_role may insert/read. /admin separately verifies an allowlisted Auth user.
grant select,insert on public.rsvp to service_role;
