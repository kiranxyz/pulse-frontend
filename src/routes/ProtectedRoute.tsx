import { Navigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { me, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>;

  if (!me) return <Navigate to="/login" replace />;

  const userRole = me.role ?? "";

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
