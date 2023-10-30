import { Option } from '@/types/vendortype';
import { OptionBox, Title, Content, RowBox, OptionList, CountBox } from './Optioncard.styled';
import Checkbox from '@/components/common/checkbox';
import { useState } from 'react';
import useOrderStore from '@/stores/orderStore';

const Optioncard = ({ menuid, menudata }: any) => {
  const optionlist = menudata.options || [];
  const { order, addOption, removeOption, setQuantity } = useOrderStore();
  const [quantity, setLocalQuantity] = useState(0);

  const handleCheckboxChange = (optionId: number, checked: boolean) => {
    if (checked) {
      addOption(menuid, optionId);
    } else {
      removeOption(menuid, optionId);
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 0) {
      setLocalQuantity(newQuantity);
      setQuantity(menuid, newQuantity);
    }
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
                  text={option.name}
                  price={option.price}
                  checked={order.some((o) => o.menuId === menuid && o.selectedOptions.includes(option.id))}
                  onChange={(e: any) => handleCheckboxChange(option.id, e.target.checked)}
                />
              </Content>
            </div>
          ))}
      </OptionBox>
      <CountBox>
        <Title> 수량</Title>
        <RowBox>
          <img src="/images/orderfunding/minus.png" style={{ width: '26px' }} onClick={() => handleQuantityChange(-1)} />
          <div> {quantity}</div>
          <img src="/images/orderfunding/plus.png" style={{ width: '26px' }} onClick={() => handleQuantityChange(1)} />
        </RowBox>
      </CountBox>
    </OptionList>
  );
};

export default Optioncard;
