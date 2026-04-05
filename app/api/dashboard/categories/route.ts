import { NextResponse } from "next/server";
import { getActiveMembership } from "@/lib/catalog";
import { createClient, isDemoMode } from "@/lib/supabase/server";
import { getDemoCategories } from "@/lib/demo-mode";
import type { Category } from "@/lib/types";

export async function GET() {
  try {
    const membership = await getActiveMembership();

    if (await isDemoMode()) {
      return NextResponse.json(getDemoCategories());
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("catalog_id", membership.catalog_id)
      .order("name")
      .returns<Category[]>();

    if (error) throw error;

    return NextResponse.json(data ?? []);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
