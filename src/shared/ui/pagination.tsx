import { Box } from "@mui/material";
import type { JSX } from "react";

import { makePagingArr } from "@shared/libs/utils/paginNation";

interface PaginationProps {
  totalCount?: number;
  currentPage: number;
  prev: () => void;
  next: () => void;
  reset: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

const PaginationBar = ({
  totalCount = 0,
  currentPage,
  prev,
  next,
  reset,
  disablePrev,
  disableNext,
}: PaginationProps): JSX.Element => {
  const paginArray = makePagingArr(totalCount);

  return (
    <Box display={"flex"}>
      <button onClick={prev} disabled={disablePrev}>
        이전
      </button>

      {paginArray.map((num, i) => (
        <Box key={i} sx={currentPage === i ? { color: "red" } : {}}>
          {num}
        </Box>
      ))}

      <button onClick={next} disabled={disableNext}>
        다음
      </button>
      <button onClick={reset}>리셋</button>
    </Box>
  );
};

export default PaginationBar;
