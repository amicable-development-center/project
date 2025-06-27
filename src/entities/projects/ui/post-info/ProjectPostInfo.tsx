import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import type { JSX } from "react";

import { useGetProjectLikedUsers } from "@entities/projects/queries/useGetProjectLike";

import { formatDate } from "@shared/libs/utils/projectDetail";
import type { ProjectListRes } from "@shared/types/project";
import InfoRow from "@shared/ui/project-detail/InfoRow";
import TitleWithIcon from "@shared/ui/project-detail/TitleWithIcon";

type PostInfoType = Pick<
  ProjectListRes,
  "applicants" | "createdAt" | "likedUsers"
>;

const ProjectPostInfo = ({
  values,
}: {
  values: PostInfoType | null;
}): JSX.Element | null => {
  const { data: likedUsers } = useGetProjectLikedUsers();
  if (!values) return null;

  return (
    <>
      <TitleWithIcon
        Icon={StarBorderOutlinedIcon}
        title="프로젝트 정보"
        color="warning"
      />

      <InfoRow title="등록일" content={formatDate(values.createdAt)} />
      <InfoRow
        title="지원자 수"
        content={`${values.applicants.length}명`}
        color="primary"
      />
      <InfoRow
        title="관심 등록"
        content={`${likedUsers?.length || 0}명`}
        color="error"
      />
    </>
  );
};

export default ProjectPostInfo;
