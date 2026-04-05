"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiBox3Line,
  RiFolderChartLine,
  RiFolderOpenLine,
  RiMoneyDollarCircleLine,
  RiPriceTag3Line,
  RiSettings3Line,
} from "@remixicon/react";
import { useCatalog } from "@/contexts/catalog-context";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const items = [
  { href: "/products", label: "Produtos", icon: RiBox3Line },
  { href: "/categories", label: "Categorias", icon: RiPriceTag3Line },
  { href: "/settings", label: "Configurações", icon: RiSettings3Line },
  { href: "/export", label: "Exportar", icon: RiFolderOpenLine },
  { href: "/billing", label: "Cobrança", icon: RiMoneyDollarCircleLine },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = useCatalog();

  return (
    <aside className="flex w-full flex-col border-b border-[var(--border)]/80 bg-[color:rgba(255,255,255,0.98)] backdrop-blur md:sticky md:top-0 md:h-screen md:w-64 md:border-b-0 md:border-r dark:bg-[color:rgba(2,6,23,0.82)]">
      <div className="flex items-center gap-3 border-b border-[var(--border)]/80 px-6 py-5">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),#475569)] text-[var(--primary-foreground)] shadow-sm">
          <RiFolderChartLine className="size-5" />
        </div>
        <div>
          <p className="font-semibold">Catálogo React</p>
          <p className="text-sm text-[var(--muted-foreground)]">Multi-tenant catalog manager</p>
        </div>
      </div>
      <nav className="grid gap-1 p-3">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--accent)]/90",
                active && "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md hover:bg-[var(--primary)]",
              )}
            >
              <Icon className="size-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto border-t border-[var(--border)]/70 p-4">
        <div className="rounded-2xl border bg-[var(--accent)]/70 p-4 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Workspace</p>
            <Badge className="capitalize">{role}</Badge>
          </div>
          <p className="mt-2 text-sm font-medium">Catálogo ativo protegido por membership.</p>
          <p className="mt-1 text-sm text-[var(--muted-foreground)]">Navegue entre produtos, exportação e cobrança.</p>
        </div>
      </div>
    </aside>
  );
}
