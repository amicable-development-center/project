import { memo } from "react";
import type { JSX } from "react";

import type { SelectFieldConfig } from "@entities/search/model/selectFieldConfigs";
import SearchSelectBox from "@entities/search/ui/SearchSelectBox";

interface SelectBoxProps {
  config: SelectFieldConfig;
  value: string;
  onChange: (value: string) => void;
}

const SelectBox = memo(
  ({ config, value, onChange }: SelectBoxProps): JSX.Element => {
    return (
      <SearchSelectBox config={config} value={value} onChange={onChange} />
    );
  }
);

export default SelectBox;
