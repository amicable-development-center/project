import {
  query,
  collection,
  where,
  orderBy,
  type Query,
} from "firebase/firestore";

import type { ProjectSearchFilterOption, SortBy } from "@entities/search/types";

import { db } from "@shared/firebase/firebase";
import type { FilterBuilder } from "@shared/types/firebase";
import type {
  ProjectCategory,
  RecruitmentStatus,
  Workflow,
} from "@shared/types/project";
import type { UserRole } from "@shared/types/user";

export class SearchFilterBuilder implements FilterBuilder {
  private filter: ProjectSearchFilterOption;
  private baseQuery: Query;

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

  build(): Query {
    let builtQuery: Query = this.baseQuery;

    if (this.filter.title) {
      const titleLower = this.filter.title.toLowerCase();
      builtQuery = query(
        builtQuery,
        where("title", ">=", titleLower),
        where("title", "<", titleLower + "\uf8ff")
      );
    }

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
          builtQuery = query(builtQuery, orderBy("applicants", "desc"));
          break;
        case "popularity":
          builtQuery = query(builtQuery, orderBy("likedUsers", "desc"));
          break;
      }
    }

    return builtQuery;
  }
}
