import { cache } from "react";
import { requireUser } from "@/lib/auth";
import { getDemoMembership } from "@/lib/demo-mode";
import { createClient, isDemoMode } from "@/lib/supabase/server";
import type { CatalogMembership } from "@/lib/types";

export const getActiveMembership = cache(async (): Promise<CatalogMembership> => {
  if (await isDemoMode()) {
    return getDemoMembership();
  }

  try {
    const user = await requireUser();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("catalog_memberships")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true })
      .limit(1)
      .maybeSingle<CatalogMembership>();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      await createInitialCatalogForUser(supabase);

      const { data: createdMembership, error: createError } = await supabase
        .from("catalog_memberships")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle<CatalogMembership>();

      if (createError || !createdMembership) {
        throw new Error("Nao foi possivel localizar o catalogo inicial criado.");
      }

      return createdMembership;
    }

    return data;
  } catch {
    return getDemoMembership();
  }
});

const DEFAULT_CATALOG_NAME = "Catalogo principal";
const DEFAULT_COMPANY_NAME = "Minha empresa";

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function createInitialCatalogForUser(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { randomUUID } = await import("node:crypto");
  const slugBase = slugify(DEFAULT_CATALOG_NAME) || "catalogo";
  const catalogSlug = `${slugBase}-${randomUUID().slice(0, 8)}`;

  const { error } = await supabase.rpc("create_initial_catalog_for_current_user", {
    catalog_name: DEFAULT_CATALOG_NAME,
    catalog_slug: catalogSlug,
    company_name: DEFAULT_COMPANY_NAME,
  });

  if (error) {
    throw new Error(`Nao foi possivel criar o catalogo inicial: ${error.message}`);
  }
}
