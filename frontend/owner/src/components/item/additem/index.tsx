import Topbar from '@/components/common/topbar';
import { Container } from './Additem.styled';

const AddItem = ({ closeModal }: any) => {
  return (
    <Container>
      <Topbar text="상품 추가" type="close" closeModal={closeModal}></Topbar>
      <div></div>
    </Container>
  );
};

export default AddItem;
