import { Navigate, Outlet } from "react-router-dom";
import { validateToken } from "./helpers/validateToken";

export const UnProtectedRoutes = () => {
    const isAutenticated = validateToken();

    return isAutenticated ? <Navigate to="/home"/> : <Outlet/>;
}