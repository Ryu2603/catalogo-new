"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard-header";
import { CategoryFormDialog } from "@/components/category-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFetch } from "@/hooks/use-fetch";
import { deleteCategory } from "./actions";
import type { Category } from "@/lib/types";

export default function CategoriesPage() {
  const { data: categories, loading, refetch } = useFetch<Category[]>("/api/dashboard/categories");

  const totalCategories = categories?.length ?? 0;
  const uniqueColors = new Set(categories?.map((c) => c.color)).size;

  const handleDelete = useCallback(
    async (formData: FormData) => {
      await deleteCategory(formData);
      toast.success("Categoria excluída");
      refetch();
    },
    [refetch],
  );

  return (
    <div>
      <DashboardHeader title="Categorias" description="Organize seus produtos por grupos e cores." />
      <div className="space-y-6 p-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <Card className="bg-[var(--card)]/96">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Categorias</p>
              <p className="mt-2 text-2xl font-semibold">{loading ? "—" : totalCategories}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Grupos ativos no catálogo</p>
            </CardContent>
          </Card>
          <Card className="bg-[var(--card)]/96">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Cores únicas</p>
              <p className="mt-2 text-2xl font-semibold">{loading ? "—" : uniqueColors}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Paleta pronta para a exportação</p>
            </CardContent>
          </Card>
          <div className="flex items-center justify-end md:col-span-2 xl:col-span-1">
            <CategoryFormDialog onSuccess={refetch} />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-[var(--muted-foreground)]">
            Carregando categorias...
          </div>
        ) : !categories?.length ? (
          <EmptyState title="Nenhuma categoria criada" description="Comece criando as categorias do catálogo." />
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Cor</TableHead>
                    <TableHead className="w-[220px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        <Badge
                          style={{
                            backgroundColor: `${category.color}20`,
                            borderColor: category.color,
                            color: category.color,
                          }}
                        >
                          {category.color}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <CategoryFormDialog category={category} onSuccess={refetch} />
                        <form action={handleDelete}>
                          <input type="hidden" name="id" value={category.id} />
                          <Button variant="destructive">Excluir</Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
