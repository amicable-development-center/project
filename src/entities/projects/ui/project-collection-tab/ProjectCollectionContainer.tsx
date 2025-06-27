import {
  Box,
  Button,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CircularProgress,
} from "@mui/material";
import type { JSX } from "react";
import { useState, useCallback } from "react";

import type { ProjectListRes } from "@shared/types/project";
import { ProjectCollectionTabType } from "@shared/types/project";
import DeleteButton from "@shared/ui/DeleteButton";

import ProjectCollectionTab from "./ProjectCollectionTab";
import ProjectCollectionTabPanel from "./ProjectCollectionTabPanel";

interface ProjectCollectionContainerProps {
  likedProjects: ProjectListRes[];
  appliedProjects: ProjectListRes[];
  createdProjects: ProjectListRes[];
  loading?: boolean;
  onDeleteProjects?: (
    type: ProjectCollectionTabType,
    ids: string[]
  ) => Promise<void>;
  currentTab: ProjectCollectionTabType;
  onTabChange: (tab: ProjectCollectionTabType) => void;
}

const ProjectCollectionContainer = ({
  likedProjects,
  appliedProjects,
  createdProjects,
  loading = false,
  onDeleteProjects,
  currentTab,
  onTabChange,
}: ProjectCollectionContainerProps): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getCurrentProjects = useCallback((): ProjectListRes[] => {
    switch (currentTab) {
      case ProjectCollectionTabType.Likes:
        return likedProjects;
      case ProjectCollectionTabType.Applied:
        return appliedProjects;
      case ProjectCollectionTabType.Created:
        return createdProjects;
      default:
        return [];
    }
  }, [currentTab, likedProjects, appliedProjects, createdProjects]);

  const handleSelectProject = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  }, []);

  const handleToggleAll = useCallback(() => {
    const currentProjects = getCurrentProjects();
    const allIds = currentProjects.map((p) => p.id);
    const isAllSelected =
      selectedIds.length === allIds.length && allIds.length > 0;
    setSelectedIds(isAllSelected ? [] : allIds);
  }, [selectedIds, getCurrentProjects]);

  const handleDelete = useCallback(() => {
    if (selectedIds.length === 0) return;
    setOpenDialog(true);
  }, [selectedIds]);

  const handleConfirmDelete = useCallback(async () => {
    if (!onDeleteProjects || selectedIds.length === 0) return;
    setIsDeleting(true);
    await onDeleteProjects(currentTab, selectedIds);
    setSelectedIds([]);
    setOpenDialog(false);
    setIsDeleting(false);
  }, [currentTab, selectedIds, onDeleteProjects]);

  const handleCancelDelete = useCallback(() => {
    setOpenDialog(false);
  }, []);

  const currentProjects = getCurrentProjects();
  const allIds = currentProjects.map((p) => p.id);
  const isAllSelected =
    selectedIds.length === allIds.length && allIds.length > 0;

  return (
    <Container>
      <TabHeader>
        <ProjectCollectionTab
          currentTab={currentTab}
          onTabChange={onTabChange}
        />

        <ActionButtons>
          {editMode ? (
            <>
              <Button variant="outlined" size="small" onClick={handleToggleAll}>
                {isAllSelected ? "전체선택해제" : "전체선택"}
              </Button>
              <DeleteButton
                onClick={handleDelete}
                sx={{ minWidth: 80 }}
                disabled={selectedIds.length === 0}
              >
                삭제
              </DeleteButton>
              <Button
                variant="text"
                size="small"
                onClick={() => setEditMode(false)}
              >
                완료
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setEditMode(true)}
              disabled={currentProjects.length === 0}
            >
              편집
            </Button>
          )}
        </ActionButtons>
      </TabHeader>

      <ProjectCollectionTabPanel
        value={currentTab}
        index={ProjectCollectionTabType.Likes}
        projects={likedProjects}
        loading={loading}
        editMode={editMode}
        selectedIds={selectedIds}
        onSelectProject={handleSelectProject}
        type={ProjectCollectionTabType.Likes}
      />

      <ProjectCollectionTabPanel
        value={currentTab}
        index={ProjectCollectionTabType.Applied}
        projects={appliedProjects}
        loading={loading}
        editMode={editMode}
        selectedIds={selectedIds}
        onSelectProject={handleSelectProject}
        type={ProjectCollectionTabType.Applied}
      />

      <ProjectCollectionTabPanel
        value={currentTab}
        index={ProjectCollectionTabType.Created}
        projects={createdProjects}
        loading={loading}
        editMode={editMode}
        selectedIds={selectedIds}
        onSelectProject={handleSelectProject}
        type={ProjectCollectionTabType.Created}
      />

      {/* 삭제 확인 다이얼로그 */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          {isDeleting ? (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              minHeight={80}
            >
              <CircularProgress size={32} />
              <Typography sx={{ ml: 2 }}>삭제 중입니다...</Typography>
            </Box>
          ) : (
            <Typography>
              선택한 프로젝트를 삭제하면 되돌릴 수 없습니다.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={isDeleting}>
            취소
          </Button>
          <DeleteButton onClick={handleConfirmDelete} disabled={isDeleting}>
            삭제
          </DeleteButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectCollectionContainer;

const Container = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
}));

const TabHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  flexShrink: 0,
}));
