import type { ProjectItemInsertReq } from "@shared/types/project";

export type Step1Type = Pick<
  ProjectItemInsertReq,
  "title" | "oneLineInfo" | "category" | "closedDate" | "simpleInfo"
>;

export type Step2Type = Pick<
  ProjectItemInsertReq,
  "techStack" | "teamSize" | "expectedPeriod" | "positions"
>;

export type Step3Type = Pick<ProjectItemInsertReq, "description" | "schedules">;

export type Step4Type = Pick<
  ProjectItemInsertReq,
  "workflow" | "requirements" | "preferentialTreatment"
>;
