import { History, HistoryToggleOff } from "@mui/icons-material";
import Clear from "@mui/icons-material/Clear";
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
import SearchInputHistoryToggle from "@entities/search/ui/SearchInputHistoryToggle";

interface SearchInputHistoryProps {
  onItemClick: (item: string) => void;
  onClose: () => void;
}

const HistoryDisabledMessage = (): JSX.Element => (
  <DisabledMessage>
    <HistoryToggleOff color="disabled" />
    <Typography variant="body2" color="text.secondary">
      검색 히스토리가 비활성화되어 있습니다
    </Typography>
  </DisabledMessage>
);

const HistoryEmptyMessage = (): JSX.Element => (
  <EmptyMessage>
    <History color="disabled" />
    <Typography variant="body2" color="text.secondary">
      검색 히스토리가 없습니다
    </Typography>
  </EmptyMessage>
);

interface HistoryListContentProps {
  searchHistory: string[];
  onItemClick: (item: string) => void;
  onClose: () => void;
  handleHistoryItemClick: (
    historyItem: string,
    onItemClick: (item: string) => void,
    onClose: () => void
  ) => void;
  handleRemoveHistoryItem: (historyItem: string, e: React.MouseEvent) => void;
}

const HistoryListContent = ({
  searchHistory,
  onItemClick,
  onClose,
  handleHistoryItemClick,
  handleRemoveHistoryItem,
}: HistoryListContentProps): JSX.Element => (
  <>
    {searchHistory.map((historyItem, index) => (
      <HistoryListItem key={`${historyItem}-${index}`} disablePadding>
        <HistoryListItemButton
          onClick={() =>
            handleHistoryItemClick(historyItem, onItemClick, onClose)
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
          <StyledDeleteButton
            size="small"
            onClick={(e) => handleRemoveHistoryItem(historyItem, e)}
            onMouseDown={(e) => e.stopPropagation()}
            data-history-dropdown
            title="삭제"
          >
            <Clear fontSize="small" />
          </StyledDeleteButton>
        </HistoryListItemButton>
      </HistoryListItem>
    ))}
  </>
);
// 헤더 컴포넌트
interface SearchHistoryHeaderProps {
  isHistoryEnabled: boolean;
  searchHistory: string[];
  handleToggleHistory: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearAllHistory: () => void;
}

const SearchHistoryHeader = ({
  isHistoryEnabled,
  searchHistory,
  handleToggleHistory,
  handleClearAllHistory,
}: SearchHistoryHeaderProps): JSX.Element => (
  <HistoryHeader>
    <HeaderContent>
      <SearchInputHistoryToggle isHistoryEnabled={isHistoryEnabled} />
      <Typography variant="body2" fontWeight={600}>
        검색 히스토리
      </Typography>
    </HeaderContent>
    <HeaderActions>
      <StyledFormControlLabel
        control={
          <Switch
            size="small"
            checked={isHistoryEnabled}
            onChange={handleToggleHistory}
            data-history-dropdown
          />
        }
        label=""
        onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
        data-history-dropdown
      />
      {isHistoryEnabled && searchHistory.length > 0 && (
        <ClearAllButton
          onClick={handleClearAllHistory}
          onMouseDown={(e: React.MouseEvent) => e.preventDefault()}
          data-history-dropdown
        >
          <ClearAllText variant="body2">전체삭제</ClearAllText>
        </ClearAllButton>
      )}
    </HeaderActions>
  </HistoryHeader>
);

interface HistoryContentProps {
  isHistoryEnabled: boolean;
  searchHistory: string[];
  onItemClick: (item: string) => void;
  onClose: () => void;
  handleHistoryItemClick: (
    historyItem: string,
    onItemClick: (item: string) => void,
    onClose: () => void
  ) => void;
  handleRemoveHistoryItem: (historyItem: string, e: React.MouseEvent) => void;
}

const HistoryContent = ({
  isHistoryEnabled,
  searchHistory,
  onItemClick,
  onClose,
  handleHistoryItemClick,
  handleRemoveHistoryItem,
}: HistoryContentProps): JSX.Element => {
  if (!isHistoryEnabled) {
    return <HistoryDisabledMessage />;
  }

  if (searchHistory.length === 0) {
    return <HistoryEmptyMessage />;
  }

  return (
    <HistoryListContent
      searchHistory={searchHistory}
      onItemClick={onItemClick}
      onClose={onClose}
      handleHistoryItemClick={handleHistoryItemClick}
      handleRemoveHistoryItem={handleRemoveHistoryItem}
    />
  );
};

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
        <SearchHistoryHeader
          isHistoryEnabled={isHistoryEnabled}
          searchHistory={searchHistory}
          handleToggleHistory={handleToggleHistory}
          handleClearAllHistory={handleClearAllHistory}
        />

        <Divider />

        <HistoryList>
          <HistoryContent
            isHistoryEnabled={isHistoryEnabled}
            searchHistory={searchHistory}
            onItemClick={_onItemClick}
            onClose={_onClose}
            handleHistoryItemClick={handleHistoryItemClick}
            handleRemoveHistoryItem={handleRemoveHistoryItem}
          />
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

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  margin: 0,
}));

const ClearAllButton = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  padding: "4px 8px",
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ClearAllText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.75rem",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

const StyledDeleteButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default SearchInputHistory;
