export type AlertType = 'FAILURE' | 'SUCCESS' | 'PROCESSING' | 'REQUEST' | 'COMPLETED' | 'REFUSED';

export interface AlertMessage {
  id: number;
  type: AlertType;
  title: string;
  content: string;
  imgsrc: string;
}

export type AlertTypeToIdMapping = {
  [key in AlertType]: number;
};
