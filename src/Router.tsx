import { Navigate, Outlet, Route, Router, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { Login } from "./pages/Login";
import { NewAccount } from "./pages/NewAccount";
import { Home } from "./pages/Home";
import { ProtectedRoutes, } from "./ProtectedRoutes";
import { UnProtectedRoutes } from "./UnProtectedRoutes";

export const router = createBrowserRouter(
  createRoutesFromElements(
        <Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route element={<UnProtectedRoutes/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/new-account" element={<NewAccount />} />
            </Route>
          <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          </Route>
        </Route>,
  )
);