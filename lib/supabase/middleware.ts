import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { DEMO_SESSION_COOKIE } from "@/lib/demo-mode";

export async function updateSession(request: NextRequest) {
  const isDemoAuthenticated = request.cookies.get(DEMO_SESSION_COOKIE)?.value === "1";

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/reset-password");
  const isPublicPage = ["/landing", "/pricing", "/api/", "/api/auth/callback"].some((path) =>
    request.nextUrl.pathname.startsWith(path),
  );

  // Demo mode: skip all Supabase calls entirely
  if (isDemoAuthenticated) {
    if (isAuthPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/products";
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  // Public and auth pages don't need session refresh
  if (isPublicPage || request.nextUrl.pathname === "/") {
    return NextResponse.next({ request });
  }

  // Only create Supabase client + call getUser for protected pages in real auth mode
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as Record<string, unknown>),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/products";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
