import type { JSX } from "react";
import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/project/list" element={<ProjectListPage />} />
        <Route path="/project/insert" element={<ProjectInsertPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
