"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { LogOut, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { useCatalog } from "@/contexts/catalog-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function DashboardHeader({ title, description }: { title: string; description?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const { role } = useCatalog();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  async function signOut() {
    const supabase = createClient();
    await Promise.allSettled([
      supabase.auth.signOut(),
      fetch("/api/local-auth/logout", {
        method: "POST",
      }),
    ]);
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-[var(--border)]/80 bg-[color:rgba(255,255,255,0.98)] px-6 py-5 shadow-[0_1px_0_rgba(15,23,42,0.02)] backdrop-blur supports-[backdrop-filter]:bg-[color:rgba(255,255,255,0.9)] dark:bg-[color:rgba(2,6,23,0.72)] dark:supports-[backdrop-filter]:bg-[color:rgba(2,6,23,0.62)]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
            <span>Painel do catálogo</span>
            <Badge className="capitalize">{role}</Badge>
          </div>
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
            {description ? <p className="max-w-3xl text-sm leading-6 text-[var(--muted-foreground)]">{description}</p> : null}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border bg-[var(--card)]/98 p-2 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Alternar tema"
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {mounted ? (isDark ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />) : <span className="size-4" />}
          </Button>
          <Button variant="outline" className="gap-2" onClick={signOut}>
            <LogOut className="size-4" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}
