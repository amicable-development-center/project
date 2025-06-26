import Clear from "@mui/icons-material/Clear";
import History from "@mui/icons-material/History";
import HistoryToggleOff from "@mui/icons-material/HistoryToggleOff";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Box,
  Switch,
  FormControlLabel,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { memo } from "react";
import type { JSX } from "react";

import { useSearchHistory } from "@entities/search/hooks/useSearchHistory";

interface SearchInputHistoryProps {
  onItemClick: (item: string) => void;
  onClose: () => void;
}

const SearchInputHistory = memo(
  ({
    onItemClick: _onItemClick,
    onClose: _onClose,
  }: SearchInputHistoryProps): JSX.Element => {
    const {
      searchHistory,
      isHistoryEnabled,
      handleRemoveHistoryItem,
      handleClearAllHistory,
      handleToggleHistory,
      handleHistoryItemClick,
    } = useSearchHistory();

    return (
      <HistoryDropdown
        data-history-dropdown
        onMouseDown={(e) => e.preventDefault()}
      >
        <HistoryHeader>
          <HeaderContent>
            {isHistoryEnabled ? (
              <History fontSize="small" />
            ) : (
              <HistoryToggleOff fontSize="small" />
            )}
            <Typography variant="body2" fontWeight={600}>
              검색 히스토리
            </Typography>
          </HeaderContent>
          <HeaderActions>
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={isHistoryEnabled}
                  onChange={handleToggleHistory}
                  data-history-dropdown
                />
              }
              label=""
              sx={{ margin: 0 }}
              onMouseDown={(e) => e.preventDefault()}
              data-history-dropdown
            />
            {isHistoryEnabled && searchHistory.length > 0 && (
              <Box
                onClick={handleClearAllHistory}
                onMouseDown={(e) => e.preventDefault()}
                data-history-dropdown
                sx={{
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontSize: "0.75rem",
                    "&:hover": {
                      color: "primary.main",
                    },
                  }}
                >
                  전체삭제
                </Typography>
              </Box>
            )}
          </HeaderActions>
        </HistoryHeader>

        <Divider />

        <HistoryList>
          {!isHistoryEnabled ? (
            <DisabledMessage>
              <HistoryToggleOff color="disabled" />
              <Typography variant="body2" color="text.secondary">
                검색 히스토리가 비활성화되어 있습니다
              </Typography>
            </DisabledMessage>
          ) : searchHistory.length === 0 ? (
            <EmptyMessage>
              <History color="disabled" />
              <Typography variant="body2" color="text.secondary">
                검색 히스토리가 없습니다
              </Typography>
            </EmptyMessage>
          ) : (
            searchHistory.map((historyItem, index) => (
              <HistoryListItem key={`${historyItem}-${index}`} disablePadding>
                <HistoryListItemButton
                  onClick={() =>
                    handleHistoryItemClick(historyItem, _onItemClick, _onClose)
                  }
                >
                  <ListItemIcon>
                    <History fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={historyItem}
                    primaryTypographyProps={{
                      noWrap: true,
                      fontSize: "0.875rem",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => handleRemoveHistoryItem(historyItem, e)}
                    onMouseDown={(e) => e.stopPropagation()}
                    data-history-dropdown
                    title="삭제"
                    sx={{
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </HistoryListItemButton>
              </HistoryListItem>
            ))
          )}
        </HistoryList>
      </HistoryDropdown>
    );
  }
);

const HistoryDropdown = styled(Paper)(({ theme }) => ({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 1300,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: theme.spacing(1.5),
  borderBottomRightRadius: theme.spacing(1.5),
  overflow: "hidden",
  border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
  borderTop: "none",
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.12)}`,
  backgroundColor: theme.palette.background.paper,
}));

const HistoryHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(1.5, 2),
  backgroundColor: alpha(theme.palette.primary.main, 0.04),
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const HeaderActions = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const DisabledMessage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3, 2),
  gap: theme.spacing(1),
  textAlign: "center",
}));

const EmptyMessage = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(3, 2),
  gap: theme.spacing(1),
  textAlign: "center",
}));

const HistoryList = styled(List)(() => ({
  padding: 0,
}));

const HistoryListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
}));

const HistoryListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1),
  minHeight: 48,

  "& .MuiListItemIcon-root": {
    minWidth: 36,
    color: theme.palette.text.secondary,
  },

  "&:hover": {
    backgroundColor: "transparent",
  },
}));

export default SearchInputHistory;
