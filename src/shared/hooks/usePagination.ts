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
  canGoFastPrev: boolean;
  canGoFastNext: boolean;
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
  goFastPrev: () => void;
  goFastNext: () => void;
}

const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const generateBlockPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number
): (number | "ellipsis")[] => {
  if (totalPages <= maxVisiblePages) {
    return range(1, totalPages);
  }

  const currentBlock = Math.floor((currentPage - 1) / maxVisiblePages);

  const blockStartPage = currentBlock * maxVisiblePages + 1;
  const blockEndPage = Math.min(
    blockStartPage + maxVisiblePages - 1,
    totalPages
  );

  return range(blockStartPage, blockEndPage);
};

const usePagination = ({
  currentPage,
  totalPages,
  maxVisiblePages = 5,
}: UsePaginationProps): UsePaginationReturn => {
  const pageNumbers = generateBlockPageNumbers(
    currentPage,
    totalPages,
    maxVisiblePages
  );

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const currentBlock = Math.floor((currentPage - 1) / maxVisiblePages);
  const canGoFastPrev = currentBlock > 0;
  const canGoFastNext = (currentBlock + 1) * maxVisiblePages < totalPages;

  return {
    pageNumbers,
    canGoPrev,
    canGoNext,
    canGoFastPrev,
    canGoFastNext,
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

  const goFastPrev = (): void => {
    const currentBlock = Math.floor((currentPage - 1) / maxVisiblePages);
    const prevBlockLastPage = currentBlock * maxVisiblePages;
    const newPage = Math.max(1, prevBlockLastPage);
    setPage(newPage);
  };

  const goFastNext = (): void => {
    const currentBlock = Math.floor((currentPage - 1) / maxVisiblePages);
    const nextBlockFirstPage = (currentBlock + 1) * maxVisiblePages + 1;
    const newPage = Math.min(totalPages, nextBlockFirstPage);
    setPage(newPage);
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

  const { pageNumbers, canGoPrev, canGoNext, canGoFastPrev, canGoFastNext } =
    usePagination({
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
    canGoFastPrev,
    canGoFastNext,
    setPage,
    goToReset,
    goFastPrev,
    goFastNext,
  };
};

export default usePagination;
