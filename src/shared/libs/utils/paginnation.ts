export const makePagingArr = (totalCount: number): number[] => {
  const perPage = 6;
  const lastPageNum =
    totalCount % perPage > 0
      ? Math.floor(totalCount / perPage) + 1
      : Math.floor(totalCount / perPage);

  const pageArray = Array.from({ length: lastPageNum }, (_, i) => i + 1);

  return pageArray;
};
