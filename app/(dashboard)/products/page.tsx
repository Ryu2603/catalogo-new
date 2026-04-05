"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { DashboardHeader } from "@/components/dashboard-header";
import { ProductFormDialog } from "@/components/product-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { useFetch } from "@/hooks/use-fetch";
import { formatCurrency } from "@/lib/utils";
import type { Category, Product } from "@/lib/types";
import { deleteProduct } from "./actions";

const PAGE_SIZE = 50;

type ProductsResponse = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
};

export default function ProductsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const params = new URLSearchParams();
  if (search) params.set("q", search);
  if (categoryFilter !== "all") params.set("category", categoryFilter);
  params.set("page", String(page));
  params.set("limit", String(PAGE_SIZE));

  const { data, loading, refetch } = useFetch<ProductsResponse>(
    `/api/dashboard/products?${params.toString()}`
  );

  const { data: categories } = useFetch<Category[]>("/api/dashboard/categories");

  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const productsWithImage = products.filter((p) => Boolean(p.image_url)).length;

  function handleSearch() {
    setSearch(searchInput);
    setPage(1);
  }

  const handleDelete = useCallback(
    async (formData: FormData) => {
      await deleteProduct(formData);
      toast.success("Produto excluído");
      refetch();
    },
    [refetch],
  );

  return (
    <div>
      <DashboardHeader title="Produtos" description="Gerencie itens, imagens, preços e categorias do catálogo." />
      <div className="space-y-6 p-6">
        {/* Stats */}
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="bg-[var(--card)]/96">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Produtos</p>
              <p className="mt-2 text-2xl font-semibold">{loading ? "—" : total}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Total no catálogo</p>
            </CardContent>
          </Card>
          <Card className="bg-[var(--card)]/96">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Categorias</p>
              <p className="mt-2 text-2xl font-semibold">{categories?.length ?? "—"}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Grupos disponíveis</p>
            </CardContent>
          </Card>
          <Card className="bg-[var(--card)]/96">
            <CardContent className="p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted-foreground)]">Com imagem</p>
              <p className="mt-2 text-2xl font-semibold">{loading ? "—" : productsWithImage}</p>
              <p className="mt-1 text-sm text-[var(--muted-foreground)]">Desta página</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters + New Button */}
        <div className="flex flex-col gap-4 rounded-3xl border bg-[var(--card)]/96 p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 gap-3">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Buscar por nome ou código"
                className="pl-9"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={(v) => {
                setCategoryFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as categorias</SelectItem>
                {(categories ?? []).map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleSearch}>
              Buscar
            </Button>
          </div>
          <ProductFormDialog categories={categories ?? []} onSuccess={refetch} />
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-sm text-[var(--muted-foreground)]">
            Carregando produtos...
          </div>
        ) : !products.length ? (
          <EmptyState
            title="Nenhum produto encontrado"
            description="Cadastre o primeiro produto do catálogo para começar a exportação."
          />
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead>Código</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead className="w-[220px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="relative size-14 overflow-hidden rounded-xl border bg-[var(--muted)]">
                            {product.image_url ? (
                              <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                            ) : null}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">
                              Criado em {new Date(product.created_at).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.code || "—"}</TableCell>
                      <TableCell>
                        {product.categories ? (
                          <Badge
                            style={{
                              backgroundColor: `${product.categories.color}20`,
                              borderColor: product.categories.color,
                              color: product.categories.color,
                            }}
                          >
                            {product.categories.name}
                          </Badge>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>{formatCurrency(product.price ?? 0)}</TableCell>
                      <TableCell className="flex gap-2">
                        <ProductFormDialog categories={categories ?? []} product={product} onSuccess={refetch} />
                        <form action={handleDelete}>
                          <input type="hidden" name="id" value={product.id} />
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
            <span>
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} de {total} produtos
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="size-4" />
              </Button>
              <span className="flex items-center px-3">
                {page} / {totalPages}
              </span>
              <Button variant="outline" size="icon" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
