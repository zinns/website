import { useState } from 'react';

const useForm = (initialForm: { [key: string]: string }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (value: string, key: string) => {
    setForm(Object.assign({}, { ...form }, { [key]: value }));
  };

  return {
    form,
    handleChange,
  };
};

export default useForm;
