import Cookies from "js-cookie";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();

  return (
    <>
      {Cookies.get("token") ? (
        <Outlet />
      ) : (
        <Navigate to="/" state={{ from: location }} replace />
      )}
    </>
  );
};

export default ProtectedRoute;
