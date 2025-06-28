import type { JSX } from "react";
import { Outlet } from "react-router-dom";

import Footer from "@widgets/Footer";
import Header from "@widgets/Header/Header";

const MainLayout = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
