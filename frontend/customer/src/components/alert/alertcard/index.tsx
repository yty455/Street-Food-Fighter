import { alertMessages, alertTypeToIdMapping } from '@/assets/alert';
import { AlertAPI, AlertType } from '@/types/alerttype';
import { Airfont, AlertBox, Title, Vendorname, Daybefore, BottomBox, ButtonList } from './Alertcard.styled';
import moment from 'moment';
import Button from '@/components/common/button';
import { useRouter } from 'next/navigation';
import CancelFundingAPI from '@/apis/funding/CancelFundingAPI';
import { useState } from 'react';

interface AlertCardProps {
  alert: AlertAPI;
}
const AlertCard = ({ alert }: AlertCardProps) => {
  const alertId = alertTypeToIdMapping[alert.type as AlertType] - 1;
  const alertMessage = alertMessages[alertId];

  const getTimeDifference = (date: string) => {
    const now = moment();
    const targetDate = moment(date);
    const differenceInMinutes = now.diff(targetDate, 'minutes');
    if (!alertMessage) return null;

    if (differenceInMinutes < 1) {
      return `방금 전`;
    } else if (differenceInMinutes < 60) {
      return `${differenceInMinutes}분 전`;
    } else if (differenceInMinutes < 1440) {
      return `${Math.floor(differenceInMinutes / 60)}시간 전`;
    } else {
      return `${Math.floor(differenceInMinutes / 1440)}일 전`;
    }
  };

  const router = useRouter();
  const handleCancel = async () => {
    const res = await CancelFundingAPI(alert.targetId);
    if (res) {
      console.log('성공');
      router.push('/main');
    }
  };

  return (
    <AlertBox>
      <Title>
        <div>{alertMessage.title} </div>
        <img src={alertMessage.imgsrc} style={{ width: '20px' }} />
      </Title>

      <Airfont>
        <Vendorname>{alert.storeName}</Vendorname>
        {alertMessage.content}
      </Airfont>

      <BottomBox>
        <Daybefore>{getTimeDifference(alert.createdDate)}</Daybefore>
        {alertMessage.type === 'SUCCESS' && (
          <ButtonList>
            <div style={{ width: '80px' }}>
              <Button text="취소하기" color="light" onClick={handleCancel}></Button>
            </div>
            <div style={{ width: '80px' }}>
              <Button
                text="주문하기"
                onClick={() => {
                  router.push(`orderlist/fundinglist/detail/${alert.targetId}`);
                }}
              ></Button>
            </div>
          </ButtonList>
        )}
        {alertMessage.type === 'REQUEST' && (
          <div style={{ width: '80px' }}>
            <Button text="리뷰하기"></Button>
          </div>
        )}
      </BottomBox>
    </AlertBox>
  );
};

export default AlertCard;
