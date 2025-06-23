# Features Layer

**CUD (Create, Update, Delete) 로직**을 담당하는 기능 중심 계층입니다.

## 🎯 핵심 개념

Features는 **사용자의 액션과 상태 변경**을 담당합니다:
- ✅ **Create**: 새로운 데이터 생성
- ✅ **Update**: 기존 데이터 수정  
- ✅ **Delete**: 데이터 삭제
- ❌ **Read**: 읽기 전용 로직은 Entities에서 담당

## 📁 구조

```
features/
├── auth/
│   ├── api/
│   │   └── authApi.ts
│   ├── hooks/
│   │   └── useLogin.ts
│   ├── queries/    
│   │   └── authQueries.ts
│   ├── types/
│   │   └── Auth.ts
│   ├── ui/
│   │   ├── LoginForm.tsx
│   │   └── LogoutButton.tsx
│   ├── libs/
│   │   └── authValidation.ts
│   └── index.ts
├── post/
│   ├── api/
│   │   └── postApi.ts
│   ├── hooks/
│   │   └── useCreatePost.ts
│   ├── ui/
│   │   ├── CreatePostForm.tsx
│   │   └── EditPostForm.tsx
│   └── index.ts
└── comment/
    ├── hooks/
    │   ├── useCreateComment.ts
    │   └── useDeleteComment.ts
    ├── ui/
    │   ├── CommentForm.tsx
    │   └── DeleteCommentButton.tsx
    └── index.ts
```

## 📄 폴더별 표준 구조

각 Feature는 다음과 같은 표준 구조를 따릅니다:

```
feature-name/
├── api/          # API 요청 로직 (mutation)
├── hooks/        # 커스텀 훅 (액션 중심)
├── queries/      # React Query Mutations
├── types/        # TypeScript 타입 정의
├── ui/           # UI 컴포넌트 (폼, 버튼 등)
├── libs/         # 유틸리티 함수
└── index.ts      # 외부 노출 인터페이스
```

## 🔧 사용 예시

### 1. 인증 Feature (auth)

```typescript
// features/auth/api/authApi.ts
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return response.json();
  },
  
  logout: async (): Promise<void> => {
    await fetch('/api/auth/logout', { method: 'POST' });
  },
};
```

```typescript
// features/auth/hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (user) => {
      // 로그인 성공 처리
      localStorage.setItem('token', user.token);
    },
    onError: (error) => {
      // 에러 처리
      console.error('Login failed:', error);
    },
  });
};
```

```typescript
// features/auth/ui/LoginForm.tsx
import { useLogin } from '../hooks/useLogin';

const LoginForm = (): JSX.Element => {
  const loginMutation = useLogin();
  
  const handleSubmit = (formData: LoginCredentials) => {
    loginMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 구현 */}
      <button 
        type="submit" 
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? '로그인 중...' : '로그인'}
      </button>
    </form>
  );
};

export { LoginForm };
```

### 2. 게시물 생성 Feature (post)

```typescript
// features/post/hooks/useCreatePost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/postApi';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: postApi.create,
    onSuccess: () => {
      // 캐시 무효화하여 목록 새로고침
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};
```

```typescript
// features/post/ui/CreatePostForm.tsx
import { useCreatePost } from '../hooks/useCreatePost';

const CreatePostForm = (): JSX.Element => {
  const createPostMutation = useCreatePost();
  
  const handleSubmit = (postData: CreatePostRequest) => {
    createPostMutation.mutate(postData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 게시물 생성 폼 */}
    </form>
  );
};

export { CreatePostForm };
```

### 3. Export 구조

```typescript
// features/auth/index.ts
export { LoginForm } from './ui/LoginForm';
export { LogoutButton } from './ui/LogoutButton';
export { useLogin } from './hooks/useLogin';
export { useLogout } from './hooks/useLogout';
export type { LoginCredentials } from './types/Auth';
```

## 📋 개발 가이드라인

### 1. Features vs Entities 구분

| 구분 | Features (CUD) | Entities (R) |
|------|----------------|--------------|
| **목적** | 데이터 변경 | 데이터 표시 |
| **액션** | 폼 제출, 버튼 클릭 | 데이터 조회, 렌더링 |
| **상태** | 로딩, 에러, 성공 | 읽기 전용 |
| **예시** | 로그인 폼, 삭제 버튰 | 사용자 카드, 목록 |

### 2. 명명 규칙
- 폴더명: kebab-case (예: `user-management`, `post-editor`)
- 컴포넌트명: 액션 중심 (예: `CreateUserForm`, `DeleteButton`)
- 훅명: `use` + 액션 (예: `useCreateUser`, `useDeletePost`)

### 3. React Query 패턴
```typescript
// Mutation 중심 (상태 변경)
const createMutation = useMutation({
  mutationFn: api.create,
  onSuccess: () => {
    queryClient.invalidateQueries(['entities']);
  },
});
```

### 4. 의존성 규칙
- Entities, Shared 계층만 참조 가능
- 다른 Features 직접 참조 금지
- Pages, Widgets, App 계층 참조 금지

## 🚀 Feature 유형별 예시

### 폼 기반 Feature
```typescript
// 사용자 입력을 받는 기능
const UserRegistrationForm = (): JSX.Element => {
  const registerMutation = useRegister();
  // 폼 로직
};
```

### 액션 기반 Feature  
```typescript
// 버튼 클릭으로 실행되는 기능
const DeletePostButton = ({ postId }: Props): JSX.Element => {
  const deleteMutation = useDeletePost();
  // 삭제 로직
};
```

### 복합 Feature
```typescript
// 여러 액션을 포함하는 기능
const PostEditor = (): JSX.Element => {
  const saveMutation = useSavePost();
  const publishMutation = usePublishPost();
  // 편집기 로직
};
```

## ⚠️ 주의사항

- **읽기 전용 로직은 Entities로**: 데이터 조회/표시는 Features에 포함하지 마세요
- **단일 책임 원칙**: 하나의 Feature는 하나의 주요 액션을 담당해야 합니다
- **상태 관리**: 복잡한 상태는 React Query나 Context를 활용하세요
- **에러 처리**: 모든 mutation에 적절한 에러 처리를 포함하세요 