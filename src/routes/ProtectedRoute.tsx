// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../context/AuthProvider";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("admin" | "organizer" | "ticketchecker")[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { member, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>;
  if (!member) return <Navigate to="/login" replace />;

  const userRole = member.role as "admin" | "organizer" | "ticketchecker";
  if (allowedRoles && !allowedRoles.includes(userRole))
    return <Navigate to="/" replace />;

  return <>{children}</>;
}
