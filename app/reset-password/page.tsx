import Link from "next/link";
import { ArrowLeft, KeyRound, MailCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUser } from "@/lib/auth";
import { RequestResetForm } from "./request-form";
import { UpdatePasswordForm } from "./update-form";

export default async function ResetPasswordPage() {
  const user = await getUser();
  const isRecoverySession = Boolean(user);

  return (
    <main className="relative overflow-hidden px-6 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.08),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-8 lg:pr-6">
          <div className="space-y-4">
            <Badge className="border-[var(--border)] bg-[var(--accent)]/50 px-3 py-1.5">Recuperacao segura</Badge>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-6xl">
                {isRecoverySession ? "Defina uma nova senha e volte ao painel." : "Receba o link e recupere o acesso com seguranca."}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
                O fluxo foi desenhado para funcionar em duas etapas: enviar o link e concluir a troca de senha no navegador.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border bg-[var(--card)]/96 p-4 shadow-sm backdrop-blur">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[var(--accent)]">
                <MailCheck className="size-5" />
              </div>
              <h2 className="mt-4 text-sm font-semibold">Link por email</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">Enviamos a recuperacao para a mesma conta.</p>
            </div>
            <div className="rounded-3xl border bg-[var(--card)]/96 p-4 shadow-sm backdrop-blur">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[var(--accent)]">
                <KeyRound className="size-5" />
              </div>
              <h2 className="mt-4 text-sm font-semibold">Nova senha</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">A troca finaliza direto no navegador.</p>
            </div>
            <div className="rounded-3xl border bg-[var(--card)]/96 p-4 shadow-sm backdrop-blur">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-[var(--accent)]">
                <ShieldCheck className="size-5" />
              </div>
              <h2 className="mt-4 text-sm font-semibold">Sessao protegida</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">A callback valida o destino antes de redirecionar.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/login">
                <ArrowLeft className="size-4" />
                Voltar para o login
              </Link>
            </Button>
          </div>
        </section>

        <Card className="overflow-hidden border-[var(--border)]/80 bg-[color:rgba(255,255,255,0.98)] shadow-2xl backdrop-blur dark:bg-[color:rgba(2,6,23,0.84)]">
          <CardHeader className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="font-display text-2xl">{isRecoverySession ? "Definir nova senha" : "Recuperar acesso"}</CardTitle>
                <CardDescription>
                  {isRecoverySession ? "Escolha uma senha nova para concluir a recuperacao." : "Informe seu email para receber o link de redefinicao."}
                </CardDescription>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--accent)]">
                <ShieldCheck className="size-5" />
              </div>
            </div>
          </CardHeader>
          <CardContent>{isRecoverySession ? <UpdatePasswordForm /> : <RequestResetForm />}</CardContent>
        </Card>
      </div>
    </main>
  );
}
