import type { JSX } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = (): JSX.Element => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 - 페이지를 찾을 수 없습니다</h1>
      <p>요청하신 페이지가 존재하지 않습니다.</p>
      <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage;
