# App Layer

> 🏛️ **애플리케이션의 최상위 계층** - 전체 앱의 설정과 초기화를 담당

## 📖 개요

App Layer는 **FSD 아키텍처의 최상위 계층**으로, 애플리케이션 전체의 설정과 초기화를 담당합니다. 다른 모든 계층들이 올바르게 작동할 수 있는 환경을 제공합니다.

## 📁 디렉토리 구조

```
src/app/
├── configs/                # 🔧 앱 전체 설정
│   └── vite-env.d.ts      # Vite 환경 변수 타입 정의
├── entry/                  # 🚀 앱 진입점
│   └── main.tsx           # React 앱 최초 마운트
├── routes/                 # 🛣️ 라우팅 설정
│   ├── App.tsx            # 최상위 앱 컴포넌트
│   ├── AuthLayout.tsx     # 인증 관련 레이아웃
│   ├── MainLayout.tsx     # 메인 앱 레이아웃
│   └── PrivateRoute.tsx   # 인증 가드
└── styles/                 # 🎨 글로벌 스타일
    ├── fonts/             # 웹폰트 (Pretendard)
    ├── global.css         # CSS 리셋 & 전역 스타일
    └── theme.ts           # MUI 테마 설정
```

## 🎯 주요 책임

### 1. 앱 진입점 관리 (`entry/`)
- **React 앱 초기화**: DOM 마운트 및 최초 렌더링
- **StrictMode 설정**: 개발 환경에서 잠재적 문제 감지
- **Global Provider 설정**: React Query, Router, Theme Provider

### 2. 라우팅 시스템 (`routes/`)
- **라우트 정의**: 8개 주요 페이지 라우팅
- **인증 가드**: 로그인 필요 페이지 보호
- **레이아웃 관리**: 인증/비인증 사용자별 레이아웃
- **중첩 라우팅**: 계층적 URL 구조

### 3. 글로벌 스타일 (`styles/`)
- **CSS 변수**: 색상, 폰트, 간격 등 디자인 토큰
- **웹폰트 관리**: Pretendard 폰트 최적화 로딩
- **MUI 테마**: Material-UI 커스텀 테마 정의
- **반응형 브레이크포인트**: 모바일 퍼스트 디자인

### 4. 환경 설정 (`configs/`)
- **환경 변수**: Firebase, EmailJS 등 외부 서비스 설정
- **타입 정의**: Vite 관련 환경 변수 타입 안전성
- **빌드 설정**: 배포 환경별 설정 분리

## 🏗 아키텍처 역할

### 계층 의존성 관리
App Layer는 **모든 하위 계층을 통합**하여 완전한 애플리케이션을 구성합니다.

- **Pages** → UI 라우팅 연결
- **Widgets** → 공통 레이아웃 컴포넌트 배치
- **Features** → 전역 기능 초기화
- **Entities** → 데이터 계층 설정
- **Shared** → 공통 설정 및 유틸리티

### 전역 상태 관리
- **React Query**: 서버 상태 관리 및 캐싱 설정
- **Zustand**: 클라이언트 상태 관리 초기화
- **Firebase**: 인증 및 데이터베이스 연결 설정

### 라우팅 전략
- **React Router v6**: 선언적 라우팅
- **Lazy Loading**: 페이지별 코드 스플리팅
- **Protected Routes**: 인증 기반 접근 제어
- **Error Boundaries**: 라우트 레벨 에러 처리

## ⚡ 성능 최적화

### 초기 로딩 최적화
- **폰트 preload**: 중요 폰트 우선 로딩
- **Critical CSS**: 중요 스타일 인라인 처리
- **Resource Hints**: DNS prefetch, preconnect 설정

### 번들 최적화
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Code Splitting**: 라우트별 청크 분할
- **Dynamic Import**: 필요 시점 모듈 로딩

## 🔒 보안 고려사항

### 환경 변수 관리
- **민감 정보 보호**: API 키 등 환경 변수 분리
- **런타임 검증**: 필수 환경 변수 존재 여부 확인
- **타입 안전성**: 환경 변수 타입 정의 및 검증

### 인증 보안
- **토큰 관리**: Firebase Auth 토큰 자동 갱신
- **세션 보안**: 안전한 세션 관리
- **CSRF 보호**: 크로스 사이트 요청 위조 방지

## 📊 성능 모니터링

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: 최대 콘텐츠 렌더링 시간
- **FID (First Input Delay)**: 첫 번째 입력 지연 시간
- **CLS (Cumulative Layout Shift)**: 누적 레이아웃 이동

### 사용자 경험 메트릭
- **TTFB (Time to First Byte)**: 첫 바이트까지의 시간
- **FCP (First Contentful Paint)**: 첫 콘텐츠 렌더링 시간
- **TTI (Time to Interactive)**: 상호작용 가능 시점

## 🚀 배포 설정

### Vercel 최적화
- **Build Settings**: 빌드 명령어 및 출력 디렉토리
- **Environment Variables**: 배포 환경별 변수 설정
- **Headers Configuration**: 보안 헤더 및 캐싱 정책

### 환경별 배포
- **Production**: `main` 브랜치 → 프로덕션 도메인
- **Staging**: `develop` 브랜치 → 스테이징 도메인
- **Preview**: PR 브랜치 → 미리보기 URL

## 🎯 개발 가이드라인

### App Layer 수정 시 주의사항
1. **전역 영향도**: 모든 페이지에 영향을 미침
2. **성능 고려**: 초기 로딩 성능에 직접 영향
3. **의존성 순환**: 하위 계층 참조 금지
4. **브레이킹 체인지**: 다른 개발자와 사전 논의 필요

### 새로운 글로벌 설정 추가 시
1. **configs/** 디렉토리에 설정 파일 생성
2. **main.tsx**에서 Provider 래핑
3. **타입 정의** 추가 (vite-env.d.ts)
4. **문서화** 및 팀 공유

---

## 📚 관련 문서

- [🏗 FSD 아키텍처 가이드](../../docs/FSD_ARCHITECTURE.md)
- [🎨 디자인 시스템](./styles/README.md)
- [🛣️ 라우팅 가이드](./routes/README.md)

---

💡 **개발 팁**: App Layer는 **앱의 뼈대**입니다. 변경 시 모든 하위 계층에 영향을 미치므로 신중하게 접근하세요! 