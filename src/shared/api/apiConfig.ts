// API 기본 설정
const API_BASE_URL = import.meta.env.PROD
  ? "https://project-jam-server-g6p9egzwr-tkyoun0421s-projects.vercel.app/api" // 배포 환경
  : "/api"; // 개발 환경 (vercel dev 사용 시)

// 이메일 전송 API
export const sendEmailAPI = async (emailData: {
  senderEmail: string;
  receiverEmail: string;
  subject: string;
  message: string;
  projectTitle?: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    throw new Error("이메일 전송에 실패했습니다.");
  }

  return response.json();
};

// Hello API (테스트용)
export const testAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/hello`);
  return response.json();
};

export { API_BASE_URL };
