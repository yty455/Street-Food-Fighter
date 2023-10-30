import { vendordata } from '@/temp/vendordata';
import MenuCard from '../menucard';
import { BoxContainer, Putin } from './Menulist.styled';
import useOrderStore from '@/stores/orderStore';
import { useNavStore } from '@/stores/curnavStore';
import { useRouter } from 'next/navigation';
import BottomBtn from '@/components/common/bottombtn';
const Menulist = ({ vendorid }: any) => {
  const vendor = vendordata.find((v) => v.id === vendorid);
  if (!vendor) {
    return <div>가게가 없어졌어요 🥺</div>;
  }

  const menulist = vendor.menulist || [];
  // console.log(menulist);

  const { order } = useOrderStore();
  const isOrderNotEmpty = order.length > 0 && order.every((menu) => menu.quantity > 0);
  const router = useRouter();
  const { curnav } = useNavStore();
  return (
    <BoxContainer>
      {menulist.map((menu) => (
        <MenuCard key={menu.id} vendorid={vendorid} menuid={menu.id} />
      ))}
      <div
        onClick={() => {
          router.push('/topurchase');
        }}
      >
        {isOrderNotEmpty && <BottomBtn text={curnav == 1 ? '주문 하기' : '펀딩 하기'} />}
      </div>
    </BoxContainer>
  );
};

export default Menulist;
