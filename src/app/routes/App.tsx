import type { JSX } from "react";
import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("@pages/home/ui/HomePage"));
const NotFoundPage = lazy(() => import("@pages/not-found/ui/NotFoundPage"));
const ProjectDetailPage = lazy(
  () => import("@pages/project-detail/ui/ProjectDetailPage")
);

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
