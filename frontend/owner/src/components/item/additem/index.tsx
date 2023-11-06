import Topbar from '@/components/common/topbar';
import { ImageBox, Container, Edit, LittleTitle, MenuBox, MenuContentBox, MenuImage } from './Additem.styled';
import Input from '@/components/common/input';
import { useState } from 'react';

const AddItem = ({ closeModal }: any) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState();
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
            <Input value={productName} onChange={(e: any) => setProductName(e.target.value)} placeholder="상품 이름을 입력해주세요" />
          </div>
          <div>
            <LittleTitle> 가격</LittleTitle>
            <Input value={productPrice} onChange={(e: any) => setProductPrice(e.target.value)} placeholder="가격을 입력해주세요" />
          </div>
        </MenuContentBox>
      </MenuBox>
    </Container>
  );
};

export default AddItem;
