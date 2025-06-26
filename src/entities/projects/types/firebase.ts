import type {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";

export type CreatedAt = Timestamp;
export type LastVisibleType = (QueryDocumentSnapshot<DocumentData> | null)[];

export interface ApiResMessage {
  success: boolean;
  message: string;
  id?: string;
}
