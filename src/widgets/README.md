# Widgets Layer

여러 Features를 조합하여 완성된 기능 블록을 제공하는 계층입니다.

## 📁 구조

```
widgets/
├── header/
│   ├── ui/
│   │   └── Header.tsx
│   ├── hooks/
│   │   └── useHeaderData.ts
│   └── index.ts
├── sidebar/
│   ├── ui/
│   │   └── Sidebar.tsx
│   └── index.ts
└── user-dashboard/
    ├── ui/
    │   └── UserDashboard.tsx
    ├── types/
    │   └── Dashboard.ts
    └── index.ts
```

## 🎯 역할

- **기능 조합**: 여러 Features와 Entities를 조합하여 완성된 UI 블록 생성
- **독립적 위젯**: 재사용 가능한 복합 컴포넌트
- **레이아웃 컴포넌트**: 헤더, 사이드바, 푸터 등 레이아웃 요소
- **대시보드**: 여러 정보를 종합한 종합 화면

## 📄 폴더별 표준 구조

각 위젯 폴더는 다음 구조를 따릅니다:

```
widget-name/
├── header/         
├── aside/       
├── footer/    
├── layout/       
```

## 🔧 사용 예시

```typescript
// widgets/header/ui/Header.tsx
import { UserProfile } from '@entities/user';
import { NotificationButton } from '@features/notification';
import { SearchBar } from '@features/search';
import { Logo } from '@shared/ui';

const Header = (): JSX.Element => {
  return (
    <header className="header">
      <Logo />
      <SearchBar />
      <div className="header-actions">
        <NotificationButton />
        <UserProfile />
      </div>
    </header>
  );
};

export { Header };
```

```typescript
// widgets/user-dashboard/ui/UserDashboard.tsx
import { UserStats } from '@entities/user';
import { RecentActivity } from '@entities/activity';
import { QuickActions } from '@features/user-actions';

const UserDashboard = (): JSX.Element => {
  return (
    <div className="dashboard">
      <UserStats />
      <RecentActivity />
      <QuickActions />
    </div>
  );
};

export { UserDashboard };
```

```typescript
// widgets/header/index.ts
export { Header } from './ui/Header';
export type { HeaderProps } from './types/Header';
```

## 📋 개발 가이드라인

### 1. 위젯 명명 규칙
- 폴더명: kebab-case (예: `user-dashboard`, `navigation-menu`)
- 컴포넌트명: PascalCase (예: `UserDashboard`, `NavigationMenu`)

### 2. 위젯 특징
- **독립성**: 다른 위젯에 의존하지 않고 독립적으로 동작
- **재사용성**: 여러 페이지에서 재사용 가능
- **완성도**: 사용자에게 완전한 기능을 제공

### 3. 조합 원칙
- Features의 액션과 Entities의 데이터를 조합
- 복잡한 비즈니스 로직은 Features에 위임
- UI 조합에만 집중

### 4. 의존성 규칙
- Features, Entities, Shared 계층 참조 가능
- 다른 Widgets 직접 참조 금지
- Pages, App 계층 참조 금지

## 🎨 위젯 유형별 예시

### 레이아웃 위젯
```typescript
// 헤더, 사이드바, 푸터 등
const Header = (): JSX.Element => {
  return (
    <header>
      {/* Features와 Entities 조합 */}
    </header>
  );
};
```

### 대시보드 위젯
```typescript
// 여러 정보를 종합한 대시보드
const AdminDashboard = (): JSX.Element => {
  return (
    <div className="dashboard-grid">
      {/* 여러 통계와 차트 조합 */}
    </div>
  );
};
```

### 기능 위젯
```typescript
// 완성된 기능 단위
const CommentSection = (): JSX.Element => {
  return (
    <section>
      {/* 댓글 목록 + 댓글 작성 기능 조합 */}
    </section>
  );
};
```

## ⚠️ 주의사항

- 위젯은 완성된 기능 블록이므로 Pages에서 바로 사용 가능해야 합니다
- 다른 위젯과의 직접적인 의존성은 피하세요
- 위젯 내부에서 복잡한 상태 관리가 필요하면 Features로 분리를 고려하세요 