import Topbar from '@/components/common/topbar';
import { ImageBox, Container, Content, Edit, LittleTitle, MenuBox, MenuContentBox, MenuImage } from './Additem.styled';

const AddItem = ({ closeModal }: any) => {
  const name = '쫀득 쫀득 팥 붕어빵';
  const price = 10000;
  const menuUrl = '/images/common/defaultmenuimg.png';
  return (
    <Container>
      <Topbar text="상품 추가" type="close" closeModal={closeModal}></Topbar>
      <MenuBox>
        <ImageBox>
          <MenuImage src={menuUrl} />
          <Edit>Edit</Edit>
        </ImageBox>
        <MenuContentBox>
          <div>
            <LittleTitle>상품명</LittleTitle>
            <Content>name</Content>
          </div>
          <div>
            <LittleTitle> 가격</LittleTitle>
            <Content>{price}원</Content>
          </div>
        </MenuContentBox>
      </MenuBox>
    </Container>
  );
};

export default AddItem;
