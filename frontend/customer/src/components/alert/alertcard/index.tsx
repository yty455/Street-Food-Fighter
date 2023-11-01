import { alertMessages, alertTypeToIdMapping } from '@/assets/alert';
import { AlertAPI, AlertType } from '@/types/alerttype';

interface AlertCardProps {
  alert: AlertAPI;
}
const AlertCard = ({ alert }: AlertCardProps) => {
  const alertId = alertTypeToIdMapping[alert.recipient_type as AlertType] - 1;
  const alertMessage = alertMessages[alertId];

  if (!alertMessage) return null;
  return (
    <div>
      <div>
        <div>{alertMessage.title} </div>
        <img src={alertMessage.imgsrc} style={{ width: '20px' }} />
      </div>

      <div>
        {alert.vendorname}
        {alertMessage.content}
      </div>
      <div>{alert.date}</div>
    </div>
  );
};

export default AlertCard;
