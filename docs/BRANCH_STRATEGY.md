# 브랜치 전략 (Branch Strategy)

## 개요

본 프로젝트는 **Feature Branch Workflow**를 기반으로 한 브랜치 전략을 사용합니다. 기능별로 브랜치를 분기하여 개발하고, Pull Request를 통해 코드 리뷰 후 메인 브랜치에 병합합니다.

## 브랜치 구조

```
main
├── feat/auth
│   ├── feat/auth/tkyoun0421
│   └── feat/auth/developer2
├── feat/user-profile
│   └── feat/user-profile/developer3
├── fix/login-bug
└── chore/setup-ci
```

## 브랜치 종류

### 1. `main` 브랜치
- **목적**: 배포 가능한 안정적인 코드 유지
- **특징**: 
  - 항상 배포 가능한 상태
  - 직접 커밋 금지 (Pull Request를 통해서만 병합)
  - 모든 기능 브랜치의 최종 병합 대상

### 2. 기능 브랜치 (Feature Branch)
- **네이밍 규칙**: `feat/기능명`
- **예시**: `feat/auth`, `feat/user-profile`, `feat/dashboard`
- **목적**: 특정 기능 개발을 위한 브랜치
- **생명주기**: 기능 개발 완료 → PR 승인 → main 병합 → 삭제

### 3. 개인 브랜치 (Personal Branch)
- **네이밍 규칙**: `feat/기능명/깃허브아이디`
- **예시**: `feat/auth/tkyoun0421`, `feat/auth/developer2`
- **목적**: 여러 개발자가 하나의 기능을 협업할 때 사용
- **생명주기**: 개인 작업 완료 → 기능 브랜치로 PR → 병합 → 삭제

### 4. 기타 브랜치
- **버그 수정**: `fix/버그명` (예: `fix/login-error`)
- **문서 작업**: `docs/문서명` (예: `docs/api-guide`)
- **리팩토링**: `refactor/대상` (예: `refactor/auth-logic`)
- **환경 설정**: `chore/작업명` (예: `chore/setup-eslint`)

## 워크플로우

### 단독 개발자 워크플로우

```bash
# 1. main 브랜치에서 기능 브랜치 생성
git checkout main
git pull origin main
git checkout -b feat/user-profile

# 2. 개발 진행
git add .
git commit -m "feat: add user profile component"

# 3. 원격 저장소에 푸시
git push origin feat/user-profile

# 4. GitHub에서 main으로 Pull Request 생성
# 5. 코드 리뷰 후 승인되면 병합
# 6. 로컬에서 브랜치 정리
git checkout main
git pull origin main
git branch -d feat/user-profile
```

### 협업 개발자 워크플로우

#### 기능 브랜치 생성 (팀 리더 또는 첫 번째 개발자)

```bash
# 1. main에서 기능 브랜치 생성
git checkout main
git pull origin main
git checkout -b feat/auth
git push origin feat/auth
```

#### 개인 브랜치에서 작업

```bash
# 1. 기능 브랜치에서 개인 브랜치 생성
git checkout feat/auth
git pull origin feat/auth
git checkout -b feat/auth/tkyoun0421

# 2. 개발 진행
git add .
git commit -m "feat: implement login validation"

# 3. 개인 브랜치 푸시
git push origin feat/auth/tkyoun0421

# 4. feat/auth로 Pull Request 생성
```

#### 기능 브랜치 통합 및 메인 병합

```bash
# 1. 모든 개인 작업이 feat/auth에 병합된 후
# 2. feat/auth에서 main으로 Pull Request 생성
# 3. 최종 코드 리뷰 후 main에 병합
# 4. 브랜치 정리
git branch -d feat/auth/tkyoun0421
git branch -d feat/auth
```

## Pull Request 규칙

### PR 제목 규칙
- **개인 → 기능 브랜치**: `feat: [기능명] 개발자별 작업 내용`
  - 예: `feat: [auth] implement login form validation`
- **기능 → main 브랜치**: `feat: [기능명] 전체 기능 구현`
  - 예: `feat: [auth] complete authentication system`

### PR 설명 템플릿

```markdown
## 개요
이 PR의 목적과 구현 내용을 간단히 설명합니다.

## 변경 사항
- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] 리팩토링
- [ ] 문서 수정

## 구현 내용
- 구체적인 구현 내용 1
- 구체적인 구현 내용 2

## 개발 후기 및 개선사항
### 이번 작업에서 배운 점
- (없다면 패스)

### 어려웠던 점 / 에로사항
- (없다면 패스)

### 다음에 개선하고 싶은 점
- (없다면 패스)

### 팀원들과 공유하고 싶은 팁
- (없다면 패스)
```

## 커밋 컨벤션

### 커밋 메시지 형식
```
type(scope): subject

body (선택사항)

footer (선택사항)
```

### 커밋 타입
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포매팅, 세미콜론 누락 등
- `refactor`: 코드 리팩토링

- `chore`: 빌드 업무, 패키지 매니저 설정 등

### 예시
```bash
feat(auth): add login form validation
fix(user): resolve profile image upload issue
docs(readme): update installation guide
refactor(api): simplify user service logic
```

## 충돌 해결 가이드

### 기능 브랜치에서 충돌 발생 시

```bash
# 1. 최신 main 브랜치 내용을 기능 브랜치로 가져오기
git checkout feat/auth
git pull origin main

# 2. 충돌 해결 후 커밋
git add .
git commit -m "resolve: merge conflicts with main"

# 3. 개인 브랜치들도 업데이트
git checkout feat/auth/tkyoun0421
git pull origin feat/auth
```

### 개인 브랜치 간 충돌 해결

```bash
# 1. 기능 브랜치를 최신 상태로 유지
git checkout feat/auth
git pull origin feat/auth

# 2. 개인 브랜치에서 rebase 또는 merge
git checkout feat/auth/tkyoun0421
git rebase feat/auth
# 또는
git merge feat/auth

# 3. 충돌 해결 후 진행
```

## 주의사항

1. **main 브랜치 직접 커밋 금지**
   - 모든 변경사항은 Pull Request를 통해서만 병합

2. **브랜치 명명 규칙 엄수**
   - 일관된 네이밍으로 브랜치 관리 효율화

3. **정기적인 브랜치 정리**
   - 병합 완료된 브랜치는 즉시 삭제

4. **커밋 단위 최소화**
   - 하나의 논리적 변경사항 = 하나의 커밋

5. **Pull Request 리뷰 필수**
   - 최소 1명 이상의 리뷰어 승인 후 병합

## 도구 및 설정

### Git Hooks
- **pre-commit**: ESLint + Prettier 자동 실행
- **commit-msg**: 커밋 메시지 컨벤션 검사

### 브랜치 보호 규칙 (GitHub 설정)
- main 브랜치 직접 푸시 금지
- Pull Request 리뷰 필수
- 상태 검사 통과 필수 (CI/CD)
- 브랜치 최신 상태 유지 필수

---

> 이 브랜치 전략은 팀의 개발 규모와 상황에 따라 조정될 수 있습니다. 
> 문의사항이나 개선 제안이 있다면 팀 리더에게 연락해주세요. 