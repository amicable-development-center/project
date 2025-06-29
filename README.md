# 프로젝트 잼 (Project Jam)

함께 만들어가는 사이드 프로젝트 매칭 플랫폼 🚀

> **"아이디어는 있지만 팀원이 없다?"** 프로젝트 잼에서 완벽한 팀원을 찾아보세요!

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [FSD 아키텍처](#-fsd-아키텍처)
- [개발 환경 설정](#-개발-환경-설정)
- [브랜치 전략 & CI/CD](#-브랜치-전략--cicd)
- [커밋 컨벤션](#-커밋-컨벤션)
- [개발 가이드라인](#-개발-가이드라인)

## 🎯 프로젝트 소개

프로젝트 잼은 **사이드 프로젝트를 함께 진행할 팀원을 찾는 플랫폼**입니다.

### 💡 핵심 가치
- **매칭**: 기술 스택과 관심사가 맞는 개발자 연결
- **협업**: 체계적인 프로젝트 관리와 소통 지원
- **성장**: 실무 경험을 통한 개발 역량 향상

### 🎯 타겟 사용자
- 사이드 프로젝트 아이디어는 있지만 팀원이 필요한 개발자
- 새로운 기술을 배우며 실무 경험을 쌓고 싶은 개발자
- 포트폴리오 프로젝트를 함께 만들고 싶은 개발자

## ✨ 주요 기능

### 🔍 프로젝트 탐색
- **스마트 검색**: 기술 스택, 포지션, 카테고리별 필터링
- **실시간 검색**: 즉석 결과 표시 및 검색 기록 관리
- **페이지네이션**: 부드러운 스크롤과 함께하는 페이지 이동

### 📝 프로젝트 관리
- **4단계 등록**: 직관적인 프로젝트 생성 프로세스
- **상세 정보**: 기술 스택, 일정, 팀 구성, 요구사항 등
- **실시간 수정**: 프로젝트 정보 동적 업데이트

### 👥 팀원 매칭
- **지원 시스템**: 원클릭 프로젝트 지원 및 관리
- **이메일 연동**: EmailJS를 통한 직접 소통 지원
- **프로필 시스템**: 개발자 경력 및 관심사 표시

### 🎨 사용자 경험
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원
- **다크/라이트 테마**: 사용자 선호에 따른 테마 전환
- **접근성**: ARIA 표준 준수 및 키보드 네비게이션

## 🛠 기술 스택

### Frontend Core
- **React 19** - 최신 UI 라이브러리 + Concurrent Features
- **TypeScript 5** - 강타입 시스템으로 안정성 확보
- **Vite** - 초고속 빌드 및 HMR 지원
- **Material-UI (MUI)** - 일관된 디자인 시스템

### State Management & Data Fetching
- **Zustand** - 가볍고 직관적인 상태 관리
- **TanStack Query (React Query)** - 서버 상태 관리 및 캐싱
- **React Hook Form** - 고성능 폼 상태 관리

### Backend & Infrastructure
- **Firebase** - 실시간 데이터베이스 및 인증
  - Authentication (Google, GitHub)
  - Firestore Database
  - Storage
- **EmailJS** - 클라이언트 사이드 이메일 발송
- **Vercel** - 자동 배포 및 호스팅

### Code Quality & DX
- **ESLint + Prettier** - 코드 품질 및 스타일 일관성
- **Husky + lint-staged** - Git Hooks를 통한 자동 검증
- **Commitlint** - 커밋 메시지 컨벤션 강제
- **TypeScript Strict Mode** - 엄격한 타입 검사

### Architecture & Patterns
- **FSD (Feature-Sliced Design)** - 확장 가능한 프로젝트 구조
- **Compound Component Pattern** - 재사용 가능한 UI 컴포넌트
- **Custom Hooks Pattern** - 비즈니스 로직 분리

## 📁 프로젝트 구조

```
src/
├── app/                     # 🏛️ 앱 전체 설정 및 진입점
│   ├── configs/            # 환경 설정 (Vite, Firebase)
│   ├── entry/              # 앱 진입점 (main.tsx)
│   ├── routes/             # 라우팅 설정 (Auth, Layout)
│   └── styles/             # 글로벌 스타일 & 테마
├── widgets/                # 🧩 복합 UI 컴포넌트
│   ├── Header/             # 네비게이션 헤더
│   ├── Footer/             # 푸터
│   ├── hero/               # 메인 히어로 섹션
│   └── BackToHome/         # 홈 이동 버튼
├── pages/                  # 📄 페이지 컴포넌트 (8개)
│   ├── home/               # 메인 홈페이지
│   ├── project-list/       # 프로젝트 목록 & 검색
│   ├── project-detail/     # 프로젝트 상세보기
│   ├── project-insert/     # 프로젝트 등록 (4단계)
│   ├── user-profile/       # 사용자 프로필
│   ├── login/              # 로그인
│   ├── signup/             # 회원가입
│   └── not-found/          # 404 페이지
├── features/               # ⚡ 비즈니스 기능 (CUD 로직)
│   ├── auth/               # 소셜 로그인 & 로그아웃
│   ├── projects/           # 프로젝트 CRUD & 좋아요
│   └── email/              # 이메일 발송 시스템
├── entities/               # 📊 도메인 엔티티 (Read 로직)
│   ├── projects/           # 프로젝트 조회 & 표시
│   ├── search/             # 검색 & 필터링
│   └── user/               # 사용자 정보 표시
└── shared/                 # 🔧 공통 유틸리티
    ├── api/                # API 클라이언트
    ├── hooks/              # 공통 커스텀 훅
    ├── stores/             # Zustand 스토어
    ├── types/              # 공통 타입 정의
    ├── ui/                 # 재사용 UI 컴포넌트
    └── libs/               # 유틸리티 함수
```

### 📊 주요 도메인 모델

- **프로젝트 도메인**: 제목, 설명, 기술스택, 카테고리, 포지션, 일정 등
- **사용자 도메인**: 이름, 이메일, 역할, 경험, 좋아요/지원 프로젝트 등
- **검색 도메인**: 카테고리, 상태, 워크플로우, 포지션, 정렬 기준 등

## 🏗 FSD 아키텍처

### 계층별 역할 및 실제 구현

1. **App Layer** (`src/app/`)
   - 🔧 **설정**: Firebase, React Query, MUI Theme
   - 🛣️ **라우팅**: Private Routes, Auth Guards
   - 🎨 **글로벌 스타일**: CSS Variables, 폰트 설정

2. **Pages Layer** (`src/pages/`)
   - 📄 **페이지 조합**: 8개 주요 페이지
   - 🔗 **라우팅 연결**: URL 파라미터 처리
   - 📱 **레이아웃**: 페이지별 고유 레이아웃

3. **Widgets Layer** (`src/widgets/`)
   - 🧩 **복합 컴포넌트**: Header, Footer, Hero
   - 📦 **재사용 섹션**: 여러 페이지에서 공통 사용

4. **Features Layer** (`src/features/`)
   - ⚡ **CUD 로직**: 프로젝트 생성/수정/삭제, 좋아요
   - 🔐 **인증**: 소셜 로그인, 로그아웃
   - 📧 **이메일**: EmailJS 연동 메시지 발송

5. **Entities Layer** (`src/entities/`)
   - 📊 **Read 로직**: 프로젝트 조회, 검색, 사용자 표시
   - 🎨 **UI 컴포넌트**: 카드, 리스트, 상세 정보
   - 🔍 **검색 시스템**: 필터링, 페이지네이션

6. **Shared Layer** (`src/shared/`)
   - 🔧 **공통 도구**: API 클라이언트, 유틸리티
   - 💾 **상태 관리**: Zustand 스토어
   - 🎨 **UI 킷**: 버튼, 모달, 스피너 등

### 의존성 규칙 시각화

```
┌─────────────────────────────────────────┐
│ App Layer (설정, 라우팅, 글로벌 스타일)        │
└─────────────────┬───────────────────────┘
                  │ ✅ 참조 가능
┌─────────────────▼───────────────────────┐
│ Pages (홈, 프로젝트, 프로필, 로그인 등)        │
└─────────────────┬───────────────────────┘
                  │ ✅ 참조 가능
┌─────────────────▼───────────────────────┐
│ Widgets (헤더, 푸터, 히어로 섹션)           │
└─────────────────┬───────────────────────┘
                  │ ✅ 참조 가능
┌─────────────────▼───────────────────────┐
│ Features (인증, 프로젝트 CUD, 이메일)       │
└─────────────────┬───────────────────────┘
                  │ ✅ 참조 가능
┌─────────────────▼───────────────────────┐
│ Entities (프로젝트 조회, 검색, 사용자)      │
└─────────────────┬───────────────────────┘
                  │ ✅ 참조 가능
┌─────────────────▼───────────────────────┐
│ Shared (API, 훅, 스토어, UI 컴포넌트)       │
└─────────────────────────────────────────┘
```

## 🚀 개발 환경 설정

### 필수 요구사항
- **Node.js** 18+ 
- **pnpm** (패키지 매니저)
- **Firebase** 프로젝트 설정
- **EmailJS** 계정 설정

### 설치 및 실행

```bash
# 의존성 설치
pnpm install

### 개발 서버 실행

# 개발 서버 실행 (http://localhost:5173)
pnpm dev

# 빌드
pnpm build

# 빌드 미리보기
pnpm preview
```

### 코드 품질 관리

```bash
# ESLint 검사 (FSD 아키텍처 규칙 포함)
pnpm lint

# Prettier 포매팅
pnpm format

# TypeScript 타입 검사
pnpm type-check

# 전체 품질 검사
pnpm lint && pnpm type-check
```

## 🔀 브랜치 전략 & CI/CD

### 브랜치 구조

```
main (🚀 Production)
├── develop (🚧 Staging)
│   ├── feat/search
│   ├── feat/user
│   ├── fix/email
│   └── refactor/auth
```

### 워크플로우

1. **기능 개발**: `feat/기능명` 브랜치
2. **Staging**: `develop` 브랜치 → Vercel Preview 자동 배포
3. **Production**: `main` 브랜치 → Vercel Production 자동 배포

### CI/CD 파이프라인

- 📋 타입체크, 린트, 포맷팅 검사
- 🏗️ 프로덕션 빌드 테스트
- 🔒 보안 취약점 스캔
- 🚀 Vercel 자동 배포

## 📝 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 엄격히 준수합니다.

### 커밋 타입

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포매팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링
- `perf`: 성능 개선
- `test`: 테스트 추가/수정
- `chore`: 빌드 업무, 패키지 매니저 설정 등
- `ci`: CI 설정 변경
- `build`: 빌드 시스템 변경
- `revert`: 이전 커밋 되돌리기

### 커밋 메시지 형식

```bash
type(scope): subject

body

footer
```

## 🎯 개발 가이드라인

### React 컴포넌트 작성 규칙

- **명시적 반환 타입**: 모든 컴포넌트는 `JSX.Element` 반환 타입 명시
- **React.FC 금지**: 함수형 컴포넌트 직접 선언 방식 사용
- **단일 책임 원칙**: 하나의 컴포넌트는 하나의 역할만 담당

### Features vs Entities 구분 기준

| 구분 | Features | Entities |
|------|----------|----------|
| **역할** | 사용자 액션 처리 | 데이터 표시 |
| **예시** | 로그인 폼, 프로젝트 생성 | 프로젝트 카드, 사용자 정보 |
| **상태** | 변경 가능 (CUD) | 읽기 전용 (Read) |
| **의존성** | Entities 참조 가능 | Features 참조 불가 |

### 디렉토리 네이밍 규칙

- **kebab-case 사용**: `project-list/`, `user-profile/`, `email-modal/`
- **다른 케이스 금지**: `ProjectList/`, `userProfile/`, `Email_Modal/`

### Import 순서 규칙

1. 외부 라이브러리 (React, MUI 등)
2. 내부 모듈 (절대 경로)
3. 상대 경로

## 🛡️ 코드 품질 자동화

### Pre-commit Hooks

1. TypeScript 타입 체크
2. ESLint 자동 수정
3. Prettier 포매팅
4. 커밋 메시지 검증

### VSCode 설정 권장사항

- 저장 시 자동 포맷팅
- Prettier 기본 포맷터 설정
- 절대 경로 import 선호
- ESLint 검증 활성화

## 🚀 배포 및 성능

### 빌드 최적화
- **Tree Shaking**: 사용하지 않는 코드 제거
- **Code Splitting**: 페이지별 청크 분할
- **Dynamic Import**: 지연 로딩 구현

### 성능 모니터링
- **Core Web Vitals**: LCP, FID, CLS 추적
- **Bundle Analyzer**: 번들 크기 분석
- **Lighthouse**: 성능 점수 측정

### 배포 환경
- **Production**: `main` 브랜치 → `project-jam.vercel.app`
- **Staging**: `develop` 브랜치 → `project-jam-dev.vercel.app`
- **Preview**: PR 브랜치 → 고유 미리보기 URL

## 📚 관련 문서

- 📖 [FSD 아키텍처 상세 가이드](./docs/FSD_ARCHITECTURE.md)
- 🌿 [브랜치 전략 가이드](./docs/BRANCH_STRATEGY.md)
- 🏗️ [각 계층별 상세 문서](./src/)
  - [App Layer](./src/app/README.md)
  - [Pages Layer](./src/pages/README.md)
  - [Widgets Layer](./src/widgets/README.md)
  - [Features Layer](./src/features/README.md)
  - [Entities Layer](./src/entities/README.md)
  - [Shared Layer](./src/shared/README.md)

## 🤝 기여하기

1. **이슈 등록**: 버그 리포트나 기능 제안
2. **브랜치 생성**: `feat/기능명`
3. **개발**: FSD 규칙 준수하여 개발
4. **품질 검사**: `pnpm lint && pnpm type-check`
5. **PR 생성**: `develop` 브랜치로 Pull Request

---

## 📞 문의 및 지원

- **GitHub Issues**: 버그 리포트 및 기능 제안
- **Discussion**: 질문 및 아이디어 공유
- **Email**: project-jam@example.com

---

💡 **개발 팁**: FSD 아키텍처를 준수하면 ESLint가 실시간으로 도와드립니다. 의존성 규칙을 위반하면 빨간 밑줄로 알려드려요! 🔴
