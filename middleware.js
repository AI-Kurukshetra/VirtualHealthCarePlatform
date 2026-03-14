import { NextResponse } from 'next/server';
import { AUTH_COOKIE_NAME } from '@/utils/auth-cookie';

const AUTH_ROUTES = ['/login', '/signup'];

function parseJwtPayload(token) {
  try {
    const payload = token.split('.')[1];
    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return JSON.parse(atob(padded));
  } catch (_error) {
    return null;
  }
}

function hasValidSessionToken(token) {
  if (!token) {
    return false;
  }

  const payload = parseJwtPayload(token);
  if (!payload?.exp) {
    return false;
  }

  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp > nowInSeconds;
}

function applySecurityHeaders(response) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data:; media-src 'self' blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; connect-src 'self' https: wss:;"
  );
  return response;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isApiRoute = pathname.startsWith('/api');
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
  const sessionToken = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const hasSession = hasValidSessionToken(sessionToken);

  if (
    process.env.NODE_ENV === 'production' &&
    request.headers.get('x-forwarded-proto') !== 'https'
  ) {
    const secureUrl = new URL(request.url);
    secureUrl.protocol = 'https';
    return applySecurityHeaders(NextResponse.redirect(secureUrl));
  }

  if (!isApiRoute) {
    if (!hasSession && !isAuthRoute) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      const response = NextResponse.redirect(loginUrl);
      if (sessionToken) {
        response.cookies.delete(AUTH_COOKIE_NAME);
      }
      return applySecurityHeaders(response);
    }

    if (hasSession && isAuthRoute) {
      return applySecurityHeaders(NextResponse.redirect(new URL('/dashboard', request.url)));
    }
  }

  return applySecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
