import React, { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuthStore } from "@shared/stores/authStore";

const PrivateRoute = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
