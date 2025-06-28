import emailjs from "@emailjs/browser";

import type { EmailData } from "@features/email/types/email";

interface SendEmailRequest {
  actualSenderEmail: string;
  receiverEmail: string;
  projectId: string;
  projectTitle: string;
  emailData: EmailData;
}

interface SendEmailResponse {
  success: boolean;
  message: string;
}

// Email.js 설정 (환경변수에서 가져오기)
const EMAIL_SERVICE_ID =
  import.meta.env.VITE_EMAIL_SERVICE_ID || "your_service_id";
const EMAIL_TEMPLATE_ID =
  import.meta.env.VITE_EMAIL_TEMPLATE_ID || "your_template_id";
const EMAIL_PUBLIC_KEY =
  import.meta.env.VITE_EMAIL_PUBLIC_KEY || "your_public_key";

// 🔍 환경변수 확인 로그
console.log("🔑 Email.js 환경변수 확인:");
console.log("📍 SERVICE_ID:", EMAIL_SERVICE_ID);
console.log("📍 TEMPLATE_ID:", EMAIL_TEMPLATE_ID);
console.log(
  "📍 PUBLIC_KEY:",
  EMAIL_PUBLIC_KEY ? `${EMAIL_PUBLIC_KEY.substring(0, 10)}...` : "없음"
);
console.log("📍 환경변수 원본 확인:");
console.log(
  "  - VITE_EMAIL_SERVICE_ID:",
  import.meta.env.VITE_EMAIL_SERVICE_ID || "설정되지 않음"
);
console.log(
  "  - VITE_EMAIL_TEMPLATE_ID:",
  import.meta.env.VITE_EMAIL_TEMPLATE_ID || "설정되지 않음"
);
console.log(
  "  - VITE_EMAIL_PUBLIC_KEY:",
  import.meta.env.VITE_EMAIL_PUBLIC_KEY ? "설정됨" : "설정되지 않음"
);

// Email.js 초기화
emailjs.init(EMAIL_PUBLIC_KEY);

export const sendEmailApi = async ({
  actualSenderEmail,
  receiverEmail,
  projectId,
  projectTitle,
  emailData,
}: SendEmailRequest): Promise<SendEmailResponse> => {
  try {
    console.log("🚀 Email.js로 이메일 전송 시작...");

    // Email.js 템플릿 파라미터 (표준 형식)
    const templateParams = {
      // 받는 사람 정보
      to_name: receiverEmail.split("@")[0], // 이메일 앞부분을 이름으로 사용
      to_email: receiverEmail,

      // 보내는 사람 정보
      from_name: actualSenderEmail.split("@")[0],
      from_email: actualSenderEmail,

      // 이메일 내용
      subject: emailData.subject,
      message: emailData.message,

      // 프로젝트 정보
      project_title: projectTitle,
      project_id: projectId,

      // 답장 설정
      reply_to: actualSenderEmail,
    };

    console.log("📧 전송할 템플릿 파라미터:", templateParams);

    const result = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams
    );

    console.log("✅ Email.js 전송 성공:", result);

    return {
      success: true,
      message: "이메일이 성공적으로 전송되었습니다.",
    };
  } catch (error) {
    console.error("❌ Email.js 전송 실패:", error);

    let errorMessage = "이메일 전송에 실패했습니다. 다시 시도해주세요.";

    if (error instanceof Error) {
      if (error.message.includes("template")) {
        errorMessage = "이메일 템플릿 설정에 문제가 있습니다.";
      } else if (error.message.includes("service")) {
        errorMessage = "이메일 서비스 설정에 문제가 있습니다.";
      } else if (error.message.includes("user")) {
        errorMessage = "이메일 서비스 인증에 실패했습니다.";
      }
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};
