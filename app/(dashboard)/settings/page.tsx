"use client";

import { Globe2, Mail, Phone, Store } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useFetch } from "@/hooks/use-fetch";
import { saveCompanySettings } from "./actions";
import type { CompanySettings, Catalog } from "@/lib/types";

type SettingsData = { settings: CompanySettings | null; catalog: Catalog | null };

function ColorSwatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border bg-[var(--card)]/96 p-3">
      <span className="size-10 rounded-2xl border" style={{ backgroundColor: value }} />
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-[var(--muted-foreground)]">{value}</p>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { data, loading, refetch } = useFetch<SettingsData>("/api/dashboard/settings");

  const settings = data?.settings;
  const companyName = settings?.company_name || "Sua empresa";
  const contactEmail = settings?.email || "Não informado";
  const contactPhone = settings?.phone || "Não informado";
  const website = settings?.website || "Não informado";
  const primaryColor = settings?.primary_color || "#1e3a5f";
  const accentColor = settings?.accent_color || "#0f172a";

  async function handleSubmit(formData: FormData) {
    try {
      await saveCompanySettings(formData);
      toast.success("Configurações salvas");
      refetch();
    } catch {
      toast.error("Erro ao salvar configurações");
    }
  }

  if (loading) {
    return (
      <div>
        <DashboardHeader title="Configurações" description="Dados da empresa, branding e texto de rodapé do PDF." />
        <div className="flex items-center justify-center py-20 text-sm text-[var(--muted-foreground)]">
          Carregando configurações...
        </div>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader title="Configurações" description="Dados da empresa, branding e texto de rodapé do PDF." />
      <div className="space-y-6 p-6">
        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <Card className="h-fit border-dashed bg-[var(--card)]/96">
            <CardHeader>
              <CardTitle>Resumo da marca</CardTitle>
              <CardDescription>Esses dados alimentam a exportação e a experiência do catálogo.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-3xl border bg-[var(--card)]/96 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--accent)]">
                    <Store className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Empresa</p>
                    <p className="text-lg font-semibold">{companyName}</p>
                  </div>
                </div>
              </div>
              <div className="grid gap-3">
                {[
                  { icon: Mail, label: "Email", value: contactEmail },
                  { icon: Phone, label: "Telefone", value: contactPhone },
                  { icon: Globe2, label: "Site", value: website },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3 rounded-2xl border bg-[var(--card)]/96 p-3">
                    <Icon className="size-4 text-[var(--muted-foreground)]" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-foreground)]">{label}</p>
                      <p className="text-sm font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Cores</p>
                <ColorSwatch label="Principal" value={primaryColor} />
                <ColorSwatch label="Destaque" value={accentColor} />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Dados da empresa</CardTitle>
              <CardDescription>Atualize branding, contato e rodapé do PDF em uma única tela.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={handleSubmit} className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { id: "company_name", label: "Nome fantasia", value: settings?.company_name, required: true },
                    { id: "legal_name", label: "Razão social", value: settings?.legal_name },
                    { id: "cnpj", label: "CNPJ", value: settings?.cnpj },
                    { id: "email", label: "Email", value: settings?.email },
                    { id: "phone", label: "Telefone", value: settings?.phone },
                    { id: "website", label: "Site", value: settings?.website },
                  ].map(({ id, label, value, required }) => (
                    <div key={id} className="grid gap-2">
                      <Label htmlFor={id}>{label}</Label>
                      <Input id={id} name={id} defaultValue={value ?? ""} required={required} />
                    </div>
                  ))}
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" name="address" defaultValue={settings?.address ?? ""} />
                  </div>
                </div>
                <Separator />
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="logo_url">Logo URL</Label>
                    <Input id="logo_url" name="logo_url" defaultValue={settings?.logo_url ?? ""} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="primary_color">Cor principal</Label>
                    <Input id="primary_color" name="primary_color" defaultValue={settings?.primary_color ?? "#1e3a5f"} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="accent_color">Cor de destaque</Label>
                    <Input id="accent_color" name="accent_color" defaultValue={settings?.accent_color ?? "#0f172a"} />
                  </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <Label htmlFor="pdf_footer_text">Rodapé do PDF</Label>
                  <Textarea id="pdf_footer_text" name="pdf_footer_text" defaultValue={settings?.pdf_footer_text ?? ""} />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-[var(--muted-foreground)]">As mudanças passam a valer na exportação do catálogo.</p>
                  <Button type="submit">Salvar configurações</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
