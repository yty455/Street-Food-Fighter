export const flagdetail = {
  date: '2023-11-02',
  openTime: '10:00',
  closeTime: '10:00',
  address: 'string',
  fundingAmount: 26500,
  fundingUserGrade: {
    // 없는건 0
    LIGHT: 1,
    CHAMPION: 2,
    MIDDLE: 1,
    HEAVY: 0,
  },
  fundingUserInfoList: [
    {
      userName: '성인',
      userGrade: 'LIGHT',
      totalPrice: 3000,
      fundingMenuInfoList: [
        {
          menuName: '붕어빵',
          count: 4,
        },
        {
          menuName: '슈크림 붕어빵',
          count: 2,
        },
      ],
    },
    {
      userName: '동윤',
      userGrade: 'MIDDLE',
      totalPrice: 6500,
      fundingMenuInfoList: [
        {
          menuName: '와플',
          count: 1,
        },
      ],
    },
    {
      userName: '배성',
      userGrade: 'CHAMPION',
      totalPrice: 8000,
      fundingMenuInfoList: [
        {
          menuName: '와플',
          count: 1,
        },
      ],
    },
    {
      userName: '재영',
      userGrade: 'CHAMPION',
      totalPrice: 9000,
      fundingMenuInfoList: [
        {
          menuName: '붕어빵',
          count: 4,
        },
        {
          menuName: '슈크림 붕어빵',
          count: 2,
        },
      ],
    },
  ],
};
