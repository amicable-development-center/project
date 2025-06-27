import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useLoadingCursor = (): void => {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("page-loading");
    const timer = setTimeout(() => {
      document.body.classList.remove("page-loading");
    }, 300);

    return () => {
      clearTimeout(timer);
      document.body.classList.remove("page-loading");
    };
  }, [location.pathname]);
};
