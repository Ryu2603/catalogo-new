"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import type { Catalog, CompanySettings, Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { generateCatalogPdf } from "@/lib/pdf-catalog";
import { Button } from "@/components/ui/button";

type CatalogProduct = Product & {
  categories?: {
    name?: string | null;
    color?: string | null;
  } | null;
};

export function CatalogPreview({
  catalog,
  settings,
  products,
}: {
  catalog: Catalog | null;
  settings: CompanySettings | null;
  products: CatalogProduct[];
}) {
  const [isExporting, setIsExporting] = useState(false);

  const groupedProducts = useMemo(() => {
    const groups = new Map<string, { name: string; color: string; items: CatalogProduct[] }>();

    for (const product of products) {
      const key = product.categories?.name?.trim() || "Sem categoria";
      if (!groups.has(key)) {
        groups.set(key, {
          name: key,
          color: product.categories?.color || "#cbd5e1",
          items: [],
        });
      }
      groups.get(key)?.items.push(product);
    }

    return [...groups.values()].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [products]);

  async function handleExportPdf() {
    try {
      setIsExporting(true);
      await generateCatalogPdf({ catalog, settings, products });
      toast.success("PDF gerado com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível gerar o PDF.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="overflow-hidden rounded-3xl border bg-[var(--card)]/98 text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-100">
        <div className="border-b bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {settings?.logo_url ? (
                <div className="relative size-20 overflow-hidden rounded-2xl border border-white/20 bg-white/10">
                  <Image src={settings.logo_url} alt={settings.company_name} fill className="object-cover" />
                </div>
              ) : (
                <div className="flex size-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-sm font-medium">
                  Logo
                </div>
              )}
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Prévia do catálogo</p>
                <h2 className="mt-2 text-3xl font-bold">{catalog?.pdf_title || settings?.company_name || "Sua empresa"}</h2>
                <p className="mt-2 max-w-2xl text-sm text-white/75">
                  {catalog?.pdf_subtitle || settings?.pdf_footer_text || "Visualização das categorias e produtos antes da exportação."}
                </p>
              </div>
            </div>
            <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm md:min-w-64">
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/70">Produtos</span>
                <strong>{products.length}</strong>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/70">Categorias</span>
                <strong>{groupedProducts.length}</strong>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-white/70">Contato</span>
                <strong className="text-right">{settings?.phone || settings?.email || "Não definido"}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8">
          {groupedProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-10 text-center text-sm text-slate-500 dark:text-slate-400">
              Cadastre produtos para visualizar como o catálogo será organizado no PDF.
            </div>
          ) : (
            groupedProducts.map((group) => (
              <section key={group.name} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="h-8 w-2 rounded-full" style={{ backgroundColor: group.color }} />
                  <div>
                    <h3 className="text-xl font-semibold">{group.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{group.items.length} produto(s)</p>
                  </div>
                </div>
                <div className="grid gap-4 lg:grid-cols-2">
                  {group.items.map((product) => (
                    <div key={product.id} className="rounded-2xl border p-4 shadow-sm">
                      <div className="flex gap-4">
                        <div className="relative size-24 overflow-hidden rounded-2xl border bg-slate-100 dark:bg-slate-900">
                          {product.image_url ? (
                            <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-slate-400">Sem imagem</div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="mb-2 inline-flex rounded-full px-2 py-1 text-xs font-medium text-white" style={{ backgroundColor: group.color }}>
                            {group.name}
                          </p>
                          <h4 className="truncate text-base font-semibold">{product.name}</h4>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{product.code || "Sem código"}</p>
                          <p className="mt-3 text-lg font-bold text-slate-900 dark:text-slate-50">{formatCurrency(product.price ?? 0)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-3xl border bg-[var(--card)]/96 p-6">
          <h3 className="text-lg font-semibold">Exportação robusta</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            O PDF agora gera um catálogo direto, sem capa, com dados da empresa, agrupamento por categoria, cards em duas colunas, imagens e paginação automática.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
            <div>• abertura direta do catálogo com logo opcional</div>
            <div>• seções separadas por categoria</div>
            <div>• produtos em layout visual de catálogo</div>
            <div>• rodapé e cabeçalho por página</div>
            <div>• fallback quando imagem não carregar</div>
          </div>
          <Button className="mt-6 w-full" onClick={handleExportPdf} disabled={isExporting || products.length === 0}>
            {isExporting ? "Gerando PDF..." : "Baixar PDF"}
          </Button>
        </div>

        <div className="rounded-3xl border bg-[var(--card)]/96 p-6 text-sm text-muted-foreground">
          <h4 className="font-medium text-foreground">Para o melhor resultado</h4>
          <div className="mt-3 grid gap-2">
            <p>Use imagens de produto com boa resolução e URLs acessíveis pelo navegador.</p>
            <p>Preencha nome da empresa, contato, rodapé e logo nas configurações.</p>
            <p>Organize os produtos por categoria para o PDF sair com navegação visual melhor.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
