import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import AccessDenied from "../pages/AccessDenied";

export default function RequireRole({ role, children }) {
    const { isAuthenticated, roles } = useAuth();
    const location = useLocation();
    console.log('Ruoli disponibili:', roles);
    console.log('Ruolo richiesto:', role);

    const hasRole = roles.includes(role);
    console.log('Ha il ruolo richiesto:', hasRole);

    if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} />;
    if (!hasRole) return <AccessDenied />;

    return children;
}
