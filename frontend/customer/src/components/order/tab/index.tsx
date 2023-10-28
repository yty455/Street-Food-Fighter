import { useState } from 'react';
import { TabContainer, Tab, Content } from './Tab.styled';

export default function TabBar() {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div>
      <TabContainer>
        <Tab active={activeTab === 'menu'} onClick={() => setActiveTab('menu')}>
          메뉴
        </Tab>
        <Tab active={activeTab === 'info'} onClick={() => setActiveTab('info')}>
          가게/정보
        </Tab>
        <Tab active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
          리뷰
        </Tab>
      </TabContainer>
      <Content>
        {activeTab === 'menu' && <p>메뉴 정보</p>}
        {activeTab === 'info' && <p>가게 정보</p>}
        {activeTab === 'review' && <p>리뷰</p>}
      </Content>
    </div>
  );
}
