import { useEffect, useState } from 'react';
import { TabContainer, Tab } from './Tabbar.styled';
import TabContent from '../tabcontent';
import WaitingOrdersAPI from '@/apis/orders/WaitingOrdersAPI';
import ProcessingOrdersAPI from '@/apis/orders/ProcessingOrdersAPI';
import CompleteOrdersAPI from '@/apis/orders/CompleteOrdersAPI';
import AllOrdersAPI from '@/apis/orders/AllOrdersAPI';

type TabName = 'waiting' | 'processing' | 'completion' | 'all';

const TabBar = ({ onOrderClick, activeTab, setActiveTab, refreshKey }: any) => {
  const [list, setList] = useState([]);
  const [waitlist, setWaitList] = useState([]);
  const [processlist, setProcessList] = useState([]);
  const [completelist, setCompleteList] = useState([]);
  const [alllist, setAllList] = useState([]);

  useEffect(() => {
    const fetchWaitingOrders = async () => {
      if (activeTab === 'waiting') {
        setList(waitlist);
      } else if (activeTab === 'processing') {
        setList(processlist);
      } else if (activeTab === 'completion') {
        setList(completelist);
      } else if (activeTab === 'all') {
        setList(alllist);
      }
    };

    fetchWaitingOrders();
  }, [activeTab, refreshKey]);

  useEffect(() => {
    const fetchWaitingOrders = async () => {
      const fetchedOrders1 = await WaitingOrdersAPI();
      if (fetchedOrders1) {
        setWaitList(fetchedOrders1);
        setList(fetchedOrders1);
      }
      const fetchedOrders2 = await ProcessingOrdersAPI();
      if (fetchedOrders2) {
        setProcessList(fetchedOrders2);
      }
      const fetchedOrders3 = await CompleteOrdersAPI();
      if (fetchedOrders3) {
        setCompleteList(fetchedOrders3);
      }
      const fetchedOrders4 = await AllOrdersAPI();
      if (fetchedOrders4) {
        setAllList(fetchedOrders4);
      }
    };
    fetchWaitingOrders();
  }, [refreshKey]);

  const handleTabClick = (tabName: TabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
      <TabContainer>
        <Tab active={(activeTab === 'waiting').toString()} onClick={() => handleTabClick('waiting')}>
          <div>접수대기</div>
          <div>{waitlist.length}</div>
        </Tab>
        <Tab active={(activeTab === 'processing').toString()} onClick={() => handleTabClick('processing')}>
          <div>조리중</div>
          <div>{processlist.length}</div>
        </Tab>
        <Tab active={(activeTab === 'completion').toString()} onClick={() => handleTabClick('completion')}>
          <div>완료</div>
          <div>{completelist.length}</div>
        </Tab>
        <Tab active={(activeTab === 'all').toString()} onClick={() => handleTabClick('all')}>
          <div>전체</div>
          <div>{alllist.length}</div>
        </Tab>
      </TabContainer>
      <TabContent activetab={activeTab} list={list} onOrderClick={onOrderClick} />
    </div>
  );
};

export default TabBar;
