export const orderdetail = {
  orderId: 1, // 주문 아이디
  userId: 1, // 손님 아이디
  createAt: '2023-10-06T16:17:12.65465', // 주문 일자
  userNickName: '테스터', // 손님 닉네임
  userGrade: 'MIDDLE', // 손님 등급 : 링크
  userPhone: '010-0000-1234', // 손님 번호
  requirement: '요청사항3', // 요청 사항
  orderItemList: [
    // 주문 메뉴 목록
    {
      name: '햄버거', // 메뉴 이름
      price: 3000, // 메뉴 가격
      count: 2, // 메뉴 개수
      orderOptionList: [
        {
          optionId: 101,
          name: '양상추 추가',
          price: 500,
        },
        {
          optionId: 102,
          name: '치즈 추가',
          price: 500,
        },
      ],
      menuTotalPrice: 8000, // 메뉴별 금액 총합
    },
    {
      name: '감자튀김',
      price: 2000,
      count: 1,
      orderOptionList: [
        {
          optionId: 103,
          name: '시즈닝 추가',
          price: 500,
        },
      ],
      menuTotalPrice: 2500,
    },
  ],
  totalPrice: 10500, // 총 주문 금액
  reviewId: 1, // 리뷰 아이디
  content: 'dfd', // 리뷰 내용
  score: 5, // 별점
};
