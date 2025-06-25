import { useState } from "react";

import {
  useGetFilteredProjectsByPage,
  useGetFilteredProjectsCount,
} from "@entities/search/queries/useGetFilteredProjectLists";
import type { ProjectSearchFilterOption } from "@entities/search/types";

import { usePaginationWithState } from "@shared/hooks/usePagination";
import type { ProjectListRes } from "@shared/types/project";

const ITEMS_PER_PAGE = 6;

interface UseProjectListPageReturn {
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

const useProjectListPage = (): UseProjectListPageReturn => {
  const [currentFilter, setCurrentFilter] = useState<ProjectSearchFilterOption>(
    {}
  );
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetFilteredProjectsByPage(currentFilter, currentPage, ITEMS_PER_PAGE);

  const {
    data: totalCount = 0,
    isLoading: isCountLoading,
    isError: isCountError,
  } = useGetFilteredProjectsCount(currentFilter);

  const { totalPages, setPage, goToReset } = usePaginationWithState({
    totalCount,
    perPage: ITEMS_PER_PAGE,
  });

  const isLoading = isProjectsLoading || isCountLoading;
  const isError = isProjectsError || isCountError;

  const handleSearch = (filter: ProjectSearchFilterOption): void => {
    setCurrentFilter(filter);
    setCurrentPage(1);
    goToReset();
  };

  const handlePageChange = (page: number): void => {
    if (page === currentPage || isLoading) return;
    setCurrentPage(page);
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

export default useProjectListPage;
