# Shared Layer

모든 계층에서 공통으로 사용되는 유틸리티와 기본 컴포넌트를 제공하는 최하위 계층입니다.

## 🎯 핵심 개념

Shared는 **재사용 가능한 공통 자원**을 제공합니다:
- ✅ **공통 UI 컴포넌트**: Button, Input, Modal 등 기본 컴포넌트
- ✅ **유틸리티 함수**: 날짜, 문자열, 배열 처리 등
- ✅ **상수**: API URL, 설정값 등
- ✅ **타입**: 공통으로 사용되는 TypeScript 타입
- ✅ **훅**: 범용적으로 사용되는 커스텀 훅

## 📁 구조

```
shared/
├── ui/
│   ├── button/
│   │   ├── Button.tsx
│   │   ├── Button.module.css
│   │   └── index.ts
│   ├── input/
│   │   ├── Input.tsx
│   │   └── index.ts
│   ├── modal/
│   │   ├── Modal.tsx
│   │   └── index.ts
│   └── index.ts
├── libs/
│   ├── utils/
│   │   ├── dateUtils.ts
│   │   ├── stringUtils.ts
│   │   └── index.ts
│   ├── validation/
│   │   ├── validators.ts
│   │   └── index.ts
│   └── index.ts
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useDebounce.ts
│   └── index.ts
├── types/
│   ├── common.ts
│   ├── api.ts
│   └── index.ts
├── constants/
│   ├── api.ts
│   ├── config.ts
│   └── index.ts
└── index.ts
```

## 📄 폴더별 표준 구조

### ui/ - 공통 UI 컴포넌트
모든 기본 UI 컴포넌트를 포함합니다.

```
ui/
├── component-name/
│   ├── ComponentName.tsx      # 메인 컴포넌트
│   ├── ComponentName.module.css  # 스타일 (선택적)
│   ├── ComponentName.stories.tsx # Storybook (선택적)
│   └── index.ts               # Export
└── index.ts                   # 전체 UI 컴포넌트 Export
```

### libs/ - 유틸리티 함수
범용적인 헬퍼 함수들을 포함합니다.

```
libs/
├── category-name/
│   ├── functionName.ts
│   └── index.ts
└── index.ts
```

### hooks/ - 공통 커스텀 훅
재사용 가능한 React 훅들을 포함합니다.

### types/ - 공통 타입 정의
여러 계층에서 사용되는 TypeScript 타입들을 정의합니다.

### constants/ - 상수 정의
앱 전체에서 사용되는 상수값들을 정의합니다.

## 🔧 사용 예시

### 1. UI 컴포넌트

```typescript
// shared/ui/button/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  onClick 
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`btn btn--${variant} btn--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
export type { ButtonProps };
```

```typescript
// shared/ui/input/Input.tsx
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const Input = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error,
  disabled = false 
}: InputProps): JSX.Element => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className={`input ${error ? 'input--error' : ''}`}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export { Input };
export type { InputProps };
```

### 2. 유틸리티 함수

```typescript
// shared/libs/utils/dateUtils.ts
export const dateUtils = {
  formatDate: (date: Date, format: string = 'YYYY-MM-DD'): string => {
    // 날짜 포매팅 로직
    return date.toISOString().split('T')[0];
  },
  
  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  
  isToday: (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  },
};
```

```typescript
// shared/libs/validation/validators.ts
export const validators = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  password: (password: string): { isValid: boolean; message?: string } => {
    if (password.length < 8) {
      return { isValid: false, message: '비밀번호는 8자 이상이어야 합니다.' };
    }
    return { isValid: true };
  },
  
  required: (value: string): boolean => {
    return value.trim().length > 0;
  },
};
```

### 3. 커스텀 훅

```typescript
// shared/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
};
```

```typescript
// shared/hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
```

### 4. 공통 타입

```typescript
// shared/types/common.ts
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
```

### 5. 상수

```typescript
// shared/constants/api.ts
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
  },
  USERS: {
    LIST: '/api/users',
    DETAIL: (id: string) => `/api/users/${id}`,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
```

### 6. Export 구조

```typescript
// shared/ui/index.ts
export { Button } from './button';
export { Input } from './input';
export { Modal } from './modal';
export type { ButtonProps } from './button';
export type { InputProps } from './input';
```

```typescript
// shared/index.ts
export * from './ui';
export * from './libs';
export * from './hooks';
export * from './types';
export * from './constants';
```

## 📋 개발 가이드라인

### 1. 명명 규칙
- 컴포넌트: PascalCase (예: `Button`, `Modal`)
- 함수: camelCase (예: `formatDate`, `validateEmail`)
- 상수: UPPER_SNAKE_CASE (예: `API_ENDPOINTS`, `HTTP_STATUS`)
- 파일: kebab-case (예: `date-utils.ts`, `use-local-storage.ts`)

### 2. 컴포넌트 설계 원칙
- **범용성**: 특정 도메인에 종속되지 않는 범용 컴포넌트
- **재사용성**: 다양한 상황에서 사용 가능한 유연한 API
- **확장성**: variant, size 등의 props로 다양한 변형 지원
- **접근성**: 웹 접근성 가이드라인 준수

### 3. 유틸리티 함수 원칙
- **순수 함수**: 사이드 이펙트 없는 순수 함수로 작성
- **타입 안전성**: 명확한 입력/출력 타입 정의
- **에러 처리**: 예외 상황에 대한 적절한 처리
- **테스트 가능성**: 단위 테스트가 용이한 구조

### 4. 의존성 규칙
- **독립성**: 다른 모든 계층과 독립적
- **외부 의존성**: 외부 라이브러리는 최소한으로 사용
- **순환 참조 금지**: 다른 계층에서 Shared를 참조하므로 순환 참조 방지

## 🎨 컴포넌트 예시

### 기본 UI 컴포넌트
```typescript
// 단순하고 재사용 가능한 컴포넌트
const Badge = ({ children, variant = 'default' }: BadgeProps): JSX.Element => (
  <span className={`badge badge--${variant}`}>{children}</span>
);
```

### 조합 가능한 컴포넌트
```typescript
// 여러 부분으로 구성된 복합 컴포넌트
const Card = ({ children }: CardProps): JSX.Element => (
  <div className="card">{children}</div>
);

const CardHeader = ({ children }: CardHeaderProps): JSX.Element => (
  <div className="card-header">{children}</div>
);

const CardBody = ({ children }: CardBodyProps): JSX.Element => (
  <div className="card-body">{children}</div>
);

// 사용 예시
<Card>
  <CardHeader>제목</CardHeader>
  <CardBody>내용</CardBody>
</Card>
```

## ⚠️ 주의사항

- **범용성 유지**: 특정 비즈니스 로직을 포함하지 마세요
- **최소 기능 원칙**: 필요한 최소한의 기능만 제공하세요
- **Breaking Changes 주의**: Shared 컴포넌트 변경은 전체 앱에 영향을 미칩니다
- **문서화**: 모든 컴포넌트와 함수는 명확한 문서를 작성하세요
- **테스트**: 공통 컴포넌트는 반드시 테스트 코드를 작성하세요 