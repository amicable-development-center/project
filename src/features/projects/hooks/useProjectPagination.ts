import { useState } from "react";

import useProjectList from "@entities/projects/queries/useProjectList";
import type { LastVisibleType } from "@entities/projects/types/firebase";

import type { ProjectListRes } from "@shared/types/project";

interface ReturnProjectPageNation {
  projects: ProjectListRes[];
  currentPage: number;
  paging: {
    prev: () => void;
    next: () => void;
    reset: () => void;
    disablePrev: boolean;
    disableNext: boolean;
  };
}

const useProjectPagination = ({
  totalCount,
  perPage = 6,
}: {
  totalCount: number;
  perPage?: number;
}): ReturnProjectPageNation => {
  const [lastVisibleStack, setLastVisibleStack] = useState<LastVisibleType>([
    null,
  ]);
  const [currentPage, setCurrentPage] = useState(0);

  const cursor = lastVisibleStack[currentPage] ?? null;
  const { data: projects, isLoading } = useProjectList(cursor);

  const disablePrev = currentPage === 0 || isLoading;
  const disableNext =
    currentPage === Math.floor(totalCount / perPage) || isLoading;

  const pagingPrev = (): void => {
    if (disablePrev) return;

    setCurrentPage((prev) => prev - 1);
  };

  const pagingNext = (): void => {
    if (disableNext) return;

    if (projects?.lastVisible) {
      if (currentPage === lastVisibleStack.length - 1) {
        setLastVisibleStack((prev) => [...prev, projects.lastVisible]);
      }
      setCurrentPage((prev) => prev + 1);
    }
  };

  const pagingReset = (): void => {
    setLastVisibleStack([null]);
    setCurrentPage(0);
  };

  return {
    projects: projects?.projects || [],
    currentPage,
    paging: {
      prev: pagingPrev,
      next: pagingNext,
      reset: pagingReset,
      disablePrev,
      disableNext,
    },
  };
};

export default useProjectPagination;
