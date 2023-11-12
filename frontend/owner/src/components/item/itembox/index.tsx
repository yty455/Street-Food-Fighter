import { Item, ItemOptionInfo } from '@/types/item.type';
import {
  ButtonList,
  Container,
  MenuBox,
  MenuContentBox,
  MenuImage,
  LittleTitle,
  Content,
  OptionContainer,
  OptionBox,
  OptionContent,
} from './Itembox.styled';
import Button from '@/components/common/button';
import useDeleteMenuHook from '@/hooks/apis/deletemenu.hook';

interface ItemBoxProps {
  item: Item;
  onEdit: (item: Item) => void;
  refreshItems: () => void;
}

const ItemBox = ({ item, onEdit, refreshItems }: ItemBoxProps) => {
  // console.log('item : ', item);

  const { deleteMenu } = useDeleteMenuHook();
  const handleDelete = async () => {
    await deleteMenu(item.id);
    refreshItems(); // 삭제 후 refreshItems 호출
  };
  return (
    <Container>
      <MenuBox>
        <MenuImage src={item.menuUrl || '/images/common/menuimg.png'} />
        <MenuContentBox>
          <div>
            <LittleTitle>상품명</LittleTitle>
            <Content>{item.name}</Content>
          </div>
          <div>
            <LittleTitle> 가격</LittleTitle>
            <Content>{Number(item.price).toLocaleString()}원</Content>
          </div>
        </MenuContentBox>
        <ButtonList>
          <div>
            <Button text="수정" onClick={() => onEdit(item)}></Button>
          </div>
          <div>
            <Button text="삭제" color="red" onClick={handleDelete}></Button>
          </div>
        </ButtonList>
      </MenuBox>
      <OptionContainer>
        {item.optionInfoList &&
          item.optionInfoList.map((option: ItemOptionInfo, optionIndex: number) => (
            <OptionBox key={option.id}>
              <LittleTitle>옵션 {optionIndex + 1}</LittleTitle>
              <OptionContent>{option.name}</OptionContent>
              <LittleTitle>{Number(option.price).toLocaleString()}원</LittleTitle>
            </OptionBox>
          ))}
      </OptionContainer>
    </Container>
  );
};

export default ItemBox;
