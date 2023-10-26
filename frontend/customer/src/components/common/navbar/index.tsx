import React, { useState } from 'react';
import { StyledNavbar, Flexbox, NavText } from './Navbar.styled';
import { useNavStore } from '@/stores/curnavStore';
import { useRouter } from 'next/navigation';

const NavItem = ({ id, label, curnav, link, onClick }: any) => {
  const isActive = curnav === id;
  const imgSrc = isActive ? `/images/navbar/check${id}.png` : `/images/navbar/${id}.png`;

  const router = useRouter();

  const handleClick = () => {
    onClick();
    router.push(link);
  };

  return (
    <Flexbox onClick={handleClick}>
      <img src={imgSrc} style={{ width: '30px' }} />
      <NavText curnav={curnav} cur={id.toString()}>
        {label}
      </NavText>
    </Flexbox>
  );
};

const Navbar = () => {
  const { curnav, setCurnav } = useNavStore();
  const NAV_ITEMS = [
    { id: 1, label: '주문', link: '/main' },
    { id: 2, label: '펀딩', link: '/funding' },
    { id: 3, label: '알림', link: '/alert' },
    { id: 4, label: '주문 내역', link: '/orderlist' },
    { id: 5, label: '내 정보', link: '/mypage' },
  ];
  return (
    <StyledNavbar>
      {NAV_ITEMS.map(({ id, label, link }) => (
        <NavItem key={id} id={id} label={label} link={link} curnav={curnav} onClick={() => setCurnav(id)} />
      ))}
    </StyledNavbar>
  );
};
export default Navbar;
