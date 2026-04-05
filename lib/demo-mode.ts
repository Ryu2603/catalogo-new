import { cookies } from "next/headers";
import type { Catalog, CatalogMembership, Category, CompanySettings, Product } from "@/lib/types";

export const DEMO_EMAIL = "carloseduardosonic2000@gmail.com";
export const DEMO_PASSWORD = "Catalogo@2026!";
export const DEMO_SESSION_COOKIE = "catalogo_local_demo";

const DEMO_CATALOG_ID = "00000000-0000-0000-0000-000000000001";
const DEMO_USER_ID = "00000000-0000-0000-0000-000000000002";
const DEMO_CATEGORY_ID = "00000000-0000-0000-0000-000000000003";

export async function hasDemoSession() {
  const cookieStore = await cookies();
  return cookieStore.get(DEMO_SESSION_COOKIE)?.value === "1";
}

export async function createDemoSession() {
  const cookieStore = await cookies();
  cookieStore.set(DEMO_SESSION_COOKIE, "1", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    secure: false,
  });
}

export async function clearDemoSession() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_SESSION_COOKIE);
}

export function isDemoCredential(email: string, password: string) {
  return email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD;
}

export function getDemoUser() {
  return {
    id: DEMO_USER_ID,
    email: DEMO_EMAIL,
  };
}

export function getDemoMembership(): CatalogMembership {
  return {
    id: "00000000-0000-0000-0000-000000000004",
    catalog_id: DEMO_CATALOG_ID,
    user_id: DEMO_USER_ID,
    role: "admin",
    created_at: "2026-01-01T12:00:00.000Z",
  };
}

export function getDemoCatalog(): Catalog {
  return {
    id: DEMO_CATALOG_ID,
    name: "Catalogo Demo",
    slug: "catalogo-demo",
    logo_url: null,
    theme_mode: "light",
    pdf_title: "Catalogo Demo",
    pdf_subtitle: "Ambiente local resiliente",
    created_at: "2026-01-01T12:00:00.000Z",
    updated_at: "2026-01-01T12:00:00.000Z",
  };
}

export function getDemoCompanySettings(): CompanySettings {
  return {
    id: "00000000-0000-0000-0000-000000000005",
    catalog_id: DEMO_CATALOG_ID,
    company_name: "Minha empresa",
    legal_name: "Minha empresa LTDA",
    cnpj: "00.000.000/0001-00",
    email: DEMO_EMAIL,
    phone: "(11) 99999-0000",
    website: "https://minhaempresa.local",
    address: "Rua Exemplo, 123 - Sao Paulo",
    logo_url: null,
    primary_color: "#1e3a5f",
    accent_color: "#0f172a",
    pdf_footer_text: "Catalogo demonstrativo executando em modo local.",
    created_at: "2026-01-01T12:00:00.000Z",
    updated_at: "2026-01-01T12:00:00.000Z",
  };
}

export function getDemoCategories(): Category[] {
  return [
    {
      id: DEMO_CATEGORY_ID,
      catalog_id: DEMO_CATALOG_ID,
      name: "Lancamentos",
      color: "#2563eb",
      created_at: "2026-01-01T12:00:00.000Z",
      updated_at: "2026-01-01T12:00:00.000Z",
    },
  ];
}

export function getDemoProducts(): Product[] {
  return [
    {
      id: "00000000-0000-0000-0000-000000000006",
      catalog_id: DEMO_CATALOG_ID,
      name: "Cadeira Urban",
      code: "CAD-001",
      category_id: DEMO_CATEGORY_ID,
      image_url: null,
      price: 349.9,
      created_at: "2026-01-01T12:00:00.000Z",
      updated_at: "2026-01-01T12:00:00.000Z",
      categories: {
        name: "Lancamentos",
        color: "#2563eb",
      },
    },
    {
      id: "00000000-0000-0000-0000-000000000007",
      catalog_id: DEMO_CATALOG_ID,
      name: "Mesa Studio",
      code: "MES-014",
      category_id: DEMO_CATEGORY_ID,
      image_url: null,
      price: 899,
      created_at: "2026-01-03T12:00:00.000Z",
      updated_at: "2026-01-03T12:00:00.000Z",
      categories: {
        name: "Lancamentos",
        color: "#2563eb",
      },
    },
  ];
}
