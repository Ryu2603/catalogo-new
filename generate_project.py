from pathlib import Path
root = Path('/mnt/data/catalogo-react')
files = {}
files['package.json'] = r'''{
  "name": "catalogo-react",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "prepare": "husky"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-slot": "^1.1.2",
    "@remixicon/react": "^4.6.0",
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.49.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "jspdf": "^2.5.2",
    "lucide-react": "^0.511.0",
    "next": "16.2.2",
    "next-themes": "^0.4.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-hook-form": "^7.54.2",
    "sonner": "^2.0.3",
    "tailwind-merge": "^2.6.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3.2.0",
    "@types/node": "^22.13.10",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "eslint": "^9.22.0",
    "eslint-config-next": "16.2.2",
    "husky": "^9.1.7",
    "tailwindcss": "^4.0.9",
    "typescript": "^5.8.2"
  }
}
'''
files['tsconfig.json'] = r'''{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'''
files['next-env.d.ts'] = '/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n\n// NOTE: This file should not be edited\n'
files['next.config.ts'] = r'''import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
'''
files['eslint.config.mjs'] = r'''import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ]
    }
  }
];
'''
files['postcss.config.mjs'] = 'export default {\n  plugins: {\n    "@tailwindcss/postcss": {},\n  },\n};\n'
files['components.json'] = r'''{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
'''
files['.env.example'] = r'''NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
'''
files['app/globals.css'] = r'''@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --muted: #f8fafc;
  --muted-foreground: #64748b;
  --border: #e2e8f0;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --primary: #0f172a;
  --primary-foreground: #f8fafc;
  --secondary: #f1f5f9;
  --secondary-foreground: #0f172a;
  --accent: #f1f5f9;
  --accent-foreground: #0f172a;
  --destructive: #ef4444;
  --destructive-foreground: #f8fafc;
  --ring: #94a3b8;
  --radius: 0.75rem;
}

.dark {
  --background: #020617;
  --foreground: #f8fafc;
  --muted: #0f172a;
  --muted-foreground: #94a3b8;
  --border: #1e293b;
  --card: #020617;
  --card-foreground: #f8fafc;
  --primary: #f8fafc;
  --primary-foreground: #0f172a;
  --secondary: #0f172a;
  --secondary-foreground: #f8fafc;
  --accent: #0f172a;
  --accent-foreground: #f8fafc;
  --destructive: #dc2626;
  --destructive-foreground: #f8fafc;
  --ring: #475569;
}

* {
  border-color: var(--border);
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
'''
files['lib/utils.ts'] = r'''import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | string) {
  const numericValue = typeof value === "string" ? Number(value) : value;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue || 0);
}
'''
files['lib/types.ts'] = r'''export type Role = "admin" | "editor" | "viewer";

export interface Category {
  id: string;
  catalog_id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  catalog_id: string;
  name: string;
  code: string | null;
  category_id: string | null;
  image_url: string | null;
  price: number | null;
  created_at: string;
  updated_at: string;
  categories?: Pick<Category, "name" | "color"> | null;
}

export interface CompanySettings {
  id: string;
  catalog_id: string;
  company_name: string;
  legal_name: string | null;
  cnpj: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  logo_url: string | null;
  primary_color: string;
  accent_color: string;
  pdf_footer_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface Catalog {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  theme_mode: "light" | "dark" | "system";
  pdf_title: string | null;
  pdf_subtitle: string | null;
  created_at: string;
  updated_at: string;
}

export interface CatalogMembership {
  id: string;
  catalog_id: string;
  user_id: string;
  role: Role;
  created_at: string;
}
'''
files['lib/supabase/server.ts'] = r'''import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    },
  );
}
'''
files['lib/supabase/client.ts'] = r'''"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
'''
files['lib/supabase/middleware.ts'] = r'''import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/reset-password");
  const isPublicPage = ["/landing", "/pricing"].some((path) => request.nextUrl.pathname.startsWith(path));

  if (!user && !isAuthPage && !isPublicPage && request.nextUrl.pathname !== "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/products";
    return NextResponse.redirect(url);
  }

  return response;
}
'''
files['middleware.ts'] = r'''import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
'''
files['lib/auth.ts'] = r'''import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user;
}

export async function requireUser() {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
'''
files['lib/catalog.ts'] = r'''import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth";
import type { CatalogMembership } from "@/lib/types";

export const getActiveMembership = cache(async () => {
  const user = await requireUser();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("catalog_memberships")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle<CatalogMembership>();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Nenhum catálogo vinculado ao usuário.");
  }

  return data;
});
'''
files['hooks/use-auth.ts'] = r'''"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
'''
files['contexts/catalog-context.tsx'] = r'''"use client";

import { createContext, useContext } from "react";
import type { Role } from "@/lib/types";

interface CatalogContextValue {
  catalogId: string;
  role: Role;
}

const CatalogContext = createContext<CatalogContextValue | null>(null);

export function CatalogProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CatalogContextValue;
}) {
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const context = useContext(CatalogContext);

  if (!context) {
    throw new Error("useCatalog deve ser usado dentro de CatalogProvider");
  }

  return context;
}
'''
files['hooks/use-catalog.ts'] = r'''export { useCatalog } from "@/contexts/catalog-context";
'''
files['components/theme-provider.tsx'] = r'''"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
'''
files['components/app-sidebar.tsx'] = r'''"use client";

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
import { cn } from "@/lib/utils";

const items = [
  { href: "/products", label: "Produtos", icon: RiBox3Line },
  { href: "/categories", label: "Categorias", icon: RiPriceTag3Line },
  { href: "/settings", label: "Configurações", icon: RiSettings3Line },
  { href: "/export", label: "Exportar", icon: RiFolderOpenLine },
  { href: "/billing", label: "Billing", icon: RiMoneyDollarCircleLine },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b bg-[var(--card)] md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center gap-3 border-b px-6 py-5">
        <div className="rounded-2xl bg-[var(--primary)] p-2 text-[var(--primary-foreground)]">
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
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-[var(--accent)]",
                active && "bg-[var(--accent)] font-medium",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
'''
files['components/dashboard-header.tsx'] = r'''"use client";

import { useRouter } from "next/navigation";
import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function DashboardHeader({ title, description }: { title: string; description?: string }) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="flex flex-col gap-4 border-b px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description ? <p className="text-sm text-[var(--muted-foreground)]">{description}</p> : null}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
        </Button>
        <Button variant="outline" onClick={signOut}>
          Sair
        </Button>
      </div>
    </header>
  );
}
'''
files['components/empty-state.tsx'] = r'''import { Button } from "@/components/ui/button";

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
    <div className="rounded-2xl border border-dashed p-10 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--muted-foreground)]">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-4" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
'''
# UI components
files['components/ui/button.tsx'] = r'''import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[var(--primary)] px-4 py-2 text-[var(--primary-foreground)] hover:opacity-90",
        outline: "border bg-transparent px-4 py-2 hover:bg-[var(--accent)]",
        ghost: "px-4 py-2 hover:bg-[var(--accent)]",
        destructive: "bg-[var(--destructive)] px-4 py-2 text-[var(--destructive-foreground)]",
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
'''
files['components/ui/input.tsx'] = r'''import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none ring-0 placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)]",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
'''
files['components/ui/textarea.tsx'] = r'''import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[120px] w-full rounded-xl border bg-transparent px-3 py-2 text-sm outline-none placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)]",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
'''
files['components/ui/label.tsx'] = r'''import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn("text-sm font-medium", className)} {...props} />
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
'''
files['components/ui/card.tsx'] = r'''import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-2xl border bg-[var(--card)] text-[var(--card-foreground)] shadow-sm", className)} {...props} />;
}

export function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm text-[var(--muted-foreground)]", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
'''
files['components/ui/table.tsx'] = r'''import * as React from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.ComponentProps<"table">) {
  return <table className={cn("w-full caption-bottom text-sm", className)} {...props} />;
}
export function TableHeader(props: React.ComponentProps<"thead">) { return <thead {...props} />; }
export function TableBody(props: React.ComponentProps<"tbody">) { return <tbody {...props} />; }
export function TableRow({ className, ...props }: React.ComponentProps<"tr">) { return <tr className={cn("border-b", className)} {...props} />; }
export function TableHead({ className, ...props }: React.ComponentProps<"th">) { return <th className={cn("h-12 px-4 text-left align-middle font-medium text-[var(--muted-foreground)]", className)} {...props} />; }
export function TableCell({ className, ...props }: React.ComponentProps<"td">) { return <td className={cn("p-4 align-middle", className)} {...props} />; }
'''
files['components/ui/badge.tsx'] = r'''import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", className)}
      {...props}
    />
  );
}
'''
files['components/ui/dialog.tsx'] = r'''"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/50", className)} {...props} />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 grid w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 gap-4 rounded-2xl border bg-[var(--background)] p-6 shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition hover:opacity-100">
        <X className="size-4" />
        <span className="sr-only">Fechar</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col space-y-1.5 text-left", className)} {...props} />;
}
export function DialogFooter({ className, ...props }: React.ComponentProps<"div">) { return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />; }
export function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) { return <DialogPrimitive.Title className={cn("text-lg font-semibold", className)} {...props} />; }
export function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) { return <DialogPrimitive.Description className={cn("text-sm text-[var(--muted-foreground)]", className)} {...props} />; }
'''
files['components/ui/select.tsx'] = r'''"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn("flex h-10 w-full items-center justify-between rounded-xl border px-3 py-2 text-sm", className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="size-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content ref={ref} className={cn("z-50 overflow-hidden rounded-xl border bg-[var(--background)] shadow-md", className)} {...props}>
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item ref={ref} className={cn("relative flex cursor-default select-none items-center rounded-lg py-2 pl-8 pr-2 text-sm outline-none hover:bg-[var(--accent)]", className)} {...props}>
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
'''
files['components/ui/separator.tsx'] = r'''import { cn } from "@/lib/utils";

export function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("h-px w-full bg-[var(--border)]", className)} {...props} />;
}
'''
# app files
files['app/layout.tsx'] = r'''import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Catálogo React",
  description: "Sistema multi-tenant para gestão de catálogos de produtos com Supabase.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
'''
files['app/page.tsx'] = r'''import { redirect } from "next/navigation";

export default function HomePage() {
  redirect("/landing");
}
'''
files['app/landing/page.tsx'] = r'''import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-6 py-16 dark:from-slate-950 dark:to-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border px-4 py-1 text-sm">Catálogo React SaaS</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Gerencie catálogos por empresa, com upload, exportação e permissões.</h1>
            <p className="mt-5 max-w-2xl text-lg text-[var(--muted-foreground)]">
              Next.js + Supabase com isolamento multi-tenant por catálogo, autenticação SSR e geração de catálogo em PDF.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/pricing">Ver planos</Link>
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>O que já vem pronto</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-[var(--muted-foreground)]">
              <div>• CRUD de categorias e produtos</div>
              <div>• Upload de imagens via Supabase Storage</div>
              <div>• RLS por catalog_id + memberships</div>
              <div>• Exportação e preview do catálogo</div>
              <div>• Estrutura pronta para billing com Stripe</div>
            </CardContent>
          </Card>
        </header>
      </div>
    </main>
  );
}
'''
files['app/pricing/page.tsx'] = r'''import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  { name: "Starter", price: "R$ 49/mês", description: "1 catálogo, até 500 produtos" },
  { name: "Growth", price: "R$ 149/mês", description: "5 catálogos, exportação avançada" },
  { name: "Scale", price: "Sob consulta", description: "Catálogos ilimitados, suporte dedicado" },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold">Planos</h1>
        <p className="mt-3 text-[var(--muted-foreground)]">Estrutura pronta para integrar com Stripe Checkout e Billing Portal.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{plan.price}</div>
              <p className="mt-3 text-sm text-[var(--muted-foreground)]">{plan.description}</p>
              <Button className="mt-6 w-full">Assinar</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
'''
files['app/login/actions.ts'] = r'''"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/products");
}
'''
files['app/login/page.tsx'] = r'''import Link from "next/link";
import { login } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Autenticação SSR com Supabase.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={login} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit">Entrar</Button>
          </form>
          <div className="mt-4 text-sm text-[var(--muted-foreground)]">
            <Link href="/reset-password" className="underline">Esqueci minha senha</Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
'''
files['app/reset-password/actions.ts'] = r'''"use server";

import { createClient } from "@/lib/supabase/server";

export async function resetPassword(formData: FormData) {
  const email = String(formData.get("email") || "");
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
  });

  return {
    success: !error,
    error: error?.message,
  };
}
'''
files['app/reset-password/page.tsx'] = r'''import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "./actions";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Recuperar acesso</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={resetPassword} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <Button type="submit">Enviar link</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
'''
files['app/(dashboard)/layout.tsx'] = r'''import { AppSidebar } from "@/components/app-sidebar";
import { CatalogProvider } from "@/contexts/catalog-context";
import { getActiveMembership } from "@/lib/catalog";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const membership = await getActiveMembership();

  return (
    <CatalogProvider value={{ catalogId: membership.catalog_id, role: membership.role }}>
      <div className="min-h-screen md:grid md:grid-cols-[16rem_1fr]">
        <AppSidebar />
        <div className="min-w-0">{children}</div>
      </div>
    </CatalogProvider>
  );
}
'''
# categories
files['app/(dashboard)/categories/actions.ts'] = r'''"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getActiveMembership } from "@/lib/catalog";

const categorySchema = z.object({
  name: z.string().min(2),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
});

export async function saveCategory(formData: FormData) {
  const membership = await getActiveMembership();
  const values = categorySchema.parse({
    name: formData.get("name"),
    color: formData.get("color"),
  });
  const id = formData.get("id");
  const supabase = await createClient();

  if (id) {
    await supabase.from("categories").update(values).eq("id", id).eq("catalog_id", membership.catalog_id);
  } else {
    await supabase.from("categories").insert({ ...values, catalog_id: membership.catalog_id });
  }

  revalidatePath("/categories");
  revalidatePath("/products");
}

export async function deleteCategory(formData: FormData) {
  const membership = await getActiveMembership();
  const id = String(formData.get("id"));
  const supabase = await createClient();
  await supabase.from("categories").delete().eq("id", id).eq("catalog_id", membership.catalog_id);
  revalidatePath("/categories");
  revalidatePath("/products");
}
'''
files['components/category-form-dialog.tsx'] = r'''"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import type { Category } from "@/lib/types";
import { saveCategory } from "@/app/(dashboard)/categories/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CategoryFormDialog({ category }: { category?: Category }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  function onSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await saveCategory(formData);
        toast.success(category ? "Categoria atualizada" : "Categoria criada");
        setOpen(false);
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
'''
files['app/(dashboard)/categories/page.tsx'] = r'''import { DashboardHeader } from "@/components/dashboard-header";
import { CategoryFormDialog } from "@/components/category-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { getActiveMembership } from "@/lib/catalog";
import type { Category } from "@/lib/types";
import { deleteCategory } from "./actions";

export default async function CategoriesPage() {
  const membership = await getActiveMembership();
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("catalog_id", membership.catalog_id)
    .order("name")
    .returns<Category[]>();

  return (
    <div>
      <DashboardHeader title="Categorias" description="Organize seus produtos por grupos e cores." />
      <div className="space-y-6 p-6">
        <div className="flex justify-end">
          <CategoryFormDialog />
        </div>
        {!categories?.length ? (
          <EmptyState title="Nenhuma categoria criada" description="Comece criando as categorias do catálogo." actionLabel="Nova categoria" onAction={() => {}} />
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
                        <Badge style={{ backgroundColor: `${category.color}20`, borderColor: category.color, color: category.color }}>
                          {category.color}
                        </Badge>
                      </TableCell>
                      <TableCell className="flex gap-2">
                        <CategoryFormDialog category={category} />
                        <form action={deleteCategory}>
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
'''
# products
files['app/(dashboard)/products/actions.ts'] = r'''"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getActiveMembership } from "@/lib/catalog";

const productSchema = z.object({
  name: z.string().min(2),
  code: z.string().optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  image_url: z.string().url().optional().nullable().or(z.literal("")),
  price: z.coerce.number().min(0).nullable(),
});

export async function saveProduct(formData: FormData) {
  const membership = await getActiveMembership();
  const supabase = await createClient();

  const values = productSchema.parse({
    name: formData.get("name"),
    code: formData.get("code") || null,
    category_id: formData.get("category_id") || null,
    image_url: formData.get("image_url") || null,
    price: formData.get("price") || null,
  });

  const payload = {
    ...values,
    image_url: values.image_url || null,
    catalog_id: membership.catalog_id,
  };

  const id = formData.get("id");

  if (id) {
    await supabase.from("products").update(payload).eq("id", id).eq("catalog_id", membership.catalog_id);
  } else {
    await supabase.from("products").insert(payload);
  }

  revalidatePath("/products");
  revalidatePath("/export");
}

export async function deleteProduct(formData: FormData) {
  const membership = await getActiveMembership();
  const supabase = await createClient();
  const id = String(formData.get("id"));
  await supabase.from("products").delete().eq("id", id).eq("catalog_id", membership.catalog_id);
  revalidatePath("/products");
  revalidatePath("/export");
}
'''
files['components/product-form-dialog.tsx'] = r'''"use client";

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

export function ProductFormDialog({ categories, product }: { categories: Category[]; product?: Product }) {
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
'''
files['components/product-filters.tsx'] = r'''"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import type { Category } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ProductFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === "all") params.delete(key);
    else params.set(key, value);
    router.push(`/products?${params.toString()}`);
  }

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_220px]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
        <Input
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="Buscar por nome ou código"
          className="pl-9"
          onKeyDown={(e) => {
            if (e.key === "Enter") updateParam("q", (e.target as HTMLInputElement).value);
          }}
        />
      </div>
      <Select defaultValue={searchParams.get("category") ?? "all"} onValueChange={(value) => updateParam("category", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as categorias</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
'''
files['app/(dashboard)/products/page.tsx'] = r'''import Image from "next/image";
import { DashboardHeader } from "@/components/dashboard-header";
import { ProductFilters } from "@/components/product-filters";
import { ProductFormDialog } from "@/components/product-form-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getActiveMembership } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/utils";
import type { Category, Product } from "@/lib/types";
import { deleteProduct } from "./actions";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const membership = await getActiveMembership();
  const supabase = await createClient();

  const categoriesQuery = supabase
    .from("categories")
    .select("*")
    .eq("catalog_id", membership.catalog_id)
    .order("name");

  const productsQuery = supabase
    .from("products")
    .select("*, categories(name, color)")
    .eq("catalog_id", membership.catalog_id)
    .order("created_at", { ascending: false });

  if (q) {
    productsQuery.or(`name.ilike.%${q}%,code.ilike.%${q}%`);
  }

  if (category) {
    productsQuery.eq("category_id", category);
  }

  const [{ data: categories }, { data: products }] = await Promise.all([
    categoriesQuery.returns<Category[]>(),
    productsQuery.returns<Product[]>(),
  ]);

  return (
    <div>
      <DashboardHeader title="Produtos" description="Gerencie itens, imagens, preços e categorias do catálogo." />
      <div className="space-y-6 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0 flex-1">
            <ProductFilters categories={categories ?? []} />
          </div>
          <ProductFormDialog categories={categories ?? []} />
        </div>

        {!products?.length ? (
          <EmptyState title="Nenhum produto encontrado" description="Cadastre o primeiro produto do catálogo para começar a exportação." />
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
                            <p className="text-xs text-[var(--muted-foreground)]">Criado em {new Date(product.created_at).toLocaleDateString("pt-BR")}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.code || "—"}</TableCell>
                      <TableCell>
                        {product.categories ? (
                          <Badge style={{ backgroundColor: `${product.categories.color}20`, borderColor: product.categories.color, color: product.categories.color }}>
                            {product.categories.name}
                          </Badge>
                        ) : "—"}
                      </TableCell>
                      <TableCell>{formatCurrency(product.price ?? 0)}</TableCell>
                      <TableCell className="flex gap-2">
                        <ProductFormDialog categories={categories ?? []} product={product} />
                        <form action={deleteProduct}>
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
      </div>
    </div>
  );
}
'''
# settings/export/billing
files['app/(dashboard)/settings/actions.ts'] = r'''"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getActiveMembership } from "@/lib/catalog";

export async function saveCompanySettings(formData: FormData) {
  const membership = await getActiveMembership();
  const supabase = await createClient();

  const payload = {
    catalog_id: membership.catalog_id,
    company_name: String(formData.get("company_name") || ""),
    legal_name: String(formData.get("legal_name") || ""),
    cnpj: String(formData.get("cnpj") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    website: String(formData.get("website") || ""),
    address: String(formData.get("address") || ""),
    logo_url: String(formData.get("logo_url") || ""),
    primary_color: String(formData.get("primary_color") || "#1e3a5f"),
    accent_color: String(formData.get("accent_color") || "#0f172a"),
    pdf_footer_text: String(formData.get("pdf_footer_text") || ""),
  };

  await supabase.from("company_settings").upsert(payload, { onConflict: "catalog_id" });
  revalidatePath("/settings");
  revalidatePath("/export");
}
'''
files['app/(dashboard)/settings/page.tsx'] = r'''import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getActiveMembership } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/server";
import type { CompanySettings } from "@/lib/types";
import { saveCompanySettings } from "./actions";

export default async function SettingsPage() {
  const membership = await getActiveMembership();
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("company_settings")
    .select("*")
    .eq("catalog_id", membership.catalog_id)
    .maybeSingle<CompanySettings>();

  return (
    <div>
      <DashboardHeader title="Configurações" description="Dados da empresa, branding e texto de rodapé do PDF." />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados da empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={saveCompanySettings} className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="company_name">Nome fantasia</Label>
                <Input id="company_name" name="company_name" defaultValue={settings?.company_name ?? ""} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="legal_name">Razão social</Label>
                <Input id="legal_name" name="legal_name" defaultValue={settings?.legal_name ?? ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input id="cnpj" name="cnpj" defaultValue={settings?.cnpj ?? ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" defaultValue={settings?.email ?? ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" defaultValue={settings?.phone ?? ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="website">Site</Label>
                <Input id="website" name="website" defaultValue={settings?.website ?? ""} />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" name="address" defaultValue={settings?.address ?? ""} />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input id="logo_url" name="logo_url" defaultValue={settings?.logo_url ?? ""} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="primary_color">Cor principal</Label>
                <Input id="primary_color" name="primary_color" defaultValue={settings?.primary_color ?? "#1e3a5f"} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="accent_color">Cor de destaque</Label>
                <Input id="accent_color" name="accent_color" defaultValue={settings?.accent_color ?? "#0f172a"} />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="pdf_footer_text">Rodapé do PDF</Label>
                <Textarea id="pdf_footer_text" name="pdf_footer_text" defaultValue={settings?.pdf_footer_text ?? ""} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit">Salvar configurações</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
'''
files['components/catalog-preview.tsx'] = r'''"use client";

import Image from "next/image";
import jsPDF from "jspdf";
import type { CompanySettings, Product } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CatalogPreview({ settings, products }: { settings: CompanySettings | null; products: Product[] }) {
  function exportPdf() {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });
    const marginX = 40;
    let y = 50;

    pdf.setFontSize(22);
    pdf.text(settings?.company_name || "Catálogo de Produtos", marginX, y);
    y += 24;
    pdf.setFontSize(11);
    pdf.text(settings?.pdf_footer_text || "Catálogo exportado pelo Catálogo React", marginX, y);
    y += 30;

    products.forEach((product, index) => {
      if (y > 740) {
        pdf.addPage();
        y = 50;
      }
      pdf.setFontSize(14);
      pdf.text(product.name, marginX, y);
      y += 16;
      pdf.setFontSize(10);
      pdf.text(`Código: ${product.code || "—"}`, marginX, y);
      y += 14;
      pdf.text(`Preço: ${formatCurrency(product.price ?? 0)}`, marginX, y);
      y += 18;
      if (product.categories?.name) {
        pdf.text(`Categoria: ${product.categories.name}`, marginX, y);
        y += 18;
      }
      if (index < products.length - 1) {
        pdf.line(marginX, y, 555, y);
        y += 18;
      }
    });

    pdf.save("catalogo.pdf");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border bg-white p-10 text-slate-900 shadow-sm">
        <div className="flex items-center gap-4">
          {settings?.logo_url ? (
            <div className="relative size-16 overflow-hidden rounded-xl border">
              <Image src={settings.logo_url} alt={settings.company_name} fill className="object-cover" />
            </div>
          ) : null}
          <div>
            <h2 className="text-2xl font-bold">{settings?.company_name || "Sua empresa"}</h2>
            <p className="text-sm text-slate-500">{settings?.pdf_footer_text || "Pré-visualização do catálogo"}</p>
          </div>
        </div>
        <div className="mt-8 grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border p-4">
              <div className="flex items-center gap-4">
                <div className="relative size-20 overflow-hidden rounded-xl border bg-slate-100">
                  {product.image_url ? <Image src={product.image_url} alt={product.name} fill className="object-cover" /> : null}
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-slate-500">{product.code || "Sem código"}</p>
                  <p className="font-medium">{formatCurrency(product.price ?? 0)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border p-6">
        <h3 className="text-lg font-semibold">Exportação</h3>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">Geração inicial em PDF via jsPDF com base nos produtos e configurações.</p>
        <Button className="mt-4 w-full" onClick={exportPdf}>Baixar PDF</Button>
      </div>
    </div>
  );
}
'''
files['app/(dashboard)/export/page.tsx'] = r'''import { DashboardHeader } from "@/components/dashboard-header";
import { CatalogPreview } from "@/components/catalog-preview";
import { getActiveMembership } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/server";
import type { CompanySettings, Product } from "@/lib/types";

export default async function ExportPage() {
  const membership = await getActiveMembership();
  const supabase = await createClient();

  const [{ data: settings }, { data: products }] = await Promise.all([
    supabase.from("company_settings").select("*").eq("catalog_id", membership.catalog_id).maybeSingle<CompanySettings>(),
    supabase.from("products").select("*, categories(name, color)").eq("catalog_id", membership.catalog_id).order("name").returns<Product[]>(),
  ]);

  return (
    <div>
      <DashboardHeader title="Exportar catálogo" description="Pré-visualize os produtos e gere um PDF básico." />
      <div className="p-6">
        <CatalogPreview settings={settings} products={products ?? []} />
      </div>
    </div>
  );
}
'''
files['app/(dashboard)/billing/page.tsx'] = r'''import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function BillingPage() {
  return (
    <div>
      <DashboardHeader title="Billing" description="Estrutura inicial para Stripe Checkout e Billing Portal." />
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Integração Stripe</CardTitle>
            <CardDescription>Crie endpoints em /app/api/stripe para checkout, portal e webhooks.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button disabled>Abrir portal de cobrança</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
'''
files['app/api/health/route.ts'] = r'''import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, service: "catalogo-react" });
}
'''
# supabase SQL
files['supabase/migrations/0001_init.sql'] = r'''create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.catalogs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  theme_mode text not null default 'system' check (theme_mode in ('light', 'dark', 'system')),
  pdf_title text,
  pdf_subtitle text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.catalog_memberships (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null references public.catalogs(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz not null default timezone('utc', now()),
  unique (catalog_id, user_id)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null references public.catalogs(id) on delete cascade,
  name text not null,
  color text not null default '#1e3a5f',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null references public.catalogs(id) on delete cascade,
  name text not null,
  code text,
  category_id uuid references public.categories(id) on delete set null,
  image_url text,
  price numeric(10,2),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.company_settings (
  id uuid primary key default gen_random_uuid(),
  catalog_id uuid not null unique references public.catalogs(id) on delete cascade,
  company_name text not null,
  legal_name text,
  cnpj text,
  email text,
  phone text,
  website text,
  address text,
  logo_url text,
  primary_color text not null default '#1e3a5f',
  accent_color text not null default '#0f172a',
  pdf_footer_text text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_categories_catalog_id on public.categories(catalog_id);
create index if not exists idx_products_catalog_id on public.products(catalog_id);
create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_memberships_user_catalog on public.catalog_memberships(user_id, catalog_id);

create trigger set_catalogs_updated_at
before update on public.catalogs
for each row execute function public.set_updated_at();

create trigger set_categories_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

create trigger set_products_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger set_company_settings_updated_at
before update on public.company_settings
for each row execute function public.set_updated_at();

alter table public.catalogs enable row level security;
alter table public.catalog_memberships enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.company_settings enable row level security;

create or replace function public.current_catalog_role(target_catalog_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select cm.role
  from public.catalog_memberships cm
  where cm.catalog_id = target_catalog_id
    and cm.user_id = auth.uid()
  limit 1;
$$;

create or replace function public.is_catalog_member(target_catalog_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1
    from public.catalog_memberships cm
    where cm.catalog_id = target_catalog_id
      and cm.user_id = auth.uid()
  );
$$;

create or replace function public.can_edit_catalog(target_catalog_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_catalog_role(target_catalog_id) in ('admin','editor'), false);
$$;

create or replace function public.is_catalog_admin(target_catalog_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_catalog_role(target_catalog_id) = 'admin', false);
$$;

create policy "members can view catalogs"
on public.catalogs
for select
using (public.is_catalog_member(id));

create policy "admins can update catalogs"
on public.catalogs
for update
using (public.is_catalog_admin(id))
with check (public.is_catalog_admin(id));

create policy "members can view memberships of own catalogs"
on public.catalog_memberships
for select
using (public.is_catalog_member(catalog_id));

create policy "admins can manage memberships"
on public.catalog_memberships
for all
using (public.is_catalog_admin(catalog_id))
with check (public.is_catalog_admin(catalog_id));

create policy "members can view categories"
on public.categories
for select
using (public.is_catalog_member(catalog_id));

create policy "editors can insert categories"
on public.categories
for insert
with check (public.can_edit_catalog(catalog_id));

create policy "editors can update categories"
on public.categories
for update
using (public.can_edit_catalog(catalog_id))
with check (public.can_edit_catalog(catalog_id));

create policy "editors can delete categories"
on public.categories
for delete
using (public.can_edit_catalog(catalog_id));

create policy "members can view products"
on public.products
for select
using (public.is_catalog_member(catalog_id));

create policy "editors can insert products"
on public.products
for insert
with check (public.can_edit_catalog(catalog_id));

create policy "editors can update products"
on public.products
for update
using (public.can_edit_catalog(catalog_id))
with check (public.can_edit_catalog(catalog_id));

create policy "editors can delete products"
on public.products
for delete
using (public.can_edit_catalog(catalog_id));

create policy "members can view company settings"
on public.company_settings
for select
using (public.is_catalog_member(catalog_id));

create policy "editors can manage company settings"
on public.company_settings
for all
using (public.can_edit_catalog(catalog_id))
with check (public.can_edit_catalog(catalog_id));
'''
files['README.md'] = r'''# Catálogo React

Sistema multi-tenant de gerenciamento de catálogos com Next.js 16 + React 19 + Supabase.

## Stack
- Next.js 16.2.2 (App Router)
- React 19 + TypeScript
- Tailwind CSS v4
- Supabase SSR/Auth/DB/Storage
- Sonner, next-themes, shadcn/ui base

## Como rodar
```bash
cp .env.example .env.local
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Configuração Supabase
1. Crie um projeto no Supabase.
2. Rode a migration em `supabase/migrations/0001_init.sql`.
3. Crie um bucket público chamado `product-images`.
4. Ative email/password em Authentication.
5. Crie ao menos um `catalogs` e um `catalog_memberships` para o usuário autenticado.

### Seed manual mínimo
```sql
insert into public.catalogs (name, slug) values ('Catálogo Demo', 'catalogo-demo') returning id;
-- copie o id retornado
insert into public.catalog_memberships (catalog_id, user_id, role)
values ('<CATALOG_ID>', '<AUTH_USER_ID>', 'admin');

insert into public.company_settings (catalog_id, company_name)
values ('<CATALOG_ID>', 'Minha Empresa');
```

## Estrutura principal
- `app/(dashboard)` rotas protegidas
- `lib/supabase` clients SSR/browser/middleware
- `contexts/catalog-context.tsx` catálogo ativo
- `supabase/migrations` schema SQL + RLS

## Próximos passos recomendados
- Stripe Checkout + webhooks
- seleção de múltiplos catálogos por usuário
- exportação PDF mais avançada com layout/imagens reais
- paginação, ordenação e auditoria
'''

for path, content in files.items():
    file_path = root / path
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding='utf-8')
print(f'Wrote {len(files)} files')
