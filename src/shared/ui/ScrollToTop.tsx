import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { scrollToTopInstant } from "@shared/libs/utils/scrollUtils";

const ScrollToTop = (): null => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTopInstant();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
