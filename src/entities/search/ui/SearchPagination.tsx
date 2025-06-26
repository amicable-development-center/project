import { Box } from "@mui/material";
import type { JSX } from "react";

import Pagination from "@shared/ui/pagination/Pagination";

interface SearchPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const SearchPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  disabled = false,
}: SearchPaginationProps): JSX.Element | null => {
  if (totalPages <= 0) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        disabled={disabled}
      />
    </Box>
  );
};

export default SearchPagination;
