import { Box, styled, Typography } from "@mui/material";
import type { JSX } from "react";
import { useParams } from "react-router-dom";

import useProjectDelete from "@features/projects/queries/useProjectDelete";

const ProjectDelete = ({
  projectOwnerID,
}: {
  projectOwnerID: string;
}): JSX.Element => {
  const { id: postID } = useParams();
  const { mutate: projectdelete, isPending } = useProjectDelete();

  const handleDeleteBtn = (): void => {
    if (postID && !isPending) {
      projectdelete({ postID, projectOwnerID });
    }
  };

  return (
    <MessageBtn onClick={handleDeleteBtn}>
      <Typography>삭제</Typography>
    </MessageBtn>
  );
};

export default ProjectDelete;

const MessageBtn = styled(Box)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  border-radius: 4px;
  color: white;
  background-color: tomato;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #e14b30;
  }
`;
