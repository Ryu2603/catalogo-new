"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getActiveMembership } from "@/lib/catalog";

const categorySchema = z.object({
  name: z.string().min(2),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export async function saveCategory(formData: FormData) {
  const membership = await getActiveMembership();
  const values = categorySchema.parse({
    name: formData.get("name"),
    color: formData.get("color"),
  });
  const id = formData.get("id");
  const supabase = await createClient();

  if (id) {
    await supabase.from("categories").update(values).eq("id", id).eq("catalog_id", membership.catalog_id);
  } else {
    await supabase.from("categories").insert({ ...values, catalog_id: membership.catalog_id });
  }

  revalidatePath("/categories");
  revalidatePath("/products");
}

export async function deleteCategory(formData: FormData) {
  const membership = await getActiveMembership();
  const id = String(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("categories").delete().eq("id", id).eq("catalog_id", membership.catalog_id);
  revalidatePath("/categories");
  revalidatePath("/products");
}
