import Topbar from '@/components/common/topbar';
import { orderdetail } from '@/temp/orderdetail';
import { Container, TableContainer, TableHeader, TableCell, Content, FlexRow, RequestBox, Title } from './Orderdetail.styled';
import { Order, ordermap } from '@/types/order.type';
import Button from '@/components/common/button';

const OrderDetail = ({ order, activeTab, closeModal }: { order: Order; activeTab: any; closeModal: any }) => {
  const detail = orderdetail;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const optionsDate: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' };
    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };

    const formattedDate = date.toLocaleDateString('ko-KR', optionsDate).replace(/\. /g, '월 ').replace(/\./, '일');
    const formattedTime = date.toLocaleTimeString('ko-KR', optionsTime).slice(0, 5);

    return `${formattedDate} ${formattedTime}`;
  };

  const formattedDate = formatDate(detail.createAt);
  return (
    <Container>
      <Topbar text="주문상세" closeModal={closeModal} type="close" />
      <Content>
        <div>
          <Title>{formattedDate}</Title>
          <div> {ordermap[order.orderState]}</div>
        </div>
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
              <TableCell>{detail.userGrade}</TableCell>
            </tr>
            <tr>
              <TableHeader>연락처</TableHeader>
              <TableCell>{detail.userPhone}</TableCell>
            </tr>
          </tbody>
        </TableContainer>
        {activeTab == 'waiting' && (
          <FlexRow>
            <div style={{ width: '69%', height: '45px' }}>
              <Button fontSize="22px" text="주문접수"></Button>
            </div>
            <div style={{ width: '29%', height: '45px' }}>
              <Button fontSize="22px" color="gray" text="주문거부"></Button>
            </div>
          </FlexRow>
        )}
        {activeTab == 'processing' && (
          <div style={{ width: '100%', height: '45px' }}>
            <Button fontSize="22px" text="조리 완료" />
          </div>
        )}
        <div>
          <Title>요청사항</Title>
          <RequestBox>{detail.requirement}</RequestBox>
        </div>
        <div>
          <Title>메뉴정보</Title>
          <div>메뉴정보 컴포넌트</div>
        </div>
      </Content>
    </Container>
  );
};

export default OrderDetail;