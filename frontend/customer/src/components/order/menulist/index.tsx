import { vendordata } from '@/temp/vendordata';
import MenuCard from '../menucard';
import { BoxContainer } from './Menulist.styled';

const Menulist = ({ vendorid }: any) => {
  const vendor = vendordata[vendorid];
  const menulist = vendor?.menulist || [];

  return (
    <BoxContainer>
      {menulist.map((menu) => (
        <MenuCard key={menu.id} vendorid={vendorid} menuid={menu.id} />
      ))}
    </BoxContainer>
  );
};

export default Menulist;
