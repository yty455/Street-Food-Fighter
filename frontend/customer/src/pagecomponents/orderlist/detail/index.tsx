import Topbar from '@/components/common/topbar';
import { StoreName, OrderState, OrderDetailStyle, OrderInfo, StoreAddress, StoreTextLine } from './Detail.styled';
import { useEffect, useState } from 'react';
import GetOrderDetailAPI from '@/apis/orderlist/GetOrderDetail';
import { categories } from '@/assets/category';

const OrderDetailPage = ({ params, ...props }: any) => {
  const [orderInfo, setOrderInfo] = useState<any>();

  const stateText: any = {
    PAYMENT_IN_PROGRESS: '결제 중이에요',
    WAITING: '대기 상태에요',
    PROCESSING: '음식을 준비중이에요',
    COMPLETED: '음식이 준비됐어요',
    REFUSED: '준비 중이에요',
  };

  useEffect(() => {
    const setDetail = async () => {
      const result = await GetOrderDetailAPI(params.id);
      console.log(result);
      setOrderInfo(result.response);
    };
    setDetail();
  }, []);

  const getCategoryImage = (type: any) => {
    const category = categories.find((cat) => cat.type === type);
    return category ? category.image : null;
  };

  return (
    <OrderDetailStyle>
      <Topbar text="주문확인" />
      {orderInfo && (
        <OrderInfo>
          <OrderState>{stateText[orderInfo.state] || stateText['REFUSED']}</OrderState>
          <StoreName>
            <img
              src={`/images/category/${getCategoryImage(orderInfo.categoryType)}`}
              style={{ width: '60px', height: '60px', marginRight: '10px' }}
            />
            {orderInfo.storeName}
          </StoreName>
          <StoreAddress>{orderInfo.storeAddress}</StoreAddress>
          <StoreTextLine>
            주문일시 <span>: {formatDate(orderInfo.createAt)}</span>
          </StoreTextLine>
          <StoreTextLine>
            주문 번호 : <span>{orderInfo.orderId}</span>
          </StoreTextLine>
          <StoreTextLine>
            요청사항 : <span>{orderInfo.requirement}</span>
          </StoreTextLine>
        </OrderInfo>
      )}
    </OrderDetailStyle>
  );
};

// 날짜 형식 변경 함수
const formatDate = (dateString: any) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  let hours: any = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const ampm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12;
  hours = hours ? hours.toString().padStart(2, '0') : 12; // the hour '0' should be '12'

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}:${minutes}`;
};

export default OrderDetailPage;
