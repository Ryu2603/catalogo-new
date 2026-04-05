import { NextResponse } from "next/server";
import { getActiveMembership } from "@/lib/catalog";
import { createClient, isDemoMode } from "@/lib/supabase/server";
import { getDemoCompanySettings, getDemoCatalog } from "@/lib/demo-mode";
import type { CompanySettings, Catalog } from "@/lib/types";

export async function GET() {
  try {
    const membership = await getActiveMembership();

    if (await isDemoMode()) {
      return NextResponse.json({
        settings: getDemoCompanySettings(),
        catalog: getDemoCatalog(),
      });
    }

    const supabase = await createClient();
    const [settingsRes, catalogRes] = await Promise.all([
      supabase
        .from("company_settings")
        .select("*")
        .eq("catalog_id", membership.catalog_id)
        .maybeSingle<CompanySettings>(),
      supabase
        .from("catalogs")
        .select("*")
        .eq("id", membership.catalog_id)
        .maybeSingle<Catalog>(),
    ]);

    return NextResponse.json({
      settings: settingsRes.data ?? null,
      catalog: catalogRes.data ?? null,
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
