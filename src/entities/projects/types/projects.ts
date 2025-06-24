import type { Timestamp } from "firebase/firestore/lite";

export interface ProjectItemInsertReq {
  userId: string; // 작성자 id
  userName: string; // 작성사 이름
  status: "모집중" | "모집완료";
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
}

interface Positions {
  position: string;
  count: number;
  experience: string; // 경력
}

export interface ProjectListRes extends ProjectItemInsertReq {
  id: string; // firebase 문서 id
  createdAt: Timestamp;
}
