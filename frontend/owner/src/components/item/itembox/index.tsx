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

interface ItemBoxProps {
  item: Item;
}

const ItemBox = ({ item }: ItemBoxProps) => {
  return (
    <Container>
      <MenuBox>
        <MenuImage src={item.menuUrl} />
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
            <Button text="수정"></Button>
          </div>
          <div>
            <Button text="삭제" color="red"></Button>
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
