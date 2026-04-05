# Catálogo React

Sistema multi-tenant de gerenciamento de catálogos com Next.js 16 + React 19 + Supabase.

## Stack
- Next.js 16.2.2 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Supabase SSR/Auth/DB/Storage
- Sonner, next-themes, shadcn/ui base

## Como rodar
```bash
cp .env.example .env.local
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Configuração Supabase
1. Crie um projeto no Supabase.
2. Rode a migration em `supabase/migrations/0001_init.sql`.
3. Rode também `supabase/migrations/0002_auto_provision_catalog.sql`.
4. Crie um bucket público chamado `product-images`.
5. Ative email/password em Authentication.
6. O primeiro login ou cadastro cria automaticamente um catálogo inicial com membership de admin.

### Seed manual opcional
Use isso só se você quiser iniciar com dados de demonstração.
```sql
insert into public.catalogs (name, slug) values ('Catálogo Demo', 'catalogo-demo') returning id;
-- copie o id retornado
insert into public.catalog_memberships (catalog_id, user_id, role)
values ('<CATALOG_ID>', '<AUTH_USER_ID>', 'admin');

insert into public.company_settings (catalog_id, company_name)
values ('<CATALOG_ID>', 'Minha Empresa');
```

## Estrutura principal
- `app/(dashboard)` rotas protegidas
- `lib/supabase` clients SSR/browser/middleware
- `contexts/catalog-context.tsx` catálogo ativo
- `supabase/migrations` schema SQL + RLS

## Próximos passos recomendados
- Stripe Checkout + webhooks
- seleção de múltiplos catálogos por usuário
- exportação PDF mais avançada com layout/imagens reais
- paginação, ordenação e auditoria
