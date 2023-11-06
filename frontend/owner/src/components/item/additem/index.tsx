import Topbar from '@/components/common/topbar';
import { ImageBox, Container, Edit, LittleTitle, MenuBox, MenuContentBox, MenuImage } from './Additem.styled';
import Input from '@/components/common/input';
import { useState } from 'react';
import OptionBox from '../optionbox';
import Button from '@/components/common/button';
import BottomBtn from '@/components/common/bottombtn';
import useImageUploader from '@/hooks/imageUpload.hook';

interface Option {
  id: number;
  name: string;
  price: string;
}
const AddItem = ({ closeModal }: any) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [menuUrl, setMenuUrl] = useState('/images/common/defaultmenuimg.png');

  //Firebase에 이미지 업로드
  const handleImageUpload = useImageUploader('menu_images', setMenuUrl);

  // 옵션 관련
  const [options, setOptions] = useState<Option[]>([]);
  const addOption = () => {
    const newId = options.length > 0 ? Math.max(...options.map((o) => o.id)) + 1 : 1;
    setOptions((options) => [...options, { id: newId, name: '', price: '' }]);
  };
  const handleOptionChange = (id: number, field: string, value: any) => {
    setOptions((options) => options.map((option) => (option.id === id ? { ...option, [field]: value } : option)));
  };
  const removeOption = (optionId: number) => {
    setOptions((options) => options.filter((option) => option.id !== optionId));
  };

  // 저장로직
  const saveItem = () => {
    const optionsWithoutIds = options.map(({ id, ...rest }) => rest);
    const itemData = {
      productName,
      productPrice,
      menuUrl,
      options: optionsWithoutIds,
    };
    console.log(JSON.stringify(itemData, null, 2));

    closeModal();
  };

  return (
    <Container>
      <Topbar text="상품 추가" type="close" closeModal={closeModal}></Topbar>
      <MenuBox>
        <ImageBox onClick={() => document.getElementById('imageUpload')?.click()}>
          <MenuImage src={menuUrl} />
          <Edit>Edit</Edit>
          <input id="imageUpload" type="file" hidden onChange={handleImageUpload} />
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

      {options.map((option) => (
        <OptionBox
          key={option.id}
          optionid={option.id}
          onNameChange={(name: any) => handleOptionChange(option.id, 'name', name)}
          onPriceChange={(price: any) => handleOptionChange(option.id, 'price', price)}
          onRemove={() => removeOption(option.id)}
        />
      ))}

      <div style={{ width: '70vw', height: '40px', marginTop: '20px' }}>
        <Button text="옵션 추가" size="20px" onClick={addOption} />
      </div>

      <BottomBtn text="저장 하기" onClick={saveItem} />
    </Container>
  );
};

export default AddItem;
