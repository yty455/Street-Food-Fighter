import { vendordata } from '@/temp/vendordata';
import { CardContainer, LeftContainer } from './Menucard.styled';

const MenuCard = ({ vendorid, menuid }: any) => {
  const menulist = vendordata[vendorid].menulist;
  // console.log('card', reviewlist);
  const reviewdata = menulist[menuid - 1];
  if (!reviewdata) return null;
  return (
    <CardContainer>
      <LeftContainer>
        <div>menu 사진s</div>
        <div>
          <div>menu 이름</div>
          <div>menu 가격</div>
        </div>
      </LeftContainer>
      <div>아래아이콘</div>
    </CardContainer>
  );
};

export default MenuCard;
