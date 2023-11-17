export const nearflags = [
  {
    flag: {
      flagId: 1,
      date: '2023-11-02', // 깃발 날짜
      openTime: '10:00:00', // 깃발 시작 시간
      closeTime: '16:00:00', // 깃발 종료 시간
      address: '깃발 주소',
      lati: 35.0870048,
      longi: 128.8536064,
      state: '깃발 상태', // WAITING | SUCCESS | FAILURE
      fundingAmount: 0, // 펀딩 금액 0으로 다 갈거임
    },
    ownerId: 2,
    storeId: 10,
    name: '가게이름',
    ownerName: '사장이름',
    phone: '휴대폰번호',
    category: 'HOTTEOK',
    businessCategory: '푸드트럭',
    openTime: '00:00:00',
    closeTime: '12:00:00',
    activeArea: '주소',
    lati: 35.0870048,
    longi: 128.8536064,
    information: '안내변경',
    introduction: '설명 변경',
    state: 'OPEN', // OPEN | CLOSE
  },
  {
    flag: {
      flagId: 2,
      date: '2023-11-02',
      openTime: '10:00:00',
      closeTime: '16:00:00',
      address: '주소주소',
      lati: 48.0,
      longi: 54.0,
      state: 'WAITING',
      fundingAmount: 0,
    },
    ownerId: 2,
    storeId: 2,
    name: '변경된 가게이름2',
    ownerName: '변경된 대표이름',
    phone: '010-9999-9999',
    category: 'FISHBREAD',
    businessCategory: '포장마차',
    openTime: '00:00:00',
    closeTime: '12:00:00',
    activeArea: '주소',
    lati: 35.0870048,
    longi: 128.8566064,
    information: '안내변경',
    introduction: '설명 변경',
    state: 'OPEN',
  },
];
