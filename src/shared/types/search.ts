import type {
  ProjectCategory,
  RecruitmentStatus,
  Workflow,
} from "@shared/types/project";
import type { UserRole } from "@shared/types/user";

export type FilterOperator =
  | "=="
  | "!="
  | "<"
  | "<="
  | ">"
  | ">="
  | "array-contains"
  | "array-contains-any"
  | "in"
  | "not-in";

export type FilterCondition = {
  field: string;
  operator: FilterOperator;
  value: any;
};

export type SortOption = {
  field: string;
  direction: "asc" | "desc";
};

export type BaseFilterOption = {
  conditions?: FilterCondition[];
  sortBy?: SortOption[];
  limit?: number;
};

export type ProjectSearchFilterOption = {
  title?: string | "";
  category?: ProjectCategory | "all";
  position?: UserRole | "all";
  status?: RecruitmentStatus | "all";
  workflow?: Workflow | "all";
  sortBy?: SortBy | "latest";
};

export type SortBy = "latest" | "deadline" | "applicants" | "popularity";
