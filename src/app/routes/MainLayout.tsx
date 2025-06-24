import type { JSX } from "react";
import { Outlet } from "react-router-dom";

import Header from "@widgets/Header/Header";

const MainLayout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
