import type { Query } from "firebase/firestore";

export interface FilterBuilder {
  build(): Query;
}
