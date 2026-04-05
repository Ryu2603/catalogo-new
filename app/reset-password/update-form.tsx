"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UpdatePasswordForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending) {
      return;
    }

    setPending(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirm_password") || "");

    if (password.length < 8) {
      setError("A nova senha precisa ter pelo menos 8 caracteres.");
      setPending(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      setPending(false);
      return;
    }

    const supabase = createClient();

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      router.replace("/products");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado. Tente novamente.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="password">Nova senha</Label>
        <Input id="password" name="password" type="password" minLength={8} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirm_password">Confirmar senha</Label>
        <Input id="confirm_password" name="confirm_password" type="password" minLength={8} required />
      </div>
      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
          {error}
        </div>
      ) : null}
      <p className="text-sm leading-6 text-[var(--muted-foreground)]">
        Use pelo menos 8 caracteres e escolha uma senha que você não esteja usando em outro sistema.
      </p>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Salvando..." : "Salvar nova senha"}
      </Button>
    </form>
  );
}
