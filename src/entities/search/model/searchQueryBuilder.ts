import {
  query,
  collection,
  where,
  orderBy,
  limit,
  startAfter,
  type Query,
  type QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";

import { db } from "@shared/firebase/firebase";
import type { FilterBuilder } from "@shared/types/firebase";
import type {
  ProjectCategory,
  RecruitmentStatus,
  Workflow,
} from "@shared/types/project";
import type { ProjectSearchFilterOption, SortBy } from "@shared/types/search";
import type { UserRole } from "@shared/types/user";

export class SearchQueryBuilder implements FilterBuilder {
  private filter: ProjectSearchFilterOption;
  private baseQuery: Query;
  private limitValue?: number;
  private startAfterCursor?: QueryDocumentSnapshot<DocumentData>;

  constructor(collectionName: string) {
    this.baseQuery = query(collection(db, collectionName));
    this.filter = {};
  }

  setTitle(title?: string): this {
    if (title && title.trim()) {
      this.filter.title = title.trim();
    }
    return this;
  }

  setCategory(category?: ProjectCategory | "all"): this {
    if (category) {
      this.filter.category = category;
    }
    return this;
  }

  setPosition(position?: UserRole | "all"): this {
    if (position) {
      this.filter.position = position;
    }
    return this;
  }

  setStatus(status?: RecruitmentStatus | "all"): this {
    if (status) {
      this.filter.status = status;
    }
    return this;
  }

  setWorkflow(workflow?: Workflow | "all"): this {
    if (workflow) {
      this.filter.workflow = workflow;
    }
    return this;
  }

  setSortBy(sortBy?: SortBy): this {
    if (sortBy) {
      this.filter.sortBy = sortBy;
    }
    return this;
  }

  addLimit(limitValue: number): this {
    this.limitValue = limitValue;
    return this;
  }

  addStartAfter(cursor: QueryDocumentSnapshot<DocumentData>): this {
    this.startAfterCursor = cursor;
    return this;
  }

  build(): Query {
    let builtQuery: Query = this.baseQuery;

    if (this.filter.category) {
      builtQuery = query(
        builtQuery,
        where("category", "==", this.filter.category)
      );
    }

    if (this.filter.status) {
      builtQuery = query(builtQuery, where("status", "==", this.filter.status));
    }

    if (this.filter.workflow) {
      builtQuery = query(
        builtQuery,
        where("workflow", "==", this.filter.workflow)
      );
    }

    if (this.filter.sortBy) {
      switch (this.filter.sortBy) {
        case "latest":
          builtQuery = query(builtQuery, orderBy("createdAt", "desc"));
          break;
        case "deadline":
          builtQuery = query(builtQuery, orderBy("closedDate", "asc"));
          break;
        case "applicants":
        case "popularity":
          builtQuery = query(builtQuery, orderBy("createdAt", "desc"));
          break;
        default:
          builtQuery = query(builtQuery, orderBy("createdAt", "desc"));
          break;
      }
    }

    if (this.startAfterCursor) {
      builtQuery = query(builtQuery, startAfter(this.startAfterCursor));
    }

    if (this.limitValue) {
      builtQuery = query(builtQuery, limit(this.limitValue));
    }

    return builtQuery;
  }
}
