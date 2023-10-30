import { Option } from '@/types/vendortype';
import { OptionBox, Title, Content, RowBox, OptionList, CountBox, Airfont } from './Optioncard.styled';
import Checkbox from '@/components/common/checkbox';
import { useState } from 'react';

const Optioncard = ({ menuid, menudata }: any) => {
  const optionlist = menudata.options || [];

  const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: { menuid: number; optionid: number } }>({});
  console.log('Selected Options:', selectedOptions);

  const handleCheckboxChange = (option: Option) => {
    setSelectedOptions((prevSelectedOptions) => {
      const newSelectedOptions = { ...prevSelectedOptions };

      if (newSelectedOptions[option.id]) {
        delete newSelectedOptions[option.id];
      } else {
        newSelectedOptions[option.id] = { menuid, optionid: option.id };
      }

      return newSelectedOptions;
    });
  };

  return (
    <OptionList>
      <OptionBox>
        <Title> 옵션선택</Title>
        {optionlist &&
          optionlist.map((option: Option) => (
            <div key={option.id}>
              <Content>
                <Checkbox
                  key={option.id}
                  text={option.name}
                  price={option.price}
                  checked={!!selectedOptions[option.id]}
                  onChange={() => handleCheckboxChange(option)}
                />
              </Content>
            </div>
          ))}
      </OptionBox>
      <CountBox>
        <Title> 수량</Title>
        <RowBox>
          <img src="/images/orderfunding/minus.png" style={{ width: '26px' }} />
          <div> 숫자</div>
          <img src="/images/orderfunding/plus.png" style={{ width: '26px' }} />
        </RowBox>
      </CountBox>
    </OptionList>
  );
};

export default Optioncard;
