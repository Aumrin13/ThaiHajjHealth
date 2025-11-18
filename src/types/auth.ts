// User roles and permission types
export type UserRole = 'admin' | 'staff' | 'executive';

// HCODE types for hospital and health station codes
export interface HospitalCode {
  hcode: string;
  hospitalName: string;
  type: 'hospital' | 'health_station'; // รพ. หรือ รพ.สต.
  province?: string;
  district?: string;
}

// User information structure
export interface User {
  id: string;
  username: string;
  email?: string;
  role: UserRole;
  fullName: string;
  hcode?: string; // Required for staff only
  hospitalInfo?: HospitalCode; // Populated when hcode is present
  permissions: string[];
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication token structure
export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
  tokenType: 'Bearer';
}

// Login credentials for different user types
export interface AdminLoginCredentials {
  username: string;
  password: string;
  role: 'admin';
}

export interface StaffLoginCredentials {
  username: string;
  password: string;
  hcode: string;
  role: 'staff';
}

export interface ExecutiveLoginCredentials {
  username: string;
  password: string;
  role: 'executive';
}

export type LoginCredentials = 
  | AdminLoginCredentials 
  | StaffLoginCredentials 
  | ExecutiveLoginCredentials;

// API response types
export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    token: AuthToken;
  };
  message: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

export interface TokenVerifyResponse {
  success: boolean;
  data?: {
    user: User;
    isValid: boolean;
  };
  error?: ApiError['error'];
}

// Authentication context state
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: AuthToken | null;
  isLoading: boolean;
  error: string | null;
}

// Permission constants
export const PERMISSIONS = {
  // Admin permissions
  ADMIN_FULL_ACCESS: 'admin.full_access',
  USER_MANAGEMENT: 'admin.user_management',
  SYSTEM_CONFIG: 'admin.system_config',
  
  // Staff permissions
  STAFF_VIEW_DATA: 'staff.view_data',
  STAFF_EDIT_DATA: 'staff.edit_data',
  STAFF_HOSPITAL_DATA: 'staff.hospital_data',
  
  // Executive permissions
  EXEC_VIEW_REPORTS: 'executive.view_reports',
  EXEC_VIEW_ANALYTICS: 'executive.view_analytics',
  EXEC_EXPORT_DATA: 'executive.export_data',
} as const;

// Role-based permission mapping
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    PERMISSIONS.ADMIN_FULL_ACCESS,
    PERMISSIONS.USER_MANAGEMENT,
    PERMISSIONS.SYSTEM_CONFIG,
    PERMISSIONS.STAFF_VIEW_DATA,
    PERMISSIONS.STAFF_EDIT_DATA,
    PERMISSIONS.EXEC_VIEW_REPORTS,
    PERMISSIONS.EXEC_VIEW_ANALYTICS,
    PERMISSIONS.EXEC_EXPORT_DATA,
  ],
  staff: [
    PERMISSIONS.STAFF_VIEW_DATA,
    PERMISSIONS.STAFF_EDIT_DATA,
    PERMISSIONS.STAFF_HOSPITAL_DATA,
  ],
  executive: [
    PERMISSIONS.EXEC_VIEW_REPORTS,
    PERMISSIONS.EXEC_VIEW_ANALYTICS,
    PERMISSIONS.EXEC_EXPORT_DATA,
  ],
};

// Route access configuration
export interface RouteConfig {
  path: string;
  requiredRole?: UserRole[];
  requiredPermissions?: string[];
  isPublic?: boolean;
}