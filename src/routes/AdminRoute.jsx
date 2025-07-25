import React from "react";
import { Navigate } from "react-router-dom";
import useAdminCheck from "../hooks/useAdminCheck";

const AdminRoute = ({ children }) => {
  const { isAdmin, checking } = useAdminCheck();

  if (checking) {
    return <div className="text-center mt-20">Checking permissions...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
