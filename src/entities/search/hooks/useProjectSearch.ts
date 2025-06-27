import { useState, useCallback } from "react";

import {
  useProjectsByPage,
  useProjectsCount,
} from "@entities/search/queries/useProjectSearchQueries";

import { usePaginationWithState } from "@shared/hooks/usePagination";
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

const useProjectSearch = (): UseProjectSearchReturn => {
  const [currentFilter, setCurrentFilter] = useState<ProjectSearchFilterOption>(
    {
      category: "all",
      status: "all",
      workflow: "all",
      position: "all",
      sortBy: "latest",
    }
  );

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

  const handleSearch = useCallback(
    (filter: ProjectSearchFilterOption): void => {
      setCurrentFilter(filter);
      goToReset();
    },
    [goToReset]
  );

  const handlePageChange = (page: number): void => {
    if (page === currentPage || isLoading) return;
    setPage(page);
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
