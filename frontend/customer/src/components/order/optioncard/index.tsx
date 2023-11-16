import { OptionBox, Title, Content, RowBox, OptionList, CountBox } from './Optioncard.styled';
import Checkbox from '@/components/common/checkbox';
import { useState } from 'react';
import useOrderStore from '@/stores/orderStore';
import { OptionInfo } from '@/types/vendortype';

const Optioncard = ({ menuid, menudata }: any) => {
  const optionlist = menudata.optionInfoList || [];
  const { order, addOption, removeOption, setQuantity } = useOrderStore();

  const menu = order.find((o) => o.menuId === menuid);
  const initialQuantity = menu ? menu.count : 0;
  const [quantity, setLocalQuantity] = useState(initialQuantity);

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

  // console.log(order);
  return (
    <OptionList>
      {optionlist.length > 0 && (
        <OptionBox>
          <Title> 옵션선택</Title>
          {optionlist &&
            optionlist.map((option: OptionInfo) => (
              <div key={option.id}>
                <Content>
                  <Checkbox
                    text={option.name}
                    price={option.price}
                    checked={order.some((o) => o.menuId === menuid && o.optionIds.includes(option.id))}
                    onChange={(e: any) => handleCheckboxChange(option.id, e.target.checked)}
                  />
                </Content>
              </div>
            ))}
        </OptionBox>
      )}
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
