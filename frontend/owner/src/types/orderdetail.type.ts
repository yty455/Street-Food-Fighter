export type OrderOption = {
  optionId: number;
  name: string;
  price: number;
};

export type OrderItem = {
  name: string;
  price: number;
  count: number;
  orderOptionList: OrderOption[];
  menuTotalPrice: number;
};

export type ReviewType = {
  reviewId: number;
  userId: number;
  score: number;
  content: string;
};

export type DetailType = {
  orderId: number;
  createAt: string;
  userNickName: string;
  userGrade: 'LIGHT' | 'HEAVY' | 'CHAMPION' | 'MIDDLE' | string; // 손님 등급을 포함한 타입 조정
  userPhone: string;
  requirement: string;
  orderItemList: OrderItem[];
  totalPrice: number;
  review: ReviewType; // ReviewType으로 타입 변경
};

export default DetailType;
