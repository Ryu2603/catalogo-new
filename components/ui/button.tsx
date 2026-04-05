import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] px-4 py-2 text-[var(--primary-foreground)] shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:opacity-95",
        outline: "border bg-[var(--background)]/80 px-4 py-2 shadow-sm hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:shadow-md",
        ghost: "px-4 py-2 hover:bg-[var(--accent)]",
        destructive: "bg-[var(--destructive)] px-4 py-2 text-[var(--destructive-foreground)] shadow-sm hover:-translate-y-0.5 hover:shadow-md",
      },
      size: {
        default: "h-10",
        sm: "h-9 px-3",
        lg: "h-11 px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
