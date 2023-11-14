import Topbar from '@/components/common/topbar';
import { OrderDetailStyle, OrderInfo } from './Detail.styled';
import { useEffect, useState } from 'react';
import GetOrderDetailAPI from '@/apis/orderlist/GetOrderDetail';
import { categories } from '@/assets/category';

const OrderDetailPage = ({ params, ...props }: any) => {
  const [orderInfo, setOrderInfo] = useState<any>({});
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
          <div>
            <img src={`/images/category/${getCategoryImage(orderInfo.categoryType)}`} style={{ width: '60px', height: '60px' }} />|{' '}
            {orderInfo.storeName}
          </div>
          <div>{orderInfo.storeAddress}</div>
          <div>주문일시 : {orderInfo.createAt}</div>
          <div>주문 번호 : {orderInfo.orderId}</div>
          <div>요청사항 : {orderInfo.requirement}</div>
        </OrderInfo>
      )}
      디테일페이지입니다.
    </OrderDetailStyle>
  );
};

export default OrderDetailPage;
