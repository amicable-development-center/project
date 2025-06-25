import type { JSX } from "react";
import { useNavigate } from "react-router-dom";

import useProjectPageNation from "@entities/projects/hook/useProjectPageNation";
import useProjectsTotalCount from "@entities/projects/queries/useProjectsTotalCount";

import PaginationBar from "@shared/ui/pagination";

const ProjectList = (): JSX.Element => {
  const Navigate = useNavigate();
  const { data: totalCount = 0 } = useProjectsTotalCount();
  const { projects, currentPage, paging } = useProjectPageNation({
    totalCount,
  });
  const goDetailPage = (id: string): void | Promise<void> =>
    Navigate(`/project/${id}`);

  return (
    <div>
      {projects.map((item, i) => {
        return (
          <div key={i} onClick={() => goDetailPage(item.id)}>
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
