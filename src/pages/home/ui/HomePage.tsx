import type { JSX } from "react";

import TestUi from "@pages/home/ui/TestUi";

const HomePage = (): JSX.Element => {
  // console.log("API_KEY: ", import.meta.env.VITE_API_KEY);

  return (
    <div>
      <h1>홈 페이지</h1>
      <p>환영합니다! 이곳은 홈 페이지입니다.</p>

      <h1>Test List</h1>
      <TestUi />
    </div>
  );
};

export default HomePage;
