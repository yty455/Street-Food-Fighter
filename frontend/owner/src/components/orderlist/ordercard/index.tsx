import { Order, ordermap } from '@/types/order.type';
import { CardContainer, MenuTitle, FlexRow, RequireBox, StateBox, Time, MenuList, FlexRow2 } from './Ordercard.styled';

const OrderCard = ({ order, onClick }: { order: Order; onClick: any }) => {
  return (
    <CardContainer onClick={() => onClick(order)}>
      <FlexRow2>
        <FlexRow>
          <Time>{order.orderDate.split('T')[1].substring(0, 5)}</Time>
          <MenuTitle>
            [메뉴 {order.totalMenuCount}개] {Number(order.totalPrice).toLocaleString()}원
          </MenuTitle>
        </FlexRow>
        {order.requirement.length > 0 && <RequireBox>요청 있음</RequireBox>}
      </FlexRow2>
      <FlexRow>
        <StateBox>{ordermap[order.orderState]}</StateBox>
        <FlexRow>
          {order.orderMenuList.map((menuItem, index) => (
            <MenuList key={index}>
              {menuItem.name} {menuItem.count}개{index < order.orderMenuList.length - 1 ? ' / ' : ''}
            </MenuList>
          ))}
        </FlexRow>
      </FlexRow>
    </CardContainer>
  );
};

export default OrderCard;
