"use client";

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { 
  User, 
  AuthToken, 
  AuthState, 
  LoginCredentials, 
  UserRole,
  ROLE_PERMISSIONS 
} from '@/types/auth';

// Auth Actions
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: AuthToken } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User };

// Initial auth state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: true, // Start with loading to check existing auth
  error: null,
};

// Auth reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        isLoading: false,
      };
    
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
      };
    
    default:
      return state;
  }
}

// Auth Context Type
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
  checkPermission: (permission: string) => boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
  refreshAuth: () => Promise<boolean>;
}

// Create Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Auth Provider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // Check existing authentication on mount
  useEffect(() => {
    checkExistingAuth();
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (state.token && state.isAuthenticated) {
      const refreshInterval = setInterval(() => {
        // Refresh token logic will be handled by the refreshAuth function
        authService.refreshToken().catch(console.error);
      }, 5 * 60 * 1000); // Check every 5 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [state.token, state.isAuthenticated]);

  // Check for existing authentication
  const checkExistingAuth = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const result = await authService.verifyToken();
      
      if (result.success && result.data?.user && result.data.isValid) {
        const token = authService.getToken();
        if (token) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: result.data.user,
              token,
            },
          });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        // Token invalid or expired
        await authService.clearToken();
        dispatch({ type: 'LOGOUT' });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      await authService.clearToken();
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Login function
  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const result = await authService.login(credentials);
      
      if ('success' in result && result.success) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: result.data.user,
            token: result.data.token,
          },
        });

        // Redirect based on user role
        const redirectPath = getRedirectPath(result.data.user.role);
        router.push(redirectPath);
        
        return true;
      } else {
        const errorMessage = 'error' in result 
          ? result.error.message 
          : 'Login failed';
        
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        return false;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return false;
    }
  }, [router]);

  // Logout function
  const logout = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: 'LOGOUT' });
      
      // Redirect to appropriate login page
      router.push('/signin');
    }
  }, [router]);

  // Check if user has specific permission
  const checkPermission = useCallback((permission: string): boolean => {
    if (!state.user || !state.isAuthenticated) {
      return false;
    }

    // Admin has all permissions
    if (state.user.role === 'admin') {
      return true;
    }

    // Check user's permissions array
    return state.user.permissions.includes(permission);
  }, [state.user, state.isAuthenticated]);

  // Check if user has specific role(s)
  const hasRole = useCallback((role: UserRole | UserRole[]): boolean => {
    if (!state.user || !state.isAuthenticated) {
      return false;
    }

    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(state.user.role);
  }, [state.user, state.isAuthenticated]);

  // Refresh authentication
  const refreshAuth = useCallback(async (): Promise<boolean> => {
    try {
      const newToken = await authService.refreshToken();
      
      if (newToken) {
        // Verify with the new token
        const result = await authService.verifyToken();
        
        if (result.success && result.data?.user) {
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: result.data.user,
              token: newToken,
            },
          });
          return true;
        }
      }
      
      // If refresh failed, logout user
      await logout();
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      await logout();
      return false;
    }
  }, [logout]);

  // Get redirect path based on user role
  const getRedirectPath = (role: UserRole): string => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'staff':
        return '/staff';
      case 'executive':
        return '/executive';
      default:
        return '/';
    }
  };

  // Context value
  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    checkPermission,
    hasRole,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Hook for checking permissions
export function usePermission(permission: string): boolean {
  const { checkPermission } = useAuth();
  return checkPermission(permission);
}

// Hook for checking roles
export function useRole(role: UserRole | UserRole[]): boolean {
  const { hasRole } = useAuth();
  return hasRole(role);
}

// Hook for getting user permissions based on role
export function useUserPermissions(): string[] {
  const { user } = useAuth();
  
  if (!user) return [];
  
  return ROLE_PERMISSIONS[user.role] || [];
}