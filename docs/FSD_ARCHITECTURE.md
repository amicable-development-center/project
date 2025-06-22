# Feature-Sliced Design (FSD) 아키텍처

이 프로젝트는 Feature-Sliced Design 아키텍처를 따르며, **Features(CUD)와 Entities(Read)** 구분법을 적용합니다.

## 📁 폴더 구조

```
src/
├── app/           # 🚀 앱 초기화 (진입점, 전역 설정)
├── pages/         # 📄 페이지 (라우팅, 페이지 컴포넌트)
├── widgets/       # 🧩 복합 UI 블록들 (header, aside, footer, layout)
├── features/      # 💼 CUD 로직 (Create, Update, Delete)
├── entities/      # 📊 Read 로직 (조회, 표시)
└── shared/        # 🔧 공유 리소스 (UI 키트, 유틸, API 등)
```

## 🔗 레이어 간 의존성 규칙

```
App ← Pages ← Widgets ← Features ← Entities ← Shared
```

**상위 계층만 하위 계층을 참조할 수 있습니다:**

- **App**: 모든 계층 참조 가능
- **Pages**: Widgets, Features, Entities, Shared 참조 가능
- **Widgets**: Features, Entities, Shared 참조 가능
- **Features**: Entities, Shared만 참조 가능
- **Entities**: Shared만 참조 가능
- **Shared**: 외부 라이브러리만 참조 가능

## 📦 Path Alias 설정

절대 경로를 사용하여 임포트합니다:

```typescript
// ✅ 올바른 방법 (Path Alias 사용)
import { Button } from "@shared/ui";
import { UserCard } from "@entities/user";
import { LoginForm } from "@features/auth";
import { Header } from "@widgets/header";
import { HomePage } from "@pages/home";
import { App } from "@app/routes/App";

// ❌ 잘못된 방법 (상대 경로)
import { Button } from "../../../shared/ui";
import { UserCard } from "../../entities/user";
```

**설정된 Path Alias:**
- `@app/*` → `./src/app/*`
- `@pages/*` → `./src/pages/*`
- `@widgets/*` → `./src/widgets/*`
- `@features/*` → `./src/features/*`
- `@entities/*` → `./src/entities/*`
- `@shared/*` → `./src/shared/*`

## 🏗️ 각 레이어의 역할

### 📱 App Layer
**앱 전체 설정 및 초기화**

```typescript
// app/entry/main.tsx - 앱 진입점
// app/routes/App.tsx - 라우팅 설정
// app/styles/App.css - 글로벌 스타일
// app/configs/ - 환경 설정
```

### 📄 Pages Layer
**라우팅과 연결되는 페이지 컴포넌트**

```typescript
// pages/home/ui/HomePage.tsx
import { UserWidget } from '@widgets/user';
import { PostList } from '@features/post';

const HomePage = (): JSX.Element => {
  return (
    <div>
      <UserWidget />
      <PostList />
    </div>
  );
};
```

### 🧩 Widgets Layer
**복합 UI 블록 (Features + Entities 조합)**

현재 프로젝트의 주요 위젯들:
- **header**: 앱 상단 헤더
- **aside**: 사이드바 네비게이션  
- **footer**: 앱 하단 푸터
- **layout**: 페이지 레이아웃 컴포넌트

```typescript
// widgets/header/ui/Header.tsx
import { UserProfile } from '@entities/user';
import { NotificationButton } from '@features/notification';

const Header = (): JSX.Element => {
  return (
    <header>
      <NotificationButton />
      <UserProfile />
    </header>
  );
};
```

### 💼 Features Layer
**CUD (Create, Update, Delete) 로직 담당**

사용자 액션과 상태 변경을 처리:

```typescript
// features/auth/ui/LoginForm.tsx - 로그인 폼
// features/post/ui/CreatePostForm.tsx - 게시물 생성
// features/comment/ui/DeleteCommentButton.tsx - 댓글 삭제

// 예시: 로그인 Feature
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      // 로그인 성공 처리
    },
  });
};
```

### 📊 Entities Layer
**Read (조회) 로직 담당**

데이터 조회와 표시를 처리:

```typescript
// entities/user/ui/UserCard.tsx - 사용자 카드
// entities/post/ui/PostList.tsx - 게시물 목록
// entities/comment/ui/CommentItem.tsx - 댓글 아이템

// 예시: 사용자 Entity
import { useQuery } from '@tanstack/react-query';

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUser(id),
  });
};
```

### 🔧 Shared Layer
**공통 리소스**

```typescript
// shared/ui/ - 기본 UI 컴포넌트 (Button, Input, Modal)
// shared/libs/ - 유틸리티 함수
// shared/hooks/ - 공통 커스텀 훅  
// shared/types/ - 공통 타입 정의
// shared/constants/ - 상수값
```

## 🎭 Features vs Entities 구분법

| 구분 | **Features (CUD)** | **Entities (Read)** |
|------|-------------------|---------------------|
| **목적** | 데이터 변경 | 데이터 표시 |
| **액션** | 폼 제출, 버튼 클릭 | 데이터 조회, 렌더링 |
| **React Query** | `useMutation` | `useQuery` |
| **상태** | 로딩, 에러, 성공 | 읽기 전용 |
| **예시** | LoginForm, DeleteButton | UserCard, PostList |

## 📂 폴더별 표준 구조

각 도메인 폴더는 다음 구조를 따릅니다:

```
domain-name/
├── api/          # API 요청 로직
├── hooks/        # 커스텀 훅
├── queries/      # React Query 설정
├── types/        # TypeScript 타입 정의
├── ui/           # UI 컴포넌트
├── libs/         # 유틸리티 함수
└── index.ts      # 외부 노출 인터페이스
```

## 📝 명명 규칙

- **폴더명**: kebab-case (`user-profile`, `post-editor`)
- **파일명**: PascalCase (`UserProfile.tsx`, `PostEditor.ts`)
- **컴포넌트명**: PascalCase + 명시적 반환 타입
- **상수명**: UPPER_SNAKE_CASE (`API_BASE_URL`)

```typescript
// ✅ 올바른 컴포넌트 작성법
const UserProfile = (): JSX.Element => {
  return <div>User Profile</div>;
};

// ❌ 잘못된 방법 (React.FC 사용)
const UserProfile: React.FC = () => {
  return <div>User Profile</div>;
};
```

## 🎯 ESLint 규칙 적용

프로젝트에 FSD 아키텍처 규칙이 ESLint로 강제됩니다:

1. **계층별 참조 제한**: 하위 계층이 상위 계층 참조 시 에러
2. **모듈간 참조 금지**: 같은 계층 내 다른 모듈 직접 참조 금지
3. **명시적 반환 타입**: 모든 함수에 반환 타입 명시 필수

## 🔧 개발 도구 설정

### Path Alias 설정 파일들:
- `tsconfig.app.json` - TypeScript 컴파일러
- `vite.config.ts` - Vite 빌드 도구  
- `eslint.config.mjs` - ESLint 린터

### Git Hooks:
- **Pre-commit**: ESLint 자동 수정 + Prettier 포매팅
- **Commit-msg**: Conventional Commits 컨벤션 체크

## 🎯 베스트 프랙티스

### 1. 의존성 관리
- 단방향 의존성 유지
- 순환 참조 방지
- Public API(`index.ts`) 활용

### 2. 코드 조직
- 관련 코드는 같은 슬라이스에 배치
- CUD는 Features, Read는 Entities
- 공통 로직은 Shared에 배치

### 3. 컴포넌트 설계
- 단일 책임 원칙 준수
- 재사용 가능한 구조
- 타입 안전성 보장

### 4. 성능 최적화
- React Query로 데이터 캐싱
- 컴포넌트 분할로 리렌더링 최소화
- 지연 로딩 적용

---

💡 **개발 시 주의사항**: FSD 아키텍처 규칙을 위반하면 ESLint 에러가 발생합니다. 의존성 규칙을 준수하여 개발해 주세요!
