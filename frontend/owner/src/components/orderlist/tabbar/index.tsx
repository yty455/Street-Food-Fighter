import { useState } from 'react';
import { TabContainer, Tab } from './Tabbar.styled';
import { orderservice, orderwaiting, ordersprocessing, orderscompletion } from '@/temp/order';
import TabContent from '../tabcontent';

type TabName = 'waiting' | 'processing' | 'completion' | 'all';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('waiting');
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
          접수대기
        </Tab>
        <Tab active={(activeTab === 'processing').toString()} onClick={() => handleTabClick('processing')}>
          처리중
        </Tab>
        <Tab active={(activeTab === 'completion').toString()} onClick={() => handleTabClick('completion')}>
          완료
        </Tab>
        <Tab active={(activeTab === 'all').toString()} onClick={() => handleTabClick('all')}>
          전체
        </Tab>
      </TabContainer>
      <div>
        <TabContent activetab={activeTab} list={list} />
      </div>
    </div>
  );
};

export default TabBar;
