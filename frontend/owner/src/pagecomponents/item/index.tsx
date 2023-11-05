import Topbar from '@/components/common/topbar';
import { Container } from './Item.styled';
import ItemBox from '@/components/item/itembox';
import { items } from '@/temp/items';
import BottomBtn from '@/components/common/bottombtn';

const ItemPage = () => {
  return (
    <Container>
      <Topbar text="상품 관리"></Topbar>
      {items.map((item) => (
        <ItemBox key={item.id} item={item} />
      ))}
      <BottomBtn text="상품 추가" />
    </Container>
  );
};

export default ItemPage;
