import React from 'react';
import { MainContainer, OperButtonList, OperButton, OperText, Menu, MenuList } from './Main.styled';

const MainPage = () => {
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
          <img src="/images/common/vendor.png" style={{ width: '75px' }} />
          <div>가게 정보 관리</div>
        </Menu>
        <Menu>
          <img src="/images/common/item.png" style={{ width: '75px' }} />
          <div>상품 관리</div>
        </Menu>
        <Menu>
          <img src="/images/common/category.png" style={{ width: '75px' }} />
          <div>카테고리 설정</div>
        </Menu>
        <Menu>
          <img src="/images/common/flag.png" style={{ width: '75px' }} />
          <div>깃발 등록</div>
        </Menu>
        <Menu>
          <img src="/images/common/list.png" style={{ width: '75px' }} />
          <div>주문 목록</div>
        </Menu>
        <Menu>
          <img src="/images/common/graph.png" style={{ width: '75px' }} />
          <div>지역 통계</div>
        </Menu>
      </MenuList>
    </MainContainer>
  );
};

export default MainPage;
