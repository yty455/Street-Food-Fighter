import { MypageContainer, Topbar } from './Mypage.styled';
import Profile from '@/components/mypage/profile';

const MyPage = () => {
  return (
    <MypageContainer>
      <Topbar>my 스푸파</Topbar>
      <Profile></Profile>
      <div>먹고싶은걸 골라봐요 컴포넌트</div>
      <div>파이터</div>
    </MypageContainer>
  );
};

export default MyPage;
