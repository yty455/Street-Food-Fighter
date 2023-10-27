'use client';
import { vendordata } from '@/temp/vendordata';
import { useRouter } from 'next/navigation';
import { TopBox, StyledTop, VendorName } from './Vendor.styled';

const VendorPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const index = parseInt(id, 10) - 1;
  const vendor = vendordata[index];
  return (
    <div>
      <TopBox>
        <StyledTop>
          <img src="/images/top/back.png" style={{ width: '40px' }} onClick={() => router.back()} />
          <VendorName>{vendor.name}</VendorName>
          <a href={`tel:${vendor.phone}`} style={{ textDecoration: 'none' }}>
            <img src="/images/vendor/phone.png" alt="Phone" style={{ width: '30px' }} />
          </a>
        </StyledTop>
        <div> review : {vendor.review}</div>
      </TopBox>
      <div> 메뉴/가게정보/리뷰 tab</div>
      <div> 메뉴 리스트</div>
    </div>
  );
};

export default VendorPage;
