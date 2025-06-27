export const paginateArray = <T>(
  array: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  if (!array || array.length === 0) return [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return array.slice(startIndex, endIndex);
};

export const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  if (totalItems <= 0) return 0;
  return Math.ceil(totalItems / itemsPerPage);
};
