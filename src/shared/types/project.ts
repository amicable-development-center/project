import type { User as FirebaseUser } from "firebase/auth";
import type { Timestamp } from "firebase/firestore";

import type { ExpectedPeriod, ProjectSchedule } from "@shared/types/schedule";
import type { User, UserRole } from "@shared/types/user";

export interface ProjectItemInsertReq {
  projectOwnerID: string; // 작성자
  projectOwner: User; // 프로젝트 오너 유저 정보
  status: RecruitmentStatus;
  category: ProjectCategory; // 프로젝트 분야
  title: string; // 타이틀
  oneLineInfo: string; // 프로젝트 한줄 소개
  simpleInfo: string; // 프로젝트 간단 소개
  teamSize: number; // 팀 규모
  expectedPeriod: ExpectedPeriod; // 예상기간
  closedDate: Timestamp; // 모집 마감 시간
  workflow: Workflow; // 진행 방식
  techStack: string[]; // 기술 스택
  description: string; // 상세 설명
  positions: Positions[]; // 모집 포지션
  schedules: ProjectSchedule[]; // 프로젝트 일정
  requirements: string[]; // 지원 요구사항
  preferentialTreatment: string[]; //  우대사항
  applicants: string[]; // 지원자들 -- 추후에 삭제 바람
  likedUsers: string[]; // 좋아요 누른 사람들 -- 추후에 삭제 바람
}

export enum ProjectCategory {
  webDevelopment = "웹 개발",
  mobileDevelopment = "모바일 개발",
  aiMl = "AI/ML",
  blockchain = "블록체인",
  gameDevelopment = "게임 개발",
  dataScience = "데이터 사이언스",
  iotHardware = "IoT/하드웨어",
  webDesign = "웹 디자인",
  etc = "기타",
}

export enum Workflow {
  online = "온라인 (원격)",
  offlineInBusan = "오프라인 (부산)",
  offlineInSeoul = "오프라인 (서울)",
  offlineInAnywhere = "오프라인 (자유)",
  hybrid = "하이브리드(온라인 + 오프라인)",
}

export interface Positions {
  position: UserRole; // 포지션
  count: number; // 모집 인원
  experience: string; // 경력
  status?: RecruitmentStatus;
  applicants: string[];
}
export interface ProjectListRes extends ProjectItemInsertReq {
  id: string; // firebase 문서 id
  createdAt: Timestamp; // 게시글 등록일자
}

export enum RecruitmentStatus {
  recruiting = "모집중",
  completed = "모집완료",
}

export interface ProjectApplication {
  projectId: string;
  userId: string;
  message: string;
  createdAt: Timestamp;
  status: "pending" | "accepted" | "rejected";
}

export interface CreateProjectApplicationRequest {
  userId: FirebaseUser["uid"];
  projectId: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Timestamp;
}

export interface CreateProjectApplicationInput {
  userId: FirebaseUser["uid"];
  projectId: string;
  message: string;
}

export interface UseOptimisticProjectApplyProps {
  isApplied: boolean;
  isLoading: boolean;
  toggleApplications: () => void;
}
