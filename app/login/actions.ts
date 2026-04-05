"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createDemoSession, isDemoCredential } from "@/lib/demo-mode";

export type AuthMode = "login" | "signup";

export type ActionState = {
  error?: string;
  success?: string;
  mode?: AuthMode;
} | null;

export async function authenticate(_state: ActionState, formData: FormData): Promise<ActionState> {
  const mode = (formData.get("mode") === "signup" ? "signup" : "login") satisfies AuthMode;
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const supabase = await createClient();

  if (!email || !password) {
    return { error: "Informe email e senha.", mode };
  }

  if (mode === "login") {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      if (isDemoCredential(email, password)) {
        await createDemoSession();
        redirect("/products");
      }

      return { error: error.message, mode };
    }

    redirect("/products");
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${appUrl}/api/auth/callback?next=/products`,
    },
  });

  if (error) {
    return { error: error.message, mode };
  }

  if (data.session) {
    redirect("/products");
  }

  return {
    success: "Verifique seu e-mail para validar o cadastro ou tente logar agora caso a confirmacao esteja desativada.",
    mode,
  };
}
