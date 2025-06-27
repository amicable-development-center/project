import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
}

interface UsePaginationReturn {
  pageNumbers: (number | "ellipsis")[];
  canGoPrev: boolean;
  canGoNext: boolean;
}

interface UsePaginationWithStateProps {
  totalCount: number;
  perPage?: number;
  maxVisiblePages?: number;
}

interface UsePaginationWithStateReturn extends UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  goToReset: () => void;
}

const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const isEarlyPages = (currentPage: number): boolean => {
  return currentPage <= 3;
};

const isLatePages = (currentPage: number, totalPages: number): boolean => {
  return currentPage >= totalPages - 2;
};

const shouldShowEllipsis = (
  totalPages: number,
  maxVisiblePages: number
): boolean => {
  return totalPages > maxVisiblePages;
};

const createSimplePattern = (totalPages: number): (number | "ellipsis")[] => {
  return range(1, totalPages);
};

const createEarlyPattern = (
  maxVisiblePages: number,
  totalPages: number
): (number | "ellipsis")[] => {
  const basePages = range(1, maxVisiblePages);
  const shouldAddEllipsis = shouldShowEllipsis(totalPages, maxVisiblePages);

  return shouldAddEllipsis ? [...basePages, "ellipsis", totalPages] : basePages;
};

const createLatePattern = (
  totalPages: number,
  maxVisiblePages: number
): (number | "ellipsis")[] => {
  const startPage = totalPages - (maxVisiblePages - 1);
  const endPages = range(startPage, totalPages);
  const shouldAddEllipsis = shouldShowEllipsis(totalPages, maxVisiblePages);

  return shouldAddEllipsis ? [1, "ellipsis", ...endPages] : [1, ...endPages];
};

const createMiddlePattern = (
  currentPage: number,
  totalPages: number
): (number | "ellipsis")[] => {
  const middlePages = range(currentPage - 1, currentPage + 1);
  return [1, "ellipsis", ...middlePages, "ellipsis", totalPages];
};

const usePagination = ({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: UsePaginationProps): UsePaginationReturn => {
  const generatePageNumbers = (): (number | "ellipsis")[] => {
    const patternDecision = [
      {
        condition: () => totalPages <= maxVisiblePages,
        pattern: () => createSimplePattern(totalPages),
      },
      {
        condition: () => isEarlyPages(currentPage),
        pattern: () => createEarlyPattern(maxVisiblePages, totalPages),
      },
      {
        condition: () => isLatePages(currentPage, totalPages),
        pattern: () => createLatePattern(totalPages, maxVisiblePages),
      },
      {
        condition: () => true,
        pattern: () => createMiddlePattern(currentPage, totalPages),
      },
    ];

    const selectedPattern = patternDecision.find(({ condition }) =>
      condition()
    );
    return selectedPattern?.pattern() ?? [];
  };

  const pageNumbers = generatePageNumbers();
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return {
    pageNumbers,
    canGoPrev,
    canGoNext,
  };
};

export const usePaginationWithState = ({
  totalCount,
  perPage = 6,
  maxVisiblePages = 5,
}: UsePaginationWithStateProps): UsePaginationWithStateReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isInternalUpdate = useRef(false);

  const [currentPage, setCurrentPage] = useState(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    return page > 0 ? page : 1;
  });

  const totalPages = Math.ceil(totalCount / perPage);

  const updatePageInURL = useCallback(
    (page: number): void => {
      isInternalUpdate.current = true;
      const newParams = new URLSearchParams(searchParams);
      if (page > 1) {
        newParams.set("page", page.toString());
      } else {
        newParams.delete("page");
      }
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams]
  );

  const setPage = (page: number): void => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    updatePageInURL(page);
  };

  const goToReset = (): void => {
    setCurrentPage(1);
    updatePageInURL(1);
  };

  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }

    const pageParam = searchParams.get("page");
    const urlPage = pageParam ? parseInt(pageParam, 10) : 1;
    const validPage = urlPage > 0 ? urlPage : 1;

    setCurrentPage((prevPage) => {
      return validPage !== prevPage ? validPage : prevPage;
    });
  }, [searchParams]);

  useEffect(() => {
    if (totalPages > 0) {
      setCurrentPage((prevPage) => {
        if (prevPage > totalPages) {
          updatePageInURL(totalPages);
          return totalPages;
        }
        return prevPage;
      });
    }
  }, [totalPages, updatePageInURL]);

  const { pageNumbers, canGoPrev, canGoNext } = usePagination({
    currentPage,
    totalPages,
    maxVisiblePages,
  });

  return {
    currentPage,
    totalPages,
    pageNumbers,
    canGoPrev,
    canGoNext,
    setPage,
    goToReset,
  };
};

export default usePagination;
