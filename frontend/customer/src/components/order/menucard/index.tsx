import { vendordata } from '@/temp/vendordata';
import { CardContainer, InfoList, LeftContainer, Name, Price } from './Menucard.styled';
import { useState } from 'react';
import Optioncard from '../optioncard';

const MenuCard = ({ vendorid, menuid }: any) => {
  const [open, setOpen] = useState(false);
  const vendor = vendordata.find((v) => v.id === vendorid);
  if (!vendor) {
    return <div>가게가 없어졌어요 🥺</div>;
  }

  const menulist = vendor.menulist || [];
  const menudata = menulist.find((menu) => menu.id === menuid);

  if (!menudata) return <div>메뉴가 없어요 🥺</div>;

  const cardclick = () => {
    setOpen(!open);
  };
  return (
    <div>
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
          <img src="/images/orderfunding/up.png" style={{ width: '30px' }} />
        ) : (
          <img src="/images/orderfunding/down.png" style={{ width: '30px' }} />
        )}
      </CardContainer>
      {open && <Optioncard menuid={menuid} menudata={menudata} />}
    </div>
  );
};

export default MenuCard;
