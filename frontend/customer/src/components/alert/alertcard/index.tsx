import { alertMessages, alertTypeToIdMapping } from '@/assets/alert';
import { AlertAPI, AlertType } from '@/types/alerttype';
import { Airfont, AlertBox, Title, Vendorname } from './Alertcard.styled';

interface AlertCardProps {
  alert: AlertAPI;
}
const AlertCard = ({ alert }: AlertCardProps) => {
  const alertId = alertTypeToIdMapping[alert.recipient_type as AlertType] - 1;
  const alertMessage = alertMessages[alertId];

  if (!alertMessage) return null;
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
      <div>{alert.date}</div>
    </AlertBox>
  );
};

export default AlertCard;
