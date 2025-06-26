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

const usePagination = ({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: UsePaginationProps): UsePaginationReturn => {
  const generatePageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
        if (totalPages > maxVisiblePages) {
          pages.push("ellipsis");
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        if (totalPages > maxVisiblePages) {
          pages.push("ellipsis");
        }
        for (let i = totalPages - (maxVisiblePages - 1); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
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
      if (validPage !== prevPage) {
        return validPage;
      }
      return prevPage;
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
