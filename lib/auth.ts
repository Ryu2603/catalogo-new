import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient, isDemoMode } from "@/lib/supabase/server";
import { getDemoUser } from "@/lib/demo-mode";

type AuthenticatedUser = {
  id: string;
  email?: string;
};

export const getUser = cache(async (): Promise<AuthenticatedUser | null> => {
  if (await isDemoMode()) {
    return getDemoUser();
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims?.sub) {
    return null;
  }

  return {
    id: data.claims.sub,
    email: typeof data.claims.email === "string" ? data.claims.email : undefined,
  };
});

export async function requireUser() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
