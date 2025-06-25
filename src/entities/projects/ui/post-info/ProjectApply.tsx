import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Typography } from "@mui/material";
import type { JSX } from "react";

import TitleWithIcon from "@shared/ui/project-detail/TitleWithIcon";

const ProjectApply = ({ applicants }: { applicants: number }): JSX.Element => {
  return (
    <>
      <TitleWithIcon
        Icon={SendOutlinedIcon}
        title="프로젝트 지원"
        color="success"
        marginBottom={0}
      />
      <Typography variant="body2" marginBottom={2}>
        현재 {applicants}명이 지원했습니다
      </Typography>
    </>
  );
};

export default ProjectApply;
