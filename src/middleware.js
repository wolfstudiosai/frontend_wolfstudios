import { NextResponse } from 'next/server';

import { config as appConfig } from '@/config';
import { AuthStrategy } from '@/lib/auth/strategy';
import { supabaseMiddleware } from '@/lib/auth/supabase/middleware';

export async function middleware(req) {

  const token = req.cookies.get('token');
  const protectedRoutes =
    [
      '/admin',
      '/dashboard',
    ];
  const path = req.nextUrl.pathname


  const isCurrentPathProtected = protectedRoutes.some((route) => path.startsWith(route));
  // If the user does not exist and the URL contains /vendor, redirect them to the home page
  if (!token && isCurrentPathProtected) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // If the user exists and tries to access the login page, redirect them to the home page
  if (token && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  let res;

  if (appConfig.auth.strategy === AuthStrategy.SUPABASE) {
    res = await supabaseMiddleware(req);
  } else {
    res = NextResponse.next({ headers: req.headers });
  }

  return res;
}

export const config = { matcher: ['/auth/:path*', '/dashboard/:path*'] };
