import WishList from '@/components/mypage/wishlist';
import { MypageContainer, Topbar } from './Mypage.styled';
import Profile from '@/components/mypage/profile';

const MyPage = () => {
  return (
    <MypageContainer>
      <Topbar>my 스푸파</Topbar>
      <Profile></Profile>
      <WishList></WishList>
      <div>파이터</div>
    </MypageContainer>
  );
};

export default MyPage;
