import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} />;
  //   return children ? children : <Outlet />; same as below , but why ?
  return <Outlet />;
};

export default ProtectRoute;
