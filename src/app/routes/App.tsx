import type { JSX } from "react";
import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "@app/routes/AuthLayout";
import MainLayout from "@app/routes/MainLayout";

import { useAuthObserver } from "@shared/hooks/useAuthObserver";

const HomePage = lazy(() => import("@pages/home/ui/HomePage"));
const NotFoundPage = lazy(() => import("@pages/not-found/ui/NotFoundPage"));
const UserProfilePage = lazy(
  () => import("@pages/user-profile/ui/UserProfilePage")
);
const ProjectListPage = lazy(
  () => import("@pages/project-list/ui/ProjectListPage")
);
const ProjectDetailPage = lazy(
  () => import("@pages/project-detail/ui/ProjectDetailPage")
);
const ProjectInsertPage = lazy(
  () => import("@pages/project-insert/ui/ProjectInsertPage")
);
const LoginPage = lazy(() => import("@pages/login/ui/LoginPage"));
const SignUpPage = lazy(() => import("@pages/signup/ui/SignUpPage"));

function App(): JSX.Element {
  useAuthObserver();

  return (
    <BrowserRouter>
      <Routes>
        {/* 헤더 없는 레이아웃 (로그인/회원가입 전용) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* 헤더 포함 레이아웃 (메인 페이지) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/project" element={<ProjectListPage />} />
          <Route path="/project/insert" element={<ProjectInsertPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
