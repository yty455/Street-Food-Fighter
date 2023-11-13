import { OrderState } from '@/types/orderlist.type';

export const orderStateMapping: { [key in OrderState]: string } = {
  PAYMENT_IN_PROGRESS: '결제 전',
  WAITING: '주문 대기',
  PROCESSING: '조리중',
  COMPLETED: '완료',
  REFUSED: '주문 거절',
};
