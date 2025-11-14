/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

import { apiClient, ApiResponse } from './api-client';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  LogoutResponse,
  ChangePasswordRequest,
  ChangePasswordResponse,
  User,
} from '@/types/api';

class AuthAPI {
  /**
   * Login user
   * POST /api/auth/login
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse['data']>> {
    return apiClient.post<LoginResponse['data']>('/api/auth/login', credentials);
  }

  /**
   * Logout user
   * POST /api/auth/logout
   */
  async logout(token: string): Promise<ApiResponse<LogoutResponse>> {
    return apiClient.post<LogoutResponse>('/api/auth/logout', {}, token);
  }

  /**
   * Refresh access token
   * POST /api/auth/refresh-token
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<RefreshTokenResponse['data']>> {
    return apiClient.post<RefreshTokenResponse['data']>('/api/auth/refresh-token', {
      refreshToken,
    });
  }

  /**
   * Get current user info
   * GET /api/auth/me
   */
  async getCurrentUser(token: string): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/api/auth/me', token);
  }

  /**
   * Change password
   * POST /api/auth/change-password
   */
  async changePassword(
    data: ChangePasswordRequest,
    token: string
  ): Promise<ApiResponse<ChangePasswordResponse>> {
    return apiClient.post<ChangePasswordResponse>('/api/auth/change-password', data, token);
  }

  /**
   * Forgot password (send reset email)
   * POST /api/auth/forgot-password
   */
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/api/auth/forgot-password', { email });
  }
}

export const authAPI = new AuthAPI();
