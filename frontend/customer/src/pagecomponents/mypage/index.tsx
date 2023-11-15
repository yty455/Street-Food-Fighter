import WishList from '@/components/mypage/wishlist';
import { MypageContainer, Topbar } from './Mypage.styled';
import Profile from '@/components/mypage/profile';
import Fightmoney from '@/components/mypage/fightmoney';
import { useState, useEffect } from 'react';
import LevelModal from '@/components/mypage/levelmodal';
import Charge from '@/components/common/charge';

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // 포인트 충전 모달
  const [showCharge, setShowCharge] = useState(false);
  const toggleCharge = () => {
    setShowCharge(!showCharge);
  };

  return (
    <MypageContainer>
      <Topbar>my 스푸파</Topbar>
      <Profile toggleModal={toggleModal}></Profile>
      <WishList></WishList>
      <Fightmoney toggleCharge={toggleCharge}></Fightmoney>
      {isModalOpen && <LevelModal toggleModal={toggleModal} />}
      {showCharge && <Charge toggleCharge={toggleCharge} />}
    </MypageContainer>
  );
};

export default MyPage;
