import { vendordata } from '@/temp/vendordata';
import { CardContainer, InfoList, LeftContainer, Name, Price } from './Menucard.styled';
import { useState } from 'react';

const MenuCard = ({ vendorid, menuid }: any) => {
  const [open, setOpen] = useState(false);
  const menulist = vendordata[vendorid].menulist;
  const menudata = menulist[menuid - 1];
  if (!menudata) return null;

  const cardclick = () => {
    // console.log('card', menudata);
    setOpen(!open);
    // option card
  };
  return (
    <CardContainer onClick={cardclick}>
      <LeftContainer>
        <div>
          <img src={menudata.menuimg} style={{ width: '60px' }} />
        </div>
        <InfoList>
          <Name>{menudata.name}</Name>
          <Price>{Number(menudata.price).toLocaleString()}원</Price>
        </InfoList>
      </LeftContainer>
      {open ? (
        <img src="/images/orderfunding/down.png" style={{ width: '30px' }} />
      ) : (
        <img src="/images/orderfunding/up.png" style={{ width: '30px' }} />
      )}
    </CardContainer>
  );
};

export default MenuCard;
