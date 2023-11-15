import Topbar from '@/components/common/topbar';
import { Container, TableContainer, TableHeader, TableCell, Content, FlexRow, TextBox, Title, ReviewList, ReviewScore } from './Orderdetail.styled';
import { Order, ordermap } from '@/types/order.type';
import Button from '@/components/common/button';
import Badge from '@/components/common/badge';
import Receipt from '@/components/common/receipt';
import { useEffect, useState } from 'react';
import DetailOrderAPI from '@/apis/orders/DetailOrderAPI';
import DetailType from '@/types/orderdetail.type';
import ToProcessingAPI from '@/apis/orderstate/ToProcessingAPI';
import ToCompletionAPI from '@/apis/orderstate/ToCompletionAPI';
import ToRejectAPI from '@/apis/orderstate/ToRejectAPI';

const OrderDetail = ({
  order,
  activeTab,
  closeModal,
  onOrderStateChanged,
}: {
  order: Order;
  activeTab: any;
  closeModal: any;
  onOrderStateChanged: () => void;
}) => {
  // console.log('order : ', order);
  const [detail, setDetail] = useState<DetailType>({} as DetailType);
  useEffect(() => {
    const fetchOrderDetails = async () => {
      const fetchedDetails = await DetailOrderAPI({ orderId: order.orderId });
      if (fetchedDetails) {
        setDetail(fetchedDetails);
      }
    };

    fetchOrderDetails();
  }, [order.orderId]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const optionsDate: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

    const formattedDate = date.toLocaleDateString('ko-KR', optionsDate).replace(/\. /g, '월 ').replace(/\./, '일');
    const formattedTime = date.toLocaleTimeString('ko-KR', optionsTime).slice(0, 5);

    return `${formattedDate} ${formattedTime}`;
  };

  // 주문 접수 클릭
  const handleOrderAccept = async () => {
    const response = await ToProcessingAPI({ orderId: order.orderId });
    if (response) {
      // console.log('Order processing response:', response);
      closeModal();
      onOrderStateChanged();
    }
  };
  // 주문 거절 클릭
  const handleOrderReject = async () => {
    const response = await ToRejectAPI({ orderId: order.orderId });
    if (response) {
      // console.log('Order Reject response:', response);
      closeModal();
      onOrderStateChanged();
    }
  };
  // 조리완료 클릭
  const handleOrderFinish = async () => {
    const response = await ToCompletionAPI({ orderId: order.orderId });
    if (response) {
      // console.log('Order finish response:', response);
      closeModal();
      onOrderStateChanged();
    }
  };

  const formattedDate = formatDate(detail.createAt);
  return (
    <Container>
      <Topbar text="주문상세" closeModal={closeModal} type="close" />
      <Content>
        <FlexRow>
          <Title>{formattedDate}</Title>
          <div style={{ width: '100px', height: '30px' }}>
            <Badge
              text={ordermap[order.orderState]}
              color={order.orderState === 'REFUSED' ? 'red' : order.orderState === 'COMPLETED' ? 'green' : 'main'}
              fontSize="18px"
            ></Badge>
          </div>
        </FlexRow>
        <TableContainer>
          <tbody>
            <tr>
              <TableHeader>총결제 금액</TableHeader>
              <TableCell>{Number(detail.totalPrice).toLocaleString()}원</TableCell>
            </tr>
            <tr>
              <TableHeader>닉네임</TableHeader>
              <TableCell>{detail.userNickName}</TableCell>
            </tr>
            <tr>
              <TableHeader>회원등급</TableHeader>
              <TableCell>'{detail.userGrade}'급 파이터</TableCell>
            </tr>
            <tr>
              <TableHeader>연락처</TableHeader>
              <TableCell>{detail.userPhone}</TableCell>
            </tr>
          </tbody>
        </TableContainer>
        {order.orderState == 'WAITING' && (
          <FlexRow>
            <div style={{ width: '69%', height: '45px' }} onClick={handleOrderAccept}>
              <Button fontSize="22px" text="주문접수"></Button>
            </div>
            <div style={{ width: '29%', height: '45px' }} onClick={handleOrderReject}>
              <Button fontSize="22px" color="gray" text="주문거절"></Button>
            </div>
          </FlexRow>
        )}
        {order.orderState == 'PROCESSING' && (
          <div style={{ width: '100%', height: '45px' }} onClick={handleOrderFinish}>
            <Button fontSize="22px" text="조리 완료" />
          </div>
        )}
        <div>
          <Title>요청사항</Title>
          <TextBox>{detail.requirement}</TextBox>
        </div>
        <div>
          <Title>메뉴정보</Title>
          <Receipt orderItemList={detail.orderItemList} totalPrice={detail.totalPrice}></Receipt>
        </div>

        {detail.review && (
          <div>
            <ReviewList>
              <Title>리뷰</Title>
              <ReviewScore>{detail.review.score}.0</ReviewScore>
            </ReviewList>
            <TextBox>{detail.review.content}</TextBox>
          </div>
        )}
      </Content>
    </Container>
  );
};

export default OrderDetail;
