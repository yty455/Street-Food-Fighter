import { useState } from 'react';

interface Option {
  id: number;
  name: string;
  price: string;
}

const useOptionsHook = () => {
  const [options, setOptions] = useState<Option[]>([]);

  const addOption = () => {
    const newId = options.length > 0 ? Math.max(...options.map((o) => o.id)) + 1 : 1;
    setOptions((options) => [...options, { id: newId, name: '', price: '' }]);
  };

  const handleOptionChange = (id: number, field: string, value: any) => {
    setOptions((options) => options.map((option) => (option.id === id ? { ...option, [field]: value } : option)));
  };

  const removeOption = (optionId: number) => {
    setOptions((options) => options.filter((option) => option.id !== optionId));
  };

  return {
    options,
    addOption,
    handleOptionChange,
    removeOption,
  };
};

export default useOptionsHook;
