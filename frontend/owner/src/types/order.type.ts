export type OrderState = 'WAITING' | 'PROCESSING' | 'COMPLETED' | 'REFUSED';
export const ordermap: { [key in OrderState]: string } = {
  WAITING: '접수 대기',
  PROCESSING: '조리중',
  COMPLETED: '완료',
  REFUSED: '주문 거절',
};

export interface OrderMenuItem {
  name: string;
  count: number;
}

export interface Order {
  orderId: number;
  receiptNumber: string;
  orderState: OrderState;
  reviewState: string;
  requirement: string;
  orderDate: string;
  orderMenuList: OrderMenuItem[];
  totalPrice: number;
  totalMenuCount: number;
}
