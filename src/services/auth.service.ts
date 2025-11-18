import { 
  LoginCredentials, 
  LoginResponse, 
  TokenVerifyResponse, 
  AuthToken,
  ApiError,
  HospitalCode 
} from '@/types/auth';

// Configure your API base URL here
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.your-domain.com';

class AuthService {
  private static instance: AuthService;
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Type guard to check if result is an error
  private isApiError(result: unknown): result is ApiError {
    return typeof result === 'object' && result !== null && 'success' in result && (result as ApiError).success === false;
  }

  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T | ApiError> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            code: response.status.toString(),
            message: data.message || 'An error occurred',
            details: data,
          },
        } as ApiError;
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error occurred',
        },
      } as ApiError;
    }
  }

  private getAuthHeader(): Record<string, string> {
    const token = this.getStoredToken();
    return token ? { Authorization: `Bearer ${token.accessToken}` } : {};
  }

  private getStoredToken(): AuthToken | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const tokenStr = localStorage.getItem('auth_token');
      return tokenStr ? JSON.parse(tokenStr) : null;
    } catch {
      return null;
    }
  }

  private setStoredToken(token: AuthToken): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('auth_token', JSON.stringify(token));
  }

  private removeStoredToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('auth_token');
  }

  // Login method for different user types
  async login(credentials: LoginCredentials): Promise<LoginResponse | ApiError> {
    const endpoint = this.getLoginEndpoint(credentials.role);
    
    const result = await this.makeRequest<LoginResponse>(endpoint, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (!this.isApiError(result)) {
      // Store token on successful login
      this.setStoredToken((result as LoginResponse).data.token);
    }

    return result;
  }

  // Get appropriate login endpoint based on user role
  private getLoginEndpoint(role: string): string {
    switch (role) {
      case 'admin':
        return '/auth/admin/login';
      case 'staff':
        return '/auth/staff/login';
      case 'executive':
        return '/auth/executive/login';
      default:
        return '/auth/login';
    }
  }

  // Logout method
  async logout(): Promise<boolean> {
    try {
      // Call API to invalidate token on server
      await this.makeRequest('/auth/logout', {
        method: 'POST',
        headers: this.getAuthHeader(),
      });
    } catch (error) {
      console.warn('Logout API call failed:', error);
    } finally {
      // Always remove token from client storage
      this.removeStoredToken();
    }
    
    return true;
  }

  // Verify token validity
  async verifyToken(): Promise<TokenVerifyResponse> {
    const token = this.getStoredToken();
    
    if (!token) {
      return {
        success: false,
        error: {
          code: 'NO_TOKEN',
          message: 'No authentication token found',
        },
      };
    }

    // Check if token is expired locally first
    if (this.isTokenExpired(token)) {
      this.removeStoredToken();
      return {
        success: false,
        error: {
          code: 'TOKEN_EXPIRED',
          message: 'Authentication token has expired',
        },
      };
    }

    // Verify with server
    const result = await this.makeRequest<TokenVerifyResponse>('/auth/verify', {
      method: 'GET',
      headers: this.getAuthHeader(),
    });

    if ('success' in result && !result.success) {
      this.removeStoredToken();
    }

    return result as TokenVerifyResponse;
  }

  // Refresh access token
  async refreshToken(): Promise<AuthToken | null> {
    const currentToken = this.getStoredToken();
    
    if (!currentToken?.refreshToken) {
      return null;
    }

    const result = await this.makeRequest<{ data: AuthToken }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: currentToken.refreshToken }),
    });

    if (!this.isApiError(result)) {
      const successResult = result as { data: AuthToken };
      this.setStoredToken(successResult.data);
      return successResult.data;
    }

    // If refresh fails, remove stored token
    this.removeStoredToken();
    return null;
  }

  // Check if token is expired (client-side check)
  private isTokenExpired(token: AuthToken): boolean {
    if (!token.expiresIn) return true;
    
    const tokenData = JSON.parse(atob(token.accessToken.split('.')[1]));
    const expirationTime = tokenData.exp * 1000; // Convert to milliseconds
    const currentTime = Date.now();
    const bufferTime = 60 * 1000; // 1 minute buffer
    
    return currentTime >= (expirationTime - bufferTime);
  }

  // Get hospital codes for staff login validation
  async getHospitalCodes(searchTerm?: string): Promise<HospitalCode[] | ApiError> {
    const params = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
    
    const result = await this.makeRequest<{ data: HospitalCode[] }>(
      `/auth/hospital-codes${params}`,
      {
        method: 'GET',
      }
    );

    if (!this.isApiError(result)) {
      return (result as { data: HospitalCode[] }).data;
    }

    return result as ApiError;
  }

  // Validate HCODE format (Thai hospital code format)
  validateHCode(hcode: string): boolean {
    // Thai HCODE format: 5 digits for hospitals, 8 digits for health stations
    const hospitalPattern = /^\d{5}$/; // รพ.
    const healthStationPattern = /^\d{8}$/; // รพ.สต.
    
    return hospitalPattern.test(hcode) || healthStationPattern.test(hcode);
  }

  // Get stored authentication token
  getToken(): AuthToken | null {
    return this.getStoredToken();
  }

  // Set authentication token manually (for testing or external auth)
  setToken(token: AuthToken): void {
    this.setStoredToken(token);
  }

  // Clear authentication token
  clearToken(): void {
    this.removeStoredToken();
  }
}

// Export singleton instance
export const authService = AuthService.getInstance();