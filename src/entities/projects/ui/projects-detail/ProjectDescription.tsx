import AdjustIcon from "@mui/icons-material/Adjust";
import { Box, Button, styled } from "@mui/material";
import type { JSX } from "react";

import { useExpandableText } from "@shared/hooks/useExpandableText";
import type { ProjectListRes } from "@shared/types/project";
import TitleWithIcon from "@shared/ui/project-detail/TitleWithIcon";

type ProjectDescriptionType = Pick<ProjectListRes, "description">;

const ProjectDescription = ({
  description,
}: ProjectDescriptionType): JSX.Element => {
  const { isExpanded, shouldShowButton, textRef, handleToggle } =
    useExpandableText({
      text: description,
      maxLines: 10,
    });

  return (
    <>
      <TitleWithIcon Icon={AdjustIcon} title="프로젝트 상세" />
      <Box marginY={2}>
        <DescriptionText
          ref={textRef}
          isExpanded={isExpanded}
          whiteSpace="pre-wrap"
        >
          {description}
        </DescriptionText>
        {shouldShowButton && (
          <ToggleButton
            variant="text"
            color="primary"
            onClick={handleToggle}
            size="small"
          >
            {isExpanded ? "접기" : "더 보기"}
          </ToggleButton>
        )}
      </Box>
    </>
  );
};

export default ProjectDescription;

const DescriptionText = styled(Box)<{ isExpanded: boolean }>(
  ({ isExpanded }) => ({
    lineHeight: 1.6,
    wordBreak: "break-word",
    overflowWrap: "break-word",
    ...(!isExpanded && {
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 10,
      WebkitBoxOrient: "vertical",
    }),
  })
);

const ToggleButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(0.5, 1),
  fontWeight: 600,
  fontSize: "0.875rem",
  textTransform: "none",

  "&:hover": {
    backgroundColor: theme.palette.primary.main + "10",
  },
}));
