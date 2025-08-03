import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { AuthUser } from "@/types/user";
import { authAPI, AuthResponse, RegisterRequest } from "@/utils/api/auth";
import {
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
  clearAuthData,
} from "@/utils/auth/authStorage";

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
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = () => {
      const token = getStoredToken();
      const user = getStoredUser();

      if (token && user) {
        dispatch({ type: "AUTH_SUCCESS", payload: { user, token } });
      } else {
        dispatch({ type: "AUTH_FAILURE" });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await authAPI.login({ email, password });
      setStoredToken(response.token);
      setStoredUser(response.user);
      dispatch({ type: "AUTH_SUCCESS", payload: response });
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE" });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest) => {
    dispatch({ type: "AUTH_START" });
    try {
      const response = await authAPI.register(userData);
      setStoredToken(response.token);
      setStoredUser(response.user);
      dispatch({ type: "AUTH_SUCCESS", payload: response });
    } catch (error) {
      dispatch({ type: "AUTH_FAILURE" });
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
    dispatch({ type: "LOGOUT" });
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