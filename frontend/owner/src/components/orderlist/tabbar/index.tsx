import { useState } from 'react';
import { TabContainer, Tab, Content } from './Tabbar.styled';

const TabBar = () => {
  const [activeTab, setActiveTab] = useState('waiting');

  return (
    <div>
      <TabContainer>
        <Tab active={(activeTab === 'waiting').toString()} onClick={() => setActiveTab('waiting')}>
          접수대기
        </Tab>
        <Tab active={(activeTab === 'processing').toString()} onClick={() => setActiveTab('processing')}>
          처리중
        </Tab>
        <Tab active={(activeTab === 'completion').toString()} onClick={() => setActiveTab('completion')}>
          완료
        </Tab>
        <Tab active={(activeTab === 'all').toString()} onClick={() => setActiveTab('all')}>
          전체
        </Tab>
      </TabContainer>
      <Content>{activeTab === 'waiting' && <div>대기</div>}</Content>
      <Content>{activeTab === 'processing' && <div>처리중</div>}</Content>
      <Content>{activeTab === 'completion' && <div>완료</div>}</Content>
      <Content>{activeTab === 'all' && <div>전체</div>}</Content>
    </div>
  );
};

export default TabBar;
