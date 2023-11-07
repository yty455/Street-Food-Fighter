'use client';
import { vendordata } from '@/temp/vendordata';
import { useRouter } from 'next/navigation';
import { VendorContainer, TopBox, StyledTop, VendorName, Review } from './Vendor.styled';
import TabBar from '@/components/order/tab';
import useOrderStore from '@/stores/orderStore';
import { useEffect } from 'react';
import { useVendorStore } from '@/stores/curvendoridStore';

const VendorPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const index = parseInt(id, 10);
  const vendor = vendordata.find((v) => v.id === index);

  const reviewImages = () => {
    if (!vendor) return [];
    const fullStars = Math.floor(vendor.review);
    const halfStar = vendor.review % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const images = [];

    for (let i = 0; i < fullStars; i++) {
      images.push(`${vendor.category}.png`);
    }

    if (halfStar) {
      images.push(`half${vendor.category}.png`);
    }

    for (let i = 0; i < emptyStars; i++) {
      images.push(`review${vendor.category}.png`);
    }

    return images;
  };

  const storedVendorId = useVendorStore((state) => state.vendorId);
  const setVendorId = useVendorStore((state) => state.setVendorId);
  const clearOrder = useOrderStore((state) => state.clearOrder);
  useEffect(() => {
    setVendorId(index);
    if (storedVendorId !== null && storedVendorId !== index) {
      clearOrder();
    }
    setVendorId(index);
  }, [index, setVendorId, clearOrder]);

  if (!vendor) {
    return <div>가게가 없어졌어요 🥺</div>;
  }
  return (
    <VendorContainer>
      <TopBox>
        <StyledTop>
          <img
            src="/images/top/back.png"
            style={{ width: '40px' }}
            onClick={() => {
              router.back();
            }}
          />
          <VendorName>{vendor.name}</VendorName>
          <a href={`tel:${vendor.phone}`} style={{ textDecoration: 'none' }}>
            <img src="/images/vendor/phone.png" alt="Phone" style={{ width: '30px' }} />
          </a>
        </StyledTop>
        <Review>
          <div>
            {reviewImages().map((image, index) => (
              <img key={index} src={`/images/category/${image}`} alt="Review" style={{ width: '30px' }} />
            ))}
          </div>
          <div>{vendor.review}</div>
        </Review>
      </TopBox>
      <TabBar vendorid={index} />
    </VendorContainer>
  );
};

export default VendorPage;
