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

export type DetailType = {
  orderId: number;
  userId: number;
  createAt: string;
  userNickName: string;
  userGrade: 'MIDDLE' | string; // Adjust with all possible grades if needed
  userPhone: string;
  requirement: string;
  orderItemList: OrderItem[];
  totalPrice: number;
  reviewId: number;
  content: string;
  score: number;
};

export default DetailType;
