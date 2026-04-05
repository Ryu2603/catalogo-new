import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-xl border bg-[var(--card)]/96 px-3 py-2 text-sm shadow-sm outline-none ring-0 transition-[border-color,box-shadow,transform] duration-200 placeholder:text-[var(--muted-foreground)] focus-visible:border-[var(--ring)] focus-visible:ring-2 focus-visible:ring-[rgba(148,163,184,0.18)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
