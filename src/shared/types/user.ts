export interface User {
  id: string; // 유저 아이디
  name: string; // 유저 이름
  userRole: UserRole; // 유저 역할
  email: string; // 이메일
  experience: UserExperience; // 경력
  avatar?: string; // 프로필 이미지
  likeProjects?: string[]; // 좋아요 누른 프로젝트
  appliedProjects?: string[]; // 지원한 프로젝트
  introduceMyself?: string; // 자기소개
  myProjects?: string[]; // 내가 등록한 프로젝트
}

export type UserRole = "frontend" | "backend" | "fullstack" | "designer" | "pm";
export enum UserExperience {
  junior = "주니어 (3년 이하)",
  mid = "미들 (3년 이상 10년 이하)",
  senior = "시니어 (10년 이상)",
}

export type UserInput = Pick<
  User,
  "name" | "userRole" | "experience" | "introduceMyself"
>;
