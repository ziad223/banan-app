import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
});

// List of fully public static routes
const staticPublicRoutes = [
  '/', '/ar', '/en',
  '/ar/login', '/en/login',
  '/ar/register', '/en/register',
  '/ar/about', '/en/about',
];

// Regex patterns for dynamic public routes
const dynamicPublicPatterns = [
  /^\/(ar|en)\/pages\/[^/]+$/,         // e.g. /ar/pages/slug
  /^\/(ar|en)\/services\/[^/]+$/,      // e.g. /ar/services/123
  /^\/(ar|en)\/blog\/[^/]+$/,          // e.g. /ar/blog/post-title
  /^\/(ar|en)\/contact$/,              // static public like /ar/contact
];

// Helper to check if route is public
const isPublicPath = (pathname: string): boolean => {
  return (
    staticPublicRoutes.includes(pathname) ||
    dynamicPublicPatterns.some((pattern) => pattern.test(pathname))
  );
};

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Apply i18n middleware (handles locale detection)
  const intlResponse = intlMiddleware(request);

  // Allow static assets to pass through (images, _next, fonts, etc.)
  const isStaticAsset =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/icons');

  if (isStaticAsset || isPublicPath(pathname)) {
    return intlResponse;
  }

  // Require auth for private paths
  const token = request.cookies.get('token')?.value;

//  if (!token) {
//   const locale = pathname.split('/')[1] || 'ar';
//   const callbackUrl = encodeURIComponent(pathname + request.nextUrl.search); // full original path
//   return NextResponse.redirect(
//     new URL(`/${locale}/login?callbackUrl=${callbackUrl}`, request.url)
//   );
// }

  return intlResponse;
}

// Apply middleware to all localized routes
export const config = {
  matcher: ['/', '/(ar|en)/:path*'],
};
