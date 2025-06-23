# 📊 Entities Layer

**데이터 조회와 표시를 담당하는 레이어**

Entities 레이어는 **Read 로직**에 특화된 계층으로, 데이터를 조회하고 표시하는 역할을 담당합니다.

## 🎯 역할과 책임

### 주요 기능
- 📋 **데이터 조회**: API로부터 데이터 패칭
- 🎨 **데이터 표시**: UI 컴포넌트로 데이터 렌더링
- 🔄 **데이터 캐싱**: React Query를 통한 효율적인 캐싱
- 📊 **상태 관리**: 읽기 전용 상태 관리

### Features vs Entities 구분
| **Features (CUD)** | **Entities (Read)** |
|-------------------|---------------------|
| 데이터 변경 | 데이터 표시 |
| `useMutation` | `useQuery` |
| 폼 제출, 버튼 클릭 | 데이터 조회, 렌더링 |
| LoginForm, DeleteButton | UserCard, PostList |

## 📁 폴더 구조

각 도메인 엔티티는 다음 구조를 따릅니다:

```
entities/
├── user/                 # 사용자 도메인
│   ├── api/             # API 요청 로직
│   │   └── userApi.ts
│   ├── hooks/           # 커스텀 훅
│   │   └── useUser.ts
│   ├── queries/         # React Query 설정
│   │   └── userQueries.ts
│   ├── types/           # TypeScript 타입
│   │   └── User.ts
│   ├── ui/              # UI 컴포넌트
│   │   ├── UserCard.tsx
│   │   ├── UserProfile.tsx
│   │   └── UserList.tsx
│   ├── libs/            # 유틸리티 함수
│   │   └── userUtils.ts
│   └── index.ts         # 외부 노출 인터페이스
├── post/                # 게시물 도메인
│   ├── api/
│   ├── hooks/
│   ├── queries/
│   ├── types/
│   ├── ui/
│   ├── libs/
│   └── index.ts
└── README.md           # 이 파일
```

## 🔧 개발 가이드

### 1. API 요청 로직 (`api/`)

```typescript
// entities/user/api/userApi.ts
import { apiClient } from '@shared/api';
import type { User } from '../types/User';

export const userApi = {
  getUser: async (id: string): Promise<User> => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('/users');
    return response.data;
  },
};
```

### 2. React Query 설정 (`queries/`)

```typescript
// entities/user/queries/userQueries.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import type { User } from '../types/User';

export const useUser = (id: string): UseQueryResult<User, Error> => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
  });
};

export const useUsers = (): UseQueryResult<User[], Error> => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.getUsers,
  });
};
```

### 3. 커스텀 훅 (`hooks/`)

```typescript
// entities/user/hooks/useUser.ts
import { useUser as useUserQuery } from '../queries/userQueries';
import type { User } from '../types/User';

export const useUser = (id: string) => {
  const query = useUserQuery(id);
  
  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};
```

### 4. UI 컴포넌트 (`ui/`)

```typescript
// entities/user/ui/UserCard.tsx
import { useUser } from '../hooks/useUser';
import type { User } from '../types/User';

interface UserCardProps {
  userId: string;
}

const UserCard = ({ userId }: UserCardProps): JSX.Element => {
  const { user, isLoading, isError } = useUser(userId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다</div>;

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

export { UserCard };
```

### 5. 타입 정의 (`types/`)

```typescript
// entities/user/types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreview {
  id: string;
  name: string;
  avatar?: string;
}
```

### 6. 외부 노출 인터페이스 (`index.ts`)

```typescript
// entities/user/index.ts
// UI 컴포넌트
export { UserCard } from './ui/UserCard';
export { UserProfile } from './ui/UserProfile';
export { UserList } from './ui/UserList';

// 훅
export { useUser } from './hooks/useUser';

// 타입
export type { User, UserPreview } from './types/User';

// API (필요한 경우에만)
export { userApi } from './api/userApi';
```

## 🎯 베스트 프랙티스

### 1. 데이터 조회 최적화
- React Query의 캐싱 활용
- 적절한 `staleTime` 설정
- 데이터 의존성 관리 (`enabled` 옵션)

### 2. 컴포넌트 설계
- 단일 책임 원칙 준수
- 로딩/에러 상태 처리
- 명시적 반환 타입 ([JSX.Element 사용][[memory:7559751984028653409]])

### 3. 타입 안전성
- 모든 API 응답에 타입 정의
- 선택적 프로퍼티 명시
- 유니온 타입 활용

### 4. 성능 고려사항
- 불필요한 리렌더링 방지
- 메모이제이션 적절히 활용
- 지연 로딩 고려

## 🔗 의존성 규칙

Entities는 **Shared 레이어만** 참조할 수 있습니다:

```typescript
// ✅ 허용
import { Button } from '@shared/ui';
import { formatDate } from '@shared/libs';
import { apiClient } from '@shared/api';

// ❌ 금지 - 상위 레이어 참조
import { LoginForm } from '@features/auth'; // Features
import { Header } from '@widgets/header';   // Widgets
import { HomePage } from '@pages/home';     // Pages

// ❌ 금지 - 같은 레이어 다른 모듈 참조
import { PostCard } from '@entities/post';  // 다른 Entity
```

## 📝 명명 규칙

- **폴더명**: kebab-case (`user-profile`, `product-list`)
- **파일명**: PascalCase (`UserCard.tsx`, `ProductList.tsx`)
- **컴포넌트명**: PascalCase + 명시적 반환 타입
- **훅명**: `use` 접두사 + camelCase (`useUser`, `useProductList`)
- **타입명**: PascalCase (`User`, `Product`)

## 🚀 시작하기

새로운 엔티티를 추가할 때:

1. **도메인 폴더 생성**: `entities/domain-name/`
2. **기본 구조 설정**: `api/`, `hooks/`, `queries/`, `types/`, `ui/`, `index.ts`
3. **타입 정의**: 먼저 타입부터 정의
4. **API 레이어**: API 요청 함수 작성
5. **Query 레이어**: React Query 훅 작성
6. **UI 컴포넌트**: 데이터 표시 컴포넌트 작성
7. **Public API**: `index.ts`에서 외부 노출 인터페이스 정의

---

💡 **참고**: Entities는 **읽기 전용**입니다. 데이터 변경이 필요한 경우 Features 레이어를 사용해 주세요! 