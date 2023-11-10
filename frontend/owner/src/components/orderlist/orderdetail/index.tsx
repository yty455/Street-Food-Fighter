import Topbar from '@/components/common/topbar';
import { orderdetail } from '@/temp/orderdetail';
import { Container } from './Orderdetail.styled';

const OrderDetail = ({ order, activeTab, closeModal }: any) => {
  const detail = orderdetail;

  console.log(activeTab);
  return (
    <Container>
      <Topbar text="주문상세" closeModal={closeModal} type="close" />
      <table>
        <tbody>
          <tr>
            <th>총결제 금액</th>
            <td>34500</td>
          </tr>
          <tr>
            <th>닉네임</th>
            <td>붕어빵조아</td>
          </tr>
          <tr>
            <th>회원등급</th>
            <td>헤비급</td>
          </tr>
          <tr>
            <th>연락처</th>
            <td>010-000-0000</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};

export default OrderDetail;
