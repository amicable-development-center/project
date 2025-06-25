import { useState, useEffect } from "react";

import {
  useGetFilteredProjectsByPage,
  useGetFilteredProjectsCount,
} from "@entities/search/queries/useGetFilteredProjectLists";
import type { ProjectSearchFilterOption } from "@entities/search/types";

import { usePaginationWithState } from "@shared/hooks/usePagination";
import type { ProjectListRes } from "@shared/types/project";

const ITEMS_PER_PAGE = 6;
const DEFAULT_FILTER: ProjectSearchFilterOption = {};

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
  const [currentFilter, setCurrentFilter] =
    useState<ProjectSearchFilterOption>(DEFAULT_FILTER);
  const [projects, setProjects] = useState<ProjectListRes[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const { currentPage, totalPages, setPage, goToReset } =
    usePaginationWithState({
      totalCount,
      perPage: ITEMS_PER_PAGE,
    });

  const {
    mutate: searchProjects,
    isPending: isLoadingProjects,
    data: projectsResult,
    isError: isProjectsError,
  } = useGetFilteredProjectsByPage();

  const {
    mutate: getProjectsCount,
    isPending: isLoadingCount,
    data: countResult,
    isError: isCountError,
  } = useGetFilteredProjectsCount();

  const isLoading = isLoadingProjects || isLoadingCount;
  const isError = isProjectsError || isCountError;

  const loadData = (filter: ProjectSearchFilterOption, page: number): void => {
    getProjectsCount(filter);
    searchProjects({ filter, page, pageSize: ITEMS_PER_PAGE });
  };

  const handleSearch = (filter: ProjectSearchFilterOption): void => {
    setCurrentFilter(filter);
    goToReset();
    loadData(filter, 1);
  };

  const handlePageChange = (page: number): void => {
    if (page === currentPage || isLoading) return;
    setPage(page);
    loadData(currentFilter, page);
  };

  useEffect(() => {
    loadData(DEFAULT_FILTER, currentPage);
  }, []);

  useEffect(() => {
    if (projectsResult) {
      setProjects(projectsResult);
    }
  }, [projectsResult]);

  useEffect(() => {
    if (countResult !== undefined) {
      setTotalCount(countResult);
    }
  }, [countResult]);

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
