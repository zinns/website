export const cleanForm = (object: { [key: string]: string }) => {
  const data = { ...object };
  for (const key in data) {
    data[key] = data[key].trim();
  }

  return data;
};
