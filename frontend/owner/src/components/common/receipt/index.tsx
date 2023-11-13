import { CenterTd, LineTr, MenuNameTd, OptionNameTd, PriceTd, Table, TableHead, TotalPrice } from './Recipt.styled';

const Receipt = ({ orderItemList, totalPrice, type }: any) => {
  // console.log(orderItemList);
  if (!Array.isArray(orderItemList)) {
    return <div>정산 테이블 로딩중</div>;
  }
  return (
    <div style={{ marginTop: '10px' }}>
      <Table>
        <thead>
          <LineTr>
            <TableHead>메뉴</TableHead>
            <TableHead>수량</TableHead>
            <TableHead>금액</TableHead>
          </LineTr>
        </thead>
        <tbody>
          {orderItemList.flatMap((item: any) => [
            <tr key={item.name}>
              <MenuNameTd>{item.name}</MenuNameTd>
              <CenterTd>{item.count}</CenterTd>
              <PriceTd>{Number(item.menuTotalPrice).toLocaleString()}원</PriceTd>
            </tr>,
            item.orderOptionList
              ? item.orderOptionList.map((option: any) => (
                  <tr key={option.optionId}>
                    <CenterTd>1</CenterTd>
                    <OptionNameTd> + {option.name}</OptionNameTd>
                    <PriceTd>{Number(option.price).toLocaleString()}원</PriceTd>
                  </tr>
                ))
              : [],
          ])}
          <LineTr>
            {type === 'total' ? <td colSpan={2}>총 정산금액 :</td> : <td colSpan={2}>결제금액 :</td>}
            <TotalPrice>{Number(totalPrice).toLocaleString()}원</TotalPrice>
          </LineTr>
        </tbody>
      </Table>
    </div>
  );
};

export default Receipt;
