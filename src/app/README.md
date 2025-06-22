# App Layer

앱 전체 설정 및 초기화를 담당하는 최상위 계층입니다.

## 📁 구조

```
app/
├── configs/      # 환경 설정 파일
├── entry/        # 앱 진입점 (main.tsx)
├── routes/       # 라우팅 설정
├── styles/       # 글로벌 스타일
└── index.html    # HTML 템플릿
```

## 🎯 역할

- **앱 초기화**: React 앱의 진입점과 초기 설정
- **글로벌 프로바이더**: Context, Router, Query Client 등 설정
- **라우팅**: 페이지 간 네비게이션 관리
- **글로벌 스타일**: 앱 전체에 적용되는 CSS

## 📄 파일별 설명

### configs/
- `vite-env.d.ts`: Vite 환경 타입 정의

### entry/
- `main.tsx`: React 앱의 진입점, 루트 컴포넌트 렌더링

### routes/
- `App.tsx`: 메인 라우팅 컴포넌트

### styles/
- `App.css`: 글로벌 스타일 정의

## 🔧 사용 예시

```typescript
// entry/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@app/routes/App';
import '@app/styles/App.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## ⚠️ 주의사항

- App 계층은 모든 다른 계층을 참조할 수 있습니다
- 하지만 다른 계층에서는 App을 참조할 수 없습니다
- 글로벌 설정만 담당하며, 비즈니스 로직은 포함하지 않습니다 