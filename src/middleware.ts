import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
 
// Routes that do NOT require authentication
const PUBLIC_ROUTES = ['/login', '/signup', '/auth/callback']
 
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
 
  // ── Hard bypass for all static and PWA assets ─────────────────
  // This runs before Supabase is even initialized.
  // Any file-like path or known PWA asset is passed through directly.
  if (
    pathname.includes('.') ||          // any file with an extension
    pathname.startsWith('/icons/') ||  // icon folder
    pathname.startsWith('/api/')       // API routes handle their own auth
  ) {
    return NextResponse.next()
  }

  // ── Supabase SSR client ───────────────────────────────────────
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Do not add any logic between createServerClient and
  // getUser(). A subtle bug can make it very hard to debug session issues.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Handle the root path explicitly on the server
  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = user ? '/dashboard' : '/login';
    return NextResponse.redirect(url);
  }

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route),
  );

  // If the user is not signed in and tries to access a protected route,
  // redirect them to the login page.
  if (!user && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If the user IS signed in and tries to access login/signup,
  // redirect them to the dashboard instead.
  if (user && isPublicRoute && pathname !== "/auth/callback") {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // IMPORTANT: Return supabaseResponse, not a plain NextResponse.next().
  return supabaseResponse;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/log/:path*',
    '/journal/:path*',
    '/goals/:path*',
    '/search/:path*',
    '/stories/:path*',
    '/profile/:path*',
    '/admin/:path*',
    '/resources/:path*',
    '/login',
    '/signup',
    '/auth/:path*',
    '/',
  ],
}
