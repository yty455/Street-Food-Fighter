import VendorDetailAPI from '@/apis/vendor/VendorDetailAPI';
import { Airfont, MenuBox, InfoBox, Title, InfoList } from './Bagorder.styled';
import { useEffect, useState } from 'react';
import { VendorData } from '@/types/vendortype';
import { useVendorStore } from '@/stores/curvendoridStore';

const BagOrder = ({ curorder }: any) => {
  const [vendor, setVendor] = useState<VendorData | null>(null);

  // console.log('curorder: ', curorder);
  const storedVendorId = useVendorStore((state) => state.vendorId);
  useEffect(() => {
    const fetchVendorData = async () => {
      const data = await VendorDetailAPI({ storeId: storedVendorId });
      if (data) {
        setVendor(data);
        // console.log('vendor :  ', data);
      }
    };

    fetchVendorData();
  }, []);

  const menu = vendor?.menuInfoResponseList.find((m: any) => m.id === curorder.menuId);
  if (!menu) {
    return <div>메뉴를 찾을 수 없습니다.</div>;
  }
  // console.log('menu : ', menu);

  const optionsText = curorder.optionIds
    .map((selectedOptionId: number) => {
      const option = menu.optionInfoList.find((opt) => opt.id === selectedOptionId);
      return option ? `${option.name}(${option.price}원)` : '';
    })
    .join(' / ');

  // 메뉴별 총 금액 계산
  const calculateTotalPrice = () => {
    const optionsPrice = curorder.optionIds.reduce((total: any, optionId: any) => {
      const option = menu.optionInfoList.find((opt: any) => opt.id === optionId);
      return total + (option ? option.price : 0);
    }, 0);

    const totalPrice = (optionsPrice + menu.price) * curorder.count;
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();
  // console.log(totalPrice);
  return (
    <MenuBox>
      <Title>{menu.name}</Title>
      <InfoBox>
        <img
          src={menu.menuUrl}
          alt={menu.name}
          style={{ width: '65px' }}
          onError={(e) => (e.currentTarget.src = '/images/orderfunding/menuimg.png')}
        />
        <InfoList>
          <Airfont>옵션 : {optionsText || '없음'}</Airfont>
          <Airfont>수량 : {curorder.count}</Airfont>
          {/* <Airfont>가격 : {Number(menu.price).toLocaleString()}</Airfont> */}
          <div style={{ textAlign: 'right' }}>{Number(totalPrice).toLocaleString()}원</div>
        </InfoList>
      </InfoBox>
    </MenuBox>
  );
};

export default BagOrder;
