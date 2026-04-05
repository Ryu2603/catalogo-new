"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate, type ActionState, type AuthMode } from "./actions";

const benefits = [
  {
    title: "Fluxo multi-tenant",
    description: "Cada acesso carrega o catalogo certo sem misturar dados.",
    icon: Layers3,
  },
  {
    title: "Seguranca SSR",
    description: "Login, sessao e rotas protegidas ja ficam integrados.",
    icon: ShieldCheck,
  },
  {
    title: "Primeiro acesso pronto",
    description: "Conta nova entra com catalogo provisionado automaticamente.",
    icon: Sparkles,
  },
] as const;

function SubmitButton({ mode, pending }: { mode: AuthMode; pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="mt-2 w-full">
      {pending ? "Processando..." : mode === "login" ? "Entrar" : "Cadastrar"}
    </Button>
  );
}

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [state, formAction, pending] = useActionState<ActionState, FormData>(authenticate, null);

  const feedback = useMemo(() => {
    if (!state || state.mode !== mode) {
      return { error: null, success: null };
    }

    return {
      error: state.error ?? null,
      success: state.success ?? null,
    };
  }, [mode, state]);

  function switchMode(nextMode: AuthMode) {
    setMode(nextMode);
  }

  return (
    <main className="relative overflow-hidden px-6 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.15),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-8 lg:pr-6">
          <div className="space-y-4">
            <Badge className="border-[var(--border)] bg-[var(--accent)]/50 px-3 py-1.5">Catalogo React SaaS</Badge>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                Entre e continue vendendo com um catalogo que ja entende seu fluxo.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
                Autenticacao com Supabase, isolamento por catalogo e exportacao comercial em PDF, tudo com uma experiencia
                mais limpa e direta.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="rounded-3xl border bg-[var(--card)]/96 p-4 shadow-sm backdrop-blur">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-[var(--accent)]">
                    <Icon className="size-5" />
                  </div>
                  <h2 className="mt-4 text-sm font-semibold">{benefit.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid gap-4 rounded-3xl border bg-[var(--card)]/96 p-5 shadow-sm backdrop-blur sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">01</p>
              <p className="mt-2 text-sm font-medium">Acesso rapido</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Login e signup no mesmo fluxo.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">02</p>
              <p className="mt-2 text-sm font-medium">Onboarding automatico</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Seu primeiro catalogo ja nasce pronto.</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">03</p>
              <p className="mt-2 text-sm font-medium">Recuperacao segura</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Troca de senha com validacao real.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/pricing">
                Ver planos
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Voltar ao inicio</Link>
            </Button>
          </div>
        </section>

        <Card className="overflow-hidden border-[var(--border)]/80 bg-[color:rgba(255,255,255,0.98)] shadow-2xl backdrop-blur dark:bg-[color:rgba(2,6,23,0.84)]">
          <CardHeader className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="font-display text-2xl">{mode === "login" ? "Entrar" : "Criar conta"}</CardTitle>
                <CardDescription>
                  {mode === "login"
                    ? "Acesse sua conta para continuar de onde parou."
                    : "Crie seu acesso e receba um catalogo inicial automaticamente."}
                </CardDescription>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--accent)]">
                <CheckCircle2 className="size-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 rounded-2xl border bg-[var(--muted)]/70 p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                className={
                  mode === "login"
                    ? "rounded-xl bg-[var(--card)] px-4 py-2.5 text-sm font-medium shadow-sm"
                    : "rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--muted-foreground)]"
                }
              >
                Entrar
              </button>
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className={
                  mode === "signup"
                    ? "rounded-xl bg-[var(--card)] px-4 py-2.5 text-sm font-medium shadow-sm"
                    : "rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--muted-foreground)]"
                }
              >
                Criar conta
              </button>
            </div>
          </CardHeader>

          <CardContent>
            <form action={formAction} className="grid gap-4">
              <input type="hidden" name="mode" value={mode} />

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="email@exemplo.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" name="password" type="password" required />
              </div>

              {feedback.error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                  {feedback.error}
                </div>
              ) : null}

              {feedback.success ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                  {feedback.success}
                </div>
              ) : null}

              <SubmitButton mode={mode} pending={pending} />
            </form>

            <div className="mt-6 grid gap-3 text-center text-sm">
              <button
                type="button"
                onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                className="text-[var(--primary)] underline-offset-4 hover:underline"
              >
                {mode === "login" ? "Nao tem uma conta? Cadastre-se" : "Ja tem conta? Faca login"}
              </button>
              {mode === "login" ? (
                <Link href="/reset-password" title="reset-password-link" className="text-[var(--muted-foreground)] underline-offset-4 hover:underline">
                  Esqueci minha senha
                </Link>
              ) : (
                <p className="text-[var(--muted-foreground)]">Voce pode mudar de ideia e voltar para o login a qualquer momento.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
