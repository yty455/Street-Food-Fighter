export type AlertType = 'FAILURE' | 'SUCCESS' | 'PROCESSING' | 'REQUEST' | 'COMPLETED' | 'REFUSED';

export interface AlertMessage {
  type: AlertType;
  title: string;
  content: string;
  imgsrc: string;
}

export type AlertTypeToIdMapping = {
  [key in AlertType]: number;
};

export interface AlertAPI {
  recipient_type: string;
  refundpoint: number | null;
  date: string;
  vendorname: string;
}
