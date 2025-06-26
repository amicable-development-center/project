# Project

프로젝트 잼 - 함께 만들어가는 사이드 프로젝트

## 📋 목차

- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [FSD 아키텍처](#-fsd-아키텍처)
- [코드 품질 관리](#-코드-품질-관리)
- [개발 환경 설정](#-개발-환경-설정)
- [브랜치 전략 & CI/CD](#-브랜치-전략--cicd)
- [커밋 컨벤션](#-커밋-컨벤션)
- [개발 가이드라인](#-개발-가이드라인)

## 🛠 기술 스택

### Core
- **React 19** - UI 라이브러리
- **TypeScript 5** - 타입 시스템
- **Vite** - 빌드 도구

### Code Quality
- **ESLint** - 코드 품질 검사
- **Prettier** - 코드 포매팅
- **Husky** - Git Hooks 관리
- **lint-staged** - 스테이지된 파일만 검사
- **Commitlint** - 커밋 메시지 컨벤션

### Architecture
- **FSD (Feature-Sliced Design)** - 프로젝트 아키텍처
- **Path Alias** - 절대 경로 import

## 📁 프로젝트 구조

```
src/
├── app/              # 앱 전체 설정 및 진입점
│   ├── configs/      # 환경 설정
│   ├── entry/        # 앱 진입점
│   ├── routes/       # 라우팅 설정
│   └── styles/       # 글로벌 스타일
├── entities/         # 도메인 엔티티 (Read 로직)
├── features/         # 기능 단위 (CUD 로직)
├── pages/            # 페이지 컴포넌트
├── shared/           # 공통 유틸리티
└── widgets/          # 복합 컴포넌트
```

### 폴더별 표준 구조

각 도메인 폴더(`entities`, `features`)는 다음과 같은 표준 구조를 따릅니다:

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

## 🏗 FSD 아키텍처

### 계층별 역할

1. **App Layer** (`src/app/`)
   - 앱 전체 설정 및 초기화
   - 글로벌 프로바이더, 라우터 설정

2. **Pages Layer** (`src/pages/`)
   - 각 페이지별 컴포넌트
   - 라우팅과 연결되는 최상위 페이지

3. **Widgets Layer** (`src/widgets/`)
   - 여러 features를 조합한 복합 컴포넌트
   - 페이지의 큰 섹션 단위

4. **Features Layer** (`src/features/`)
   - **CUD 로직** (Create, Update, Delete)
   - 사용자 인터랙션이 포함된 기능
   - 상태 변경을 담당

5. **Entities Layer** (`src/entities/`)
   - **Read 로직** (조회, 표시)
   - 도메인 모델과 읽기 전용 로직
   - 비즈니스 엔티티 표현

6. **Shared Layer** (`src/shared/`)
   - 공통 유틸리티, UI 컴포넌트
   - 모든 계층에서 사용 가능

### 의존성 규칙

```
App ← Pages ← Widgets ← Features ← Entities ← Shared
```

- 하위 계층은 상위 계층을 참조할 수 없습니다
- 같은 계층 내 다른 모듈 간 직접 참조는 금지됩니다
- 같은 모듈 내에서는 자유롭게 참조 가능합니다

## 🔍 코드 품질 관리

### ESLint 규칙

- **FSD 아키텍처 강제**: 계층별 참조 제한
- **TypeScript 엄격 모드**: 명시적 함수 반환 타입 필수
- **React 모범 사례**: Hooks 규칙, JSX 접근성
- **Import 정리**: 절대/상대 경로 규칙

### Prettier 설정

- **세미콜론**: 필수
- **따옴표**: 큰따옴표 사용
- **Trailing Comma**: 항상 추가
- **들여쓰기**: 2칸 스페이스

### Path Alias

```typescript
// tsconfig.app.json, vite.config.ts, eslint.config.mjs에 설정
"@app/*": ["./src/app/*"]
"@pages/*": ["./src/pages/*"]
"@widgets/*": ["./src/widgets/*"]
"@features/*": ["./src/features/*"]
"@entities/*": ["./src/entities/*"]
"@shared/*": ["./src/shared/*"]
```

## 🚀 개발 환경 설정

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

### 빌드

```bash
pnpm build
```

### 미리보기

```bash
pnpm preview
```

### 코드 검사

```bash
# ESLint 검사
pnpm lint

# Prettier 포매팅
pnpm format
```

## 🔀 브랜치 전략 & CI/CD

### 브랜치 구조

```
main (Production)
├── develop (Staging)
│   ├── feat/auth/tkyoun0421
│   ├── feat/user-profile/developer2
│   └── fix/login-bug/tkyoun0421
```

### 워크플로우

1. **기능 개발**: `feat/기능명/깃허브아이디` 브랜치에서 개발
2. **스테이징**: `develop` 브랜치로 PR → Vercel Preview 자동 배포
3. **프로덕션**: `develop` → `main` PR → Vercel Production 자동 배포

### CI/CD 파이프라인

- **CI**: 타입체크, 린트, 포맷, 빌드, 보안 검사
- **CD**: Vercel 자동 배포 (develop: Preview, main: Production)

### 관련 문서

- [브랜치 전략 상세 가이드](./docs/BRANCH_STRATEGY.md)
- [GitHub Actions CI/CD 설정](./.github/workflows/README.md)

## 📝 커밋 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.

### 허용되는 타입

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

```
type(scope): subject

body

footer
```

### 예시

```bash
git commit -m "feat(user): 사용자 프로필 조회 기능 추가"
git commit -m "fix(auth): 로그인 실패 시 에러 처리 개선"
git commit -m "docs: README에 FSD 아키텍처 설명 추가"
```

## 🎯 개발 가이드라인

### 컴포넌트 작성 규칙

1. **명시적 반환 타입**: 모든 컴포넌트는 `JSX.Element` 반환 타입을 명시
2. **React.FC 금지**: 함수형 컴포넌트 직접 선언 방식 사용
3. **단일 책임 원칙**: 하나의 컴포넌트는 하나의 역할만 담당

```typescript
// ✅ 올바른 예시
const UserProfile = (): JSX.Element => {
  return <div>User Profile</div>;
};

// ❌ 잘못된 예시
const UserProfile: React.FC = () => {
  return <div>User Profile</div>;
};
```

### Features vs Entities 구분

- **Features**: 사용자 액션, 폼 제출, 데이터 변경
- **Entities**: 데이터 표시, 읽기 전용 컴포넌트

### 모듈 구조 예시

```typescript
// src/entities/user/index.ts
export { UserCard } from './ui/UserCard';
export { useUserQuery } from './queries/useUserQuery';
export type { User } from './types/User';

// src/features/auth/index.ts
export { LoginForm } from './ui/LoginForm';
export { useLoginMutation } from './hooks/useLoginMutation';
```

## 🔧 Git Hooks

### Pre-commit

- ESLint 자동 수정
- Prettier 포매팅
- 타입 체크

### Commit-msg

- 커밋 메시지 컨벤션 검사
- 제목 길이 제한 (50자)
- 헤더 길이 제한 (72자)

## 📚 추가 문서

- [FSD 아키텍처 상세 가이드](./docs/FSD_ARCHITECTURE.md)
- [각 계층별 README](./src/)

---

💡 **개발 시 주의사항**: FSD 아키텍처 규칙을 위반하면 ESLint 에러가 발생합니다. 의존성 규칙을 준수하여 개발해 주세요!
