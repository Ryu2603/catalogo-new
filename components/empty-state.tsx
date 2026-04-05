import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="rounded-3xl border border-dashed bg-[var(--card)]/96 p-10 text-center shadow-sm">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[var(--accent)] text-[var(--foreground)]">
        <Sparkles className="size-6" />
      </div>
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--muted-foreground)]">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
