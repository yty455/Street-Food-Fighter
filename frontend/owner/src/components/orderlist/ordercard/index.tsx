import { Order, ordermap } from '@/types/order.type';

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div>
      <div>
        <div>{order.orderDate.split('T')[1].substring(0, 5)}</div>
        <div>
          [메뉴 {order.totalMenuCount}개] {Number(order.totalPrice).toLocaleString()}원
        </div>
        {order.reviewState !== 'NONE' && <div>요청 있음</div>}
      </div>
      <div>
        <div>{ordermap[order.orderState]}</div>
        <div>
          {order.orderMenuList.map((menuItem, index) => (
            <div key={index}>
              {menuItem.name} {menuItem.count}개 /
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
