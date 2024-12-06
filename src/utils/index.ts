export const verifyPageNumber = (
  value: string,
  totalPage: number,
  currentPage: number
) => {
  const isNumRegex = /^[0-9]*$/;
  if (isNumRegex.test(value)) {
    if (Number(value) > totalPage) return currentPage;
    if (Number(value) < 1) return currentPage;
    return Number(value);
  }
  return currentPage;
};
