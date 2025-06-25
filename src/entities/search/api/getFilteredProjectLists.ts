import { getDocs } from "firebase/firestore";

import { SearchFilterBuilder } from "@entities/search/model/searchFilterBuilder";
import type { ProjectSearchFilterOption } from "@entities/search/types";

import type { ProjectListRes } from "@shared/types/project";

const getFilteredProjectLists = async (
  collectionName: string,
  filter: ProjectSearchFilterOption
): Promise<ProjectListRes[]> => {
  const query = new SearchFilterBuilder(collectionName)
    .setTitle(filter.title || undefined)
    .setCategory(filter.category === "all" ? undefined : filter.category)
    .setStatus(filter.status === "all" ? undefined : filter.status)
    .setWorkflow(filter.workflow === "all" ? undefined : filter.workflow)
    .setSortBy(filter.sortBy || "latest")
    .build();

  const snapshot = await getDocs(query);
  let projects = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProjectListRes[];

  if (filter.position && filter.position !== "all") {
    projects = projects.filter((project) =>
      project.positions.some(
        (position) => position.position === filter.position
      )
    );
  }

  return projects;
};

export default getFilteredProjectLists;
