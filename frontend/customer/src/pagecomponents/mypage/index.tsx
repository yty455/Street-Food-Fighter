import WishList from '@/components/mypage/wishlist';
import { MypageContainer, Topbar } from './Mypage.styled';
import Profile from '@/components/mypage/profile';
import Fightmoney from '@/components/mypage/fightmoney';

const MyPage = () => {
  return (
    <MypageContainer>
      <Topbar>my 스푸파</Topbar>
      <Profile></Profile>
      <WishList></WishList>
      <Fightmoney></Fightmoney>
    </MypageContainer>
  );
};

export default MyPage;
