import Topbar from '@/app/components/common/topbar';
import { Container } from './Item.styled';

const ItemPage = () => {
  return (
    <Container>
      <Topbar text="상품 관리"></Topbar>
      <div>상품리스트</div>
    </Container>
  );
};

export default ItemPage;
