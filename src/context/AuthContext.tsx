import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AuthUser } from "@/types/user";
import { authAPI, AuthResponse, RegisterRequest } from "@/utils/api/auth";
import {
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
  clearAuthData,
} from "@/utils/auth/authStorage";
import { isTokenExpired, getTokenPayload } from "@/utils/auth/jwt";
import { normalizeUserRole } from "@/constants/roles";
interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: "AUTH_START" }
  | { type: "AUTH_SUCCESS"; payload: AuthResponse }
  | { type: "AUTH_FAILURE" }
  | { type: "LOGOUT" }
  | { type: "SET_USER"; payload: AuthUser };

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true };

    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isLoading: false,
        isAuthenticated: true,
      };

    case "AUTH_FAILURE":
      return {
        ...state,
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};

interface AuthContextValue extends AuthState {
  login: (emailOrPhone: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // src/context/AuthContext.tsx  (first useEffect)
  useEffect(() => {
    const checkAuth = () => {
      const token = getStoredToken();
      const user = getStoredUser();

      if (user) {
        // if there IS a token and it’s expired, fail; otherwise accept
        if (token && isTokenExpired(token)) {
          dispatch({ type: "AUTH_FAILURE" });
          return;
        }

        const normalizedRole = normalizeUserRole(user.role);
        if (!normalizedRole) {
          dispatch({ type: "AUTH_FAILURE" });
          return;
        }

        const normalizedUser: AuthUser = { ...user, role: normalizedRole };

        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user: normalizedUser, token: token ?? "" },
        });
        return;
      }

      // no stored user
      dispatch({ type: "AUTH_FAILURE" });
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!state.token) return;

    const payload = getTokenPayload(state.token);
    // ⬇️ if no exp, do NOT logout or set a timer
    if (payload?.exp == null) return;

    const expMs = payload.exp > 1e12 ? payload.exp : payload.exp * 1000;
    const timeRemaining = expMs - Date.now();
    if (timeRemaining <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(logout, timeRemaining);
    return () => clearTimeout(timer);
  }, [state.token]);

  const login = async (emailOrPhone: string, password: string) => {
    dispatch({ type: "AUTH_START" });

    const trimmed = emailOrPhone.trim();
    const isPhone = /^[+]?[\d\s\-()]+$/.test(trimmed);

    const payload = {
      ...(isPhone ? { phone: emailOrPhone } : { email: emailOrPhone }),
      password,
    };

    // src/context/AuthContext.tsx  (inside login)
    try {
      const response = await authAPI.login(payload);

      const role = normalizeUserRole(response.user.role);
      if (!role) {
        dispatch({ type: "AUTH_FAILURE" });
        throw new Error("Unknown or invalid role from server");
      }

      const normalizedUser: AuthUser = { ...response.user, role };

      // always store user
      setStoredUser(normalizedUser);
      // store token only if present
      if (response.token) setStoredToken(response.token);

      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: normalizedUser, token: response.token ?? "" },
      });
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE" });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await authAPI.register(userData);

      const normalizedRole = normalizeUserRole(response.user.role);
      if (!normalizedRole) {
        dispatch({ type: "AUTH_FAILURE" });
        throw new Error("Unknown or invalid role from server");
      }

      const normalizedUser: AuthUser = {
        ...response.user,
        role: normalizedRole,
      };
      const normalizedResponse = { ...response, user: normalizedUser };

      setStoredToken(normalizedResponse.token);
      setStoredUser(normalizedResponse.user);
      dispatch({ type: "AUTH_SUCCESS", payload: normalizedResponse });
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE" });
      throw error;
    }
  };

  const logout = async () => {
    // Clear local state first so UI updates instantly
    clearAuthData();
    dispatch({ type: "LOGOUT" });

    // Then attempt server-side logout; ignore benign failures
    try {
      await authAPI.logout();
    } catch (err) {
      // Optional: log for diagnostics, but don't surface to users
      console.warn("[logout] server call failed:", (err as Error).message);
    }
  };

  const updateUser = (user: AuthUser) => {
    setStoredUser(user);
    dispatch({ type: "SET_USER", payload: user });
  };

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
