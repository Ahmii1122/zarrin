import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

interface ProtectedRouteProps {
  requireAdmin?: boolean;
  children: ReactNode;
  redirectPath?: string;
  unauthorizedPath?: string;
}

const ProtectedRoute = ({
  requireAdmin = false,
  children,
  redirectPath = "/login",
  unauthorizedPath = "/unauthorized",
}: ProtectedRouteProps) => {
  const { currentUser, userdata } = useAuth();

  if (!currentUser || !userdata) {
    // Not logged in
    return <Navigate to={redirectPath} replace />;
  }

  if (requireAdmin && userdata.role !== "admin") {
    // Logged in but not admin
    return <Navigate to={unauthorizedPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
