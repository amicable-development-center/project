import { Timestamp } from "firebase/firestore";

export const getStatusClassname = (
  status: "모집중" | "모집완료"
): "ing" | "done" => (status === "모집중" ? "ing" : "done");

export const formatDate = (date?: string | Timestamp): string => {
  if (!date) return "";

  if (date instanceof Timestamp) {
    return date.toDate().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  }
  return date;
};
