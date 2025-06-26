# 🚀 App Layer

**앱 전체 설정 및 초기화를 담당하는 레이어**

App 레이어는 애플리케이션의 진입점과 전역 설정을 관리합니다.

## 📁 폴더 구조

```
app/
├── entry/               # 앱 진입점
│   └── main.tsx        # React 애플리케이션 마운트
├── routes/             # 라우팅 설정
│   └── App.tsx        # 메인 앱 컴포넌트, 라우터 설정
├── styles/            # 전역 스타일
│   └── App.css       # 글로벌 CSS
├── configs/           # 앱 설정
│   └── vite-env.d.ts # Vite 환경 타입 정의
├── index.html         # HTML 템플릿
└── README.md         # 이 파일
```

## 🛣️ 라우터 설정 (React Router v7)

### 레이지 로딩 구현

성능 최적화를 위해 모든 페이지 컴포넌트에 레이지 로딩을 적용했습니다:

```typescript
// app/routes/App.tsx
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@shared/ui";

// 동적 임포트로 번들 분할
const HomePage = lazy(() => import("@pages/home/ui/HomePage"));
const ProjectDetailPage = lazy(() => import("@pages/project-detail/ui/ProjectDetailPage"));
const NotFoundPage = lazy(() => import("@pages/not-found/ui/NotFoundPage"));

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 📈 레이지 로딩의 장점

1. **초기 번들 크기 감소**: 첫 페이지 로드 시 필요한 코드만 다운로드
2. **빠른 초기 로딩**: 사용자가 접근하지 않는 페이지는 로드하지 않음
3. **자동 코드 스플리팅**: Vite가 자동으로 청크를 분할
4. **네트워크 효율성**: 필요할 때만 리소스 다운로드

### 🔧 라우트 설정 규칙

#### 1. 페이지 컴포넌트 요구사항
```typescript
// ✅ 올바른 방법 - default export 사용
const HomePage = (): JSX.Element => {
  return <div>홈 페이지</div>;
};

export default HomePage;

// ❌ 잘못된 방법 - named export는 레이지 로딩에서 사용 불가
export { HomePage };
```

#### 2. 라우트 패턴
```typescript
// 기본 라우트
<Route path="/" element={<HomePage />} />

// 동적 라우트
<Route path="/user/:id" element={<UserDetailPage />} />

// 중첩 라우트
<Route path="/dashboard/*" element={<DashboardLayout />} />

// 404 페이지 (반드시 마지막에 위치)
<Route path="*" element={<NotFoundPage />} />
```

#### 3. 네비게이션 가드
```typescript
// 인증이 필요한 페이지의 경우
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  } 
/>
```

## 🎨 로딩 상태 관리

### LoadingSpinner 컴포넌트
레이지 로딩 중 표시되는 로딩 스피너:

```typescript
// shared/ui/LoadingSpinner.tsx
const LoadingSpinner = (): JSX.Element => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <div className="spinner" />
      <span>페이지를 로딩 중입니다...</span>
    </div>
  );
};
```

### 에러 바운더리
추후 추가 예정:
```typescript
// app/components/ErrorBoundary.tsx
class ErrorBoundary extends Component {
  // 레이지 로딩 실패 시 에러 처리
}
```

## 🔗 의존성 규칙

App 레이어는 **모든 레이어**를 참조할 수 있습니다:

```typescript
// ✅ 허용 - 모든 레이어 참조 가능
import { HomePage } from '@pages/home';       // Pages
import { Navigation } from '@widgets/navigation'; // Widgets  
import { LoginForm } from '@features/auth';   // Features
import { UserCard } from '@entities/user';    // Entities
import { Button } from '@shared/ui';          // Shared
```

## 📝 진입점 설정

### main.tsx
React 애플리케이션의 진입점:

```typescript
// app/entry/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@app/routes/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

### 전역 프로바이더 설정
추후 추가될 프로바이더들:

```typescript
// React Query, 테마, 다국어 등
function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {/* 라우터 설정 */}
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
```

## 🚀 성능 최적화

### 1. 프리로딩
중요한 페이지는 미리 로드:
```typescript
// 마우스 오버 시 프리로드
const handleMouseEnter = () => {
  import('@pages/about/ui/AboutPage');
};
```

### 2. 번들 분석
빌드 후 번들 크기 확인:
```bash
pnpm build
pnpm preview
```

### 3. 라우트 우선순위
자주 사용되는 라우트를 먼저 정의:
```typescript
<Routes>
  <Route path="/" element={<HomePage />} />        {/* 가장 많이 사용 */}
  <Route path="/dashboard" element={<Dashboard />} /> {/* 두 번째로 많이 사용 */}
  <Route path="/settings" element={<Settings />} />  {/* 가끔 사용 */}
  <Route path="*" element={<NotFoundPage />} />     {/* 404는 항상 마지막 */}
</Routes>
```

---

💡 **참고**: 새로운 페이지를 추가할 때는 반드시 레이지 로딩을 적용하고 default export를 사용해 주세요! 