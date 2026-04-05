create or replace function public.create_initial_catalog_for_current_user(
  catalog_name text,
  catalog_slug text,
  company_name text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_catalog_id uuid;
  resolved_company_name text;
begin
  if auth.uid() is null then
    raise exception 'authentication required';
  end if;

  resolved_company_name := coalesce(nullif(company_name, ''), catalog_name);

  insert into public.catalogs (name, slug)
  values (catalog_name, catalog_slug)
  returning id into new_catalog_id;

  insert into public.catalog_memberships (catalog_id, user_id, role)
  values (new_catalog_id, auth.uid(), 'admin');

  insert into public.company_settings (catalog_id, company_name)
  values (new_catalog_id, resolved_company_name)
  on conflict (catalog_id) do update
    set company_name = excluded.company_name;

  return new_catalog_id;
end;
$$;

revoke all on function public.create_initial_catalog_for_current_user(text, text, text) from public;
grant execute on function public.create_initial_catalog_for_current_user(text, text, text) to authenticated;
