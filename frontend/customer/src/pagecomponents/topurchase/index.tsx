import { useNavStore } from '@/stores/curnavStore';
import { useRouter } from 'next/navigation';
import { Requested, TopBox, Title, Content, VendorBox, FlexColumn, Location, Orderlist, More, Airfont, Cashline } from './Topurchase.styled';
import BottomBtn from '@/components/common/bottombtn';
import { useVendorStore } from '@/stores/curvendoridStore';
import { vendordata } from '@/temp/vendordata';
import { categories } from '@/assets/category';
import useOrderStore from '@/stores/orderStore';
import BagOrder from '@/components/purchase/bagorder';
import { useState } from 'react';
import Input from '@/components/common/input';
import { buckets } from '@/temp/buckets';

const PurchasePage = () => {
  const router = useRouter();
  const { curnav } = useNavStore();

  const storedVendorId = useVendorStore((state) => state.vendorId);
  const vendor = vendordata.find((v) => v.id === storedVendorId);

  if (!vendor) {
    console.log('가게가 없어졌어요');
    router.push('/');
    return <div>'가게가 없어졌어요 🥺'</div>;
  }

  const catImage = categories.find((cat) => cat.id === vendor.category)?.image || '/images/category/16.png';

  const { order } = useOrderStore();

  // console.log('order', order);

  const bucket = buckets;

  // input (요청사항)
  const [request, setRequest] = useState('');
  const handleRequestChange = (e: any) => {
    setRequest(e.target.value);
  };

  // 결제하기 클릭
  const handleSubmit = () => {
    console.log('저장된 요청 사항:', request);
  };
  return (
    <div>
      <TopBox>
        <img
          src="/images/top/back.png"
          style={{ width: '25px' }}
          onClick={() => {
            router.back();
          }}
        />
        <Title> {curnav == 1 ? '주문 하기' : '펀딩 하기'} </Title>
        <img
          src="/images/orderfunding/tohome.png"
          style={{ width: '25px' }}
          onClick={() => {
            router.push('/');
          }}
        />
      </TopBox>

      <Content>
        <FlexColumn>
          <VendorBox>
            <img src={`/images/category/${catImage}`} style={{ width: '45px', height: '45px' }} />
            <FlexColumn>
              <Title>{vendor.name}</Title>
              <Location>{vendor.loc}</Location>
            </FlexColumn>
          </VendorBox>
          <Requested>
            <Title>요청 사항</Title>
            <div>
              <Airfont> 가게 사장님께 </Airfont>
              <Input value={request} onChange={handleRequestChange} placeholder="예) 견과류 빼주세요...(글자수 제한 25자)" maxLength={25} />
            </div>
          </Requested>
          <Orderlist>
            <Title style={{ padding: '10px 15px' }}>주문 목록</Title>
            {order.map((o, index) => (
              <BagOrder key={index} menuid={o.menuId} />
            ))}
            <More
              onClick={() => {
                router.back();
              }}
            >
              + 더 담으러 가기
            </More>
          </Orderlist>
        </FlexColumn>

        <div>
          <Requested>
            <Title> 보유 파이트 머니</Title>
            <Cashline>
              <Title> 결제 예정 금액 </Title>
              <div>{Number(bucket.totalPrice).toLocaleString()} 원</div>
            </Cashline>
          </Requested>
        </div>
      </Content>

      <BottomBtn text="결제하기" onClick={handleSubmit}></BottomBtn>
    </div>
  );
};

export default PurchasePage;
