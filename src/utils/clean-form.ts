export const cleanForm = (object: { [key: string]: string }, nested: boolean) => {
  const data = { ...object };
  for (const key in data) {
    data[key] = data[key].trim();
  }

  return data;
};

export const cleanInputValue = (value: string) => value.trim();
