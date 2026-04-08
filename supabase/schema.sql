-- NepRemit Supabase Schema
-- Run this in the Supabase SQL Editor to set up your database

-- ============================================
-- 1. Profiles table (extends Supabase Auth)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text not null,
  image text,
  phone text,
  country text not null default 'US',
  default_currency text not null default 'USD',
  notifications_rate_alerts boolean not null default true,
  notifications_weekly_digest boolean not null default true,
  notifications_promotions boolean not null default false,
  notifications_product_updates boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ============================================
-- 2. Rate Alerts table
-- ============================================
create table public.rate_alerts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  currency_pair text not null,
  base_currency text not null,
  target_currency text not null default 'NPR',
  target_rate numeric not null check (target_rate > 0),
  direction text not null check (direction in ('above', 'below')),
  is_active boolean not null default true,
  triggered_at timestamptz,
  last_notified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index idx_rate_alerts_user_active on public.rate_alerts(user_id, is_active);
create index idx_rate_alerts_active_pair on public.rate_alerts(is_active, currency_pair);

-- Enable RLS
alter table public.rate_alerts enable row level security;

-- Rate alerts policies
create policy "Users can view their own alerts"
  on public.rate_alerts for select
  using (auth.uid() = user_id);

create policy "Users can create their own alerts"
  on public.rate_alerts for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own alerts"
  on public.rate_alerts for update
  using (auth.uid() = user_id);

create policy "Users can delete their own alerts"
  on public.rate_alerts for delete
  using (auth.uid() = user_id);

-- ============================================
-- 3. Auto-create profile on signup
-- ============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, image)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================
-- 4. Auto-update updated_at timestamp
-- ============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger rate_alerts_updated_at
  before update on public.rate_alerts
  for each row execute procedure public.handle_updated_at();
