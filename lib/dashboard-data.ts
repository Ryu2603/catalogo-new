import { createClient, isDemoMode } from "@/lib/supabase/server";
import {
  getDemoCatalog,
  getDemoCategories,
  getDemoCompanySettings,
  getDemoProducts,
} from "@/lib/demo-mode";
import type { Catalog, Category, CompanySettings, Product } from "@/lib/types";

export async function getCatalog(catalogId: string) {
  if (await isDemoMode()) {
    return getDemoCatalog();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("catalogs").select("*").eq("id", catalogId).maybeSingle<Catalog>();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch {
    return getDemoCatalog();
  }
}

export async function getCategories(catalogId: string) {
  if (await isDemoMode()) {
    return getDemoCategories();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("catalog_id", catalogId)
      .order("name")
      .returns<Category[]>();

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  } catch {
    return getDemoCategories();
  }
}

export async function getProducts(catalogId: string) {
  if (await isDemoMode()) {
    return getDemoProducts();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name, color)")
      .eq("catalog_id", catalogId)
      .order("created_at", { ascending: false })
      .returns<Product[]>();

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  } catch {
    return getDemoProducts();
  }
}

export async function getCompanySettings(catalogId: string) {
  if (await isDemoMode()) {
    return getDemoCompanySettings();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("company_settings")
      .select("*")
      .eq("catalog_id", catalogId)
      .maybeSingle<CompanySettings>();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch {
    return getDemoCompanySettings();
  }
}
