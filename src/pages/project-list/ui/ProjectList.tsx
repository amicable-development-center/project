import type { JSX } from "react";

import useProjectPageNation from "@entities/projects/hook/useProjectPageNation";
import useProjectsTotalCount from "@entities/projects/queries/useProjectsTotalCount";

import PaginationBar from "@shared/ui/pagination";

const ProjectList = (): JSX.Element => {
  const { data: totalCount = 0 } = useProjectsTotalCount();
  const { projects, currentPage, paging } = useProjectPageNation({
    totalCount,
  });

  return (
    <div>
      {projects.map((item, i) => {
        return (
          <div key={i}>
            {item.id} - {item.title}
          </div>
        );
      })}

      <PaginationBar
        totalCount={totalCount}
        currentPage={currentPage}
        {...paging}
      />
    </div>
  );
};

export default ProjectList;
