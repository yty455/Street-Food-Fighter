import Topbar from '@/components/common/topbar';
import { orders } from '@/temp/orderlist';
import { Container, WrapContainer, OrderCardWrapper, CardTop, Topdown, VendorInfo, StoreName, Airfont } from './Orderlist.styled';
import Button from '@/components/common/button';
import { orderStateMapping } from '@/assets/orderstate';
import { categories } from '@/assets/category';
import { OrderState } from '@/types/orderstate.type';

const OrderListPage = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const day = dayNames[date.getDay()];

    return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}(${day})`;
  };

  const getCategoryImage = (type: any) => {
    const category = categories.find((cat) => cat.type === type);
    return category ? category.image : null;
  };

  return (
    <WrapContainer>
      <Topbar text="주문 내역" />
      <Container>
        {orders.map((order) => (
          <OrderCardWrapper key={order.orderId}>
            <CardTop>
              <Airfont>
                {formatDate(order.createdAt)} {orderStateMapping[order.orderState as OrderState]}
              </Airfont>
              <div style={{ width: '93px' }}>
                <Button text="주문 상세"></Button>
              </div>
            </CardTop>

            <VendorInfo>
              <img src={`/images/category/${getCategoryImage(order.categoryType)}`} style={{ width: '60px', height: '60px' }} />
              <Topdown>
                <StoreName>{order.storeName}</StoreName>
                <Airfont>
                  {order.menuName} 외 {order.restCount}개 {order.bucketTotalPrice}원
                </Airfont>
              </Topdown>
            </VendorInfo>
          </OrderCardWrapper>
        ))}
      </Container>
    </WrapContainer>
  );
};

export default OrderListPage;
