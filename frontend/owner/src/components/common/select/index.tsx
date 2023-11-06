import { useState } from 'react';
import { ChoiceContainer, Option } from './Select.styled';
const Select = ({ a, b }: any) => {
  const [selectedOption, setSelectedOption] = useState(a);

  return (
    <ChoiceContainer>
      <Option isselected={(selectedOption === a).toString()} onClick={() => setSelectedOption(a)}>
        {a}
      </Option>
      <Option isselected={(selectedOption === b).toString()} onClick={() => setSelectedOption(b)}>
        {b}
      </Option>
    </ChoiceContainer>
  );
};

export default Select;
