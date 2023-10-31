import useOrderStore from '@/stores/orderStore';
import { useState } from 'react';

const BagOrder = ({ menuid }: any) => {
  const { order, addOption, removeOption, setQuantity } = useOrderStore();

  const menu = order.find((o) => o.menuId === menuid);
  const initialQuantity = menu ? menu.quantity : 0;
  const [quantity, setLocalQuantity] = useState(initialQuantity);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 0) {
      setLocalQuantity(newQuantity);
      setQuantity(menuid, newQuantity);
    }
  };

  return <div>주문 상품 (이후 수정)</div>;
};

export default BagOrder;
