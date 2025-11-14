/**
 * API Client for Thai Hajj Health System
 * Base API URL: https://api-thaihajjhealth.southhealthcenter.com
 */

const API_BASE_URL = 'https://api-thaihajjhealth.southhealthcenter.com';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface ApiRequestOptions extends RequestInit {
  token?: string;
  isFormData?: boolean;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Make HTTP request to API
   */
  private async request<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { token, isFormData, ...fetchOptions } = options;

    const headers: Record<string, string> = {
      ...(fetchOptions.headers as Record<string, string>),
    };

    // Add Content-Type for JSON requests
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    // Add Authorization header if token provided
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...fetchOptions,
        headers,
      });

      const data = await response.json();

      // Check if response is successful
      if (!response.ok) {
        return {
          success: false,
          error: {
            code: response.status.toString(),
            message: data.message || data.error || 'เกิดข้อผิดพลาด',
            details: data,
          },
        };
      }

      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      
      // แปลง error message เป็นภาษาไทย
      let errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้';
      
      if (error instanceof TypeError) {
        if (error.message.includes('Failed to fetch') || error.message.includes('fetch')) {
          errorMessage = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต';
        } else if (error.message.includes('NetworkError') || error.message.includes('network')) {
          errorMessage = 'เกิดข้อผิดพลาดในการเชื่อมต่อเครือข่าย';
        }
      }
      
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: errorMessage,
        },
      };
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      token,
    });
  }

  /**
   * POST request
   */
  async post<T>(
    endpoint: string,
    body?: unknown,
    token?: string,
    isFormData = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: isFormData ? (body as BodyInit) : JSON.stringify(body),
      token,
      isFormData,
    });
  }

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string,
    body?: unknown,
    token?: string,
    isFormData = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: isFormData ? (body as BodyInit) : JSON.stringify(body),
      token,
      isFormData,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, token?: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      token,
    });
  }

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string,
    body?: unknown,
    token?: string
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      token,
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
