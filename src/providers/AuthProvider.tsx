"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/auth-api';
import { storage } from '@/lib/storage';
import type { User, UserRole } from '@/types/auth';
import { ROLE_PERMISSIONS } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  checkPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check existing auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = storage.getAccessToken();
    const savedUser = storage.getUser();

    if (token && savedUser) {
      // Verify token with backend
      const response = await authAPI.getCurrentUser(token);
      if (response.success && response.data) {
        const apiUser = response.data as any;
        const mappedUser: User = {
          ...apiUser,
          role: (apiUser.role || '').toLowerCase(),
          permissions: Array.isArray(apiUser.permissions)
            ? apiUser.permissions
            : (apiUser.role && typeof apiUser.role === 'string' && ROLE_PERMISSIONS[apiUser.role.toLowerCase() as UserRole])
              ? ROLE_PERMISSIONS[apiUser.role.toLowerCase() as UserRole]
              : [],
          isActive: apiUser.status ? apiUser.status === 'ACTIVE' : true,
        };
        setUser(mappedUser);
        storage.setUser({ ...mappedUser });
      } else {
        // Token invalid, clear storage
        storage.clearAll();
        setUser(null);
      }
    }

    setIsLoading(false);
  }

  async function login(email: string, password: string) {
    try {
      const response = await authAPI.login({ email, password });

      if (!response.success || !response.data) {
        return {
          success: false,
          error: response.error?.message || 'เข้าสู่ระบบไม่สำเร็จ',
        };
      }

      const { user, accessToken, refreshToken } = response.data;

      // แปลง user จาก API (src/types/api) ให้ตรงกับ type User (src/types/auth)
      const apiUser = user as any;
      const mappedUser: User = {
        ...apiUser,
        role: (apiUser.role || '').toLowerCase(),
        permissions: Array.isArray(apiUser.permissions)
          ? apiUser.permissions
          : (apiUser.role && typeof apiUser.role === 'string' && ROLE_PERMISSIONS[apiUser.role.toLowerCase() as UserRole])
            ? ROLE_PERMISSIONS[apiUser.role.toLowerCase() as UserRole]
            : [],
        isActive: apiUser.status ? apiUser.status === 'ACTIVE' : true,
      };

      // Save to storage
      storage.setAccessToken(accessToken);
      storage.setRefreshToken(refreshToken);
      storage.setUser({ ...mappedUser });

      // Update state
      setUser(mappedUser);

      // Redirect based on role (role เป็นตัวพิมพ์เล็ก)
      redirectByRole(mappedUser.role);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ',
      };
    }
  }

  async function logout() {
    const token = storage.getAccessToken();

    if (token) {
      try {
        await authAPI.logout(token);
      } catch (error) {
        console.error('Logout error:', error);
      }
    }

    // Clear storage and state
    storage.clearAll();
    setUser(null);

    // Redirect to signin
    router.push('/signin');
  }

  function redirectByRole(role: UserRole) {
    switch (role) {
      case 'admin':
        router.push('/admin');
        break;
      case 'staff':
        router.push('/staff/patient-search');
        break;
      case 'executive':
        router.push('/executive');
        break;
      default:
        router.push('/');
    }
  }

  function hasRole(role: UserRole | UserRole[]): boolean {
    if (!user) return false;
    
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    
    return user.role === role;
  }


  function checkPermission(permission: string): boolean {
    if (!user || !Array.isArray(user.permissions)) return false;
    return user.permissions.includes(permission);
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    hasRole,
    checkPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
