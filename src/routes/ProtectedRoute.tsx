import { Navigate } from "react-router";

import { useAuthContext } from "../context/AuthProvider";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { me, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>;

  if (!me) return <Navigate to="/" replace />;

  return children;
}
