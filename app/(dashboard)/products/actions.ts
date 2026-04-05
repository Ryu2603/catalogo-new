"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getActiveMembership } from "@/lib/catalog";

const productSchema = z.object({
  name: z.string().min(2),
  code: z.string().optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
  price: z.coerce.number().min(0).nullable(),
});

export async function saveProduct(formData: FormData) {
  const membership = await getActiveMembership();
  const supabase = await createClient();

  const values = productSchema.parse({
    name: formData.get("name"),
    code: formData.get("code") || null,
    category_id: formData.get("category_id") || null,
    image_url: formData.get("image_url") || null,
    price: formData.get("price") || null,
  });

  const payload = {
    ...values,
    image_url: values.image_url || null,
    catalog_id: membership.catalog_id,
  };

  const id = formData.get("id");

  if (id) {
    await supabase.from("products").update(payload).eq("id", id).eq("catalog_id", membership.catalog_id);
  } else {
    await supabase.from("products").insert(payload);
  }

  revalidatePath("/products");
  revalidatePath("/export");
}

export async function deleteProduct(formData: FormData) {
  const membership = await getActiveMembership();
  const supabase = await createClient();
  const id = String(formData.get("id"));
  await supabase.from("products").delete().eq("id", id).eq("catalog_id", membership.catalog_id);
  revalidatePath("/products");
  revalidatePath("/export");
}
