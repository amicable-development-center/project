# Shared Layer

> 🔧 **공통 자원 계층** - 모든 계층에서 사용되는 재사용 가능한 유틸리티와 컴포넌트

## 📖 개요

Shared Layer는 **FSD 아키텍처의 최하위 계층**으로, 애플리케이션 전체에서 공통으로 사용되는 재사용 가능한 자원들을 제공합니다. 비즈니스 로직과 독립적인 범용 도구들을 포함합니다.

## 📁 디렉토리 구조

```
src/shared/
├── api/                     # 🌐 API 클라이언트
│   └── userApi.ts          # 공통 사용자 API
├── firebase/                # 🔥 Firebase 설정
│   └── firebase.ts         # Firebase 초기화 및 설정
├── hooks/                   # 🎣 공통 커스텀 훅
│   ├── useAuthObserver.ts  # 인증 상태 관찰
│   ├── useCountdown.ts     # 카운트다운 타이머
│   ├── useDraggable.ts     # 드래그 앤 드롭
│   ├── useIntersectionObserver.ts  # 뷰포트 교차 관찰
│   ├── useLoadingCursor.ts # 로딩 커서 관리
│   └── usePagination.ts    # 페이지네이션 로직
├── libs/                    # 📚 유틸리티 라이브러리
│   └── utils/              # 범용 유틸리티 함수
│       ├── experienceLabel.ts      # 경험 레벨 레이블
│       ├── measureHmr.ts           # HMR 성능 측정
│       ├── pagination.ts          # 페이지네이션 계산
│       ├── projectDetail.ts       # 프로젝트 상세 유틸
│       ├── projectInsert.ts       # 프로젝트 등록 유틸
│       └── scrollUtils.ts         # 스크롤 관련 유틸
├── queries/                 # 🔄 공통 React Query
│   └── useUserProfile.ts   # 사용자 프로필 쿼리
├── react-query/            # ⚛️ React Query 설정
│   ├── queryClient.ts      # Query Client 설정
│   └── queryKey.ts         # Query Key 상수
├── stores/                  # 🗄️ Zustand 스토어
│   ├── applicationsStore.ts # 지원 상태 관리
│   ├── authStore.ts        # 인증 상태 관리
│   ├── likeStore.ts        # 좋아요 상태 관리
│   ├── projectStore.ts     # 프로젝트 상태 관리
│   ├── searchStore.ts      # 검색 상태 관리
│   └── snackbarStore.ts    # 알림 상태 관리
├── types/                   # 📝 공통 타입 정의
│   ├── firebase.ts         # Firebase 관련 타입
│   ├── like.ts             # 좋아요 타입
│   ├── project.ts          # 프로젝트 타입
│   ├── schedule.ts         # 일정 타입
│   ├── search.ts           # 검색 타입
│   └── user.ts             # 사용자 타입
└── ui/                      # 🎨 공통 UI 컴포넌트
    ├── animations/         # 애니메이션 컴포넌트
    │   ├── FadeInUp.tsx
    │   └── FadeInUpOnView.tsx
    ├── DeleteButton.tsx    # 삭제 버튼
    ├── DevelopersDropdown.tsx  # 개발자 드롭다운
    ├── DragScrollContainer.tsx # 드래그 스크롤 컨테이너
    ├── GlobalSnackbar.tsx  # 전역 스낵바
    ├── home/               # 홈 관련 컴포넌트
    │   └── WhiteInfoBox.tsx
    ├── icons/              # 아이콘 컴포넌트
    │   ├── CommonIcons.tsx
    │   ├── GradientGitHubIcon.tsx
    │   └── logo.svg
    ├── loading-spinner/    # 로딩 스피너
    │   ├── LoadingSpinner.tsx
    │   ├── PageTransitionFallback.tsx
    │   └── PageTransitionLoader.tsx
    ├── LogoBox.tsx         # 로고 박스
    ├── NavigateButton.tsx  # 네비게이션 버튼
    ├── pagination/         # 페이지네이션
    │   └── Pagination.tsx
    ├── project-detail/     # 프로젝트 상세 공통 UI
    │   ├── InfoRow.tsx
    │   ├── InfoWithIcon.tsx
    │   └── TitleWithIcon.tsx
    ├── project-insert/     # 프로젝트 등록 공통 UI
    │   ├── SimpleFormCard.tsx
    │   └── StepWhiteBox.tsx
    ├── ScrollToTop.tsx     # 상단 스크롤 버튼
    ├── SnackbarAlert.tsx   # 스낵바 알림
    └── user/               # 사용자 관련 공통 UI
        ├── UserProfileAvatar.tsx
        └── UserProfileWithNamePosition.tsx
```

## 🎯 주요 구성 요소

### 1. UI 컴포넌트 (`ui/`)
**역할**: 재사용 가능한 기본 UI 컴포넌트 제공

#### 카테고리별 컴포넌트
- **애니메이션**: 페이드인, 슬라이드업 등 공통 애니메이션 효과
- **로딩**: 스피너, 페이지 전환 로더, 폴백 컴포넌트
- **네비게이션**: 버튼, 페이지네이션, 스크롤 컨트롤
- **사용자 인터페이스**: 아바타, 프로필 카드, 정보 표시
- **아이콘**: 공통 아이콘, 브랜드 아이콘, SVG 컴포넌트

#### 설계 원칙
- **범용성**: 특정 도메인에 종속되지 않는 범용 컴포넌트
- **재사용성**: 다양한 상황에서 활용 가능한 유연한 API
- **일관성**: 전체 앱의 디자인 시스템 일관성 유지

### 2. 커스텀 훅 (`hooks/`)
**역할**: 재사용 가능한 비즈니스 로직 없는 순수 훅

#### 주요 훅 카테고리
- **상태 관리**: useAuthObserver, useLoadingCursor
- **UI 인터랙션**: useDraggable, useIntersectionObserver
- **데이터 처리**: usePagination, useCountdown
- **성능 최적화**: 디바운싱, 스로틀링, 메모이제이션

### 3. 상태 관리 (`stores/`)
**역할**: Zustand를 통한 전역 클라이언트 상태 관리

#### 스토어별 역할
- **authStore**: 사용자 인증 상태, 토큰 관리
- **projectStore**: 프로젝트 임시 데이터, 폼 상태
- **searchStore**: 검색 필터, 정렬 옵션, 검색 이력
- **likeStore**: 좋아요 상태의 낙관적 업데이트
- **snackbarStore**: 전역 알림 메시지 관리

### 4. 유틸리티 라이브러리 (`libs/`)
**역할**: 순수 함수 기반의 범용 유틸리티

#### 유틸리티 카테고리
- **데이터 변환**: 날짜, 문자열, 숫자 형식 변환
- **계산**: 페이지네이션, 통계, 수치 연산
- **검증**: 폼 검증, 데이터 유효성 검사
- **성능**: HMR 측정, 최적화 도구

### 5. 타입 정의 (`types/`)
**역할**: 애플리케이션 전체에서 공유하는 TypeScript 타입

#### 타입 분류
- **도메인 타입**: User, Project, Schedule 등 비즈니스 엔티티
- **API 타입**: 요청/응답 인터페이스, 에러 타입
- **UI 타입**: 컴포넌트 Props, 이벤트 핸들러
- **유틸리티 타입**: 공통 유니온, 조건부 타입

### 6. API 클라이언트 (`api/`)
**역할**: 외부 서비스와의 통신 인터페이스

#### 주요 기능
- **HTTP 클라이언트**: axios 기반 API 호출
- **에러 처리**: 공통 에러 핸들링 및 변환
- **인터셉터**: 요청/응답 전처리
- **타입 안전성**: API 응답 타입 보장

## 🏗 아키텍처 역할

### 계층 독립성
Shared Layer는 **완전히 독립적**이며 다른 어떤 계층도 참조하지 않습니다.

- **상위 계층**: App, Pages, Widgets, Features, Entities 모두 Shared 참조 가능
- **Shared**: 다른 계층 참조 불가 (외부 라이브러리만 허용)
- **순환 참조 방지**: 의존성 그래프의 최하위 노드

### 재사용성 극대화
- **도메인 무관성**: 특정 비즈니스 로직 포함 금지
- **범용성**: 다양한 프로젝트에서 재사용 가능
- **확장성**: 기존 기능을 깨뜨리지 않는 확장

## ⚡ 성능 최적화

### 1. 번들 최적화
- **트리 쉐이킹**: 사용하지 않는 유틸리티 자동 제거
- **코드 스플리팅**: 큰 유틸리티의 동적 임포트
- **데드 코드 제거**: 사용되지 않는 함수 제거

### 2. 렌더링 최적화
- **React.memo**: 순수 UI 컴포넌트 메모이제이션
- **useCallback/useMemo**: 훅 내 계산 최적화
- **지연 초기화**: 무거운 계산의 lazy initialization

### 3. 메모리 관리
- **이벤트 리스너 정리**: cleanup 함수 적절한 구현
- **타이머 정리**: setTimeout/setInterval 해제
- **메모리 누수 방지**: 순환 참조 방지

## 🎨 디자인 시스템 통합

### 1. 테마 시스템
- **MUI 테마**: Material-UI 테마 정의 및 확장
- **CSS 변수**: 브라우저 네이티브 CSS 커스텀 프로퍼티
- **다크 모드**: 테마 전환 시스템 지원

### 2. 컴포넌트 변형
- **Variant 시스템**: primary, secondary, danger 등
- **크기 시스템**: small, medium, large
- **상태 표현**: loading, disabled, error 상태

### 3. 접근성 (A11y)
- **ARIA 지원**: 적절한 ARIA 속성 적용
- **키보드 네비게이션**: 키보드만으로 조작 가능
- **스크린 리더**: 시각 장애인을 위한 텍스트 제공

## 🧪 테스트 전략

### 1. 단위 테스트
- **순수 함수**: 유틸리티 함수의 입출력 검증
- **커스텀 훅**: React Testing Library로 훅 동작 테스트
- **컴포넌트**: 다양한 props 조합에 대한 렌더링 테스트

### 2. 통합 테스트
- **스토어 테스트**: 상태 변경 시나리오 검증
- **API 클라이언트**: 모킹을 통한 네트워크 레이어 테스트
- **UI 상호작용**: 사용자 이벤트에 대한 컴포넌트 반응

### 3. 시각적 회귀 테스트
- **Storybook**: 컴포넌트 변형들의 시각적 문서화
- **스냅샷 테스트**: UI 변경 감지
- **크로스 브라우저**: 주요 브라우저별 렌더링 검증

## 🎯 개발 가이드라인

### 새로운 공통 컴포넌트 생성 시
1. **범용성 검증**: 특정 도메인에 종속되지 않는지 확인
2. **API 설계**: 유연하고 확장 가능한 Props 인터페이스
3. **접근성 준수**: ARIA, 키보드 네비게이션 고려
4. **스토리북 작성**: 다양한 사용 예시 문서화
5. **테스트 작성**: 컴포넌트 동작 검증

### 유틸리티 함수 작성 시
1. **순수 함수**: 사이드 이펙트 없는 함수 작성
2. **타입 안전성**: 명확한 입력/출력 타입 정의
3. **에러 처리**: 예외 상황에 대한 적절한 처리
4. **성능 고려**: 시간/공간 복잡도 최적화
5. **문서화**: JSDoc을 통한 명확한 설명

### 커스텀 훅 설계 시
1. **단일 책임**: 하나의 명확한 기능만 담당
2. **재사용성**: 다양한 컴포넌트에서 활용 가능
3. **의존성 최소화**: 외부 의존성 최소한으로 제한
4. **cleanup**: 메모리 누수 방지를 위한 정리 로직
5. **타입 추론**: TypeScript 타입 추론 최적화

### 주의사항
1. **브레이킹 체인지**: Shared 변경은 전체 앱에 영향
2. **하위 호환성**: 기존 사용법 유지 또는 마이그레이션 가이드
3. **성능 영향**: 공통 컴포넌트의 성능은 전체 성능에 직결
4. **의존성 관리**: 외부 라이브러리 추가 시 신중한 검토

---

## 📚 관련 문서

- [🏗 FSD 아키텍처 가이드](../../docs/FSD_ARCHITECTURE.md)
- [🎨 디자인 시스템](../app/styles/README.md)
- [📊 상태 관리 가이드](./stores/README.md)

---

💡 **개발 팁**: Shared는 **모든 계층의 기반**입니다. 변경 시 영향도가 크므로 신중하게 설계하고, 항상 하위 호환성을 고려하세요! 