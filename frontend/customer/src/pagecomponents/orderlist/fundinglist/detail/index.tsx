import Topbar from '@/components/common/topbar';
import { StoreName, OrderState, OrderDetailStyle, OrderInfo, StoreAddress, StoreTextLine, ReceiptTabble } from './Detail.styled';
import { useEffect, useState } from 'react';
import GetFundingDetail from '@/apis/fundinglist/GetFundingDetail';
import { categories } from '@/assets/category';
import Receipt from '@/components/common/receipt';

const FundingDetailPage = ({ params, ...props }: any) => {
  const [fundingInfo, setFundingInfo] = useState<any>();

  const stateText: any = {
    BEFORE_ORDER: '펀딩에 성공했어요. 주문해주세요',
    ORDER_COMPLETED: '주문이 완료됐어요',
    CANCEL: '주문이 취소됐어요', //'펀딩- 주문 취소',
    FAILED: '펀딩이 실패했어요', //'펀딩 실패',
    WAITING: '아직 깃발 선택 전이에요', //'깃발 선택 대기',
    SUCCESS: '펀딩에 성공했어요.', //'깃발 선택 됨',
    FAILURE: '펀딩이 실패했어요', //'깃발 선택 안됨',
  };

  useEffect(() => {
    const setDetail = async () => {
      const result = await GetFundingDetail(params.id);
      setFundingInfo(result);
    };
    setDetail();
  }, []);

  const getCategoryImage = (type: any) => {
    const category = categories.find((cat) => cat.type === type);
    return category ? category.image : null;
  };

  return (
    <OrderDetailStyle>
      <Topbar text="펀딩 확인" />
      {fundingInfo && (
        <>
          <OrderInfo>
            <OrderState>{stateText[fundingInfo.state] || stateText['FAILED']}</OrderState>
            <StoreName>
              <img
                src={`/images/category/${getCategoryImage(fundingInfo.categoryType)}`}
                style={{ width: '60px', height: '60px', marginRight: '10px' }}
              />
              {fundingInfo.storeName}
            </StoreName>
            <StoreTextLine>
              영업주소 : <span>: {fundingInfo.flagAddress}</span>
            </StoreTextLine>
            <StoreTextLine>
              영업일자 : <span>: {formatDate2(fundingInfo.flagDate)}</span>
            </StoreTextLine>
            <StoreTextLine>
              펀딩일자 : <span>: {formatDate(fundingInfo.createAt)}</span>
            </StoreTextLine>
            <StoreTextLine>
              요청사항 : <span>{fundingInfo.requirement}</span>
            </StoreTextLine>
          </OrderInfo>
          <ReceiptTabble>
            <Receipt
              orderItemList={fundingInfo.fundingItemList}
              totalPrice={fundingInfo.fundingItemList.reduce((acc: number, cur: any) => acc + cur.menuTotalPrice, 0)}
            ></Receipt>
          </ReceiptTabble>
        </>
      )}
    </OrderDetailStyle>
  );
};

// 날짜 형식 변경 함수
const formatDate = (dateString: any) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  let hours: any = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const ampm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12;
  hours = hours ? hours.toString().padStart(2, '0') : 12; // the hour '0' should be '12'

  return `${year}년 ${month}월 ${day}일 ${ampm} ${hours}:${minutes}`;
};

const formatDate2 = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};
export default FundingDetailPage;
