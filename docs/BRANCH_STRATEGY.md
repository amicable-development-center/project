# 브랜치 전략 (Branch Strategy)

## 개요

본 프로젝트는 **Feature Branch Workflow**를 기반으로 한 브랜치 전략을 사용합니다. 기능별로 브랜치를 분기하여 개발하고, Pull Request를 통해 코드 리뷰 후 메인 브랜치에 병합합니다.

## 브랜치 구조

```
main
├── develop
│   ├── feat/auth/tkyoun0421
│   ├── feat/auth/developer2
│   ├── feat/user-profile/developer3
│   ├── fix/login-bug
│   └── chore/setup-ci
```

## 브랜치 종류

### 1. `main` 브랜치
- **목적**: 프로덕션 배포용 브랜치
- **특징**: 
  - 항상 배포 가능한 안정적인 상태
  - 직접 커밋 금지 (Pull Request를 통해서만 병합)
  - develop 브랜치에서만 병합 허용
  - Vercel Production 자동 배포

### 2. `develop` 브랜치
- **목적**: 개발 통합 브랜치 (스테이징 환경)
- **특징**:
  - 모든 기능 브랜치들이 병합되는 통합 브랜치
  - 직접 커밋 금지 (Pull Request를 통해서만 병합)
  - Vercel Preview 자동 배포
  - main 브랜치로 병합 전 최종 테스트 환경

### 3. 기능 브랜치 (Feature Branch)
- **네이밍 규칙**: `feat/기능명/깃허브아이디`
- **예시**: `feat/auth/tkyoun0421`, `feat/user-profile/developer2`
- **목적**: 개별 기능 개발을 위한 브랜치
- **생명주기**: 개인 작업 완료 → develop 브랜치로 PR → 병합 → 삭제

### 4. 개인 브랜치
- **버그 수정**: `fix/버그명/깃허브아이디` (예: `fix/login-error/tkyoun0421`)
- **문서 작업**: `docs/문서명/깃허브아이디` (예: `docs/api-guide/developer2`)
- **리팩토링**: `refactor/대상/깃허브아이디` (예: `refactor/auth-logic/tkyoun0421`)
- **환경 설정**: `chore/작업명/깃허브아이디` (예: `chore/setup-eslint/developer2`)

## 워크플로우

### 개발자 워크플로우

```bash
# 1. develop 브랜치에서 기능 브랜치 생성
git checkout develop
git pull origin develop
git checkout -b feat/user-profile/tkyoun0421

# 2. 개발 진행
git add .
git commit -m "feat: add user profile component"

# 3. 원격 저장소에 푸시
git push origin feat/user-profile/tkyoun0421

# 4. GitHub에서 develop으로 Pull Request 생성
# 5. 코드 리뷰 후 승인되면 develop에 병합 (Vercel Preview 자동 배포)
# 6. develop에서 main으로 최종 PR 생성 후 병합 (Production 배포)
# 7. 로컬에서 브랜치 정리
git checkout develop
git pull origin develop
git branch -d feat/user-profile/tkyoun0421
```

### 배포 워크플로우

#### develop → main 배포 프로세스

```bash
# 1. develop 브랜치가 충분히 테스트되고 안정적인 상태일 때
git checkout develop
git pull origin develop

# 2. GitHub에서 develop → main으로 Pull Request 생성
# 3. 최종 코드 리뷰 및 배포 승인
# 4. main 브랜치로 병합 → Vercel Production 자동 배포
```

#### 환경별 배포 상태

- **develop 브랜치**: Vercel Preview 환경 (스테이징)
- **main 브랜치**: Vercel Production 환경 (운영)

## Pull Request 규칙

### PR 제목 규칙
- **기능 → develop 브랜치**: `feat: [기능명] 기능 구현`
  - 예: `feat: [auth] implement login form validation`
- **develop → main 브랜치**: `release: [버전] 스테이징 테스트 완료`
  - 예: `release: v1.2.0 authentication system deployment`

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
type(scope: 생략 가능): subject

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
# 1. 최신 develop 브랜치 내용을 기능 브랜치로 가져오기
git checkout feat/auth/tkyoun0421
git pull origin develop

# 2. 충돌 해결 후 커밋
git add .
git commit -m "resolve: merge conflicts with develop"

# 3. 원격 저장소에 푸시
git push origin feat/auth/tkyoun0421
```

### develop 브랜치 최신 상태 유지

```bash
# 1. 정기적으로 develop 브랜치를 최신 상태로 유지
git checkout develop
git pull origin develop

# 2. 작업 중인 기능 브랜치에 develop 변경사항 적용
git checkout feat/auth/tkyoun0421
git rebase develop
# 또는
git merge develop

# 3. 충돌 해결 후 진행
```

## 주의사항

1. **main, develop 브랜치 직접 커밋 금지**
   - 모든 변경사항은 Pull Request를 통해서만 병합

2. **브랜치 명명 규칙 엄수**
   - `feat/기능명/깃허브아이디` 형식으로 일관된 네이밍

3. **정기적인 브랜치 정리**
   - develop에 병합 완료된 기능 브랜치는 즉시 삭제

4. **커밋 단위 최소화**
   - 하나의 논리적 변경사항 = 하나의 커밋

5. **Pull Request 리뷰 필수**
   - develop, main 브랜치 병합 시 최소 1명 이상의 리뷰어 승인 필수

6. **환경별 테스트 필수**
   - develop: Vercel Preview에서 충분한 테스트 후 main 병합
   - main: Production 배포 전 최종 검토

## 도구 및 설정

### Git Hooks
- **pre-commit**: ESLint + Prettier 자동 실행
- **commit-msg**: 커밋 메시지 컨벤션 검사

### 브랜치 보호 규칙 (GitHub 설정)
- main, develop 브랜치 직접 푸시 금지
- Pull Request 리뷰 필수
- 상태 검사 통과 필수 (CI/CD)
- 브랜치 최신 상태 유지 필수

### 자동 배포 설정
- **develop 브랜치**: Vercel Preview 자동 배포 (스테이징)
- **main 브랜치**: Vercel Production 자동 배포 (운영)

---

> 이 브랜치 전략은 팀의 개발 규모와 상황에 따라 조정될 수 있습니다. 
> 문의사항이나 개선 제안이 있다면 팀 리더에게 연락해주세요. 