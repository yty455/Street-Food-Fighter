import { useNavStore } from '@/stores/curnavStore';
import { useRouter } from 'next/navigation';
import { TopBox, Title, Content, VendorBox, VendorInfo, Location, VendorName } from './Topurchase.styled';
import BottomBtn from '@/components/common/bottombtn';
import { useVendorStore } from '@/stores/curvendoridStore';
import { vendordata } from '@/temp/vendordata';
import { categories } from '@/assets/category';
import { Vendor } from '@/types/vendortype';

const PurchasePage = () => {
  const router = useRouter();
  const { curnav } = useNavStore();

  const storedVendorId = useVendorStore((state) => state.vendorId);
  const vendor: Vendor = vendordata.find((v) => v.id === storedVendorId)!;

  if (!vendor) {
    <div>'가게가 없어졌어요 🥺'</div>;
    console.log('가게가 없어졌어요');
    router.push('/');
  }

  const catImage: string = categories.find((cat) => cat.id === vendor.category)?.image || '/images/category/16.png';

  // console.log(vendor);
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
          <VendorBox>
            <img src={`/images/category/${catImage}`} style={{ width: '45px', height: '45px' }} />
            <VendorInfo>
              <VendorName>{vendor.name}</VendorName>
              <Location>{vendor.loc}</Location>
            </VendorInfo>
          </VendorBox>
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
