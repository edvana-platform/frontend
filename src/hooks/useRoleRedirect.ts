// src/hooks/useRoleRedirect.ts

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { USER_ROLES } from "@/constants/roles";

/**
 * Automatically redirects user to the appropriate dashboard if authenticated.
 * Also redirects unauthenticated users to login.
 */
export const useRoleRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user) {
      switch (user.role) {
        case USER_ROLES.STUDENT:
          navigate("/dashboard/student");
          break;
        case USER_ROLES.TEACHER:
          navigate("/dashboard/teacher");
          break;
        case USER_ROLES.PARENT:
          navigate("/dashboard/parent");
          break;
        case USER_ROLES.SCHOOL_ADMIN:
          navigate("/dashboard/schooladmin");
          break;
        case USER_ROLES.SUPER_ADMIN:
          navigate("/dashboard/superadmin");
          break;
        default:
          navigate("/login");
      }
    }
  }, [user, isAuthenticated, isLoading, navigate]);
};

export const useRedirectToDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const redirectToDashboard = () => {
    if (!user) return;

    switch (user.role) {
      case USER_ROLES.STUDENT:
        navigate('/dashboard/student');
        break;
      case USER_ROLES.TEACHER:
        navigate('/dashboard/teacher');
        break;
      case USER_ROLES.PARENT:
        navigate('/dashboard/parent');
        break;
      case USER_ROLES.SCHOOL_ADMIN:
        navigate('/dashboard/schooladmin');
        break;
      case USER_ROLES.SUPER_ADMIN:
        navigate('/dashboard/superadmin');
        break;
      default:
        navigate('/');
    }
  };

  return redirectToDashboard;
};