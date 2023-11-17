export type AlertType = 'FAILURE' | 'SUCCESS' | 'PROCESSING' | 'REQUEST' | 'COMPLETED' | 'REFUSED' | 'DONE_F' | 'DONE_R';

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
  targetId: number;
  type: string;
  totalPrice: number | null;
  createdDate: string;
  storeName: string;
}
