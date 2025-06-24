import type { JSX } from "react";
import { useParams } from "react-router-dom";

import useProjectDelete from "@features/projects/queries/useProjectDelete";

import useProjectsItem from "@entities/projects/queries/useProjectsItem";

const ProjectDetailPage = (): JSX.Element => {
  const { id } = useParams();
  const {
    data: info,
    isLoading,
    isError,
  } = useProjectsItem({ id: id || null });
  const { mutate: deleteProject } = useProjectDelete();

  const hadleDeleteProject = (): void => {
    if (!id) return;
    deleteProject(id);
  };

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (!info || isError) {
    return <div>404</div>;
  }
  return (
    <div>
      <h1>프로젝트 상세 페이지</h1>
      <p>프로젝트의 상세 정보를 확인할 수 있습니다.</p>

      <button onClick={hadleDeleteProject}> 삭제</button>
      <div>
        <h2>프로젝트 정보</h2>
        <ul>
          <li>id: {id}</li>
          <li>이름: {info.title}</li>
          <li>기술 스택: {info.techStack.join(", ")}</li>
          <li>우대사항: {info.preferentialTreatment}</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
