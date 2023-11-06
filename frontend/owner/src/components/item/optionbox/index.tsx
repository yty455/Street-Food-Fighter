import { useState } from 'react';
import { OptionContainer, Price, PriceBox } from './Optionbox.styled';
import Input from '@/components/common/input';

const OptionBox = ({ id }: any) => {
  const [optionName, setOptionName] = useState('');
  const [optionPrice, setOptionPrice] = useState();

  return (
    <OptionContainer>
      <Price> 옵션 {id}</Price>
      <div>
        <div>
          <Input value={optionName} size="12px" onChange={(e: any) => setOptionName(e.target.value)} placeholder="옵션 이름을 입력해주세요" />
        </div>
        <PriceBox>
          <div style={{ width: '50%' }}>
            <Input value={optionPrice} size="12px" onChange={(e: any) => setOptionPrice(e.target.value)} placeholder="가격을 입력해주세요" />
          </div>
          <Price>원</Price>
        </PriceBox>
      </div>
      <img src="/images/common/minus.png" style={{ width: '20px' }} />
    </OptionContainer>
  );
};

export default OptionBox;
