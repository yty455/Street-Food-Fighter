import React from 'react';
import { Topbar, Title, AlertImage, AlertList, AlertContainer } from './Alert.styled';
import { alerts } from '@/temp/alerts';
import AlertCard from '@/components/alert/alertcard';

const AlertPage = () => {
  return (
    <div style={{ height: '93vh' }}>
      <Topbar>
        <Title>알림 센터</Title>
        <AlertImage>
          <img src="/images/top/alert.png" style={{ width: '30px' }} />
        </AlertImage>
      </Topbar>
      <AlertContainer>
        <AlertList>
          {alerts.map((alert, index) => (
            <AlertCard key={index} alert={alert} />
          ))}
        </AlertList>
        <div> 이전 알림 보기 </div>
      </AlertContainer>
    </div>
  );
};

export default AlertPage;
