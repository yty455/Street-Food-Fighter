import React, { useState } from 'react';
import { Topbar, Title, AlertImage, AlertContainer, ShowBeforeAlert } from './Alert.styled';
import { alerts } from '@/temp/alerts';
import AlertCard from '@/components/alert/alertcard';

const AlertPage = () => {
  const [isAlertOn, setIsAlertOn] = useState(true);

  const toggleAlert = () => {
    setIsAlertOn(!isAlertOn);
  };
  return (
    <div style={{ height: '93vh' }}>
      <Topbar>
        <Title>알림 센터</Title>
        <AlertImage onClick={toggleAlert}>
          {isAlertOn ? <img src="/images/top/alert.png" style={{ width: '25px' }} /> : <img src="/images/top/mute.png" style={{ width: '25px' }} />}
        </AlertImage>
      </Topbar>
      <AlertContainer>
        {alerts.map((alert, index) => (
          <AlertCard key={index} alert={alert} />
        ))}
        <ShowBeforeAlert> 이전 알림 보기 </ShowBeforeAlert>
      </AlertContainer>
    </div>
  );
};

export default AlertPage;
