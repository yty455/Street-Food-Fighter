import { useState } from 'react';
import { ChoiceContainer, Option } from './Select.styled';
const Select = ({ a, b, onSelect, selected }: any) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <ChoiceContainer>
      <Option isselected={(selectedOption === a).toString()} onClick={() => handleSelect(a)}>
        {a}
      </Option>
      <Option isselected={(selectedOption === b).toString()} onClick={() => handleSelect(b)}>
        {b}
      </Option>
    </ChoiceContainer>
  );
};

export default Select;
