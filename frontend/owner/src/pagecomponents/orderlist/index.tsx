import Topbar from '@/components/common/topbar';
import OrderDetail from '@/components/orderlist/orderdetail';
import TabBar from '@/components/orderlist/tabbar';
import useModal from '@/hooks/common/modal.hook';
import { Order } from '@/types/order.type';
import { useState } from 'react';

const OrderlistPage = () => {
  const { isModalOpen, selectedItem, openModal, closeModal } = useModal();
  const [activeTab, setActiveTab] = useState('waiting');

  const handleOrderClick = (order: Order) => {
    openModal(order);
    setActiveTab(activeTab);
  };

  return (
    <div>
      {isModalOpen && selectedItem && <OrderDetail activeTab={activeTab} order={selectedItem} closeModal={closeModal} />}
      <div>
        <Topbar text="주문 목록" />
        <TabBar onOrderClick={handleOrderClick} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default OrderlistPage;
