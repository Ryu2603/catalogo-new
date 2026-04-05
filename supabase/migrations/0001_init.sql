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

create table if not exists public.catalogs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  theme_mode text not null default 'system' check (theme_mode in ('light', 'dark', 'system')),
  pdf_title text,
  pdf_subtitle text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.catalog_memberships (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null references public.catalogs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default timezone('utc', now()),
  unique (catalog_id, user_id)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null references public.catalogs(id) on delete cascade,
  name text not null,
  color text not null default '#1e3a5f',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null references public.catalogs(id) on delete cascade,
  name text not null,
  code text,
  category_id uuid references public.categories(id) on delete set null,
  image_url text,
  price numeric(10,2),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.company_settings (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null unique references public.catalogs(id) on delete cascade,
  company_name text not null,
  legal_name text,
  cnpj text,
  email text,
  phone text,
  website text,
  address text,
  logo_url text,
  primary_color text not null default '#1e3a5f',
  accent_color text not null default '#0f172a',
  pdf_footer_text text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_categories_catalog_id on public.categories(catalog_id);
create index if not exists idx_products_catalog_id on public.products(catalog_id);
create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_memberships_user_catalog on public.catalog_memberships(user_id, catalog_id);

create trigger set_catalogs_updated_at
before update on public.catalogs
for each row execute function public.set_updated_at();

create trigger set_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger set_company_settings_updated_at
before update on public.company_settings
for each row execute function public.set_updated_at();

alter table public.catalogs enable row level security;
alter table public.catalog_memberships enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.company_settings enable row level security;

create or replace function public.current_catalog_role(target_catalog_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select cm.role
  from public.catalog_memberships cm
  where cm.catalog_id = target_catalog_id
    and cm.user_id = auth.uid()
  limit 1;
$$;

create or replace function public.is_catalog_member(target_catalog_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1
    from public.catalog_memberships cm
    where cm.catalog_id = target_catalog_id
      and cm.user_id = auth.uid()
  );
$$;

create or replace function public.can_edit_catalog(target_catalog_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_catalog_role(target_catalog_id) in ('admin','editor'), false);
$$;

create or replace function public.is_catalog_admin(target_catalog_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_catalog_role(target_catalog_id) = 'admin', false);
$$;

create policy "members can view catalogs"
on public.catalogs
for select
using (public.is_catalog_member(id));

create policy "admins can update catalogs"
on public.catalogs
for update
using (public.is_catalog_admin(id))
with check (public.is_catalog_admin(id));

create policy "members can view memberships of own catalogs"
on public.catalog_memberships
for select
using (public.is_catalog_member(catalog_id));

create policy "admins can manage memberships"
on public.catalog_memberships
for all
using (public.is_catalog_admin(catalog_id))
with check (public.is_catalog_admin(catalog_id));

create policy "members can view categories"
on public.categories
for select
using (public.is_catalog_member(catalog_id));

create policy "editors can insert categories"
on public.categories
for insert
with check (public.can_edit_catalog(catalog_id));

create policy "editors can update categories"
on public.categories
for update
using (public.can_edit_catalog(catalog_id))
with check (public.can_edit_catalog(catalog_id));

create policy "editors can delete categories"
on public.categories
for delete
using (public.can_edit_catalog(catalog_id));

create policy "members can view products"
on public.products
for select
using (public.is_catalog_member(catalog_id));

create policy "editors can insert products"
on public.products
for insert
with check (public.can_edit_catalog(catalog_id));

create policy "editors can update products"
on public.products
for update
using (public.can_edit_catalog(catalog_id))
with check (public.can_edit_catalog(catalog_id));

create policy "editors can delete products"
on public.products
for delete
using (public.can_edit_catalog(catalog_id));

create policy "members can view company settings"
on public.company_settings
for select
using (public.is_catalog_member(catalog_id));

create policy "editors can manage company settings"
on public.company_settings
for all
using (public.can_edit_catalog(catalog_id))
with check (public.can_edit_catalog(catalog_id));
