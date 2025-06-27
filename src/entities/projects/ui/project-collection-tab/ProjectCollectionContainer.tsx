import { Box, Button, styled } from "@mui/material";
import type { JSX } from "react";
import { useState, useCallback } from "react";

import type { ProjectListRes } from "@shared/types/project";
import DeleteButton from "@shared/ui/DeleteButton";

import ProjectCollectionTab from "./ProjectCollectionTab";
import ProjectCollectionTabPanel from "./ProjectCollectionTabPanel";

interface ProjectCollectionContainerProps {
  likedProjects: ProjectListRes[];
  appliedProjects: ProjectListRes[];
  createdProjects: ProjectListRes[];
  loading?: boolean;
  onDeleteProjects?: (
    type: "liked" | "applied" | "created",
    ids: string[]
  ) => Promise<void>;
}

const ProjectCollectionContainer = ({
  likedProjects,
  appliedProjects,
  createdProjects,
  loading = false,
  onDeleteProjects,
}: ProjectCollectionContainerProps): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const getCurrentProjects = useCallback((): ProjectListRes[] => {
    switch (currentTab) {
      case 0:
        return likedProjects;
      case 1:
        return appliedProjects;
      case 2:
        return createdProjects;
      default:
        return [];
    }
  }, [currentTab, likedProjects, appliedProjects, createdProjects]);

  const handleTabChange = useCallback((tabIndex: number) => {
    setCurrentTab(tabIndex);
    setEditMode(false);
    setSelectedIds([]);
  }, []);

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

  const handleDelete = useCallback(async () => {
    if (!onDeleteProjects || selectedIds.length === 0) return;

    const type =
      currentTab === 0 ? "liked" : currentTab === 1 ? "applied" : "created";
    await onDeleteProjects(type, selectedIds);
    setSelectedIds([]);
  }, [currentTab, selectedIds, onDeleteProjects]);

  const currentProjects = getCurrentProjects();
  const allIds = currentProjects.map((p) => p.id);
  const isAllSelected =
    selectedIds.length === allIds.length && allIds.length > 0;

  return (
    <Container>
      <TabHeader>
        <ProjectCollectionTab
          currentTab={currentTab}
          onTabChange={handleTabChange}
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
        index={0}
        projects={likedProjects}
        loading={loading}
        editMode={editMode}
        selectedIds={selectedIds}
        onSelectProject={handleSelectProject}
      />

      <ProjectCollectionTabPanel
        value={currentTab}
        index={1}
        projects={appliedProjects}
        loading={loading}
        editMode={editMode}
        selectedIds={selectedIds}
        onSelectProject={handleSelectProject}
      />

      <ProjectCollectionTabPanel
        value={currentTab}
        index={2}
        projects={createdProjects}
        loading={loading}
        editMode={editMode}
        selectedIds={selectedIds}
        onSelectProject={handleSelectProject}
      />
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
