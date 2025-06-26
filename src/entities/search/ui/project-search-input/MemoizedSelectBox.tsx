import { memo } from "react";
import type { JSX } from "react";

import type { SelectFieldConfig } from "@entities/search/model/selectFieldConfigs";
import ProjectSearchSelectBox from "@entities/search/ui/project-search-input/ProjectSearchSelectBox";

interface MemoizedSelectBoxProps {
  config: SelectFieldConfig;
  value: string;
  onChange: (value: string) => void;
}

const MemoizedSelectBox = memo(
  ({ config, value, onChange }: MemoizedSelectBoxProps): JSX.Element => {
    return (
      <ProjectSearchSelectBox
        config={config}
        value={value}
        onChange={onChange}
      />
    );
  }
);

export default MemoizedSelectBox;
