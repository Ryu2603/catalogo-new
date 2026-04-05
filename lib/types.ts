export type Role = "admin" | "editor" | "viewer";

export interface Category {
  id: string;
  catalog_id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  catalog_id: string;
  name: string;
  code: string | null;
  category_id: string | null;
  image_url: string | null;
  price: number | null;
  created_at: string;
  updated_at: string;
  categories?: Pick<Category, "name" | "color"> | null;
}

export interface CompanySettings {
  id: string;
  catalog_id: string;
  company_name: string;
  legal_name: string | null;
  cnpj: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  logo_url: string | null;
  primary_color: string;
  accent_color: string;
  pdf_footer_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface Catalog {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  theme_mode: "light" | "dark" | "system";
  pdf_title: string | null;
  pdf_subtitle: string | null;
  created_at: string;
  updated_at: string;
}

export interface CatalogMembership {
  id: string;
  catalog_id: string;
  user_id: string;
  role: Role;
  created_at: string;
}
