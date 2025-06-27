import {
  Box,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import type { JSX } from "react";
import { useState, useCallback, useMemo } from "react";

import { useGetMyLikedProjectsWithDetails } from "@entities/projects/queries/useGetProjectLike";
import ProjectTabPanel from "@entities/user/ui/user-profile/ProjectTabPanel";

import { useProjectStore } from "@shared/stores/projectStore";
import DeleteButton from "@shared/ui/DeleteButton";
import Pagination from "@shared/ui/pagination/Pagination";
import SnackbarAlert from "@shared/ui/SnackbarAlert";

interface UserProfileProjectListProps {
  PROFILE_TABS: { label: string; color: string }[];
  tab: number;
  setTab: (idx: number) => void;
  onDeleteProjects: (
    type: "likeProjects" | "appliedProjects",
    ids: string[]
  ) => Promise<void>;
}

const UserProfileProjectList = ({
  PROFILE_TABS,
  tab,
  setTab,
  onDeleteProjects,
}: UserProfileProjectListProps): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { appliedProjects } = useProjectStore();

  const { data: myLikedProjectsWithDetails } =
    useGetMyLikedProjectsWithDetails();

  const ITEMS_PER_PAGE = 6;

  const paginatedLikedProjects = useMemo(() => {
    if (!myLikedProjectsWithDetails) return [];
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return myLikedProjectsWithDetails.slice(startIndex, endIndex);
  }, [myLikedProjectsWithDetails, currentPage]);

  const totalLikedPages = useMemo(() => {
    if (!myLikedProjectsWithDetails) return 0;
    return Math.ceil(myLikedProjectsWithDetails.length / ITEMS_PER_PAGE);
  }, [myLikedProjectsWithDetails]);

  const currentProjects = tab === 0 ? paginatedLikedProjects : appliedProjects;
  const allIds = currentProjects.map((p) => p.id);
  const isAllSelected =
    selectedIds.length === allIds.length && allIds.length > 0;

  const handleToggleAll = useCallback(() => {
    setSelectedIds(isAllSelected ? [] : allIds);
  }, [isAllSelected, allIds]);

  const handleSelectProject = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  }, []);

  const handleDelete = useCallback(() => setOpenDialog(true), []);
  const handleCancelDelete = useCallback(() => setOpenDialog(false), []);

  const handleConfirmDelete = useCallback(async () => {
    if (tab === 0) {
      await onDeleteProjects("likeProjects", selectedIds);
    } else {
      await onDeleteProjects("appliedProjects", selectedIds);
    }
    setOpenDialog(false);
    setSelectedIds([]);
    setSnackbarOpen(true);
  }, [tab, selectedIds, onDeleteProjects]);

  return (
    <Box flex={1}>
      {/* Tabs와 버튼을 한 줄에 배치 */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          {PROFILE_TABS.map((tabInfo, _idx) => (
            <Tab key={tabInfo.label} label={tabInfo.label} />
          ))}
        </Tabs>
        <Box display="flex" alignItems="center" gap={1}>
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
            >
              편집
            </Button>
          )}
        </Box>
      </Box>
      {tab === 0 && (
        <ProjectTabPanel
          projects={myLikedProjectsWithDetails || []}
          emptyMessage="아직 관심 프로젝트가 없습니다."
          editMode={editMode}
          selectedIds={selectedIds}
          onSelectProject={handleSelectProject}
        />
      )}
      {tab === 0 &&
        myLikedProjectsWithDetails &&
        myLikedProjectsWithDetails.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalLikedPages}
            onPageChange={setCurrentPage}
          />
        )}
      {tab === 1 && (
        <ProjectTabPanel
          projects={appliedProjects}
          emptyMessage="아직 지원한 프로젝트가 없습니다."
          editMode={editMode}
          selectedIds={selectedIds}
          onSelectProject={handleSelectProject}
        />
      )}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>정말로 삭제하시겠습니까?</DialogTitle>
        <DialogContent>
          <Typography>
            선택한 프로젝트를 삭제하면 되돌릴 수 없습니다.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>취소</Button>
          <DeleteButton onClick={handleConfirmDelete}>삭제</DeleteButton>
        </DialogActions>
      </Dialog>
      <SnackbarAlert
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        message="선택한 프로젝트가 성공적으로 삭제되었습니다."
        severity="success"
        duration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
    </Box>
  );
};

export default UserProfileProjectList;
