import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authService } from '@/services/auth.service';

// Define route patterns and their required roles
const ROUTE_CONFIG = {
  // Public routes (no authentication required)
  public: [
    '/',
    '/signin',
    '/signin/admin',
    '/signin/staff',
    '/signin/executive',
    '/signup',
    '/forgot-password',
    '/api/auth/login',
    '/api/auth/refresh',
  ],
  
  // Admin-only routes
  admin: [
    '/admin',
    '/admin/**',
  ],
  
  // Staff-only routes
  staff: [
    '/staff',
    '/staff/**',
  ],
  
  // Executive-only routes
  executive: [
    '/executive',
    '/executive/**',
  ],
  
  // Routes accessible by multiple roles
  shared: [
    '/profile',
    '/settings',
  ],
};

// Function to check if path matches any pattern in array
function matchesPattern(pathname: string, patterns: string[]): boolean {
  return patterns.some(pattern => {
    if (pattern.endsWith('/**')) {
      return pathname.startsWith(pattern.slice(0, -3));
    }
    return pathname === pattern || pathname.startsWith(pattern + '/');
  });
}

// Function to get user role from token (simplified - in real app, verify with backend)
async function getUserRoleFromToken(token: string): Promise<string | null> {
  try {
    // In a real application, you would verify this token with your backend
    // For now, we'll decode the JWT payload (note: this is not secure verification)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow public routes without authentication
  if (matchesPattern(pathname, ROUTE_CONFIG.public)) {
    return NextResponse.next();
  }

  // Get token from cookies or Authorization header
  const token = request.cookies.get('auth_token')?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '');

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL('/signin', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Get user role from token
  const userRole = await getUserRoleFromToken(token);
  
  if (!userRole) {
    // Invalid token, redirect to login
    const loginUrl = new URL('/signin', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  if (matchesPattern(pathname, ROUTE_CONFIG.admin) && userRole !== 'admin') {
    return NextResponse.redirect(new URL(`/${userRole}`, request.url));
  }
  
  if (matchesPattern(pathname, ROUTE_CONFIG.staff) && userRole !== 'staff') {
    return NextResponse.redirect(new URL(`/${userRole}`, request.url));
  }
  
  if (matchesPattern(pathname, ROUTE_CONFIG.executive) && userRole !== 'executive') {
    return NextResponse.redirect(new URL(`/${userRole}`, request.url));
  }

  // Allow access to shared routes for authenticated users
  if (matchesPattern(pathname, ROUTE_CONFIG.shared)) {
    return NextResponse.next();
  }

  // If user tries to access root authenticated area, redirect to their dashboard
  if (pathname === '/dashboard' || pathname === '/app') {
    return NextResponse.redirect(new URL(`/${userRole}`, request.url));
  }

  // Default: allow access
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - icons (public icons)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
};