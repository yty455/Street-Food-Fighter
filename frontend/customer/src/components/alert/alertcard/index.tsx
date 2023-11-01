import { alertMessages, alertTypeToIdMapping } from '@/assets/alert';
import { AlertAPI, AlertType } from '@/types/alerttype';
import { Airfont, AlertBox, Title, Vendorname, Daybefore } from './Alertcard.styled';
import moment from 'moment';

interface AlertCardProps {
  alert: AlertAPI;
}
const AlertCard = ({ alert }: AlertCardProps) => {
  const alertId = alertTypeToIdMapping[alert.recipient_type as AlertType] - 1;
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

  return (
    <AlertBox>
      <Title>
        <div>{alertMessage.title} </div>
        <img src={alertMessage.imgsrc} style={{ width: '20px' }} />
      </Title>

      <Airfont>
        <Vendorname>{alert.vendorname}</Vendorname>
        {alertMessage.content}
      </Airfont>
      <Daybefore>{getTimeDifference(alert.date)}</Daybefore>
    </AlertBox>
  );
};

export default AlertCard;
