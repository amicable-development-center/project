# GitHub Actions CI/CD 설정 가이드

이 프로젝트는 GitHub Actions을 사용하여 CI/CD 파이프라인을 구성하고 있습니다.

## 워크플로우 구조

### 1. CI/CD Pipeline (`ci-cd.yml`)
- **CI (Continuous Integration)**: feat → develop, develop → main PR에서 실행
- **CD (Continuous Deployment)**: main 브랜치로 push될 때만 실행하여 Vercel Production 배포

### 2. Security Checks (`security.yml`)
- 보안 감사 및 취약점 검사
- CodeQL 분석
- 의존성 검토

### 3. Staging Deployment (`deploy-staging.yml`)
- develop 브랜치에 push될 때 Vercel Preview 환경으로 자동 배포

## 브랜치 전략

- `feat/auth/tkyoun0421` → `develop` (PR 시 CI 실행)
- `develop` → `main` (PR 시 CI 실행, 머지 시 Production 배포)
- `develop` 브랜치에 push시 Staging 환경 자동 배포

## Vercel 배포 설정

Vercel 배포를 위해 다음 GitHub Secrets를 설정해야 합니다:

### 필수 Secrets 설정

1. **VERCEL_TOKEN**
   - Vercel 대시보드에서 생성
   - Settings → Tokens → Create Token

2. **VERCEL_ORG_ID**
   - Vercel CLI 실행: `vercel org ls`
   - 또는 프로젝트 설정에서 확인

3. **VERCEL_PROJECT_ID**
   - Vercel CLI 실행: `vercel project ls`
   - 또는 프로젝트 설정에서 확인

### Secrets 설정 방법

1. GitHub 저장소 → Settings → Secrets and variables → Actions
2. "New repository secret" 클릭
3. 위의 세 개 값을 각각 추가

## 로컬에서 Vercel 설정

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 초기화
vercel

# 환경 변수 확인
vercel env ls

# 로컬에서 배포 테스트
vercel --prod
```

## CI 단계

1. **코드 체크아웃**
2. **pnpm 설정**
3. **Node.js 설정**
4. **의존성 설치**
5. **타입 체크**
6. **린트 검사**
7. **포맷 검사**
8. **빌드**

## CD 단계 (main 브랜치만)

1. **환경 설정**
2. **프로덕션 빌드**
3. **Vercel 배포**

## 주의사항

- main, develop 브랜치로의 직접 push는 권장하지 않습니다
- 모든 변경사항은 PR을 통해 진행해주세요 (feat → develop → main)
- CI 단계를 통과한 후에만 머지가 가능합니다
- develop 브랜치는 Vercel Preview로, main 브랜치는 Production으로 자동 배포됩니다 