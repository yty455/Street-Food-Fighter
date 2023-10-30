import { useNavStore } from '@/stores/curnavStore';
import { useRouter } from 'next/navigation';
import { TopBox, Title, Content } from './Topurchase.styled';
import BottomBtn from '@/components/common/bottombtn';
import { useVendorStore } from '@/stores/curvendoridStore';
import { vendordata } from '@/temp/vendordata';
const PurchasePage = () => {
  const { curnav } = useNavStore();
  const storedVendorId = useVendorStore((state) => state.vendorId);
  console.log('id', storedVendorId);
  const vendor = vendordata.find((v) => v.id === storedVendorId);
  console.log(vendor);
  const router = useRouter();
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
        <div>
          {/* <div>{vendordata.name}</div> */}
          <div>전화번호</div>
          <div>주문 목록 컴포넌트</div>
          <div>요청 사항 컴포넌트</div>
        </div>

        <div>
          <div> 보유 파이트 머니</div>
          <div> 결제 예정 금액 </div>
        </div>
      </Content>

      <BottomBtn text="결제하기"></BottomBtn>
    </div>
  );
};

export default PurchasePage;
