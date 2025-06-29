# Entities Layer

> 📊 **도메인 엔티티 계층** - 비즈니스 도메인 데이터의 조회와 표시를 담당

## 📖 개요

Entities Layer는 **비즈니스 도메인의 핵심 데이터를 관리**하는 계층입니다. 주로 Read 작업을 담당하며, 데이터를 조회하고 사용자에게 표시하는 UI 컴포넌트와 로직을 포함합니다.

## 📁 디렉토리 구조

```
src/entities/
├── projects/                # 📋 프로젝트 도메인
│   ├── api/                # 프로젝트 조회 API
│   │   ├── getProjectApplicationsApi.ts
│   │   ├── getProjectLikeApi.ts
│   │   └── projectsApi.ts
│   ├── hooks/              # 프로젝트 관련 훅
│   │   ├── useDeleteProjectsMutation.ts
│   │   ├── useGetProjects.ts
│   │   └── useProjectsByIds.ts
│   ├── queries/            # React Query 쿼리
│   │   ├── useGetProjectApplications.ts
│   │   ├── useGetProjectLike.ts
│   │   ├── useProjectList.ts
│   │   ├── useProjectsItem.ts
│   │   └── useProjectsTotalCount.ts
│   ├── types/              # 프로젝트 타입 정의
│   │   └── firebase.ts
│   └── ui/                 # 프로젝트 표시 UI
│       ├── liked-projects/
│       ├── post-info/
│       ├── profile-page-projects-card/
│       ├── project-collection-tab/
│       ├── project-insert/
│       ├── projects-card/
│       ├── projects-detail/
│       └── projects-stats/
├── search/                  # 🔍 검색 도메인
│   ├── api/                # 검색 API
│   │   └── projectSearchApi.ts
│   ├── hooks/              # 검색 관련 훅
│   │   ├── useFilteredProjects.ts
│   │   ├── useProjectSearch.ts
│   │   ├── useSearchHistory.ts
│   │   └── useSearchInput.ts
│   ├── model/              # 검색 비즈니스 로직
│   │   ├── searchConstants.ts
│   │   ├── searchFormConfig.ts
│   │   └── searchQueryBuilder.ts
│   ├── queries/            # 검색 쿼리
│   │   └── useProjectSearchQueries.ts
│   └── ui/                 # 검색 UI 컴포넌트
│       ├── SearchActions.tsx
│       ├── SearchFilters.tsx
│       ├── SearchForm.tsx
│       ├── SearchInput.tsx
│       ├── SearchInputHistory.tsx
│       ├── SearchInputHistoryToggle.tsx
│       ├── SearchLabels.tsx
│       ├── SearchListResultHandler.tsx
│       ├── SearchLoadingSpinner.tsx
│       ├── SearchPagination.tsx
│       ├── SearchSelectBox.tsx
│       ├── SearchStatusField.tsx
│       └── SelectBox.tsx
└── user/                    # 👤 사용자 도메인
    ├── hooks/              # 사용자 관련 훅
    │   ├── useSignUp.ts
    │   ├── useSignUpForm.ts
    │   ├── useUpdateUser.ts
    │   └── useUpdateUserForm.ts
    └── ui/                 # 사용자 표시 UI
        ├── SubmitButton.tsx
        ├── UpdateUserForm.tsx
        ├── user-profile/
        │   ├── TapWithBadge.tsx
        │   ├── UserProfileCard.tsx
        │   └── UserProfileHeader.tsx
        └── UserInfoForm.tsx
```

## 🎯 도메인별 상세 기능

### 1. Projects Entity (`projects/`)
**역할**: 프로젝트 정보의 조회와 표시

#### 주요 컴포넌트 그룹
- **liked-projects/**: 좋아요한 프로젝트 목록 및 빈 상태
- **post-info/**: 프로젝트 상세 정보 (지원, 리더 정보, 메타데이터)
- **project-collection-tab/**: 프로젝트 컬렉션 탭 네비게이션
- **project-insert/**: 프로젝트 등록 폼의 각 카드 컴포넌트들
- **projects-card/**: 프로젝트 목록용 카드 및 빈 상태
- **projects-detail/**: 프로젝트 상세 페이지 섹션들
- **projects-stats/**: 프로젝트 통계 및 안내 정보

#### 데이터 관리
- **조회 최적화**: React Query를 통한 데이터 캐싱
- **상태 동기화**: 실시간 프로젝트 상태 반영
- **페이지네이션**: 대용량 프로젝트 목록 처리

### 2. Search Entity (`search/`)
**역할**: 프로젝트 검색 및 필터링 시스템

#### 핵심 기능
- **다중 필터**: 카테고리, 기술스택, 포지션, 상태별 필터링
- **검색 기록**: 사용자별 검색 이력 관리
- **실시간 검색**: 타이핑과 동시에 결과 업데이트
- **고급 검색**: 복합 조건을 통한 정확한 매칭

#### 검색 엔진 구조
- **Query Builder**: 동적 검색 쿼리 생성
- **Filter Chain**: 연쇄적 필터 적용
- **Result Ranking**: 관련도 기반 결과 정렬

### 3. User Entity (`user/`)
**역할**: 사용자 정보 표시 및 프로필 관리

#### 사용자 표시 컴포넌트
- **ProfileCard**: 사용자 기본 정보 카드
- **ProfileHeader**: 프로필 페이지 헤더
- **TapWithBadge**: 배지가 있는 탭 컴포넌트

#### 사용자 정보 관리
- **회원가입**: 새 사용자 등록 폼
- **프로필 수정**: 기존 사용자 정보 업데이트
- **표시 최적화**: 사용자 데이터 효율적 렌더링

## 🏗 아키텍처 패턴

### 1. Repository Pattern
API 호출을 추상화하여 데이터 접근 로직과 UI를 분리

### 2. Query Object Pattern
복잡한 검색 조건을 객체로 캡슐화하여 관리

### 3. Observer Pattern
데이터 변경 시 관련 컴포넌트들에게 자동 알림

## 🎨 UI 컴포넌트 설계 원칙

### 1. 단일 책임 원칙
각 컴포넌트는 하나의 명확한 데이터 표시 역할만 담당

### 2. 조합 가능성
작은 컴포넌트들을 조합하여 복잡한 UI 구성

### 3. 재사용성
다양한 맥락에서 사용 가능한 유연한 컴포넌트 설계

## 📊 데이터 흐름 관리

### 1. 서버 상태 캐싱
- **React Query**: 서버 데이터 자동 캐싱 및 무효화
- **Stale-While-Revalidate**: 캐시된 데이터 우선 표시 후 백그라운드 업데이트
- **옵티미스틱 업데이트**: 사용자 액션 즉시 반영

### 2. 클라이언트 상태 관리
- **지역 상태**: 컴포넌트 내부 UI 상태
- **전역 상태**: 여러 컴포넌트가 공유하는 상태
- **동기화**: 서버 상태와 클라이언트 상태 일치

### 3. 에러 상태 처리
- **로딩 상태**: 데이터 fetching 중 로딩 표시
- **에러 상태**: 네트워크 에러 시 친화적 메시지
- **빈 상태**: 데이터가 없을 때 적절한 안내

## ⚡ 성능 최적화

### 1. 렌더링 최적화
- **React.memo**: 불필요한 리렌더링 방지
- **가상화**: 대용량 리스트 가상 스크롤
- **지연 로딩**: 뷰포트 진입 시 컴포넌트 로딩

### 2. 데이터 최적화
- **선택적 필드**: 필요한 데이터만 요청
- **페이지네이션**: 대용량 데이터 청크 단위 로딩
- **프리페칭**: 사용자 행동 예측하여 미리 데이터 로딩

### 3. 번들 최적화
- **트리 쉐이킹**: 사용하지 않는 코드 제거
- **코드 스플리팅**: 라우트/컴포넌트별 청크 분할
- **동적 임포트**: 조건부 컴포넌트 로딩

## 🔍 검색 시스템 고도화

### 1. 검색 알고리즘
- **풀텍스트 검색**: 제목, 설명 내 키워드 매칭
- **가중치 기반 스코어링**: 필드별 중요도 차등 적용
- **퍼지 매칭**: 오타 허용 검색

### 2. 사용자 경험 개선
- **자동완성**: 입력 중 검색어 제안
- **검색 하이라이트**: 결과에서 검색어 강조
- **최근 검색어**: 사용자별 검색 이력

### 3. 고급 필터링
- **다중 선택**: 여러 카테고리 동시 선택
- **범위 필터**: 날짜, 팀 크기 등 범위 조건
- **정렬 옵션**: 최신순, 인기순, 관련도순

## 🎯 사용자 경험 (UX) 고려사항

### 1. 로딩 상태 관리
- **스켈레톤 UI**: 데이터 로딩 중 레이아웃 미리보기
- **프로그레시브 로딩**: 중요한 내용부터 우선 표시
- **백그라운드 업데이트**: 사용자 인터랙션 방해 없이 데이터 갱신

### 2. 반응형 디자인
- **모바일 최적화**: 터치 친화적 인터페이스
- **적응형 레이아웃**: 화면 크기별 최적 배치
- **성능 고려**: 모바일 환경에서의 빠른 로딩

### 3. 접근성 (Accessibility)
- **키보드 네비게이션**: 마우스 없이도 완전한 사용
- **스크린 리더**: 시각 장애인을 위한 음성 지원
- **색상 대비**: WCAG 가이드라인 준수

## 🧪 테스트 전략

### 1. 컴포넌트 테스트
- **렌더링 테스트**: 다양한 props에 대한 올바른 렌더링
- **상호작용 테스트**: 사용자 클릭, 입력에 대한 반응
- **상태 변경 테스트**: 데이터 변경 시 UI 업데이트

### 2. 통합 테스트
- **API 연동 테스트**: 실제 API와의 데이터 흐름
- **검색 시나리오**: 복합 검색 조건의 정확한 결과
- **페이지네이션 테스트**: 대용량 데이터 처리

### 3. 성능 테스트
- **렌더링 성능**: 컴포넌트 렌더링 시간 측정
- **메모리 사용량**: 메모리 누수 검사
- **번들 크기**: 최적화 효과 측정

## 🎯 개발 가이드라인

### Entities vs Features 구분 기준
- **Entities**: 사용자가 **보는** 데이터 (프로젝트 카드, 사용자 프로필)
- **Features**: 사용자가 **하는** 액션 (프로젝트 생성, 로그인)

### 새로운 Entity 생성 시
1. **도메인 분석**: 비즈니스 도메인의 명확한 경계 정의
2. **API 설계**: RESTful한 읽기 전용 엔드포인트
3. **타입 정의**: TypeScript 인터페이스로 데이터 구조 명시
4. **컴포넌트 분리**: 작은 단위로 재사용 가능한 컴포넌트
5. **쿼리 최적화**: React Query 캐싱 전략 수립

### 기존 Entity 수정 시
1. **영향도 분석**: 해당 Entity를 사용하는 모든 위치 파악
2. **하위 호환성**: 기존 인터페이스 유지 또는 점진적 마이그레이션
3. **성능 영향**: 변경으로 인한 성능 저하 여부 확인
4. **테스트 업데이트**: 변경된 로직에 맞는 테스트 케이스

### 성능 고려사항
1. **리렌더링 최소화**: 불필요한 상태 변경 방지
2. **메모리 효율**: 대용량 데이터 처리 시 가상화 고려
3. **네트워크 최적화**: 필요한 데이터만 선택적으로 로딩
4. **캐싱 전략**: 적절한 캐시 TTL 설정

---

## 📚 관련 문서

- [🏗 FSD 아키텍처 가이드](../../docs/FSD_ARCHITECTURE.md)
- [⚡ Features Layer](../features/README.md)
- [🔧 Shared Layer](../shared/README.md)

---

💡 **개발 팁**: Entities는 **데이터의 표현**에 집중하세요. 사용자가 정보를 쉽게 이해하고 탐색할 수 있는 직관적인 UI를 만드는 것이 핵심입니다! 