import { Item, ItemOptionInfo } from '@/types/item.type';
import { Container, MenuBox, MenuContentBox, MenuImage, LittleTitle, Content, OptionContainer, OptionBox, OptionContent } from './Itembox.styled';

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
            <Content>{item.price}원</Content>
          </div>
        </MenuContentBox>
        <div>
          <div> 수정</div>
          <div> 삭제</div>
        </div>
      </MenuBox>
      <OptionContainer>
        {item.optionInfoList &&
          item.optionInfoList.map((option: ItemOptionInfo, optionIndex: number) => (
            <OptionBox key={option.id}>
              <LittleTitle>옵션 {optionIndex + 1}</LittleTitle>
              <OptionContent>{option.name}</OptionContent>
              <LittleTitle>{option.price}원</LittleTitle>
            </OptionBox>
          ))}
      </OptionContainer>
    </Container>
  );
};

export default ItemBox;
