"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PasswordFormState = {
  error?: string;
  success?: string;
} | null;

export async function resetPassword(
  _state: PasswordFormState,
  formData: FormData,
): Promise<PasswordFormState> {
  const email = String(formData.get("email") || "");
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?next=/reset-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: "Enviamos um link de recuperação para seu email.",
  };
}

export async function updatePassword(
  _state: PasswordFormState,
  formData: FormData,
): Promise<PasswordFormState> {
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");

  if (password.length < 8) {
    return { error: "A nova senha precisa ter pelo menos 8 caracteres." };
  }

  if (password !== confirmPassword) {
    return { error: "As senhas não coincidem." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: error.message };
  }

  redirect("/products");
}
