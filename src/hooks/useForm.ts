import { useState } from 'react';

type X = string | { [key: string]: string | string[] }[];

const useForm = (initialForm: { [key: string]: X }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (value: X, key: string) => {
    setForm(Object.assign({}, { ...form }, { [key]: value }));
  };

  return {
    form,
    handleChange,
  };
};

export default useForm;
