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

export type AllFormType = {
  form1: Step1Type;
  form2: Step2Type;
  form3: Step3Type;
  form4: Step4Type;
};

export type UpdateAllFormType = <K extends keyof AllFormType>(
  formKey: K,
  data: AllFormType[K]
) => void;
