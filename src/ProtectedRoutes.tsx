import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "./helpers/validateToken";

export const ProtectedRoutes = () => {
    const isAutenticated = validateToken();

    return isAutenticated ? <Outlet /> : <Navigate to="/login" />;
}