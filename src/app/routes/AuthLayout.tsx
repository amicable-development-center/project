import type { JSX } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = (): JSX.Element => {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
