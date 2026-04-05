"use client";

import { createContext, useContext } from "react";
import type { Role } from "@/lib/types";

interface CatalogContextValue {
  catalogId: string;
  role: Role;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CatalogContextValue;
}) {
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error("useCatalog deve ser usado dentro de CatalogProvider");
  }

  return context;
}
