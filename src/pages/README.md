# Pages Layer

라우팅과 연결되는 페이지 컴포넌트를 관리하는 계층입니다.

## 📁 구조

```
pages/
├── home/
│   ├── ui/
│   │   └── HomePage.tsx
│   └── index.ts
├── login/
│   ├── ui/
│   │   └── LoginPage.tsx
│   └── index.ts
└── profile/
    ├── ui/
    │   └── ProfilePage.tsx
    └── index.ts
```

## 🎯 역할

- **페이지 조합**: Widgets, Features, Entities를 조합하여 완전한 페이지 구성
- **라우팅 연결**: React Router와 연결되는 최상위 컴포넌트
- **페이지별 레이아웃**: 각 페이지의 고유한 레이아웃 정의
- **SEO 설정**: 페이지별 메타데이터 관리

## 📄 폴더별 표준 구조

각 페이지 폴더는 다음 구조를 따릅니다:

```
page-name/
├── ui/           # 페이지 컴포넌트
├── hooks/        # 페이지별 커스텀 훅 (선택적)
├── types/        # 페이지별 타입 정의 (선택적)
└── index.ts      # 외부 노출 인터페이스
```

## 🔧 사용 예시

```typescript
// pages/home/ui/HomePage.tsx
import { UserWidget } from '@widgets/user';
import { PostList } from '@features/post';
import { Header } from '@shared/ui';

const HomePage = (): JSX.Element => {
  return (
    <div>
      <Header />
      <UserWidget />
      <PostList />
    </div>
  );
};

export { HomePage };
```

```typescript
// pages/home/index.ts
export { HomePage } from './ui/HomePage';
```

```typescript
// app/routes/App.tsx에서 사용
import { HomePage } from '@pages/home';

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
};
```

## 📋 개발 가이드라인

### 1. 페이지 명명 규칙
- 폴더명: kebab-case (예: `user-profile`, `post-detail`)
- 컴포넌트명: PascalCase + Page 접미사 (예: `UserProfilePage`)

### 2. 페이지 책임
- **조합만 담당**: 비즈니스 로직은 Features에 위임
- **레이아웃 정의**: 페이지의 전체적인 구조만 관리
- **라우팅 파라미터**: URL 파라미터 처리

### 3. 의존성 규칙
- Widgets, Features, Entities, Shared 계층 참조 가능
- 다른 Pages는 직접 참조 금지
- App 계층 참조 금지

## ⚠️ 주의사항

- 페이지는 단순히 컴포넌트를 조합하는 역할만 수행합니다
- 복잡한 비즈니스 로직은 Features 계층으로 분리하세요
- 페이지 간 상태 공유가 필요하면 Shared 계층을 활용하세요 