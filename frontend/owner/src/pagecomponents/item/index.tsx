import Topbar from '@/components/common/topbar';
import { Container } from './Item.styled';
import ItemBox from '@/components/item/itembox';
import { items } from '@/temp/items';
import BottomBtn from '@/components/common/bottombtn';
import { useState } from 'react';
import AddItem from '@/components/item/additem';

const ItemPage = () => {
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  const openAddItemModal = () => {
    setIsAddItemOpen(true);
  };

  const closeAddItemModal = () => {
    setIsAddItemOpen(false);
  };
  return (
    <Container>
      <Topbar text="상품 관리"></Topbar>
      {items.map((item) => (
        <ItemBox key={item.id} item={item} />
      ))}
      <BottomBtn text="상품 추가" onClick={openAddItemModal} />
      {isAddItemOpen && <AddItem closeModal={closeAddItemModal} />}
    </Container>
  );
};

export default ItemPage;
