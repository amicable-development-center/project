# Feature-Sliced Design (FSD) 아키텍처

이 프로젝트는 Feature-Sliced Design 아키텍처를 따릅니다.

## 📁 폴더 구조

```
src/
├── app/           # 🚀 앱 초기화 (진입점, 전역 설정)
├── pages/         # 📄 페이지 (라우팅, 페이지 컴포넌트)
├── widgets/       # 🧩 독립적인 UI 블록들 (헤더, 사이드바 등)
├── features/      # 💼 비즈니스 기능 (인증, 검색, 결제 등)
├── entities/      # 📊 비즈니스 엔티티 (사용자, 제품, 주문 등)
└── shared/        # 🔧 공유 리소스 (UI 키트, 유틸, API 등)
```

## 🔗 레이어 간 의존성 규칙

```
app     →  pages, widgets, features, entities, shared
pages   →  widgets, features, entities, shared
widgets →  features, entities, shared
features→  entities, shared
entities→  shared
shared  →  (외부 라이브러리만)
```

## 📦 임포트 방법

절대 경로를 사용하여 임포트합니다:

```typescript
// ✅ 올바른 방법
import { Button } from "@shared/ui";
import { UserEntity } from "@entities/user";
import { AuthFeature } from "@features/auth";
import { Header } from "@widgets/header";
import { HomePage } from "@pages/home";

// ❌ 잘못된 방법
import { Button } from "../../../shared/ui";
import { UserEntity } from "../../entities/user";
```

## 🏗️ 각 레이어의 역할

### 📱 App Layer

- 앱 초기화 코드
- 전역 프로바이더
- 라우터 설정
- 전역 스타일

### 📄 Pages Layer

- 페이지 컴포넌트
- 라우팅 로직
- 페이지별 레이아웃

### 🧩 Widgets Layer

- 독립적인 UI 블록
- 복합 컴포넌트 (헤더, 사이드바, 푸터)
- 재사용 가능한 섹션

### 💼 Features Layer

- 비즈니스 기능
- 사용자 시나리오 (로그인, 검색, 장바구니)
- 도메인 로직

### 📊 Entities Layer

- 비즈니스 엔티티
- 데이터 모델
- API 스키마

### 🔧 Shared Layer

- UI 컴포넌트 라이브러리
- 유틸리티 함수
- 공통 상수
- API 클라이언트

## 📝 명명 규칙

- 폴더명: kebab-case (`user-profile`, `auth-form`)
- 파일명: camelCase (`userProfile.tsx`, `authForm.ts`)
- 컴포넌트명: PascalCase (`UserProfile`, `AuthForm`)
- 상수명: SCREAMING_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRY_COUNT`)

## 🎯 베스트 프랙티스

1. **단방향 의존성**: 상위 레이어만 하위 레이어를 임포트
2. **Public API**: 각 레이어는 `index.ts`를 통해 외부에 노출
3. **절대 경로**: `@` prefix를 사용한 절대 경로 임포트
4. **기능별 분리**: 관련된 코드는 같은 슬라이스에 보관
5. **재사용성**: shared 레이어의 컴포넌트는 도메인에 독립적으로 작성
