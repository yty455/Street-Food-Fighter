import { vendordata } from '@/temp/vendordata';
import { CardContainer, InfoList, LeftContainer, Name, Price } from './Menucard.styled';

const MenuCard = ({ vendorid, menuid }: any) => {
  const menulist = vendordata[vendorid].menulist;
  // console.log('card', reviewlist);
  const menudata = menulist[menuid - 1];
  if (!menudata) return null;
  return (
    <CardContainer>
      <LeftContainer>
        <div>
          <img src={menudata.menuimg} style={{ width: '60px' }} />
        </div>
        <InfoList>
          <Name>{menudata.name}</Name>
          <Price>{Number(menudata.price).toLocaleString()}원</Price>
        </InfoList>
      </LeftContainer>
      <img src="/images/orderfunding/down.png" style={{ width: '30px' }} />
    </CardContainer>
  );
};

export default MenuCard;
