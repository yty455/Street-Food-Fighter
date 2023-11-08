import { useState } from 'react';
import { MainContainer, OperButtonList, OperButton, OperText, Menu, MenuList } from './Main.styled';
import { useRouter } from 'next/navigation';
import { Flag0, Flag1, Flag2, Flag3 } from '@/temp/flag';
import useModal from '@/hooks/common/modal.hook';
import StartPopup from '@/components/main/startpopup';

const MainPage = () => {
  const router = useRouter();
  const [isVendorOpen, setVendorOpen] = useState(false);

  const todayflag = Flag2;

  const { isModalOpen, openModal, closeModal } = useModal();
  const switchVendor = () => {
    // if (!isVendorOpen && todayflag.length === 0) {
    if (!isVendorOpen) {
      openModal(); // 모달 열기
      console.log(isModalOpen);
    } else {
    }
    setVendorOpen(!isVendorOpen);
  };

  return (
    <MainContainer>
      <OperButtonList>
        <OperButton>{isVendorOpen ? <OperText>영업 중</OperText> : <OperText>영업 전</OperText>}</OperButton>
        <OperButton type="btn" onClick={switchVendor}>
          {!isVendorOpen ? <OperText>영업 시작</OperText> : <OperText>영업 종료</OperText>}
        </OperButton>
      </OperButtonList>
      <MenuList>
        <Menu>
          <img src="/images/main/vendor.png" style={{ width: '75px' }} />
          <div>가게 정보 관리</div>
        </Menu>
        <Menu
          onClick={() => {
            router.push('/item');
          }}
        >
          <img src="/images/main/item.png" style={{ width: '75px' }} />
          <div>상품 관리</div>
        </Menu>
        <Menu
          onClick={() => {
            router.push('/category');
          }}
        >
          <img src="/images/main/category.png" style={{ width: '75px' }} />
          <div>카테고리 설정</div>
        </Menu>
        <Menu
          onClick={() => {
            router.push('/flag');
          }}
        >
          <img src="/images/common/flag.png" style={{ width: '75px' }} />
          <div>깃발 관리</div>
        </Menu>
        <Menu>
          <img src="/images/main/list.png" style={{ width: '75px' }} />
          <div>주문 목록</div>
        </Menu>
        <Menu>
          <img src="/images/main/graph.png" style={{ width: '75px' }} />
          <div>지역 통계</div>
        </Menu>
      </MenuList>
      {isModalOpen && <StartPopup onClose={closeModal} />}
    </MainContainer>
  );
};

export default MainPage;
