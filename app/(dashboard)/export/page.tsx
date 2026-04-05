"use client";

import { useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { CatalogPreview } from "@/components/catalog-preview";
import { useFetch } from "@/hooks/use-fetch";
import type { CompanySettings, Catalog, Product } from "@/lib/types";

type SettingsData = { settings: CompanySettings | null; catalog: Catalog | null };
type ProductsData = { products: Product[]; total: number };

export default function ExportPage() {
  const { data: settingsData, loading: settingsLoading } = useFetch<SettingsData>("/api/dashboard/settings");
  // Load all products for export (limit 1000)
  const { data: productsData, loading: productsLoading } = useFetch<ProductsData>(
    "/api/dashboard/products?limit=1000"
  );

  const loading = settingsLoading || productsLoading;

  const sortedProducts = useMemo(() => {
    const products = productsData?.products ?? [];
    return [...products].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  }, [productsData]);

  return (
    <div>
      <DashboardHeader
        title="Exportar catálogo"
        description="Pré-visualize os produtos e gere um PDF direto, sem capa, com layout comercial."
      />
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-[var(--muted-foreground)]">
            Carregando catálogo...
          </div>
        ) : (
          <CatalogPreview
            catalog={settingsData?.catalog ?? null}
            settings={settingsData?.settings ?? null}
            products={sortedProducts}
          />
        )}
      </div>
    </div>
  );
}
