import React from 'react';
import { MainContainer, OperButtonList, OperButton, OperText, Menu, MenuList } from './Main.styled';
import { useRouter } from 'next/navigation';

const MainPage = () => {
  const router = useRouter();
  return (
    <MainContainer>
      <OperButtonList>
        <OperButton type="start">
          <OperText>영업 시작</OperText>
        </OperButton>
        <OperButton>
          <OperText>영업 종료</OperText>
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
    </MainContainer>
  );
};

export default MainPage;
