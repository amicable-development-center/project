import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";

import FadeInUpOnView from "@shared/ui/animations/FadeInUpOnView";
import { RocketLaunchIcon } from "@shared/ui/icons/CommonIcons";

const LetsGo = (): JSX.Element => {
  return (
    <ProjectStatsContainer>
      <FadeInUpOnView delay={1}>
        <LetsGoBox>
          <RocketLaunchIcon />
          <Typography variant="subtitle2">
            지금 바로 시작해보세요! 🚀
          </Typography>
          <Typography marginY={2}>
            멋진 아이디어가 있다면 팀원을 모집하거나, <br /> 흥미로운 프로젝트에
            참여해보세요!
          </Typography>
        </LetsGoBox>
      </FadeInUpOnView>
    </ProjectStatsContainer>
  );
};

export default LetsGo;

const ProjectStatsContainer = styled("div")(({ theme }) => ({
  flex: 1,
  marginBottom: "3rem",
  [theme.breakpoints.down("sm")]: {},
}));

const LetsGoBox = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  color: white;
  padding: 5rem 1rem;
  text-align: center;
  border-radius: 8px;
  background: linear-gradient(to bottom right, #666df2, #9134ea);

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-1rem);
  }

  svg {
    margin: 2rem 0;
    font-size: 60px;
  }
`;
