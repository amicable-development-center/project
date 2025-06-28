# Pages Layer

프로젝트 매칭 플랫폼의 라우팅과 연결되는 페이지 컴포넌트를 관리하는 계층입니다.

## 📁 실제 구조

```
pages/
├── home/                    # 메인 홈페이지
│   └── ui/
│       └── HomePage.tsx
├── login/                   # 로그인 페이지
│   └── ui/
│       └── LoginPage.tsx
├── signup/                  # 회원가입 페이지
│   └── ui/
│       └── SignUpPage.tsx
├── project-list/           # 프로젝트 목록 및 검색
│   └── ui/
│       └── ProjectListPage.tsx
├── project-detail/         # 프로젝트 상세보기
│   └── ui/
│       └── ProjectDetailPage.tsx
├── project-insert/         # 프로젝트 등록
│   └── ui/
│       ├── ProjectInsertPage.tsx
│       ├── HoneyTipBox.tsx
│       ├── StepBox.tsx
│       └── TopTitle.tsx
├── user-profile/           # 사용자 프로필
│   └── ui/
│       ├── UserProfilePage.tsx
│       └── UserNotFound.tsx
└── not-found/              # 404 에러 페이지
    └── ui/
        └── NotFoundPage.tsx
```

## 🎯 각 페이지 역할

### 🏠 HomePage
- 프로젝트 통계 및 시작 가이드 표시
- Hero 섹션과 주요 기능 소개
- 메인 CTA (Call To Action) 버튼 배치

### 🔐 LoginPage / SignUpPage
- 소셜 로그인 (GitHub, Google) 지원
- 로그인 후 리다이렉트 처리
- 회원가입 폼 및 유효성 검사

### 📋 ProjectListPage
- 프로젝트 검색 및 필터링
- 페이지네이션 및 무한 스크롤
- 검색 기록 관리
- 프로젝트 카드 목록 표시

### 📄 ProjectDetailPage
- 프로젝트 상세 정보 표시
- 프로젝트 지원 및 좋아요 기능
- 프로젝트 리더 정보 및 연락하기
- 이메일 모달 연동

### ✏️ ProjectInsertPage
- 4단계 프로젝트 등록 폼
- 단계별 입력 검증
- 프로젝트 생성 및 수정
- 꿀팁 박스 및 가이드 제공

### 👤 UserProfilePage
- 사용자 프로필 정보 표시
- 등록한 프로젝트 및 좋아요한 프로젝트
- 지원한 프로젝트 현황
- 프로필 수정 기능

## 🔧 페이지 구현 예시

### HomePage 구조
```typescript
// pages/home/ui/HomePage.tsx
import Hero from "@widgets/hero/ui/Hero";
import ProjectsStats from "@entities/projects/ui/projects-stats/ProjectsStats";
import Footer from "@widgets/Footer";

const HomePage = (): JSX.Element => {
  return (
    <>
      <Hero />
      <ProjectsStats />
      <Footer />
    </>
  );
};

export default HomePage;
```

### ProjectListPage 구조
```typescript
// pages/project-list/ui/ProjectListPage.tsx
import SearchForm from "@entities/search/ui/SearchForm";
import ProjectCard from "@entities/projects/ui/projects-card/ProjectCard";
import SearchListResultHandler from "@entities/search/ui/SearchListResultHandler";
import useProjectSearch from "@entities/search/hooks/useProjectSearch";

const ProjectListPage = (): JSX.Element => {
  const { projects, handleSearch, handlePageChange, ... } = useProjectSearch(resultsRef);

  return (
    <Container>
      <SearchForm onSearch={handleSearch} />
      <ProjectGrid>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectGrid>
      <SearchListResultHandler 
        onPageChange={handlePageChange}
        {...paginationProps}
      />
    </Container>
  );
};
```

### ProjectInsertPage 구조
```typescript
// pages/project-insert/ui/ProjectInsertPage.tsx
import Step1 from "@features/projects/ui/project-insert/Step1";
import Step2 from "@features/projects/ui/project-insert/Step2";
import StepBox from "./StepBox";
import HoneyTipBox from "./HoneyTipBox";

const ProjectInsertPage = (): JSX.Element => {
  const { currentStep, ... } = useProjectInsertForm();

  return (
    <Container>
      <StepBox currentStep={currentStep} />
      <FormContainer>
        {currentStep === 1 && <Step1 />}
        {currentStep === 2 && <Step2 />}
        {/* ... 다른 단계들 */}
      </FormContainer>
      <HoneyTipBox />
    </Container>
  );
};
```

## 📋 개발 가이드라인

### 1. 페이지 명명 규칙
- **폴더명**: kebab-case (예: `project-detail`, `user-profile`)
- **컴포넌트명**: PascalCase + Page 접미사 (예: `ProjectDetailPage`)
- **파일명**: PascalCase (예: `ProjectInsertPage.tsx`)

### 2. 페이지 책임 분리
- **레이아웃 조합**: Widgets, Features, Entities 컴포넌트 조합
- **라우팅 처리**: URL 파라미터 및 쿼리 스트링 처리
- **전역 상태**: 페이지 레벨에서만 필요한 상태 관리
- **에러 경계**: 페이지별 에러 처리

### 3. 의존성 규칙
```
Pages 계층이 참조 가능한 계층:
✅ Widgets    - 복합 UI 컴포넌트
✅ Features   - 비즈니스 기능
✅ Entities   - 도메인 엔티티
✅ Shared     - 공통 유틸리티

❌ App        - 앱 설정 (역방향 의존성)
❌ Pages      - 다른 페이지 (순환 의존성 방지)
```

### 4. 페이지별 특화 컴포넌트
일부 페이지는 해당 페이지에서만 사용되는 UI 컴포넌트를 포함합니다:
- `project-insert/`: 프로젝트 등록 관련 UI (HoneyTipBox, StepBox, TopTitle)
- `user-profile/`: 사용자 프로필 관련 UI (UserNotFound)

## 🛣️ 라우팅 연결

```typescript
// app/routes/App.tsx에서 사용
import HomePage from "@pages/home/ui/HomePage";
import ProjectListPage from "@pages/project-list/ui/ProjectListPage";
import ProjectDetailPage from "@pages/project-detail/ui/ProjectDetailPage";

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectListPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/projects/new" element={<ProjectInsertPage />} />
        <Route path="/profile/:userId" element={<UserProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
```

## ⚠️ 주의사항

### 성능 최적화
- **코드 스플리팅**: 각 페이지는 lazy loading 대상
- **메모이제이션**: 불필요한 리렌더링 방지
- **이미지 최적화**: 페이지별 이미지 lazy loading

### SEO 고려사항
- **메타 태그**: 페이지별 title, description 설정
- **구조화된 데이터**: 프로젝트 상세 페이지 JSON-LD
- **사이트맵**: 동적 페이지 URL 관리

### 접근성
- **키보드 네비게이션**: Tab 순서 관리
- **스크린 리더**: ARIA 속성 설정
- **포커스 관리**: 페이지 전환 시 포커스 초기화

이 구조는 **Feature-Sliced Design** 아키텍처를 따르며, 각 페이지가 명확한 책임을 가지고 확장 가능하도록 설계되었습니다. 