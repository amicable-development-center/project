import React, { type JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuthStore } from "@shared/stores/authStore";
import LoadingSpinner from "@shared/ui/loading-spinner/LoadingSpinner";

const PrivateRoute = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner variant="overlay" message="인증 확인 중..." />;
  }

  if (!user) {
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
