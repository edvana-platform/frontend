import { LoginUser, AuthUser } from "@/types/user";
import { mockStudentUsers } from "../../../../shared/mocks/users/students";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'teacher' | 'parent' | 'schooladmin' | 'superadmin';
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const { email, password } = credentials;

    const matchedUser = mockStudentUsers.find(
      (u: LoginUser) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );

    if (matchedUser) {
      const { password: _, ...safeUser } = matchedUser;

      return {
        user: safeUser,
        token: 'mock_token_' + Date.now(),
      };
    }

    throw new Error('Invalid email or password');
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const user: AuthUser = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      role: userData.role,
      schoolId: 'school-uuid-1',
    };

    return {
      user,
      token: 'mock_token_' + Date.now(),
    };
  },

  logout: async (): Promise<void> => Promise.resolve(),

  verifyToken: async (): Promise<AuthUser> => {
    const storedUser = localStorage.getItem('edvana_auth_user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    throw new Error('No valid token');
  },
};