import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, CreditCard, LifeBuoy, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { DashboardHeader } from "@/components/dashboard-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getActiveMembership } from "@/lib/catalog";
import { getCatalog, getCompanySettings } from "@/lib/dashboard-data";

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

const checklist = [
  {
    title: "Criar produtos e preços no Stripe",
    description: "Defina os planos, price IDs e o comportamento do checkout.",
  },
  {
    title: "Adicionar variáveis de ambiente",
    description: "Configure chaves, webhook secret e IDs de preço em cada ambiente.",
  },
  {
    title: "Publicar os endpoints",
    description: "Suba checkout, portal e webhook em /app/api/stripe.",
  },
  {
    title: "Conectar o status da assinatura",
    description: "Mostre no dashboard se o cliente está ativo, em teste ou inadimplente.",
  },
] as const;

export default async function BillingPage() {
  const membership = await getActiveMembership();

  const [catalog, settings] = await Promise.all([
    getCatalog(membership.catalog_id),
    getCompanySettings(membership.catalog_id),
  ]);

  const companyName = settings?.company_name || catalog?.name || "Sua empresa";
  const catalogName = catalog?.name || "Catálogo principal";
  const billingContact = settings?.email || settings?.phone || "Não definido";

  return (
    <div>
      <DashboardHeader title="Cobrança" description="Resumo do plano, próximos passos e preparação para Stripe." />
      <div className="space-y-6 p-6">
        <Card className="overflow-hidden border-[var(--border)] bg-gradient-to-br from-sky-500/10 via-transparent to-emerald-500/10">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300">Ambiente local</Badge>
              <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                Sem gateway ativo
              </Badge>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
              <div className="space-y-3">
                <CardTitle className="max-w-3xl text-3xl">Cobrança pronta para evoluir, sem travar o dashboard</CardTitle>
                <CardDescription className="max-w-3xl text-base">
                  Esta tela já organiza o estado da conta e o caminho para Stripe. No localhost, você navega sem
                  dependências externas e consegue revisar o catálogo, o plano e os próximos passos.
                </CardDescription>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border bg-[var(--card)]/96 px-4 py-3">
                <CreditCard className="size-5 text-[var(--primary)]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Plano simulado</p>
                  <p className="text-sm font-semibold">Starter</p>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border bg-[var(--card)]/96 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Empresa</p>
                <p className="mt-2 text-lg font-semibold">{companyName}</p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">{catalogName}</p>
              </div>
              <div className="rounded-2xl border bg-[var(--card)]/96 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Acesso</p>
                <p className="mt-2 text-lg font-semibold capitalize">{membership.role}</p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">Permissão atual no catálogo</p>
              </div>
              <div className="rounded-2xl border bg-[var(--card)]/96 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-foreground)]">Contato</p>
                <p className="mt-2 text-lg font-semibold break-words">{billingContact}</p>
                <p className="mt-1 text-sm text-[var(--muted-foreground)]">Usado em cobrança e suporte</p>
              </div>
            </div>

            <div className="grid gap-3">
              <Button asChild className="w-full justify-between">
                <Link href="/pricing">
                  Ver planos
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="w-full justify-between">
                <Link href="/settings">
                  Ajustar dados da empresa
                  <Sparkles className="size-4" />
                </Link>
              </Button>
              <Button variant="ghost" asChild className="w-full justify-between">
                <Link href="/export">
                  Testar exportação do catálogo
                  <Zap className="size-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-3">
          {plans.map((plan) => {
            const isStarter = plan.name === "Starter";

            return (
              <Card key={plan.name} className={isStarter ? "border-[var(--primary)] shadow-sm" : ""}>
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                    {isStarter ? <Badge>Plano local</Badge> : plan.name === "Growth" ? <Badge>Recomendado</Badge> : <Badge>Escala</Badge>}
                  </div>
                  <p className="text-3xl font-bold">{plan.price}</p>
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
                  <Button asChild variant={isStarter ? "default" : "outline"} className="w-full">
                    <Link href="/pricing">Explorar plano</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Checklist de integração</CardTitle>
              <CardDescription>Quando você quiser ativar cobrança real, siga esta ordem.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {checklist.map((item, index) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border bg-[var(--card)]/96 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-sm font-semibold text-[var(--primary)]">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">{item.description}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="rounded-2xl border border-dashed p-4 text-sm text-[var(--muted-foreground)]">
                <p className="font-medium text-foreground">Estado atual</p>
                <p className="mt-2">
                  O ambiente local está pronto para navegação, mas ainda não há assinatura ativa nem provider de pagamento
                  conectado.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximos passos</CardTitle>
              <CardDescription>O que a equipe precisa para sair do modo local e ir para produção.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-4 text-emerald-500" />
                <div>
                  <p className="font-medium">Checkout e portal</p>
                  <p className="mt-1 text-[var(--muted-foreground)]">Criar os endpoints de pagamento e autoatendimento.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <LifeBuoy className="mt-0.5 size-4 text-sky-500" />
                <div>
                  <p className="font-medium">Webhooks</p>
                  <p className="mt-1 text-[var(--muted-foreground)]">Atualizar o status da assinatura quando algo mudar.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 size-4 text-violet-500" />
                <div>
                  <p className="font-medium">Experiência do cliente</p>
                  <p className="mt-1 text-[var(--muted-foreground)]">Mostrar o plano correto na UI e liberar upgrades.</p>
                </div>
              </div>
              <Button asChild className="mt-2 w-full">
                <Link href="/pricing">Revisar planos públicos</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
