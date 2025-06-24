import type { JSX } from "react";

const HomePage = (): JSX.Element => {
  console.log("API_KEY: ", import.meta.env.VITE_API_KEY);

  return (
    <div>
      <h1>홈 페이지</h1>
      <p>환영합니다! 이곳은 홈 페이지입니다.</p>
    </div>
  );
};

export default HomePage;
