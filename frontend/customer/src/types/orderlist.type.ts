export type OrderState = 'PAYMENT_IN_PROGRESS' | 'WAITING' | 'PROCESSING' | 'COMPLETED' | 'REFUSED';

export type Order = {
  orderId: number;
  createdAt: string;
  orderState: OrderState;
  storeId: number;
  storeName: string;
  categoryType: string;
  menuName: string;
  menuCount: number;
  restCount: number;
  bucketTotalPrice: number;
};

export type OrdersType = Order[];
