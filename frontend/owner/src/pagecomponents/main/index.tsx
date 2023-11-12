import { useState } from 'react';
import { MainContainer, OperButtonList, OperButton, OperText, Menu, MenuList } from './Main.styled';
import { useRouter } from 'next/navigation';
import { Flag0, Flag1, Flag2, Flag3 } from '@/temp/flag';
import useModal from '@/hooks/common/modal.hook';
import StartPopup from '@/components/main/startpopup';
import SelectFlag from '@/components/main/seletflag';
import CloseAPI from '@/apis/close/CloseAPI';

const MainPage = () => {
  const router = useRouter();
  const [isVendorOpen, setVendorOpen] = useState(false);

  const todayflag = Flag0;

  const { isModalOpen, openModal, closeModal } = useModal();
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const handleStartOperation = () => {
    setModalContent(<StartPopup onClose={closeModal} />);
  };

  const switchVendor = () => {
    if (!isVendorOpen) {
      if (todayflag.length === 0) {
        setModalContent(<StartPopup onClose={closeModal} />);
      } else {
        setModalContent(<SelectFlag flags={todayflag} onStartOperation={handleStartOperation} onClose={closeModal} />);
      }
      openModal(); // 모달 열기
    } else {
    }
    setVendorOpen(!isVendorOpen);
  };

  const handleCloseAPI = async () => {
    try {
      const res = await CloseAPI();
      console.log(res);
      if (res) {
        router.push('/close');
      }
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <MainContainer>
      <OperButtonList>
        <OperButton>{isVendorOpen ? <OperText>영업 중</OperText> : <OperText>영업 전</OperText>}</OperButton>
        <OperButton type="btn" onClick={!isVendorOpen ? switchVendor : handleCloseAPI}>
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
        <Menu
          onClick={() => {
            router.push('/orderlist');
          }}
        >
          <img src="/images/main/list.png" style={{ width: '75px' }} />
          <div>주문 목록</div>
        </Menu>
        <Menu
          onClick={() => {
            router.push('/wishlist');
          }}
        >
          <img src="/images/main/graph.png" style={{ width: '75px' }} />
          <div>지역 통계</div>
        </Menu>
      </MenuList>
      {isModalOpen && modalContent}
    </MainContainer>
  );
};

export default MainPage;
