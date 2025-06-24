import { type JSX } from "react";

import useProjectInsert from "@features/projects/hook/useProjectInsert";

const ProjectInsertPage = (): JSX.Element => {
  const { submit } = useProjectInsert();

  return (
    <div>
      ProjectInsertPages
      <button onClick={submit}>Firebase 임시 등록버튼</button>
    </div>
  );
};

export default ProjectInsertPage;
