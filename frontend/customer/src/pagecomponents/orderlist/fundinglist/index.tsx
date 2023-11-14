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
        {fundings.map((funding: any, index) => (
          <OrderCardWrapper key={'funding- ' + index}>
            <CardTop>
              <Airfont>
                {formatDate(funding.createdAt)} {orderStateMapping[funding.fundingState as OrderState]}
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
