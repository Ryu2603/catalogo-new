import { NextRequest, NextResponse } from "next/server";
import { getActiveMembership } from "@/lib/catalog";
import { createClient, isDemoMode } from "@/lib/supabase/server";
import { getDemoProducts } from "@/lib/demo-mode";
import type { Product } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const membership = await getActiveMembership();

    if (await isDemoMode()) {
      const products = getDemoProducts();
      const { searchParams } = new URL(request.url);
      const q = searchParams.get("q")?.toLowerCase();
      const category = searchParams.get("category");
      const filtered = products.filter((p) => {
        if (category && p.category_id !== category) return false;
        if (q && !p.name.toLowerCase().includes(q) && !p.code?.toLowerCase().includes(q)) return false;
        return true;
      });
      return NextResponse.json({ products: filtered, total: filtered.length });
    }

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const category = searchParams.get("category");
    const page = Math.max(1, Number(searchParams.get("page") ?? "1"));
    const limit = Math.min(100, Math.max(10, Number(searchParams.get("limit") ?? "50")));
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const supabase = await createClient();

    let query = supabase
      .from("products")
      .select("*, categories(name, color)", { count: "exact" })
      .eq("catalog_id", membership.catalog_id)
      .order("created_at", { ascending: false })
      .range(from, to);

    if (category) query = query.eq("category_id", category);
    if (q) query = query.or(`name.ilike.%${q}%,code.ilike.%${q}%`);

    const { data, error, count } = await query.returns<Product[]>();

    if (error) throw error;

    return NextResponse.json({ products: data ?? [], total: count ?? 0, page, limit });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
