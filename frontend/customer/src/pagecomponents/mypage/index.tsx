import React from 'react';
import { MypageContainer, Topbar } from './Mypage.styled';

const MyPage = () => {
  return (
    <MypageContainer>
      <Topbar>my 스푸파</Topbar>
      <div>프로필 컴포넌트</div>
      <div>먹고싶은걸 골라봐요 컴포넌트</div>
      <div>파이트머니 컴포넌트</div>
    </MypageContainer>
  );
};

export default MyPage;
