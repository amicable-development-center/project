# features/projects

프로젝트 관련 비즈니스 기능들을 담당하는 피처 레이어입니다.

## 📋 책임 범위

### ✅ 담당하는 것
- **사용자 액션** (좋아요, 지원, 생성, 삭제)
- **상태 변경 작업** (POST, PUT, DELETE)
- **복합 비즈니스 로직**
- **사용자 시나리오 구현**
- **폼 관리 및 검증**

### ❌ 담당하지 않는 것
- 순수한 데이터 조회 (entities에서 담당)
- 도메인 타입 정의 (shared/types에서 담당)
- 단순한 UI 렌더링 (entities/ui에서 담당)

## 📁 폴더 구조

```
features/projects/
├── api/              # 상태 변경 API 함수들
│   ├── createProjectApplicationsApi.ts
│   ├── createProjectLikeApi.ts
│   ├── projectsApi.ts  # 생성, 수정, 삭제 작업
│   └── userAPi.ts
├── hooks/            # 비즈니스 로직 훅들
│   ├── useApplyFrom.tsx
│   ├── useInsertStep1.ts
│   ├── useInsertStep2.ts
│   ├── useInsertStep3.ts
│   ├── useInsertStep4.ts
│   ├── useProjectInsertForm.ts
│   └── useProjectPagination.ts
├── queries/          # Mutation 훅들 (상태 변경)
│   ├── useCancelProjectApplication.ts
│   ├── useCreateProjectApplications.ts
│   ├── useCreateProjectLike.ts
│   ├── useProjectApply.ts
│   ├── useProjectDone.ts
│   └── useProjectInsert.ts
├── types/            # 피처 전용 타입들
│   └── project-update.ts
├── libs/             # 피처 전용 유틸리티
└── ui/               # 인터랙티브 UI 컴포넌트들
    ├── project-insert/
    ├── ProjectApplyForm.tsx
    ├── ProjectDelete.tsx
    ├── ProjectLike.tsx
    └── ProjectModify.tsx
```

## 🔗 사용법

```typescript
// ✅ 올바른 사용 - 상태 변경 및 비즈니스 로직
import { insertProjectItem } from "@features/projects/api/projectsApi";
import { useCreateProjectLike } from "@features/projects/queries/useCreateProjectLike";
import { useProjectInsertForm } from "@features/projects/hooks/useProjectInsertForm";

// ✅ entities에서 데이터 조회 import
import { getProjectItem } from "@entities/projects/api/projectsApi";
```

## 🎯 핵심 기능들

### 1. 프로젝트 생성/수정/삭제
- 프로젝트 등록 폼 관리
- 단계별 폼 검증
- 프로젝트 상태 변경

### 2. 좋아요/지원 기능
- 프로젝트 좋아요 토글
- 프로젝트 지원/취소
- 낙관적 업데이트

### 3. 페이지네이션
- 프로젝트 목록 페이지네이션
- 무한 스크롤 구현

## 🔄 entities와의 관계

```typescript
// features는 entities를 사용할 수 있음
import { getProjectItem } from "@entities/projects/api/projectsApi";

// entities는 features를 사용하면 안됨 ❌
// import { createProject } from "@features/projects/..."; 
``` 