"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getActiveMembership } from "@/lib/catalog";

export async function saveCompanySettings(formData: FormData) {
  const membership = await getActiveMembership();
  const supabase = await createClient();

  const payload = {
    catalog_id: membership.catalog_id,
    company_name: String(formData.get("company_name") || ""),
    legal_name: String(formData.get("legal_name") || ""),
    cnpj: String(formData.get("cnpj") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    website: String(formData.get("website") || ""),
    address: String(formData.get("address") || ""),
    logo_url: String(formData.get("logo_url") || ""),
    primary_color: String(formData.get("primary_color") || "#1e3a5f"),
    accent_color: String(formData.get("accent_color") || "#0f172a"),
    pdf_footer_text: String(formData.get("pdf_footer_text") || ""),
  };

  await supabase.from("company_settings").upsert(payload, { onConflict: "catalog_id" });
  revalidatePath("/settings");
  revalidatePath("/export");
}
