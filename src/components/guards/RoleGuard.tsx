"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import type { UserRole } from '@/types/api';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export function RoleGuard({ children, allowedRoles, redirectTo = '/login' }: RoleGuardProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated || !user) {
      router.push(redirectTo);
      return;
    }

    const userRoleUpper = user.role.toUpperCase() as UserRole;
    if (!allowedRoles.includes(userRoleUpper)) {
      // Redirect to appropriate dashboard based on role
      switch (userRoleUpper) {
        case 'ADMIN':
          router.push('/admin');
          break;
        case 'STAFF':
          router.push('/staff/patient-search');
          break;
        case 'EXECUTIVE':
          router.push('/executive');
          break;
        default:
          router.push('/');
      }
    }
  }, [isAuthenticated, user, isLoading, allowedRoles, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user || !allowedRoles.includes(user.role.toUpperCase() as UserRole)) {
    return null;
  }

  return <>{children}</>;
}

// Specific guards for each role
export function AdminGuard({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={['ADMIN']}>{children}</RoleGuard>;
}

export function StaffGuard({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={['STAFF']}>{children}</RoleGuard>;
}

export function ExecutiveGuard({ children }: { children: React.ReactNode }) {
  return <RoleGuard allowedRoles={['EXECUTIVE']}>{children}</RoleGuard>;
}

// Multi-role guard
export function MultiRoleGuard({ 
  children, 
  roles 
}: { 
  children: React.ReactNode;
  roles: UserRole[];
}) {
  return <RoleGuard allowedRoles={roles}>{children}</RoleGuard>;
}
