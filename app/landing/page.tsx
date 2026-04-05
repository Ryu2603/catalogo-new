import Link from "next/link";
import { ArrowRight, CheckCircle2, FileDown, Layers3, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { label: "Isolamento", value: "Multi-tenant" },
  { label: "Exportação", value: "PDF comercial" },
  { label: "Cobrança", value: "Preparada para Stripe" },
] as const;

const features = [
  {
    title: "Catálogos e produtos",
    description: "CRUD de catálogo com imagens, categorias e filtros rápidos.",
    icon: Layers3,
  },
  {
    title: "Segurança e acesso",
    description: "Autenticação SSR com memberships e rotas protegidas.",
    icon: ShieldCheck,
  },
  {
    title: "Exportação pronta",
    description: "Prévia visual e geração de PDF comercial sem capa.",
    icon: FileDown,
  },
] as const;

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.08),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl">
        <header className="flex flex-col gap-4 rounded-3xl border bg-[var(--card)]/96 px-5 py-4 shadow-sm backdrop-blur sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),#475569)] text-[var(--primary-foreground)] shadow-sm">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="font-semibold">Catálogo React</p>
              <p className="text-sm text-[var(--muted-foreground)]">Gestão comercial de catálogos</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">Ver planos</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="border-[var(--border)] bg-[var(--accent)]/50 px-3 py-1.5">Catálogo React SaaS</Badge>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                  Um catálogo que vende melhor porque a tela já foi pensada para isso.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
                  Next.js + Supabase com isolamento multi-tenant, upload de imagens, exportação em PDF e cobrança pronta
                  para ser ligada quando você quiser crescer.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border bg-[var(--card)]/96 p-4 shadow-sm backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">{stat.label}</p>
                  <p className="mt-2 text-lg font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/login">
                  Começar agora
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/pricing">Comparar planos</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.title} className="rounded-3xl border bg-[var(--card)]/96 p-4 shadow-sm backdrop-blur">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-[var(--accent)]">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="mt-4 text-sm font-semibold">{feature.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="overflow-hidden border-[var(--border)]/80 bg-[color:rgba(255,255,255,0.98)] shadow-2xl backdrop-blur dark:bg-[color:rgba(2,6,23,0.84)]">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="font-display text-2xl">Fluxo completo</CardTitle>
                  <p className="mt-2 text-sm text-[var(--muted-foreground)]">Do cadastro à exportação, tudo em uma linha de navegação.</p>
                </div>
                <Badge>Pronto para usar</Badge>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4">
              {[
                {
                  title: "1. Login ou cadastro",
                  description: "Acesso simples com sessão SSR e onboarding automático.",
                },
                {
                  title: "2. Produtos e categorias",
                  description: "Cadastre itens, imagens e filtros com uma tabela limpa.",
                },
                {
                  title: "3. Exportação e cobrança",
                  description: "Gere PDF comercial e prepare a monetização quando precisar.",
                },
              ].map((step) => (
                <div key={step.title} className="rounded-2xl border bg-[var(--muted)]/50 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-[var(--muted-foreground)]">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="rounded-3xl border border-dashed p-5">
                <p className="text-sm font-medium">O que já está entregue</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                  CRUD, preview, exportação e infraestrutura para começar a operar sem a sensação de tela provisória.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
