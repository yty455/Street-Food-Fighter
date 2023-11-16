import Topbar from '@/components/common/topbar';
import { Container, WrapContainer, OrderCardWrapper, CardTop, Topdown, VendorInfo, StoreName, Airfont } from './Orderlist.styled';
import Button from '@/components/common/button';
import { orderStateMapping } from '@/assets/orderstate';
import { categories } from '@/assets/category';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GetFundingList from '@/apis/fundinglist/GetFundingList';

const FundingListPage = () => {
  const [fundings, setFundings] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const fundingList = await GetFundingList();
      if (fundingList) {
        setFundings(fundingList);
      }
    };
    fetchOrders();
  }, []);

  const fundingStateMapping: any = {
    PAYMENT_IN_PROGRESS: '결제 전',
    WAITING: '주문 대기',
    PROCESSING: '조리중',
    COMPLETED: '완료',
    REFUSED: '주문 거절',

    //
    BEFORE_ORDER: '주문 전',
    ORDER_COMPLETED: '주문 완료',
    CANCEL: '주문 취소',
    FAILED: '펀딩 실패',
    SUCCESS: '펀딩 성공.',
    FAILURE: '펀딩 실패',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const day = dayNames[date.getDay()];

    return `${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}(${day})`;
  };

  const getCategoryImage = (type: any) => {
    const category = categories.find((cat) => cat.type === type);
    return category ? category.image : null;
  };

  const moveDetailPage = (number: any) => {
    router.push('/orderlist/fundinglist/detail/' + number);
  };

  return (
    <WrapContainer>
      <Topbar text="펀딩 내역" />
      <Container>
        {fundings.map((funding: any, index: number) => (
          <OrderCardWrapper key={'funding- ' + index}>
            <CardTop>
              <Airfont>
                {formatDate(funding.createdAt)} {fundingStateMapping[funding.fundingState]}
              </Airfont>
              <div style={{ width: '93px' }}>
                <Button onClick={() => moveDetailPage(funding.fundingId)} text="펀딩 상세"></Button>
              </div>
            </CardTop>

            <VendorInfo>
              <img src={`/images/category/${getCategoryImage(funding.categoryType)}`} style={{ width: '60px', height: '60px' }} />
              <Topdown>
                <StoreName>{funding.storeName}</StoreName>
                <Airfont>
                  {funding.menuName} 외 {funding.restCount}개 {funding.bucketTotalPrice}원
                </Airfont>
              </Topdown>
            </VendorInfo>
          </OrderCardWrapper>
        ))}
      </Container>
    </WrapContainer>
  );
};

export default FundingListPage;
