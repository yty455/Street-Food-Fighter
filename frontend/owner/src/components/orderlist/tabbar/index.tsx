import { useState } from 'react';
import { TabContainer, Tab } from './Tabbar.styled';
import { orderservice, orderwaiting, ordersprocessing, orderscompletion } from '@/temp/order';
import TabContent from '../tabcontent';

type TabName = 'waiting' | 'processing' | 'completion' | 'all';

const TabBar = ({ onOrderClick, activeTab, setActiveTab }: any) => {
  const [list, setList] = useState(orderwaiting);

  const handleTabClick = (tabName: TabName) => {
    setActiveTab(tabName);
    if (tabName === 'waiting') {
      setList(orderwaiting);
    } else if (tabName === 'processing') {
      setList(ordersprocessing);
    } else if (tabName === 'completion') {
      setList(orderscompletion);
    } else if (tabName === 'all') {
      setList(orderservice);
    }
  };

  return (
    <div>
      <TabContainer>
        <Tab active={(activeTab === 'waiting').toString()} onClick={() => handleTabClick('waiting')}>
          <div>접수대기</div>
          <div>{orderwaiting.length}</div>
        </Tab>
        <Tab active={(activeTab === 'processing').toString()} onClick={() => handleTabClick('processing')}>
          <div>처리중</div>
          <div>{ordersprocessing.length}</div>
        </Tab>
        <Tab active={(activeTab === 'completion').toString()} onClick={() => handleTabClick('completion')}>
          <div>완료</div>
          <div>{orderscompletion.length}</div>
        </Tab>
        <Tab active={(activeTab === 'all').toString()} onClick={() => handleTabClick('all')}>
          <div>전체</div>
          <div>{orderservice.length}</div>
        </Tab>
      </TabContainer>
      <TabContent activetab={activeTab} list={list} onOrderClick={onOrderClick} />
    </div>
  );
};

export default TabBar;
