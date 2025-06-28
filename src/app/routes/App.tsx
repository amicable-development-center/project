import type { JSX } from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "@app/routes/AuthLayout";
import MainLayout from "@app/routes/MainLayout";
import PrivateRoute from "@app/routes/PrivateRoute";

import { useAuthObserver } from "@shared/hooks/useAuthObserver";
import { useLoadingCursor } from "@shared/hooks/useLoadingCursor";
import GlobalSnackbar from "@shared/ui/GlobalSnackbar";
import PageTransitionLoader from "@shared/ui/loading-spinner/PageTransitionLoader";
import ScrollToTop from "@shared/ui/ScrollToTop";

const HomePage = lazy(() => import("@pages/home/ui/HomePage"));
const NotFoundPage = lazy(() => import("@pages/not-found/ui/NotFoundPage"));
const UserProfilePage = lazy(
  () => import("@pages/user-profile/ui/UserProfilePage")
);
const ProjectDetailPage = lazy(
  () => import("@pages/project-detail/ui/ProjectDetailPage")
);
const ProjectInsertPage = lazy(
  () => import("@pages/project-insert/ui/ProjectInsertPage")
);
const LoginPage = lazy(() => import("@pages/login/ui/LoginPage"));
const SignUpPage = lazy(() => import("@pages/signup/ui/SignUpPage"));
const ProjectListPage = lazy(
  () => import("@pages/project-list/ui/ProjectListPage")
);

function AppContent(): JSX.Element {
  useLoadingCursor();

  return (
    <Suspense fallback={<PageTransitionLoader />}>
      <ScrollToTop />
      <Routes>
        {/* 헤더 없는 레이아웃 (로그인/회원가입 전용) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>

        {/* 헤더 포함 레이아웃 (메인 페이지) */}
        <Route element={<MainLayout />}>
          {/* 공개 페이지 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/project" element={<ProjectListPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* 비공개 페이지 */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/project/insert"
            element={
              <PrivateRoute>
                <ProjectInsertPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

function App(): JSX.Element {
  useAuthObserver();

  return (
    <BrowserRouter basename="/">
      <AppContent />
      <GlobalSnackbar />
    </BrowserRouter>
  );
}

export default App;
