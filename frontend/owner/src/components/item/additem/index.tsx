import Topbar from '@/components/common/topbar';
import { ImageBox, Container, Edit, LittleTitle, MenuBox, MenuContentBox, MenuImage } from './Additem.styled';
import Input from '@/components/common/input';
import { useState } from 'react';

interface Option {
  id: number;
  name: string;
  price: string;
}

// firebase
import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { imgstorage } from '@/firebase/firebasedb';
import OptionBox from '../optionbox';
import Button from '@/components/common/button';
import BottomBtn from '@/components/common/bottombtn';

const AddItem = ({ closeModal }: any) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [menuUrl, setMenuUrl] = useState('/images/common/defaultmenuimg.png');

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      // const fileName = uuid();
      const storageRef = ref(imgstorage, `menu_images/${file.name}`);

      try {
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        setMenuUrl(url);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
      }
    }
  };

  const [options, setOptions] = useState<Option[]>([]);

  const addOption = () => {
    setOptions((options) => [...options, { id: options.length + 1, name: '', price: '' }]);
  };

  const handleOptionChange = (id: number, field: string, value: any) => {
    setOptions((options) => options.map((option) => (option.id === id ? { ...option, [field]: value } : option)));
  };

  const saveItem = () => {
    const itemData = {
      productName,
      productPrice,
      options,
      menuUrl,
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
