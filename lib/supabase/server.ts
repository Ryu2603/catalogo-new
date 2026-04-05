import { cookies } from "next/headers";
import { cache } from "react";
import { createServerClient, type SetAllCookies } from "@supabase/ssr";
import { DEMO_SESSION_COOKIE } from "@/lib/demo-mode";

// Cache the demo check per-request so we only call cookies() once
export const isDemoMode = cache(async (): Promise<boolean> => {
  const cookieStore = await cookies();
  return cookieStore.get(DEMO_SESSION_COOKIE)?.value === "1";
});

// Cache the Supabase client per-request so we only create one
export const createClient = cache(async () => {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: Parameters<SetAllCookies>[0]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignore if called in a Server Component (read-only context)
          }
        },
      },
    },
  );
});
