import WishList from '@/components/mypage/wishlist';
import { MypageContainer, Topbar } from './Mypage.styled';
import Profile from '@/components/mypage/profile';
import Fightmoney from '@/components/mypage/fightmoney';
import { useState } from 'react';
import LevelModal from '@/components/mypage/levelmodal';

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <MypageContainer>
      <Topbar>my 스푸파</Topbar>
      <Profile toggleModal={toggleModal}></Profile>
      <WishList></WishList>
      <Fightmoney></Fightmoney>
      {isModalOpen && <LevelModal toggleModal={toggleModal} />}
    </MypageContainer>
  );
};

export default MyPage;
