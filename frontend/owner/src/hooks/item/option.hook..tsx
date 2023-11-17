import { useState } from 'react';

interface Option {
  id: number;
  name: string;
  price: string;
}

const useOptionsHook = (initialOptions: []) => {
  const convertedInitialOptions = initialOptions.map((option: Option) => ({
    ...option,
    price: option.price.toString(), // 숫자를 문자열로 변환
  }));

  const [options, setOptions] = useState<Option[]>(convertedInitialOptions);
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
  const resetOptions = () => {
    setOptions(convertedInitialOptions);
  };
  return {
    options,
    addOption,
    handleOptionChange,
    removeOption,
    resetOptions,
  };
};

export default useOptionsHook;
