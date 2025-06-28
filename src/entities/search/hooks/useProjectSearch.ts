import { useState, useCallback, useEffect, type RefObject } from "react";

import {
  useProjectsByPage,
  useProjectsCount,
} from "@entities/search/queries/useProjectSearchQueries";

import { usePaginationWithState } from "@shared/hooks/usePagination";
import { scrollToElement } from "@shared/libs/utils/scrollUtils";
import type { ProjectListRes } from "@shared/types/project";
import type { ProjectSearchFilterOption } from "@shared/types/search";

const ITEMS_PER_PAGE = 6;

interface UseProjectSearchReturn {
  projects: ProjectListRes[];
  totalCount: number;
  currentFilter: ProjectSearchFilterOption;

  currentPage: number;
  totalPages: number;

  isLoading: boolean;
  isError: boolean;

  handleSearch: (filter: ProjectSearchFilterOption) => void;
  handlePageChange: (page: number) => void;
}

const useProjectSearch = (
  resultsRef: RefObject<HTMLDivElement | null>
): UseProjectSearchReturn => {
  const [currentFilter, setCurrentFilter] = useState<ProjectSearchFilterOption>(
    {
      category: "all",
      status: "all",
      workflow: "all",
      position: "all",
      sortBy: "latest",
    }
  );

  const [shouldScrollAfterLoad, setShouldScrollAfterLoad] = useState(false);

  const {
    data: totalCount = 0,
    isLoading: isCountLoading,
    isError: isCountError,
  } = useProjectsCount(currentFilter);

  const { currentPage, totalPages, setPage, goToReset } =
    usePaginationWithState({
      totalCount,
      perPage: ITEMS_PER_PAGE,
    });

  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useProjectsByPage(currentFilter, currentPage, ITEMS_PER_PAGE);

  const isLoading = isProjectsLoading || isCountLoading;
  const isError = isProjectsError || isCountError;

  useEffect(() => {
    if (!isLoading && shouldScrollAfterLoad && resultsRef?.current) {
      setTimeout(() => {
        if (resultsRef?.current) {
          scrollToElement(resultsRef.current, "smooth", 80);
        }
      }, 200);
      setShouldScrollAfterLoad(false);
    }
  }, [isLoading, shouldScrollAfterLoad, resultsRef]);

  const handleSearch = useCallback(
    (filter: ProjectSearchFilterOption): void => {
      setCurrentFilter(filter);
      goToReset();
    },
    [goToReset]
  );

  const handlePageChange = (page: number): void => {
    if (resultsRef?.current) {
      scrollToElement(resultsRef.current, "smooth", 80);
    }

    if (page !== currentPage) {
      setPage(page);
      setShouldScrollAfterLoad(true);
    }
  };

  return {
    projects,
    totalCount,
    currentFilter,

    currentPage,
    totalPages,

    isLoading,
    isError,

    handleSearch,
    handlePageChange,
  };
};

export default useProjectSearch;
