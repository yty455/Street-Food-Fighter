import { Item, ItemOptionInfo } from '@/types/item.type';

interface ItemBoxProps {
  item: Item;
  index: number;
}

const ItemBox = ({ item }: any) => {
  return (
    <div>
      <div>
        <img src={item.menuUrl} style={{ width: '70px' }} />
        <div>
          <div>상품명</div>
          <div>{item.name}</div>
        </div>
        <div>
          <div> 가격</div>
          <div>{item.price}원</div>
        </div>
        <div>
          <div> 수정</div>
          <div> 삭제</div>
        </div>
      </div>
      <div>
        {item.optionInfoList.map((option: ItemOptionInfo, optionIndex: number) => (
          <div key={option.id}>
            <div>옵션 {optionIndex + 1}</div>
            <div>{option.name}</div>
            <div>{option.price}원</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemBox;
