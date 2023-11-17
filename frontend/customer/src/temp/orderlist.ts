export const orders = [
  {
    orderId: 2, // 주문 아이디
    createdAt: '2023-11-02T12:33:31.391567', // 주문 일자
    orderState: 'WAITING',
    storeId: 1, // 가게 아이디
    storeName: 'temp', // 가게 이름
    categoryType: 'HOTTEOK',
    menuName: '햄버거', // 메뉴 이름
    menuCount: 2, // 총 메뉴 수
    restCount: 1, // 대표 메뉴 제외 메뉴 수
    bucketTotalPrice: 10500, // 총 가격
  },
  {
    orderId: 1,
    createdAt: '2023-11-06T16:17:12.65465',
    orderState: 'PROCESSING',
    storeId: 1,
    storeName: '신호호떡',
    categoryType: 'HOTTEOK',
    menuName: '햄버거',
    menuCount: 2,
    restCount: 1,
    bucketTotalPrice: 10500,
  },
];
