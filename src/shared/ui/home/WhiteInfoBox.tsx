import {
  Card,
  CardContent,
  Stack,
  styled,
  Typography,
  type SvgIconProps,
} from "@mui/material";
import type { JSX } from "react";

import FadeInUpOnView from "@shared/ui/animations/FadeInUpOnView";

interface ProjectStatsIconProps {
  color: string;
}

const WhiteInfoBox = ({
  color,
  title,
  subTitle,
  Icon,
  idx,
}: {
  color: string;
  title: string;
  subTitle: string;
  Icon: React.ElementType<SvgIconProps>;
  idx: number;
}): JSX.Element => {
  return (
    <FadeInUpOnView delay={idx * 0.5}>
      <ItemCard>
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <ProjectStatsStack>
            <ProjectStatsIcon color={color}>
              <Icon />
            </ProjectStatsIcon>
            <ProjectStatsCount variant="subtitle2">{title}</ProjectStatsCount>
            <ProjectStatsTitle variant="body1">{subTitle}</ProjectStatsTitle>
          </ProjectStatsStack>
        </CardContent>
      </ItemCard>
    </FadeInUpOnView>
  );
};

export default WhiteInfoBox;

const ItemCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: translateY(-1rem);
  }
`;

const ProjectStatsStack = styled(Stack)`
  text-align: center;
  gap: 0.8rem;
  height: 100%;
  justify-content: center;
`;

const ProjectStatsIcon = styled("div")<ProjectStatsIconProps>(
  ({ theme, color }) => ({
    maxWidth: "8rem",
    aspectRatio: "1/1",
    padding: "1.6rem",
    margin: "1rem auto",
    color: color,
    borderRadius: "50%",
    backgroundColor: `${color}10`,

    "& svg": {
      fontSize: "4.8rem",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "1.2rem",
      "& svg": {
        fontSize: "3.2rem",
      },
    },
  })
);

const ProjectStatsCount = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: "bold",

  [theme.breakpoints.up("sm")]: {
    fontSize: "2.4rem",
  },
}));

const ProjectStatsTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.4rem",

  [theme.breakpoints.up("sm")]: {
    fontSize: "1.6rem",
  },
}));
