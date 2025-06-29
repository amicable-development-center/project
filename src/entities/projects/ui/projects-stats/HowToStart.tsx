import { styled } from "@mui/material";
import type { JSX } from "react";

import WhiteInfoBox from "@shared/ui/home/WhiteInfoBox";
import {
  AddIcon,
  FreeBreakfastOutlinedIcon,
  SearchIcon,
} from "@shared/ui/icons/CommonIcons";

const HowToStart = (): JSX.Element => {
  return (
    <ProjectStatsContainer>
      <WhiteInfoBox
        idx={1}
        Icon={AddIcon}
        color="#2563eb"
        title="1. 프로젝트 등록"
        subTitle="아이디어와 필요한 팀원을 명시해서 프로젝트를 등록하세요"
      />
      <WhiteInfoBox
        idx={2}
        Icon={SearchIcon}
        color="#16a34a"
        title="2. 팀원 모집"
        subTitle="관심있는 개발자들이 프로젝트에 지원합니다"
      />
      <WhiteInfoBox
        idx={3}
        Icon={FreeBreakfastOutlinedIcon}
        color="#db08ea"
        title="3. 함께 개발"
        subTitle="팀을 구성하고 함께 프로젝트를 완성해나가세요"
      />
    </ProjectStatsContainer>
  );
};

export default HowToStart;

const ProjectStatsContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridAutoRows: "1fr",
  gap: "3.2rem",
  marginTop: "3rem",
  alignItems: "stretch",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    gridTemplateColumns: "1fr",
    gap: "2rem",
  },
}));
