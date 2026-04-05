"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Category } from "@/lib/types";
import { saveCategory } from "@/app/(dashboard)/categories/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CategoryFormDialog({ category, onSuccess }: { category?: Category; onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await saveCategory(formData);
        toast.success(category ? "Categoria atualizada" : "Categoria criada");
        setOpen(false);
        onSuccess?.();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erro ao salvar categoria");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={category ? "outline" : "default"}>{category ? "Editar" : "Nova categoria"}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{category ? "Editar categoria" : "Nova categoria"}</DialogTitle>
          <DialogDescription>Defina nome e cor em HEX para organizar o catálogo.</DialogDescription>
        </DialogHeader>
        <form action={onSubmit} className="grid gap-4">
          {category ? <input type="hidden" name="id" value={category.id} /> : null}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" name="name" defaultValue={category?.name} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Cor</Label>
            <Input id="color" name="color" defaultValue={category?.color ?? "#1e3a5f"} required />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>{pending ? "Salvando..." : "Salvar"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
