# 프로젝트 이름

React + TypeScript + Vite 기반의 Feature-Sliced Design 아키텍처를 적용한 프로젝트입니다.

## 🚀 기술 스택

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Architecture**: Feature-Sliced Design (FSD)
- **Package Manager**: pnpm (필수)
- **Linting**: ESLint with FSD rules

## 📦 설치 및 실행

```bash
# 의존성 설치 (pnpm만 허용)
pnpm install

# 개발 서버 실행
pnpm dev

# 프로덕션 빌드
pnpm build

# 빌드 파일 미리보기
pnpm preview

# 린트 검사
pnpm lint
```

## 🏗️ 아키텍처

이 프로젝트는 [Feature-Sliced Design](https://feature-sliced.design/) 아키텍처를 따릅니다.

자세한 내용은 [FSD 아키텍처 가이드](./docs/FSD_ARCHITECTURE.md)를 참고하세요.

```
src/
├── app/       # 앱 초기화 및 전역 설정
├── pages/     # 페이지 컴포넌트
├── widgets/   # 독립적인 UI 블록
├── features/  # 비즈니스 기능
├── entities/  # 비즈니스 엔티티
└── shared/    # 공유 리소스
```

## 📝 개발 가이드

### 임포트 규칙

```typescript
// ✅ 절대 경로 사용
import { Button } from "@shared/ui";
import { HomePage } from "@pages/home";

// ❌ 상대 경로 금지
import { Button } from "../../../shared/ui";
```

### 레이어 의존성

- 상위 레이어만 하위 레이어를 import 가능
- 동일 레벨 간 의존성 금지
- ESLint가 자동으로 의존성 규칙 검사

## 🛠️ 도구 및 설정

- **Package Manager**: pnpm 전용 (npm, yarn 사용 금지)
- **Path Aliases**: `@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`
- **ESLint**: FSD 아키텍처 규칙 적용
- **TypeScript**: Strict 모드 활성화

## 📋 개발 가이드라인

### 🔧 Git Hooks (Husky)

이 프로젝트는 코드 품질을 보장하기 위해 Git hooks를 사용합니다:

#### Pre-commit Hook
커밋하기 전에 자동으로 실행됩니다:
- **ESLint**: 코드 스타일 및 오류 체크 & 자동 수정
- **Prettier**: 코드 포매팅
- **Type Check**: TypeScript 타입 체크

#### Commit Message Hook
커밋 메시지가 팀 컨벤션을 따르는지 체크합니다.

### 📝 커밋 메시지 컨벤션

[Conventional Commits](https://www.conventionalcommits.org/) 표준을 따릅니다:

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### 허용되는 타입:
- **feat**: 새로운 기능 추가
- **fix**: 버그 수정
- **docs**: 문서 변경
- **style**: 코드 포매팅, 세미콜론 누락 등 (로직 변경 없음)
- **refactor**: 코드 리팩토링
- **perf**: 성능 개선
- **test**: 테스트 추가/수정
- **chore**: 빌드 업무, 패키지 매니저 설정 등
- **ci**: CI 설정 변경
- **build**: 빌드 시스템 변경
- **revert**: 이전 커밋 되돌리기

#### 예시:
```bash
feat: 사용자 로그인 기능 추가
fix: 로그인 폼 유효성 검사 오류 수정
docs: README에 설치 가이드 추가
style: 코드 포매팅 적용
refactor: 사용자 인증 로직 리팩토링
```

### 🛠️ 개발 명령어

```bash
# 개발 서버 시작
pnpm dev

# 린트 체크
pnpm lint

# 린트 자동 수정
pnpm lint:fix

# 코드 포매팅
pnpm format

# 포매팅 체크
pnpm format:check

# 타입 체크
pnpm type-check

# 빌드
pnpm build
```

### 🚨 커밋 실패 시 해결방법

#### 1. 린트 에러가 발생한 경우:
```bash
pnpm lint:fix  # 자동 수정 시도
# 또는 수동으로 에러 수정 후 다시 커밋
```

#### 2. 커밋 메시지 컨벤션 위반:
```bash
# 올바른 형식으로 다시 커밋
git commit -m "feat: 새로운 기능 추가"
```

#### 3. 포매팅 문제:
```bash
pnpm format  # 자동 포매팅 적용
git add .    # 변경사항 다시 스테이징
```
