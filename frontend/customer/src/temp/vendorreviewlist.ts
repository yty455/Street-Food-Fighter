export const vendorreviewlist = {
  content: [
    {
      storeId: 1, // 가게ID
      storeName: '맘스터치', // 가게이름
      createdDate: '2023-11-10T17:09:02.025617', // 리뷰 작성 시간 (LocalDateTime)
      score: 5, // 별점
      content: 'string', //  z 리뷰 내용
      orderId: 0, // 주문 ID
      menu: ['팥붕', '슈붕'], // 주문 메뉴 String List
    },
    {
      storeId: 1,
      storeName: '맘스터치',
      createdDate: '2023-11-10T17:09:02.025617',
      score: 0,
      content: '리뷰',
      orderId: 0,
      menu: ['햄버거', '감자튀김'],
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 2,
    sort: {
      empty: false,
      unsorted: false,
      sorted: true,
    },
    offset: 0,
    unpaged: false,
    paged: true,
  },
  last: false, // 마지막페이지인지
  totalElements: 3, // 리뷰 총 수 (내가 쓴 리뷰 총 3개)
  totalPages: 2, // 페이지 수
  size: 2, // 페이지당 개체 수
  number: 0,
  sort: {
    empty: false,
    unsorted: false,
    sorted: true,
  },
  first: true, // 첫페이지 인지
  numberOfElements: 2,
  empty: false,
};
