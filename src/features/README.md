# Features Layer

> ⚡ **비즈니스 기능 계층** - 사용자 인터랙션과 비즈니스 로직을 담당

## 📖 개요

Features Layer는 **사용자의 액션을 처리하는 비즈니스 기능**들을 담당합니다. Create, Update, Delete 등의 변경 작업과 복잡한 사용자 인터랙션을 처리하며, 여러 entities를 조합하여 완전한 기능을 제공합니다.

## 📁 디렉토리 구조

```
features/
├── auth/                    # 🔐 인증 관련 기능
│   ├── hooks/              # 커스텀 훅
│   │   └── useSocialLogin.ts
│   ├── ui/                 # UI 컴포넌트
│   │   ├── LoginButton.tsx
│   │   ├── LoginForm.tsx
│   │   ├── LoginTitle.tsx
│   │   ├── LogoutButton.tsx
│   │   └── SocialLoginButton.tsx
│   └── index.ts            # 외부 노출 인터페이스
├── projects/               # 📝 프로젝트 관리 기능
│   ├── api/               # API 요청 로직
│   │   ├── createProjectApplicationsApi.ts
│   │   ├── createProjectLikeApi.ts
│   │   ├── projectsApi.ts
│   │   └── userAPi.ts
│   ├── hooks/             # 커스텀 훅
│   │   ├── useApplyForm.ts
│   │   ├── useInsertStep1.ts
│   │   ├── useInsertStep2.ts
│   │   ├── useInsertStep3.ts
│   │   ├── useInsertStep4.ts
│   │   ├── useOptimisticProjectLike.ts
│   │   ├── useProjectInsertForm.ts
│   │   └── useProjectPagination.ts
│   ├── queries/           # React Query 뮤테이션
│   │   ├── useCancelProjectApplication.ts
│   │   ├── useCreateProjectApplications.ts
│   │   ├── useCreateProjectLike.ts
│   │   ├── useProjectApply.ts
│   │   ├── useProjectDone.ts
│   │   └── useProjectInsert.ts
│   ├── types/             # 타입 정의
│   │   └── project-update.ts
│   └── ui/                # UI 컴포넌트
│       ├── project-insert/
│       │   ├── Step1.tsx
│       │   ├── Step2.tsx
│       │   ├── Step3.tsx
│       │   └── Step4.tsx
│       ├── ProjectApplyForm.tsx
│       ├── ProjectDelete.tsx
│       ├── ProjectLike.tsx
│       └── ProjectModify.tsx
├── email/                  # 📧 이메일 발송 기능
│   ├── api/               # API 로직
│   │   └── emailApi.ts
│   ├── hooks/             # 커스텀 훅
│   │   └── useEmailForm.ts
│   ├── queries/           # React Query 뮤테이션
│   │   └── useSendEmail.ts
│   ├── types/             # 타입 정의
│   │   └── email.ts
│   └── ui/                # UI 컴포넌트
│       ├── EmailField.tsx
│       ├── EmailModal.tsx
│       ├── MessageField.tsx
│       ├── PositionSelect.tsx
│       └── SubjectField.tsx
└── README.md              # 이 파일
```

## ⚡ 주요 Feature 모듈

### 1. Auth Feature (인증)

사용자 인증과 관련된 모든 기능을 담당합니다.

#### 핵심 기능
- **소셜 로그인**: Google, GitHub OAuth 인증
- **로그아웃**: 세션 종료 및 토큰 정리
- **인증 상태 관리**: Firebase Auth 연동

#### 주요 컴포넌트

```typescript
// features/auth/ui/SocialLoginButton.tsx
interface SocialLoginButtonProps {
  provider: 'google' | 'github';
  onSuccess?: (user: User) => void;
  onError?: (error: Error) => void;
}

const SocialLoginButton = ({ 
  provider, 
  onSuccess, 
  onError 
}: SocialLoginButtonProps): JSX.Element => {
  const { mutate: socialLogin, isPending } = useSocialLogin();

  const handleLogin = async () => {
    try {
      const user = await socialLogin(provider);
      onSuccess?.(user);
    } catch (error) {
      onError?.(error as Error);
    }
  };

  return (
    <Button
      fullWidth
      variant="outlined"
      onClick={handleLogin}
      disabled={isPending}
      startIcon={provider === 'google' ? <GoogleIcon /> : <GitHubIcon />}
      sx={{
        py: 1.5,
        textTransform: 'none',
        fontSize: '1rem',
      }}
    >
      {isPending ? (
        <CircularProgress size={24} />
      ) : (
        `${provider === 'google' ? 'Google' : 'GitHub'}로 계속하기`
      )}
    </Button>
  );
};
```

#### 커스텀 훅

```typescript
// features/auth/hooks/useSocialLogin.ts
export const useSocialLogin = () => {
  return useMutation({
    mutationFn: async (provider: 'google' | 'github') => {
      const authProvider = provider === 'google' 
        ? new GoogleAuthProvider()
        : new GithubAuthProvider();
        
      const result = await signInWithPopup(auth, authProvider);
      return result.user;
    },
    onSuccess: (user) => {
      // 성공 시 사용자 정보 저장
      console.log('로그인 성공:', user);
      // 홈페이지로 리다이렉트 또는 상태 업데이트
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      // 에러 처리 (토스트 메시지 등)
    },
  });
};
```

### 2. Projects Feature (프로젝트 관리)

프로젝트의 생성, 수정, 삭제, 좋아요 등 모든 상태 변경을 담당합니다.

#### 핵심 기능
- **프로젝트 등록**: 4단계 위저드 폼
- **프로젝트 지원**: 프로젝트 신청 및 취소
- **좋아요 시스템**: 관심 프로젝트 북마크
- **프로젝트 수정/삭제**: 소유자 권한 관리

#### 프로젝트 등록 플로우

```typescript
// features/projects/ui/project-insert/Step1.tsx
const Step1 = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<ProjectInsertFormData>();

  const { nextStep } = useInsertStep1();

  return (
    <StepWhiteBox>
      <Box mb={4}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          프로젝트 기본 정보
        </Typography>
        <Typography variant="body2" color="text.secondary">
          프로젝트의 기본적인 정보를 입력해주세요.
        </Typography>
      </Box>

      <ProjectTitleCard register={register} errors={errors} />
      <ProjectOneLineCard register={register} errors={errors} />
      <ProjectCategoryCard register={register} errors={errors} />
      
      <Box mt={4} textAlign="right">
        <Button
          variant="contained"
          onClick={nextStep}
          disabled={!watch('title') || !watch('oneline') || !watch('category')}
        >
          다음 단계
        </Button>
      </Box>
    </StepWhiteBox>
  );
};
```

#### 좋아요 시스템 (낙관적 업데이트)

```typescript
// features/projects/hooks/useOptimisticProjectLike.ts
export const useOptimisticProjectLike = (projectId: string) => {
  const queryClient = useQueryClient();
  const { user } = useAuthObserver();

  const { mutate: toggleLike } = useMutation({
    mutationFn: createProjectLikeApi,
    
    // 낙관적 업데이트
    onMutate: async ({ projectId, userId, isLiked }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: ['project', projectId] });
      
      // 이전 데이터 백업
      const previousData = queryClient.getQueryData(['project', projectId]);
      
      // 낙관적으로 UI 업데이트
      queryClient.setQueryData(['project', projectId], (old: any) => ({
        ...old,
        isLiked: !isLiked,
        likeCount: isLiked ? old.likeCount - 1 : old.likeCount + 1,
      }));
      
      return { previousData };
    },
    
    // 실패 시 롤백
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['project', projectId], context.previousData);
      }
    },
    
    // 성공/실패 관계없이 데이터 재검증
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
  });

  return { toggleLike };
};
```

#### 프로젝트 지원 시스템

```typescript
// features/projects/ui/ProjectApplyForm.tsx
const ProjectApplyForm = ({ projectId, onClose }: Props): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useApplyForm();
  const { mutate: applyProject, isPending } = useCreateProjectApplications();

  const onSubmit = (data: ApplyFormData) => {
    applyProject({
      projectId,
      message: data.message,
      position: data.position,
      experience: data.experience,
    }, {
      onSuccess: () => {
        onClose();
        // 성공 알림
      },
    });
  };

  return (
    <Dialog open onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>프로젝트 지원하기</DialogTitle>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <PositionSelect 
              register={register} 
              errors={errors} 
            />
            
            <TextField
              {...register('message', { 
                required: '지원 메시지를 입력해주세요',
                minLength: { value: 50, message: '최소 50자 이상 입력해주세요' }
              })}
              label="지원 메시지"
              multiline
              rows={6}
              error={!!errors.message}
              helperText={errors.message?.message}
              placeholder="프로젝트에 지원하는 이유와 기여할 수 있는 부분을 작성해주세요."
            />
          </Stack>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={isPending}
          >
            {isPending ? '지원 중...' : '지원하기'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
```

### 3. Email Feature (이메일 발송)

EmailJS를 통한 프로젝트 문의 및 소통 기능을 담당합니다.

#### 핵심 기능
- **프로젝트 문의**: 프로젝트 리더에게 직접 연락
- **이메일 템플릿**: 구조화된 메시지 포맷
- **실시간 발송**: EmailJS 클라이언트 사이드 발송

#### 이메일 모달 컴포넌트

```typescript
// features/email/ui/EmailModal.tsx
interface EmailModalProps {
  open: boolean;
  onClose: () => void;
  recipient: {
    name: string;
    email: string;
  };
  project: {
    id: string;
    title: string;
  };
}

const EmailModal = ({ 
  open, 
  onClose, 
  recipient, 
  project 
}: EmailModalProps): JSX.Element => {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isValid } 
  } = useEmailForm();
  
  const { mutate: sendEmail, isPending } = useSendEmail();

  const onSubmit = (data: EmailFormData) => {
    sendEmail({
      to_name: recipient.name,
      to_email: recipient.email,
      from_name: data.senderName,
      from_email: data.senderEmail,
      project_title: project.title,
      position: data.position,
      subject: data.subject,
      message: data.message,
    }, {
      onSuccess: () => {
        reset();
        onClose();
        // 성공 알림
      },
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          {recipient.name}님에게 연락하기
        </Typography>
        <Typography variant="body2" color="text.secondary">
          프로젝트: {project.title}
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <EmailField register={register} errors={errors} />
            <PositionSelect register={register} errors={errors} />
            <SubjectField register={register} errors={errors} />
            <MessageField register={register} errors={errors} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>취소</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid || isPending}
            startIcon={isPending ? <CircularProgress size={16} /> : <SendIcon />}
          >
            {isPending ? '발송 중...' : '메시지 보내기'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
```

#### EmailJS API 연동

```typescript
// features/email/api/emailApi.ts
import emailjs from '@emailjs/browser';

interface EmailData {
  to_name: string;
  to_email: string;
  from_name: string;
  from_email: string;
  project_title: string;
  position: string;
  subject: string;
  message: string;
}

export const sendEmailApi = async (emailData: EmailData): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('이메일 설정이 완료되지 않았습니다.');
  }

  try {
    console.log('📧 이메일 발송 시작:', {
      service: serviceId,
      template: templateId,
      to: emailData.to_email,
    });

    const result = await emailjs.send(
      serviceId,
      templateId,
      emailData,
      publicKey
    );

    console.log('✅ 이메일 발송 성공:', result);
    
    if (result.status !== 200) {
      throw new Error(`이메일 발송 실패: ${result.text}`);
    }
  } catch (error) {
    console.error('❌ 이메일 발송 실패:', error);
    throw new Error('이메일 발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
  }
};
```

## 🏗️ 아키텍처 패턴

### 1. Command Pattern (명령 패턴)

사용자 액션을 명령 객체로 캡슐화합니다.

```typescript
// 좋아요 토글 명령
const toggleLikeCommand = {
  execute: async (projectId: string, userId: string) => {
    const isCurrentlyLiked = await checkIsLiked(projectId, userId);
    return isCurrentlyLiked 
      ? await removeLike(projectId, userId)
      : await addLike(projectId, userId);
  },
  undo: async (projectId: string, userId: string) => {
    // 되돌리기 로직
  },
};
```

### 2. Repository Pattern (저장소 패턴)

데이터 접근 로직을 추상화합니다.

```typescript
// features/projects/api/projectsApi.ts
export const projectRepository = {
  create: (data: CreateProjectData) => 
    addDoc(collection(db, 'projects'), data),
    
  update: (id: string, data: UpdateProjectData) => 
    updateDoc(doc(db, 'projects', id), data),
    
  delete: (id: string) => 
    deleteDoc(doc(db, 'projects', id)),
    
  like: (projectId: string, userId: string) =>
    setDoc(doc(db, 'likes', `${projectId}_${userId}`), {
      projectId,
      userId,
      createdAt: serverTimestamp(),
    }),
};
```

### 3. Form State Management

React Hook Form과 Zod를 활용한 폼 상태 관리입니다.

```typescript
// features/projects/hooks/useProjectInsertForm.ts
export const useProjectInsertForm = () => {
  const form = useForm<ProjectInsertFormData>({
    resolver: zodResolver(projectInsertSchema),
    defaultValues: {
      title: '',
      oneline: '',
      category: '',
      techStack: [],
      positions: [],
      // ... 기타 필드
    },
    mode: 'onChange', // 실시간 유효성 검사
  });

  const { data: stepData, setStepData } = useProjectStore();

  // 단계별 데이터 동기화
  useEffect(() => {
    if (stepData) {
      form.reset(stepData);
    }
  }, [stepData, form]);

  return {
    ...form,
    saveStepData: (data: Partial<ProjectInsertFormData>) => {
      setStepData({ ...stepData, ...data });
    },
  };
};
```

## 🔗 의존성 관계

### 허용되는 참조
```typescript
// ✅ Entities Layer 참조 (데이터 표시용)
import { ProjectCard } from '@entities/projects';
import { UserProfile } from '@entities/user';

// ✅ Shared Layer 참조 (공통 유틸리티)
import { Button, Modal } from '@shared/ui';
import { useApi, useForm } from '@shared/hooks';
import { validateEmail } from '@shared/libs/utils';
```

### 금지되는 참조
```typescript
// ❌ Pages Layer 참조 금지
import { ProjectListPage } from '@pages/project-list';

// ❌ Widgets Layer 참조 금지
import { Header } from '@widgets/Header';

// ❌ 다른 Features 직접 참조 금지
import { LoginForm } from '@features/auth';

// ❌ App Layer 참조 금지
import { App } from '@app/routes/App';
```

## 🚀 비즈니스 로직 패턴

### 1. 낙관적 업데이트

사용자 경험 향상을 위한 즉시 UI 반영입니다.

```typescript
const useOptimisticUpdate = (queryKey: string[]) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData(queryKey);
      
      queryClient.setQueryData(queryKey, newData);
      return { previousData };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};
```

### 2. 단계별 폼 상태 관리

복잡한 폼을 단계별로 관리합니다.

```typescript
// Zustand 스토어로 단계 간 데이터 공유
export const useProjectInsertStore = create<ProjectInsertState>((set, get) => ({
  currentStep: 1,
  formData: {},
  
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 4) 
  })),
  
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 1) 
  })),
  
  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),
  
  resetForm: () => set({ currentStep: 1, formData: {} }),
}));
```

### 3. 에러 처리 및 재시도

견고한 에러 처리 메커니즘입니다.

```typescript
export const useResilientMutation = <T, U>(
  mutationFn: (data: T) => Promise<U>,
  options?: {
    retries?: number;
    retryDelay?: number;
  }
) => {
  return useMutation({
    mutationFn,
    retry: options?.retries ?? 3,
    retryDelay: (attemptIndex) => 
      Math.min(1000 * 2 ** attemptIndex, 30000), // 지수 백오프
    
    onError: (error) => {
      // 전역 에러 처리
      if (error.message.includes('auth')) {
        // 인증 에러 처리
        redirectToLogin();
      } else if (error.message.includes('network')) {
        // 네트워크 에러 처리
        showNetworkErrorToast();
      } else {
        // 일반 에러 처리
        showErrorToast(error.message);
      }
    },
  });
};
```

## 📊 성능 최적화

### 1. 지연 로딩

무거운 컴포넌트의 지연 로딩입니다.

```typescript
// 프로젝트 등록 폼 지연 로딩
const ProjectInsertForm = lazy(() => 
  import('./project-insert/ProjectInsertForm')
);

const ProjectInsertPage = (): JSX.Element => {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <ProjectInsertForm />
    </Suspense>
  );
};
```

### 2. 메모이제이션

비싼 계산의 캐싱입니다.

```typescript
const ProjectApplyForm = ({ project }: Props): JSX.Element => {
  // 프로젝트 분석 결과 캐싱
  const analysis = useMemo(() => {
    return analyzeProjectRequirements(project);
  }, [project.id, project.requirements]);

  // 폼 유효성 검사 결과 캐싱
  const isFormValid = useMemo(() => {
    return validateProjectForm(formData);
  }, [formData]);

  return (
    // 폼 렌더링
  );
};
```

### 3. 디바운싱

실시간 검색 및 자동 저장입니다.

```typescript
export const useAutosave = (
  data: ProjectInsertFormData,
  saveFunction: (data: ProjectInsertFormData) => void
) => {
  const debouncedSave = useMemo(
    () => debounce(saveFunction, 2000),
    [saveFunction]
  );

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      debouncedSave(data);
    }
  }, [data, debouncedSave]);

  return debouncedSave;
};
```

## 📱 사용자 경험 (UX)

### 1. 로딩 상태 관리

모든 액션에 적절한 로딩 표시를 제공합니다.

```typescript
const ProjectLikeButton = ({ projectId }: Props): JSX.Element => {
  const { mutate: toggleLike, isPending } = useOptimisticProjectLike(projectId);

  return (
    <Button
      onClick={() => toggleLike(projectId)}
      disabled={isPending}
      startIcon={
        isPending ? (
          <CircularProgress size={16} />
        ) : (
          <FavoriteIcon />
        )
      }
    >
      {isPending ? '처리 중...' : '좋아요'}
    </Button>
  );
};
```

### 2. 실시간 피드백

사용자 액션에 즉시 피드백을 제공합니다.

```typescript
const useToastNotification = () => {
  const { showSnackbar } = useSnackbarStore();

  return {
    success: (message: string) => 
      showSnackbar({ message, severity: 'success' }),
    error: (message: string) => 
      showSnackbar({ message, severity: 'error' }),
    info: (message: string) => 
      showSnackbar({ message, severity: 'info' }),
  };
};
```

### 3. 접근성 지원

키보드 네비게이션과 스크린 리더를 지원합니다.

```typescript
const ProjectApplyButton = ({ project }: Props): JSX.Element => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleApply();
    }
  };

  return (
    <Button
      onClick={handleApply}
      onKeyDown={handleKeyDown}
      aria-label={`${project.title} 프로젝트에 지원하기`}
      aria-describedby={`project-${project.id}-description`}
    >
      지원하기
    </Button>
  );
};
```

---

## 📝 개발 가이드라인

1. **단일 책임 원칙**: 각 feature는 하나의 비즈니스 도메인만 담당
2. **상태 변경 중심**: CUD 로직만 포함, Read 로직은 entities에서 처리
3. **사용자 중심 설계**: 모든 인터랙션에 적절한 피드백 제공
4. **에러 처리**: 모든 비동기 작업에 에러 처리 구현
5. **성능 고려**: 불필요한 리렌더링 방지 및 최적화 적용
6. **접근성**: ARIA 표준 준수 및 키보드 네비게이션 지원

💡 **팁**: Feature가 복잡해지면 여러 개의 작은 feature로 분리하고, entities와의 경계를 명확히 유지하세요! 