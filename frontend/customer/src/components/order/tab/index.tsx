import { useState } from 'react';
import { TabContainer, Tab, Content } from './Tab.styled';
import VendorInfo from '../vendorinfo';
import Reviewlist from '../reviewlist';
import Menulist from '../menulist';

const TabBar = ({ vendorid }: any) => {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div>
      <TabContainer>
        <Tab active={(activeTab === 'menu').toString()} onClick={() => setActiveTab('menu')}>
          메뉴
        </Tab>
        <Tab active={(activeTab === 'info').toString()} onClick={() => setActiveTab('info')}>
          가게/정보
        </Tab>
        <Tab active={(activeTab === 'review').toString()} onClick={() => setActiveTab('review')}>
          리뷰
        </Tab>
      </TabContainer>
      <Content>
        {activeTab === 'menu' && <Menulist vendorid={vendorid}>메뉴 정보</Menulist>}
        {activeTab === 'info' && <VendorInfo vendorid={vendorid} />}
        {activeTab === 'review' && <Reviewlist vendorid={vendorid}></Reviewlist>}
      </Content>
    </div>
  );
};

export default TabBar;
