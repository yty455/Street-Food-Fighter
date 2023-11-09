import Topbar from '@/components/common/topbar';
import TabBar from '@/components/orderlist/tabbar';

const OrderlistPage = () => {
  return (
    <div>
      <Topbar text="주문 목록" />
      <TabBar></TabBar>
    </div>
  );
};

export default OrderlistPage;
