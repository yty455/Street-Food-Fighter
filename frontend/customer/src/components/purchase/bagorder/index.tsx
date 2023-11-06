import { Airfont, MenuBox, InfoBox, Title, InfoList } from './Bagorder.styled';

const BagOrder = ({ curorder, vendor }: any) => {
  const menu = vendor.menulist.find((m: any) => m.id === curorder.menuId);
  console.log(curorder);
  if (!menu) {
    return <div>메뉴를 찾을 수 없습니다.</div>;
  }

  const optionsText = curorder.selectedOptions
    .map((selectedOptionId: any) => {
      const option = menu.options.find((opt: any) => opt.id === selectedOptionId);
      return option ? `${option.name}(${option.price}원)` : '';
    })
    .join(' / ');

  // 메뉴별 총 금액 계산
  const calculateTotalPrice = () => {
    const optionsPrice = curorder.selectedOptions.reduce((total: any, optionId: any) => {
      const option = menu.options.find((opt: any) => opt.id === optionId);
      return total + (option ? option.price : 0);
    }, 0);

    const totalPrice = (optionsPrice + menu.price) * curorder.quantity;
    return totalPrice;
  };

  const totalPrice = calculateTotalPrice();

  return (
    <MenuBox>
      <Title>{menu.name}</Title>
      <InfoBox>
        <img src={menu.menuimg} alt={menu.name} style={{ width: '65px' }} />
        <InfoList>
          <Airfont>옵션 : {optionsText}</Airfont>
          <Airfont>수량 : {curorder.quantity}</Airfont>
          <Airfont>가격 : {Number(menu.price).toLocaleString()}</Airfont>
          <div>{Number(totalPrice).toLocaleString()} 원</div>
        </InfoList>
      </InfoBox>
    </MenuBox>
  );
};

export default BagOrder;
