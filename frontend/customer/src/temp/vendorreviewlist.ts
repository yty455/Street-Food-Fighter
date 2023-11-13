export const vendorreviewlist = {
  content: [
    {
      createdDate: '2023-11-10T17:09:02.025617', // 리뷰 작성 시간 (LocalDateTime)
      score: 5, // 별점
      content: '내용', //리뷰내용
      userId: 1, // 회원 ID
      userName: '테스터', // 리뷰 작성자 이름
      userProfileUrl: '', // 리뷰 작성자 프로필 사진 주소
    },
    {
      createdDate: '2023-11-10T17:09:02.025617',
      score: 3,
      content: '내용',
      userId: 2,
      userName: '강동2주',
      userProfileUrl: '',
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 3,
    sort: [
      {
        direction: 'DESC',
        property: 'createdDate',
        ignoreCase: false,
        nullHandling: 'NATIVE',
        ascending: false,
        descending: true,
      },
    ],
    offset: 0,
    paged: true,
    unpaged: false,
  },
  first: true,
  last: true,
  size: 3,
  number: 0,
  sort: [
    {
      direction: 'DESC',
      property: 'createdDate',
      ignoreCase: false,
      nullHandling: 'NATIVE',
      ascending: false,
      descending: true,
    },
  ],
  numberOfElements: 2,
  empty: false,
};
