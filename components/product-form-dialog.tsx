"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import type { Category, Product } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { saveProduct } from "@/app/(dashboard)/products/actions";
import { useCatalog } from "@/hooks/use-catalog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProductFormDialog({ categories, product, onSuccess }: { categories: Category[]; product?: Product; onSuccess?: () => void }) {
  const { catalogId } = useCatalog();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [categoryId, setCategoryId] = useState(product?.category_id ?? "none");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadImage(file: File) {
    const supabase = createClient();
    const path = `${catalogId}/${crypto.randomUUID()}-${file.name}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    toast.success("Imagem enviada com sucesso");
  }

  function onSubmit(formData: FormData) {
    formData.set("image_url", imageUrl);
    formData.set("category_id", categoryId === "none" ? "" : categoryId);

    startTransition(async () => {
      try {
        await saveProduct(formData);
        toast.success(product ? "Produto atualizado" : "Produto criado");
        setOpen(false);
        onSuccess?.();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erro ao salvar produto");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={product ? "outline" : "default"}>{product ? "Editar" : "Novo produto"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product ? "Editar produto" : "Novo produto"}</DialogTitle>
          <DialogDescription>Cadastre código, categoria, imagem e preço.</DialogDescription>
        </DialogHeader>
        <form action={onSubmit} className="grid gap-4">
          {product ? <input type="hidden" name="id" value={product.id} /> : null}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" defaultValue={product?.name} required />
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="code">Código</Label>
              <Input id="code" name="code" defaultValue={product?.code ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Preço</Label>
              <Input id="price" name="price" type="number" step="0.01" defaultValue={product?.price ?? ""} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Categoria</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sem categoria</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Imagem</Label>
            <div className="flex gap-2">
              <Input name="image_url_display" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>Upload</Button>
            </div>
            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              accept="image/*"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                try {
                  await uploadImage(file);
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Falha no upload");
                }
              }}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>{pending ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
