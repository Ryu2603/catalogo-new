import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "R$ 49/mês",
    description: "Para começar com um catálogo simples e uma operação leve.",
    features: ["1 catálogo ativo", "Até 500 produtos", "Exportação em PDF", "Suporte por email"],
  },
  {
    name: "Growth",
    price: "R$ 149/mês",
    description: "Para quem já vende com frequência e precisa de mais escala.",
    features: ["Até 5 catálogos", "Histórico avançado", "Prioridade no suporte", "Automação de cobrança"],
  },
  {
    name: "Scale",
    price: "Sob consulta",
    description: "Para operações maiores, times múltiplos e suporte dedicado.",
    features: ["Catálogos ilimitados", "Fluxos personalizados", "SLA dedicado", "Integração sob medida"],
  },
] as const;

export default function PricingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.06),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.1),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.06),transparent_30%)]" />
      <div className="relative mx-auto max-w-6xl py-10">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="border-[var(--border)] bg-[var(--accent)]/50 px-3 py-1.5">Planos</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Escolha o plano que acompanha o crescimento do catálogo.
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--muted-foreground)]">
            A contratação ainda leva para o login, mas a experiência já está pronta para virar checkout assim que Stripe
            entrar no projeto.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn(plan.name === "Growth" && "border-[var(--primary)] shadow-lg")}>
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </div>
                  {plan.name === "Growth" ? <Badge>Mais popular</Badge> : plan.name === "Starter" ? <Badge>Entrada</Badge> : <Badge>Escala</Badge>}
                </div>
                <p className="text-3xl font-semibold tracking-tight">{plan.price}</p>
              </CardHeader>
              <CardContent className="grid gap-4">
                <ul className="grid gap-2 text-sm text-[var(--muted-foreground)]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-2 w-full" asChild>
                  <Link href="/login">Começar com {plan.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-10 border-dashed bg-[var(--card)]/96 backdrop-blur">
          <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Próximo passo</p>
              <p className="mt-2 text-lg font-semibold">Quando Stripe entrar, esta mesma página pode apontar direto para checkout.</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                Por enquanto o botão continua levando para o login, mantendo o fluxo limpo no local host.
              </p>
            </div>
            <Button asChild variant="outline" className="shrink-0">
              <Link href="/billing">Revisar cobrança</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
