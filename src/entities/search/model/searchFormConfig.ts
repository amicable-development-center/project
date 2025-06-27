import {
  DROPDOWN_DEFAULTS,
  POSITION_OPTIONS,
  SEARCH_FORM_LABELS,
  SORT_OPTIONS,
} from "@entities/search/model/searchConstants";

import {
  ProjectCategory,
  RecruitmentStatus,
  Workflow,
} from "@shared/types/project";

export interface SelectFieldConfig {
  label: string;
  defaultValue: string;
  options: { value: string; label: string }[];
  fieldKey: string;
}

export const SELECT_FIELD_CONFIGS: Record<string, SelectFieldConfig> = {
  category: {
    label: SEARCH_FORM_LABELS.CATEGORY,
    defaultValue: DROPDOWN_DEFAULTS.ALL_CATEGORIES,
    options: [
      { value: "all", label: DROPDOWN_DEFAULTS.ALL_CATEGORIES },
      ...Object.values(ProjectCategory).map((category) => ({
        value: category,
        label: category,
      })),
    ],
    fieldKey: "category",
  },
  position: {
    label: SEARCH_FORM_LABELS.POSITION,
    defaultValue: DROPDOWN_DEFAULTS.ALL_POSITIONS,
    options: [
      { value: "all", label: DROPDOWN_DEFAULTS.ALL_POSITIONS },
      ...POSITION_OPTIONS,
    ],
    fieldKey: "position",
  },
  status: {
    label: SEARCH_FORM_LABELS.STATUS,
    defaultValue: DROPDOWN_DEFAULTS.ALL_STATUS,
    options: [
      { value: "all", label: DROPDOWN_DEFAULTS.ALL_STATUS },
      ...Object.values(RecruitmentStatus).map((status) => ({
        value: status,
        label: status,
      })),
    ],
    fieldKey: "status",
  },
  workflow: {
    label: SEARCH_FORM_LABELS.WORKFLOW,
    defaultValue: DROPDOWN_DEFAULTS.ALL_REGIONS,
    options: [
      { value: "all", label: DROPDOWN_DEFAULTS.ALL_REGIONS },
      ...Object.values(Workflow).map((workflow) => ({
        value: workflow,
        label: workflow,
      })),
    ],
    fieldKey: "workflow",
  },
  sortBy: {
    label: SEARCH_FORM_LABELS.SORT,
    defaultValue: SORT_OPTIONS.LATEST.label,
    options: Object.values(SORT_OPTIONS),
    fieldKey: "sortBy",
  },
};
