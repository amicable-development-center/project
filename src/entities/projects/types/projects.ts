// 나중에 Project Owner 정보가 타입으로 들어가야할 것 같음 + expectedPeriod 타입 수정 or 포맷팅해서 DB 저장

import type { UserRole } from "@shared/user/types/user";

// 팀원 목록들도 타입으로 들어가야할 것 같음, 이미지도 타입으로 들어가야할 것 같음
// 지원자들도 넣어야할 듯
export interface ProjectItemInsertReq {
  userId: string; // 작성자 id
  userName: string; // 작성사 이름
  status: "모집중" | "모집완료";
  userRole: UserRole;
  avatar: string;
  title: string; // 프로젝트 제목
  oneLineInfo: string; // 프로젝트 한줄 소개
  simpleInfo: string; // 프로젝트 간단 소개
  techStack: string[]; // 기술 스택
  teamSize: number; // 팀 규모
  expectedPeriod: string; // 예상기간
  description: string; // 상세 설명
  workflow: string; // 진행방식
  requirements: string[]; // 지원 요구사항
  preferentialTreatment: string[]; //  우대사항
  positions: Positions[]; // 모집 포지션
  applicants: string[]; // 지원자들
}

interface Positions {
  position: string;
  count: number;
  experience: string; // 경력
}
// 나중에 Project Owner 정보가 타입으로 들어가야할 것 같음 + expectedPeriod 타입 수정 or 포맷팅해서 DB 저장
// 팀원 목록들도 타입으로 들어가야할 것 같음
export interface ProjectListRes extends ProjectItemInsertReq {
  id: string; // firebase 문서 id
}
