import React from 'react';
import { Topbar, Title, AlertImage } from './Alert.styled';
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
      <div>
        <div> 오늘 알림 리스트 </div>
        {alerts.map((alert, index) => (
          <AlertCard key={index} alert={alert} />
        ))}
        <div> 이전 알림 보기 </div>
      </div>
    </div>
  );
};

export default AlertPage;
