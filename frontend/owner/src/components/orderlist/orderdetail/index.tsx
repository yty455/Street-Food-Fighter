import Topbar from '@/components/common/topbar';
import { orderdetail } from '@/temp/orderdetail';
import { Container, TableContainer, TableHeader, TableCell, Content } from './Orderdetail.styled';
import { Order, ordermap } from '@/types/order.type';

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
          <div>{formattedDate}</div>
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
          <div>
            <div> 주문접수</div>
            <div> 주문거부</div>
          </div>
        )}
        {activeTab == 'processing' && <div>조리 완료</div>}
        <div>
          <div>요청사항</div>
          <div>{detail.requirement}</div>
        </div>
        <div>
          <div>메뉴정보</div>
          <div>메뉴정보 컴포넌트</div>
        </div>
      </Content>
    </Container>
  );
};

export default OrderDetail;
