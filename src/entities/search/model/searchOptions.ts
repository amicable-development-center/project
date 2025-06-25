import type { UserRole } from "@shared/types/user";

export const POSITION_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "frontend", label: "프론트앤드" },
  { value: "backend", label: "백엔드" },
  { value: "fullstack", label: "풀스택" },
  { value: "designer", label: "UI/UX 디자이너" },
  { value: "pm", label: "PM" },
];

export const SEARCH_FORM_LABELS = {
  CATEGORY: "🎯 프로젝트 분야",
  POSITION: "👥 모집 포지션",
  STATUS: "📢 모집 상태",
  WORKFLOW: "🌍 진행 방식",
  SORT: "📊 정렬 방식",
} as const;

export const DROPDOWN_DEFAULTS = {
  ALL_CATEGORIES: "전체 카테고리",
  ALL_POSITIONS: "전체 직무",
  ALL_STATUS: "전체 상태",
  ALL_REGIONS: "전체 지역",
} as const;

export const SORT_OPTIONS = {
  LATEST: { value: "latest", label: "최신순" },
  DEADLINE: { value: "deadline", label: "마감순" },
  APPLICANTS: { value: "applicants", label: "지원자순" },
  POPULARITY: { value: "popularity", label: "인기순" },
} as const;
