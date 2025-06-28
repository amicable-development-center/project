import emailjs from "@emailjs/browser";

import type {
  SendEmailRequest,
  SendEmailResponse,
} from "@features/email/types/email";

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID || "";
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID || "";
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY || "";

// 배포 환경 디버깅
console.log("Email.js 환경 변수 확인:", {
  serviceId: EMAIL_SERVICE_ID ? "✅ 설정됨" : "❌ 없음",
  templateId: EMAIL_TEMPLATE_ID ? "✅ 설정됨" : "❌ 없음",
  publicKey: EMAIL_PUBLIC_KEY ? "✅ 설정됨" : "❌ 없음",
  environment: import.meta.env.MODE,
  isHTTPS: window.location.protocol === "https:",
});

// 환경 변수 검증
if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
  console.error("❌ Email.js 환경 변수가 누락되었습니다:", {
    EMAIL_SERVICE_ID: !!EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID: !!EMAIL_TEMPLATE_ID,
    EMAIL_PUBLIC_KEY: !!EMAIL_PUBLIC_KEY,
  });
}

emailjs.init(EMAIL_PUBLIC_KEY);

export const sendEmailApi = async ({
  actualSenderEmail,
  receiverEmail,
  projectId,
  projectTitle,
  emailData,
}: SendEmailRequest): Promise<SendEmailResponse> => {
  try {
    // 전송 전 로그
    console.log("📧 이메일 전송 시도:", {
      from: actualSenderEmail,
      to: receiverEmail,
      subject: emailData.subject,
      serviceId: EMAIL_SERVICE_ID,
      templateId: EMAIL_TEMPLATE_ID,
    });

    const templateParams = {
      to_name: receiverEmail.split("@")[0],
      to_email: receiverEmail,

      from_name: actualSenderEmail.split("@")[0],
      from_email: actualSenderEmail,

      subject: emailData.subject,
      message: emailData.message,

      project_title: projectTitle,
      project_id: projectId,

      reply_to: actualSenderEmail,
    };

    const result = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams
    );

    console.log("✅ 이메일 전송 성공:", result);

    return {
      success: true,
      message: result.text,
    };
  } catch (error) {
    console.error("❌ 이메일 전송 실패:", error);

    let errorMessage = "이메일 전송에 실패했습니다. 다시 시도해주세요.";

    if (error instanceof Error) {
      console.error("에러 상세:", error.message);

      if (error.message.includes("template")) {
        errorMessage = "이메일 템플릿 설정에 문제가 있습니다.";
      } else if (error.message.includes("service")) {
        errorMessage = "이메일 서비스 설정에 문제가 있습니다.";
      } else if (
        error.message.includes("user") ||
        error.message.includes("public_key")
      ) {
        errorMessage = "이메일 서비스 인증에 실패했습니다.";
      } else if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        errorMessage = "네트워크 연결을 확인해주세요.";
      }
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};
