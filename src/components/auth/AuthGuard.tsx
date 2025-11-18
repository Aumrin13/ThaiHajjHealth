"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { UserRole } from '@/types/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  requiredPermissions?: string[];
  fallbackPath?: string;
}

export function AuthGuard({ 
  children, 
  requiredRole, 
  requiredPermissions, 
  fallbackPath = '/signin' 
}: AuthGuardProps) {
  const { isAuthenticated, user, isLoading, hasRole, checkPermission } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Don't check authorization while still loading
    if (isLoading) {
      return;
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
      router.push(fallbackPath);
      return;
    }

    // Check role requirements
    if (requiredRole) {
      const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      const hasRequiredRole = hasRole(roles);
      
      if (!hasRequiredRole) {
        // Redirect based on user's actual role
        const redirectPath = getRedirectPathForRole(user.role);
        router.push(redirectPath);
        return;
      }
    }

    // Check permission requirements
    if (requiredPermissions && requiredPermissions.length > 0) {
      const hasAllPermissions = requiredPermissions.every(permission => 
        checkPermission(permission)
      );
      
      if (!hasAllPermissions) {
        // Redirect to unauthorized page or dashboard
        const redirectPath = getRedirectPathForRole(user.role);
        router.push(redirectPath);
        return;
      }
    }

    // All checks passed
    setIsAuthorized(true);
  }, [isAuthenticated, user, isLoading, requiredRole, requiredPermissions, router, pathname, hasRole, checkPermission, fallbackPath]);

  // Get appropriate redirect path based on user role
  const getRedirectPathForRole = (role: UserRole): string => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'staff':
        return '/staff';
      case 'executive':
        return '/executive';
      default:
        return '/signin';
    }
  };

  // Show loading while checking authentication
  if (isLoading || isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show children if authorized
  if (isAuthorized) {
    return <>{children}</>;
  }

  // This should not be reached due to redirects above, but just in case
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">กำลังเปลี่ยนเส้นทาง...</h1>
        <p className="text-gray-600">กรุณารอสักครู่</p>
      </div>
    </div>
  );
}

// Role-specific guards for convenience
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="admin">
      {children}
    </AuthGuard>
  );
}

export function StaffGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="staff">
      {children}
    </AuthGuard>
  );
}

export function ExecutiveGuard({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="executive">
      {children}
    </AuthGuard>
  );
}

// Multi-role guard
export function MultiRoleGuard({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: UserRole[];
}) {
  return (
    <AuthGuard requiredRole={allowedRoles}>
      {children}
    </AuthGuard>
  );
}

// Permission-based guard
export function PermissionGuard({ 
  children, 
  permissions 
}: { 
  children: React.ReactNode;
  permissions: string[];
}) {
  return (
    <AuthGuard requiredPermissions={permissions}>
      {children}
    </AuthGuard>
  );
}