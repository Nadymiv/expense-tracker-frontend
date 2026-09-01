import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { type JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) return <div>Завантаження...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    return children;
};
