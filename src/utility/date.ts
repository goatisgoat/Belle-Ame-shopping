export const formatDate = (date: string) => {
  const convertedDate = new Date(date);

  const year = convertedDate.getFullYear();
  const month = String(convertedDate.getMonth() + 1).padStart(2, "0");
  const day = String(convertedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};
