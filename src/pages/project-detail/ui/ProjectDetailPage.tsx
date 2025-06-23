import type { JSX } from "react";

const ProjectDetailPage = (): JSX.Element => {
  return (
    <div>
      <h1>프로젝트 상세 페이지</h1>
      <p>프로젝트의 상세 정보를 확인할 수 있습니다.</p>
      <div>
        <h2>프로젝트 정보</h2>
        <ul>
          <li>이름: Sample Project</li>
          <li>기술 스택: React, TypeScript, React Router</li>
          <li>아키텍처: Feature-Sliced Design</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
