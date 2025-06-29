import { FormControl, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { CSSProperties, JSX } from "react";

import { ProjectCategory } from "@shared/types/project";
import SimpleFormCard from "@shared/ui/project-insert/SimpleFormCard";

interface ProjectCategoryCardProps {
  value: ProjectCategory | "";
  onChange: (event: SelectChangeEvent<ProjectCategory | "">) => void;
  large?: boolean;
  style?: CSSProperties;
}

const ProjectCategoryCard = ({
  value,
  onChange,
  large,
  style,
}: ProjectCategoryCardProps): JSX.Element => {
  const theme = useTheme();
  return (
    <SimpleFormCard
      title="프로젝트 분야"
      description="어떤 분야의 프로젝트인지 선택해주세요"
      helpText="가장 가까운 분야를 선택해주세요"
      large={large}
      style={style}
    >
      <FormControl fullWidth>
        <Select
          value={value || ""}
          onChange={onChange}
          size="small"
          displayEmpty
          sx={{
            height: { xs: 40, sm: 48 },
            "& .MuiOutlinedInput-root": {
              height: { xs: "40px !important", sm: "48px !important" },
              fontSize: {
                xs: "16px",
                sm: "17px",
                md: "18px",
              },
              fontFamily: theme.typography.fontFamily,
              background: "none",
              border: "none",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.text.primary,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.primary.main,
                borderWidth: "2px",
              },
            },
            "& .MuiSelect-select": {
              padding: large ? theme.spacing(2.2) : theme.spacing(1.7),
              height: "auto !important",
              minHeight: "unset !important",
              display: "flex",
              alignItems: "center",
              fontSize: {
                xs: "16px",
                sm: "16px",
                md: "17px",
              },
              "&[aria-expanded='false']": {
                color: value ? "inherit" : "#999",
              },
            },
          }}
        >
          <MenuItem value="" disabled hidden>
            분야를 선택하세요
          </MenuItem>
          <MenuItem value={ProjectCategory.webDevelopment}>
            {ProjectCategory.webDevelopment}
          </MenuItem>
          <MenuItem value={ProjectCategory.mobileDevelopment}>
            {ProjectCategory.mobileDevelopment}
          </MenuItem>
          <MenuItem value={ProjectCategory.aiMl}>
            {ProjectCategory.aiMl}
          </MenuItem>
          <MenuItem value={ProjectCategory.blockchain}>
            {ProjectCategory.blockchain}
          </MenuItem>
          <MenuItem value={ProjectCategory.gameDevelopment}>
            {ProjectCategory.gameDevelopment}
          </MenuItem>
          <MenuItem value={ProjectCategory.dataScience}>
            {ProjectCategory.dataScience}
          </MenuItem>
          <MenuItem value={ProjectCategory.iotHardware}>
            {ProjectCategory.iotHardware}
          </MenuItem>
          <MenuItem value={ProjectCategory.webDesign}>
            {ProjectCategory.webDesign}
          </MenuItem>
          <MenuItem value={ProjectCategory.etc}>{ProjectCategory.etc}</MenuItem>
        </Select>
      </FormControl>
    </SimpleFormCard>
  );
};

export default ProjectCategoryCard;
