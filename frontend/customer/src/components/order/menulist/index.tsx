import { vendordata } from '@/temp/vendordata';
import MenuCard from '../menucard';
import { BoxContainer, Putin } from './Menulist.styled';
import useOrderStore from '@/stores/orderStore';

const Menulist = ({ vendorid }: any) => {
  const vendor = vendordata[vendorid];
  const menulist = vendor?.menulist || [];
  const { order } = useOrderStore();
  const isOrderNotEmpty = order.length > 0 && order.every((menu) => menu.quantity > 0);

  console.log(order);
  return (
    <BoxContainer>
      {menulist.map((menu) => (
        <MenuCard key={menu.id} vendorid={vendorid} menuid={menu.id} />
      ))}
      {isOrderNotEmpty && <Putin> 담 기 </Putin>}
    </BoxContainer>
  );
};

export default Menulist;
