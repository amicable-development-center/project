# Entities Layer

**Read (조회) 로직**을 담당하는 도메인 엔티티 계층입니다.

## 🎯 핵심 개념

Entities는 **데이터 조회와 표시**를 담당합니다:
- ✅ **Read**: 데이터 조회 및 표시
- ✅ **Display**: 읽기 전용 UI 컴포넌트
- ✅ **Model**: 비즈니스 도메인 모델
- ❌ **Mutation**: 데이터 변경 로직은 Features에서 담당

## 📁 구조

```
entities/
├── user/
│   ├── api/
│   │   └── userApi.ts
│   ├── hooks/
│   │   └── useUser.ts
│   ├── queries/
│   │   └── userQueries.ts
│   ├── types/
│   │   └── User.ts
│   ├── ui/
│   │   ├── UserCard.tsx
│   │   ├── UserAvatar.tsx
│   │   └── UserList.tsx
│   ├── libs/
│   │   └── userHelpers.ts
│   └── index.ts
├── post/
│   ├── api/
│   │   └── postApi.ts
│   ├── queries/
│   │   └── postQueries.ts
│   ├── types/
│   │   └── Post.ts
│   ├── ui/
│   │   ├── PostCard.tsx
│   │   └── PostList.tsx
│   └── index.ts
└── comment/
    ├── api/
    │   └── commentApi.ts
    ├── ui/
    │   ├── CommentItem.tsx
    │   └── CommentList.tsx
    ├── types/
    │   └── Comment.ts
    └── index.ts
```

## 📄 폴더별 표준 구조

각 Entity는 다음과 같은 표준 구조를 따릅니다:

```
entity-name/
├── api/          # API 요청 로직 (조회 전용)
├── hooks/        # 커스텀 훅 (데이터 페칭)
├── queries/      # React Query 설정
├── types/        # TypeScript 타입 정의
├── ui/           # UI 컴포넌트 (표시 전용)
├── libs/         # 유틸리티 함수
└── index.ts      # 외부 노출 인터페이스
```

## 🔧 사용 예시

### 1. 사용자 Entity (user)

```typescript
// entities/user/types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
}
```

```typescript
// entities/user/api/userApi.ts
export const userApi = {
  getUser: async (id: string): Promise<User> => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  },
  
  getUserList: async (params: UserListParams): Promise<User[]> => {
    const searchParams = new URLSearchParams(params);
    const response = await fetch(`/api/users?${searchParams}`);
    return response.json();
  },
};
```

```typescript
// entities/user/queries/userQueries.ts
import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/userApi';

export const userQueries = {
  user: (id: string) => ({
    queryKey: ['user', id],
    queryFn: () => userApi.getUser(id),
  }),
  
  users: (params: UserListParams) => ({
    queryKey: ['users', params],
    queryFn: () => userApi.getUserList(params),
  }),
};
```

```typescript
// entities/user/hooks/useUser.ts
import { useQuery } from '@tanstack/react-query';
import { userQueries } from '../queries/userQueries';

export const useUser = (id: string) => {
  return useQuery(userQueries.user(id));
};

export const useUserList = (params: UserListParams = {}) => {
  return useQuery(userQueries.users(params));
};
```

```typescript
// entities/user/ui/UserCard.tsx
import { User } from '../types/User';

interface UserCardProps {
  user: User;
  variant?: 'default' | 'compact';
}

const UserCard = ({ user, variant = 'default' }: UserCardProps): JSX.Element => {
  return (
    <div className={`user-card ${variant}`}>
      {user.avatar && (
        <img src={user.avatar} alt={user.name} className="user-avatar" />
      )}
      <div className="user-info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </div>
  );
};

export { UserCard };
```

```typescript
// entities/user/ui/UserList.tsx
import { useUserList } from '../hooks/useUser';
import { UserCard } from './UserCard';

interface UserListProps {
  search?: string;
}

const UserList = ({ search }: UserListProps): JSX.Element => {
  const { data: users, isLoading, error } = useUserList({ search });

  if (isLoading) return <div>사용자 목록을 로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users?.length) return <div>사용자가 없습니다</div>;

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export { UserList };
```

### 2. 게시물 Entity (post)

```typescript
// entities/post/ui/PostCard.tsx
import { Post } from '../types/Post';

interface PostCardProps {
  post: Post;
  showAuthor?: boolean;
}

const PostCard = ({ post, showAuthor = true }: PostCardProps): JSX.Element => {
  return (
    <article className="post-card">
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      {showAuthor && (
        <div className="post-meta">
          <span>작성자: {post.author.name}</span>
          <time>{post.createdAt}</time>
        </div>
      )}
    </article>
  );
};

export { PostCard };
```

### 3. Export 구조

```typescript
// entities/user/index.ts
export { UserCard } from './ui/UserCard';
export { UserList } from './ui/UserList';
export { UserAvatar } from './ui/UserAvatar';
export { useUser, useUserList } from './hooks/useUser';
export type { User, UserListParams } from './types/User';
```

## 📋 개발 가이드라인

### 1. Entities vs Features 구분

| 구분 | Entities (R) | Features (CUD) |
|------|--------------|----------------|
| **목적** | 데이터 표시 | 데이터 변경 |
| **상태** | 읽기 전용 | 로딩, 에러, 성공 |
| **컴포넌트** | 카드, 목록, 상세 | 폼, 버튼, 모달 |
| **React Query** | useQuery | useMutation |
| **예시** | UserCard, PostList | LoginForm, DeleteButton |

### 2. 명명 규칙
- 폴더명: 도메인명 (예: `user`, `post`, `comment`)
- 컴포넌트명: 엔티티 + 용도 (예: `UserCard`, `PostList`)
- 훅명: `use` + 엔티티명 (예: `useUser`, `usePostList`)

### 3. React Query 패턴
```typescript
// Query 중심 (데이터 조회)
const { data, isLoading, error } = useQuery({
  queryKey: ['entity', id],
  queryFn: () => api.get(id),
});
```

### 4. UI 컴포넌트 특징
- **순수 컴포넌트**: props를 받아서 렌더링만 담당
- **재사용성**: 다양한 컨텍스트에서 재사용 가능
- **변형 지원**: variant props로 다양한 스타일 지원

### 5. 의존성 규칙
- Shared 계층만 참조 가능
- 다른 Entities, Features, Widgets, Pages, App 계층 참조 금지
- 단, 같은 Entity 내부는 자유롭게 참조 가능

## 🎨 Entity 유형별 예시

### 데이터 표시 컴포넌트
```typescript
// 단순 데이터 표시
const UserProfile = ({ user }: { user: User }): JSX.Element => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};
```

### 목록 컴포넌트
```typescript
// 데이터 목록 표시
const PostList = (): JSX.Element => {
  const { data: posts } = usePostList();
  
  return (
    <div>
      {posts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
```

### 상세 정보 컴포넌트
```typescript
// 상세 정보 표시
const UserDetail = ({ userId }: { userId: string }): JSX.Element => {
  const { data: user } = useUser(userId);
  
  if (!user) return <div>사용자를 찾을 수 없습니다</div>;
  
  return (
    <div>
      {/* 상세 정보 렌더링 */}
    </div>
  );
};
```

## 🔄 컴포넌트 합성 패턴

```typescript
// 조합 가능한 컴포넌트 설계
const UserCard = ({ user }: { user: User }): JSX.Element => (
  <div className="user-card">
    <UserAvatar user={user} />
    <UserInfo user={user} />
    <UserStats user={user} />
  </div>
);

const UserAvatar = ({ user }: { user: User }): JSX.Element => (
  <img src={user.avatar} alt={user.name} />
);

const UserInfo = ({ user }: { user: User }): JSX.Element => (
  <div>
    <h3>{user.name}</h3>
    <p>{user.email}</p>
  </div>
);
```

## ⚠️ 주의사항

- **읽기 전용**: 데이터 변경 로직은 포함하지 마세요
- **순수성**: 사이드 이펙트 없는 순수 컴포넌트로 작성하세요
- **재사용성**: 다양한 컨텍스트에서 사용할 수 있도록 설계하세요
- **타입 안전성**: 모든 Entity에 명확한 TypeScript 타입을 정의하세요
- **성능**: 불필요한 리렌더링을 방지하는 최적화를 고려하세요 