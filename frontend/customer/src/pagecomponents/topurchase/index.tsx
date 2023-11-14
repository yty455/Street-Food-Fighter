import { useNavStore } from '@/stores/curnavStore';
import { useRouter } from 'next/navigation';
import { Requested, TopBox, Title, Content, VendorBox, FlexColumn, Location, Orderlist, More, Airfont, Cashline, FlexRow } from './Topurchase.styled';
import BottomBtn from '@/components/common/bottombtn';
import { useVendorStore } from '@/stores/curvendoridStore';
import { categories } from '@/assets/category';
import useOrderStore from '@/stores/orderStore';
import BagOrder from '@/components/purchase/bagorder';
import { useEffect, useState } from 'react';
import Input from '@/components/common/input';
import { buckets } from '@/temp/buckets';
import { user } from '@/temp/user';
import Button from '@/components/common/button';
import { VendorData } from '@/types/vendortype';
import VendorDetailAPI from '@/apis/vendor/VendorDetailAPI';
import useBucketStore from '@/stores/bucketStore';
import OrderAPI from '@/apis/vendor/OrderAPI';
import useFlagIdStore from '@/stores/flagidStore';
import FundingAPI from '@/apis/vendor/FundingAPI';
import Charge from '@/components/common/charge';

const PurchasePage = () => {
  const router = useRouter();
  const { curnav } = useNavStore();

  const storedVendorId = useVendorStore((state) => state.vendorId);
  const [vendor, setVendor] = useState<VendorData | null>(null);

  const bucket = useBucketStore((state) => state.bucket);
  const { flagId } = useFlagIdStore();

  useEffect(() => {
    const fetchVendorData = async () => {
      const data = await VendorDetailAPI({ storeId: storedVendorId });
      if (data) {
        setVendor(data);
      }
    };

    fetchVendorData();
  }, [storedVendorId]);

  const catImage = categories.find((cat) => cat.type === vendor?.categoryType)?.image || '16.png';
  const { order } = useOrderStore();

  // input (요청사항)
  const [request, setRequest] = useState('');
  const handleRequestChange = (e: any) => {
    setRequest(e.target.value);
  };

  // 결제하기 클릭
  const handleSubmit = async () => {
    // console.log('저장된 요청 사항:', request);

    if (bucket) {
      const data1 = {
        bucketId: bucket.bucketId,
        storeId: storedVendorId,
        requirement: request,
      };
      const data2 = {
        bucketId: bucket.bucketId,
        storeId: storedVendorId,
        flagId: flagId,
        requirement: request,
      };
      if (curnav === 1) {
        await OrderAPI(data1);
      } else {
        await FundingAPI(data2);
      }

      router.push('/password/pay');
    }
  };

  // 포인트 충전 모달
  const [showCharge, setShowCharge] = useState(false);
  const toggleCharge = () => {
    setShowCharge(!showCharge);
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
              <Title>{vendor?.name}</Title>
              <Location>{vendor?.activeArea}</Location>
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

            {order && order.map((o, index) => <BagOrder key={index} curorder={o} />)}
            <More
              onClick={() => {
                router.back();
              }}
            >
              + 더 담으러 가기
            </More>
          </Orderlist>
        </FlexColumn>

        <Requested>
          <Cashline>
            <Title> 보유 파이트 머니</Title>
            <FlexRow>
              <Airfont>{Number(user.points).toLocaleString()}원</Airfont>
              <Button text="충전" onClick={toggleCharge}></Button>
            </FlexRow>
          </Cashline>
          <Cashline>
            <Title> 결제 예정 금액 </Title>
            <div>{Number(buckets.totalPrice).toLocaleString()}원</div>
          </Cashline>
        </Requested>
      </Content>

      <BottomBtn text="결제하기" onClick={handleSubmit}></BottomBtn>
      {showCharge && <Charge toggleCharge={toggleCharge} />}
    </div>
  );
};

export default PurchasePage;
