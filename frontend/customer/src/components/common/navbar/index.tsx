import React, { useState } from 'react';
import { StyledNavbar, Flexbox, NavText } from './Navbar.styled';

const NavItem = ({ id, label, curnav, onClick }: any) => {
  const isActive = curnav === id;
  const imgSrc = isActive ? `/images/navbar/check${id}.png` : `/images/navbar/${id}.png`;

  return (
    <Flexbox onClick={onClick}>
      <img src={imgSrc} style={{ width: '30px' }} />
      <NavText curnav={curnav} cur={id.toString()}>
        {label}
      </NavText>
    </Flexbox>
  );
};

const Navbar = () => {
  // 임시
  const [curnav, setCurnav] = useState(1);
  const NAV_ITEMS = [
    { id: 1, label: '주문' },
    { id: 2, label: '펀딩' },
    { id: 3, label: '알림' },
    { id: 4, label: '주문 내역' },
    { id: 5, label: '내 정보' },
  ];
  return (
    <StyledNavbar>
      {NAV_ITEMS.map(({ id, label }) => (
        <NavItem key={id} id={id} label={label} curnav={curnav} onClick={() => setCurnav(id)} />
      ))}
    </StyledNavbar>
  );
};
export default Navbar;
