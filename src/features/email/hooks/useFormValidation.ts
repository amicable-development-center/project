import { useMemo } from "react";

interface UseFormValidationOptions {
  subject: string;
  message: string;
}

interface UseFormValidationReturn {
  isFormValid: boolean;
  isSubjectValid: boolean;
  isMessageValid: boolean;
}

export const useFormValidation = ({
  subject,
  message,
}: UseFormValidationOptions): UseFormValidationReturn => {
  const isSubjectValid = useMemo(() => {
    return subject.trim().length > 0;
  }, [subject]);

  const isMessageValid = useMemo(() => {
    return message.trim().length > 0;
  }, [message]);

  const isFormValid = useMemo(() => {
    return isSubjectValid && isMessageValid;
  }, [isSubjectValid, isMessageValid]);

  return {
    isFormValid,
    isSubjectValid,
    isMessageValid,
  };
};

export default useFormValidation;
