# entities/projects

프로젝트 도메인의 순수한 엔티티 레이어입니다.

## 📋 책임 범위

### ✅ 담당하는 것
- **순수한 데이터 조회** (GET 작업만)
- **도메인 모델과 타입 정의**
- **기본적인 CRUD 읽기 작업**
- **데이터 변환 로직**

### ❌ 담당하지 않는 것
- 상태 변경 작업 (POST, PUT, DELETE)
- 사용자 인터랙션 로직
- 비즈니스 프로세스
- 복합적인 상태 관리

## 📁 폴더 구조

```
entities/projects/
├── api/              # 읽기 전용 API 함수들
│   ├── getProjectApplicationsApi.ts
│   ├── getProjectLikeApi.ts
│   └── projectsApi.ts
├── hooks/            # 데이터 조회용 커스텀 훅
│   ├── useGetProjects.ts
│   └── useProjectsByIds.ts
├── queries/          # React Query 조회 훅들
│   ├── useGetProjectApplications.ts
│   ├── useGetProjectLike.ts
│   ├── useProjectList.ts
│   ├── useProjectsItem.ts
│   └── useProjectsTotalCount.ts
├── types/            # 도메인 타입 정의
│   └── firebase.ts
└── ui/               # 순수한 UI 컴포넌트들 (presentation only)
    ├── liked-projects/
    ├── post-info/
    ├── project-collection-tab/
    ├── project-insert/
    ├── projects-card/
    ├── projects-detail/
    └── projects-stats/
```

## 🔗 사용법

```typescript
// ✅ 올바른 사용 - 데이터 조회
import { getProjectItem } from "@entities/projects/api/projectsApi";
import { useGetProjectLike } from "@entities/projects/queries/useGetProjectLike";

// ❌ 잘못된 사용 - 상태 변경은 features에서
// import { createProject } from "@entities/projects/..."; // 이런 건 없어야 함
``` 