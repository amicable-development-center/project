import emailjs from "@emailjs/browser";

import type {
  SendEmailRequest,
  SendEmailResponse,
} from "@features/email/types/email";

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID || "";
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID || "";
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY || "";

emailjs.init(EMAIL_PUBLIC_KEY);

export const sendEmailApi = async ({
  actualSenderEmail,
  receiverEmail,
  projectId,
  projectTitle,
  emailData,
}: SendEmailRequest): Promise<SendEmailResponse> => {
  try {
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

    return {
      success: true,
      message: result.text,
    };
  } catch (error) {
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
