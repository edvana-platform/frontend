import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../constants/roles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRole, 
  requiredRoles,
  fallback 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1EA896]"></div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated || !user) {
    return fallback || <div>Access denied. Please log in.</div>;
  }

  // Check role requirements
  if (requiredRole && user.role !== requiredRole) {
    return fallback || <div>Access denied. Insufficient permissions.</div>;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return fallback || <div>Access denied. Insufficient permissions.</div>;
  }

  return <>{children}</>;
}

// Higher-order component for role-based access
export function withRoleProtection<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: UserRole,
  requiredRoles?: UserRole[]
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute requiredRole={requiredRole} requiredRoles={requiredRoles}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}