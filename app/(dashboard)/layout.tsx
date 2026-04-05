import { AppSidebar } from "@/components/app-sidebar";
import { CatalogProvider } from "@/contexts/catalog-context";
import { getActiveMembership } from "@/lib/catalog";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const membership = await getActiveMembership();

  return (
    <CatalogProvider value={{ catalogId: membership.catalog_id, role: membership.role }}>
      <div className="min-h-screen md:grid md:grid-cols-[16rem_1fr]">
        <AppSidebar />
        <div className="relative min-w-0 overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.06),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.04),transparent_25%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(148,163,184,0.08),transparent_28%)]">
          {children}
        </div>
      </div>
    </CatalogProvider>
  );
}
